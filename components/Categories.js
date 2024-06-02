import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Categories({categories}) {
  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <View className="mt-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      >
        {categories?.map((category, index) => {
          let isActive = category.id == activeCategory;
          let btnClass = isActive ? "bg-[#FFFFFF]" : "bg-[#FFFFFF]";
          let textClass = isActive
            ? "font-normal text-[#1A1A1A] mt-4 text-base"
            : "text-[#1A1A1A]";
          return (
            <View key={index} className="flex justify-center items-center mr-6 mt-2">
              <TouchableOpacity
                style={{
                  padding : 13,
                  borderRadius: 100,
                  shadowColor: "#000000",
                  shadowOffset: {
                    width: 3,
                    height: 3,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 8,
                }}
                onPress={() => {
                  setActiveCategory(category._id);
                  console.log("Selected Category ID:", category._id);
                  navigation.navigate("Result", {
                    selectedCategory: category._id,
                    selectedCategoryName: category.name,
                  });
                }}
                className={"" + btnClass}
              >
                <Image
                  style={{ width: 45, height: 45 }}
                  source={{ uri: category.image }}
                />
              </TouchableOpacity>
              <Text className={"text-sm " + textClass}>{category.name}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
