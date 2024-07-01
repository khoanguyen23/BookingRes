import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert
} from "react-native";
import { Button } from "@rneui/themed";
import axios from "axios";
import { Swipeable } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "@env";

const ResAdmin = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  const deleteRestaurant = async (id) => {
    try {
      await axios.delete(`${API_URL}/restaurants/${id}`);
      setRestaurants(restaurants.filter((restaurant) => restaurant._id !== id));
    } catch (error) {
      console.error("Error deleting restaurant:", error);
    }
  };

  const confirmDelete = (id) => {
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc chắn muốn xóa nhà hàng này?",
      [
        {
          text: "Hủy",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => deleteRestaurant(id)
        }
      ],
      { cancelable: false }
    );
  };

  const renderRightActions = (id) => {
    return (
      <View style={styles.deleteButtonContainer}>
        <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDelete(id)}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
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
          <Swipeable
            renderRightActions={() => renderRightActions(item._id)}
          >
            <View className="p-4 flex flex-row space-x-2 m-2" style={styles.resContainer}>
              <View>
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 100, height: 100, borderRadius: 5, objectFit: "cover" }}
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
          </Swipeable>
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
  deleteButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    width: 100,
    height: "100%",
    borderRadius: 5,
    marginVertical: 8,
    marginRight: 4,
  },
  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
