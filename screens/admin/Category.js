import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { API_URL } from "@env";
import { Avatar } from "@rneui/themed";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const response = await fetch(`${API_URL}/categories`);
      const data = await response.json();
      setCategories(data);
      setLoading(false);
      console.log("categories:", data);
    } catch (error) {
      setError("Error fetching categories");
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading categories...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
        <Button
          buttonStyle={styles.retryButton}
          onPress={fetchAllRestaurants}
          title="Retry"
        />
      </View>
    );
  }

  const renderCategoryItem = (item) => (
    <TouchableOpacity key={item.id}>
      <View className="w-[120] h-[140] bg-white items-center justify-center border border-[#DDDDDD] rounded-lg mt-2">
        <Avatar
          avatarStyle={{ objectFit: "cover" }}
          size={100}
          rounded
          source={{ uri: item.image }}
        />
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

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  retryButton: {
    marginTop: 10,
    backgroundColor: "#FF6347",
  },
});
