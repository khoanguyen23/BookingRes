import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const RestaurantUI = ({ restaurantData }) => {
  if (
    !restaurantData ||
    !Array.isArray(restaurantData) ||
    restaurantData.length === 0
  ) {
    return <Text>No restaurant data available.</Text>;
  }
  const navigation = useNavigation();

  return (
    <ScrollView className="bg-[#FFFBF5]">
      {restaurantData.map((restaurant) => (
        <TouchableOpacity
          key={restaurant._id} // Assuming each restaurant has a unique ID
          onPress={() =>
            navigation.navigate("RestaurantDetail", { ...restaurant })
          }
          style={styles.shadow}
        >
          <View className="mt-2 p-2 flex-row justify-between rounded-xl">
            <Image
              source={{
                uri: restaurant.image || "default_image_url",
              }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 5,
              }}
            />
            <View className="w-2/3">
              <Text className="text-lg text-gray-950 font-bold">
                {restaurant.name}
              </Text>
              <View className="flex-row">
                <Ionicons name="location-sharp" size={24} color="red" />
                <Text style={{ width: 200 }} className="text-gray-500 ml-2">
                  {restaurant.address}
                </Text>
              </View>
              <View className="flex-row items-center w-2/3 mt-1">
                <View className="flex-row items-center">
                  <AntDesign name="star" size={24} color="#DDBC37" />
                  <Text className="ml-2">{restaurant.rating}</Text>
                </View>
                <View className="flex-row items-center ml-4">
                  <Entypo name="map" size={24} color="#3D9DC3" />
                  <Text className="ml-2">4.2 Km</Text>
                </View>
              </View>
              {/* <Text className="text-gray-500 mt-2">{restaurant.type}</Text> */}
              <View className=" mt-2">
                <TouchableOpacity>
                  <Text className="w-1/3 text-center p-1 border-[#A2A2A2] border rounded-sm">
                    Đặt chỗ
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default RestaurantUI;

const styles = StyleSheet.create({
  shadow: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});
