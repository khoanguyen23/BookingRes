import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import {
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from "@gorhom/bottom-sheet";
import { ScrollView } from "react-native-gesture-handler";

const ListRes = ({ nearbyRestaurants, navigation, refresh }) => {
  const listRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (refresh) {
      scrollListTop();
    }
  }, [refresh]);

  const scrollListTop = () => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const renderRes = ({ item: restaurant }) => (
    <View className="flex flex-row">
      <TouchableOpacity
        key={restaurant?._id}
        onPress={() => navigation.navigate("RestaurantDetail", { ...restaurant })}
      >
        <View className="m-2 p-2 mt-4 flex-row justify-between rounded-xl">
          <View className=" w-3/12 items-center">
            <Image
              source={{
                uri: restaurant?.image || "default_image_url",
              }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 5,
              }}
            />
            <View className="items-center w-2/3 mt-1">
              <View className="flex-row items-center">
                <AntDesign name="star" size={24} color="#DDBC37" />
                <Text className="ml-2">
                  {restaurant?.rating} |{" "}
                  <Text style={{ color: "#FF7F27", fontWeight: "bold" }}>
                    $$
                  </Text>
                </Text>
              </View>
              <View className="flex-row items-center">
                <Entypo name="map" size={24} color="#3D9DC3" />
                <Text className="ml-2 w-full">{restaurant?.distance}km</Text>
              </View>
            </View>
          </View>

          <View className="w-9/12 ml-8">
            <Text className="text-lg text-gray-950 font-bold">
              {restaurant?.name}
            </Text>
            <View className="flex-row">
              <Text style={{ width: 200 }} className="text-gray-500 ml-1">
                {restaurant?.address}
              </Text>
            </View>

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
    </View>
  );
  const listTags = [
    "Tất cả",
    "Nhà hàng có ƯU ĐÃI NOEL 2023",
    "Nhà hàng, quán ăn ngon QUẬN GÒ VẤP",
    "Quán ăn gia đình QUẬN TÂN PHÚ",
    "Quán nhậu QUẬN 5",
    "Quán ăn gia đình SÂN VƯỜN",
    "QUÁN THÁI LAN Sài Gòn- TOP ĐẶT BÀN Pasgo",
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#FDFFFF" }}>
      <BottomSheetFlatList
        renderItem={renderRes}
        data={loading ? [] : nearbyRestaurants}
        ref={listRef}
        ListHeaderComponent={
          <View>
            {/* <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                marginTop: 4,
              }}
            >
              {nearbyRestaurants.length} homes
            </Text> */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 10 }}
              className="mt-2"
            >
              {listTags.map((listTag, index) => (
                <Text key={index} className="ml-2 border p-3 rounded-full font-bold text-base">
                  {listTag}
                </Text>
              ))}
            </ScrollView>
          </View>
        }
      />
    </View>
  );
};

export default ListRes;
