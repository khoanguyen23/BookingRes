import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { themeColors } from "../theme";
import RestaurantCard from "./restaurantCard";
import RestaurantGridLayout from "./restaurantGridLayout";
import { useNavigation } from "@react-navigation/native";

export default function FeatureRow({ title, subTitle, restaurants, layout }) {
  const navigation = useNavigation();
  const rows = [[], []];
  restaurants.forEach((restaurant, index) => {
    rows[index % 2].push(restaurant);
  });

  const renderLayout = () => {
    if (layout === 1) {
      return (
        <View
          style={{ flexDirection: "column", justifyContent: "space-between" }}
        >
          <View style={{ flexDirection: "row" }}>
            {rows[0].map((restaurant, index) => (
              <RestaurantGridLayout item={restaurant} key={`row1-${index}`} />
            ))}
          </View>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            {rows[1].map((restaurant, index) => (
              <RestaurantGridLayout item={restaurant} key={`row2-${index}`} />
            ))}
          </View>
        </View>
      );
    } else if (layout === 2 || layout === 3) {
      return restaurants.map((restaurant, index) => (
        <RestaurantCard item={restaurant} key={index} layout={layout} />
      ));
    }
  };

  return (
    <View>
      <View className="px-3">
        <View className="flex-row items-center">
          <View className="w-9/12">
            <Text className="font-bold text-xl">{title}</Text>
          </View>
          <TouchableOpacity className="w-3/12 ml-2"
          onPress={() => navigation.navigate("FeatureScreen") }
          >
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
          {renderLayout()}
        </ScrollView>
      </View>
    </View>
  );
}
