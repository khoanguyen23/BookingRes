import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Entypo } from "@expo/vector-icons";

export default function RestaurantCard({ item }) {
  const navigation = useNavigation();
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + "...";
    }
    return text;
  };
  const handlePress = () => {
    navigation.navigate("RestaurantDetail", { ...item });
    navigation.setParams({ headerTitle: item.name });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View className="flex flex-row  mr-2 pb-16 border-b-[1px] border-b-[#B7B7B7]">
        <View className="mr-2">
          <Image
            source={{
              uri: item.image || "default_image_url",
            }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 8,
            }}
          />
          <View className="mt-2">
            <View className="flex-row">
              <AntDesign name="star" size={18} color="#DDBC37" />
              <Text className="ml-2">
                {item.rating} |{" "}
                <Text style={{ color: "#FF7F27", fontWeight: "bold" }}>$$</Text>
              </Text>
            </View>
            <View className="flex-row">
              <Entypo name="map" size={18} color="#3D9DC3" />
              <Text className="ml-2"> 4.2 Km</Text>
            </View>
          </View>
        </View>
        <View className="w-72 h-48">
          <View className="bg-[#FCECEE] p-1.5 w-28 rounded-md">
            <Text className="text-sm text-[#C34039] text-center">
              Được đề xuất
            </Text>
          </View>
          <Text className="text-lg font-bold mt-1.5">{item.name}</Text>
          <Text className="mt-1.5 text-gray-500">{item.address}</Text>
          <Text className="mt-1.5 text-[#E15241] font-normal text-base">
            {item.promotions}
          </Text>
          <View className=" mt-2">
            <TouchableOpacity>
              <Text className="w-1/3 text-center p-1 border-[#BF3431] border rounded-sm text-[#BF3431]">
                Đặt chỗ
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
