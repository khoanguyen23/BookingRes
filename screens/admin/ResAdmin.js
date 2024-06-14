import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Button } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import axios from "axios";
import RestaurantUI from "../../components/ResHorUI";
import { API_URL } from "@env";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const ResAdmin = () => {
  const [restaurants, setRestaurants] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Gửi yêu cầu lấy tất cả nhà hàng từ máy chủ khi trang được tải
    fetchAllRestaurants();
  }, []);

  const fetchAllRestaurants = async () => {
    try {
      const response = await axios.get(`${API_URL}/restaurants`);
      setRestaurants(response.data);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + "...";
    }
    return text;
  };

  return (
    <>
      <FlatList
        data={restaurants}
        renderItem={({ item }) => (
          <View
            className="p-4 flex flex-row space-x-2 m-2"
            style={styles.resContainer}
          >
            <View>
              <Image
                source={{
                  uri: item.image,
                }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 5,
                }}
              />
            </View>
            <View className="">
              <Text
                className="text-lg"
                // numberOfLines={1}
                // ellipsizeMode="tail"
                style={{ maxWidth: 270 }}
              >
                {item.name}
              </Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                className="mt-2 text-sm text-[#8f8a8a]"
              >
                {truncateText(item.address, 40)}
              </Text>
              <Text className="mt-2 text-sm text-orange-700 font-semibold">
                Đánh giá : {item.rating}
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
        レストランを追加
      </Button>
    </>
  );
};

export default ResAdmin;

const styles = StyleSheet.create({
  container: {
    
  },
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
    // backgroundColor : "red",
    marginVertical: 15,
    marginHorizontal: 8,
  },
});
