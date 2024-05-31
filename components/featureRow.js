import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import RestaurantCard from "./restaurantCard";
import { themeColors } from "../theme";

export default function FeatureRow({ title, subTitle, restaurants }) {

  const rows =[[],[]];
  restaurants.forEach((restaurant, index) => {
    rows[index % 2].push(restaurant);
  });

  return (
    <View>
      <View className="px-3">
        <View className="flex-row items-center">
          <View className="w-9/12">
            <Text className="font-bold text-xl">{title}</Text>
          </View>
          <TouchableOpacity className="w-3/12 ml-2">
            <Text
              style={{ color: themeColors.text }}
              className="text-base font-medium"
            >
              Xem tất cả
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="text-[#404040] text-base">{subTitle}</Text>
      </View>

      <View className="px-3">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{}}
          className="overflow-visible py-5"
        >
          <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row' }}>
              {rows[0].map((restaurant, index) => (
                <RestaurantCard item={restaurant} key={`row1-${index}`} />
              ))}
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              {rows[1].map((restaurant, index) => (
                <RestaurantCard item={restaurant} key={`row2-${index}`} />
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
