import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import axios from "axios"; // Import axios
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "@env";

export default function Categories() {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    // Function to fetch categories
    const fetchCategories = async () => {
      try {
        // Replace 'http://your-api-url' with your actual API endpoint
        const response = await axios.get(`${process.env.API_URL}/categories`);
        // const response = await axios.get("http://192.168.1.7:8000/categories");
        const fetchedCategories = response.data;
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    // Call the function to fetch categories when the component mounts
    fetchCategories();
  }, []); // Empty dependency array to ensure the effect runs only once when the component mounts
  console.log(categories);
  console.log(API_URL, "aa");
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
