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
import { SpeedDial } from "@rneui/themed";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

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
    <ScrollView style={{ flex: 1, position: "relative" }}>
      <View className="flex flex-row flex-wrap justify-around h-[790]">
        {categories.map((item) => renderCategoryItem(item))}
      </View>
      <SpeedDial
        placement="right"
        isOpen={open}
        icon={{ name: "edit", color: "#fff" }}
        openIcon={{ name: "close", color: "#fff" }}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
        buttonStyle={{
          backgroundColor: "rgba(111, 202, 186, 1)",
        }}
      >
        <SpeedDial.Action
          icon={{ name: "add", color: "#fff" }}
          title="Add"
          buttonStyle={{ backgroundColor: "rgba(127, 220, 103, 1)" }}
          onPress={() => console.log("Add Something")}
        />
        <SpeedDial.Action
          icon={{ name: "delete", color: "#fff" }}
          buttonStyle={{ backgroundColor: "rgba(214, 61, 57, 1)" }}
          title="Delete"
          onPress={() => console.log("Delete Something")}
        />
        <SpeedDial.Action
          icon={{ name: "edit", color: "#fff" }}
          buttonStyle={{ backgroundColor: "rgba(255, 193, 7, 1)" }}
          title="Edit"
          onPress={() => console.log("Edit Something")}
        />
      </SpeedDial>
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
