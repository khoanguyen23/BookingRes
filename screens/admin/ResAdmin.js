import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Button } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import axios from "axios";
import RestaurantUI from "../../components/ResHorUI";
import { API_URL } from "@env";
import { Ionicons, AntDesign, Entypo } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const ResAdmin = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigation = useNavigation();

  useEffect(() => {
    fetchAllRestaurants();
  }, []);

  const fetchAllRestaurants = async () => {
    try {
      const response = await axios.get(`${API_URL}/restaurants`);
      setRestaurants(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching restaurants");
      setLoading(false);
      console.error("Error fetching restaurants:", error);
    }
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + "...";
    }
    return text;
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading restaurants...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
        <Button
          buttonStyle={styles.retryButton}
          onPress={fetchAllRestaurants}
          title="Retry"
        />
      </View>
    );
  }

  return (
    <>
      <FlatList
        data={restaurants}
        renderItem={({ item }) => (
          <View className="p-4 flex flex-row space-x-2 m-2" style={styles.resContainer}>
            <View>
              <Image
                source={{ uri: item.image }}
                style={{ width: 100, height: 100, borderRadius: 5 }}
              />
            </View>
            <View className="">
              <Text className="text-lg" style={{ maxWidth: 270 }}>
                {item.name}
              </Text>
              <Text numberOfLines={1} ellipsizeMode="tail" className="mt-2 text-sm text-[#8f8a8a]">
                {truncateText(item.address, 40)}
              </Text>
              <Text className="mt-2 text-sm text-orange-700 font-semibold">
                Đánh giá: {item.rating}
              </Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item._id}
      />
      <Button
        buttonStyle={styles.addButton}
        onPress={() => navigation.navigate("AddRes")}
        radius="md"
        size="lg"
        color="#2DDB6D"
        titleStyle={{ fontWeight: "semibold", fontSize: 23 }}
      >
        Add Restaurants
      </Button>
    </>
  );
};

export default ResAdmin;

const styles = StyleSheet.create({
  container: {},
  resContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  addButton: {
    marginVertical: 15,
    marginHorizontal: 8,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  retryButton: {
    marginTop: 10,
    backgroundColor: "#FF6347",
  },
});
