import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { API_URL } from "@env";
import { Avatar } from "@rneui/themed";

const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const response = await fetch(`${API_URL}/categories`);
      const data = await response.json();
      setCategories(data);
      console.log("categories:", data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  const renderCategoryItem = (item) => (
    <TouchableOpacity key={item.id}>
      <View className="w-[120] h-[140] bg-white items-center justify-center border border-[#DDDDDD] rounded-lg mt-2">
        <Avatar avatarStyle={{objectFit:"cover"}} size={100} rounded source={{ uri: item.image }} />
        <Text>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={{ flex: 1 }}>
      <View className="flex flex-row flex-wrap justify-around">
        {categories.map((item) => renderCategoryItem(item))}
      </View>
    </ScrollView>
  );
};

export default Category;
