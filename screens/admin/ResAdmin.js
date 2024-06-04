import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
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


  return (
    <FlatList
      data={restaurants}
      renderItem={({ item }) => (
        <View className="p-4 flex flex-row space-x-2">
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
          <View className="w-[290]">
            <Text className="text-lg font-bold">{item.name}</Text>
            <Text className="mt-2 text-sm text-[#8f8a8a]">{item.address}</Text>
            <Text>
              {item.rating}
            </Text>
          </View>
        </View>
      )}
      keyExtractor={(item) => item._id}
    />
  );
};

export default ResAdmin;
