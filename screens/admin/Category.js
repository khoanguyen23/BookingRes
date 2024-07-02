import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { API_URL } from "@env";
import { Avatar, Button } from "@rneui/themed";
import { SpeedDial } from "@rneui/themed";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const toggleDeleteMode = () => {
    setIsDeleteMode(!isDeleteMode);
  };

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
          onPress={fetchCategories}
          title="Retry"
        />
      </View>
    );
  }

  const renderCategoryItem = (item) => (
    <TouchableOpacity key={item._id}>
      <View
        style={[
          selectedCategory === item._id && isDeleteMode ? styles.selected : null,
        ]}
        className="w-[120] h-[140] bg-white items-center justify-center border border-[#DDDDDD] rounded-lg mt-2"
      >
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
    <View style={{ flex: 1 }}>
      <View
        className={`flex flex-row justify-around ${
          !isDeleteMode ? "hidden" : ""
        }`}
      >
        <Button
          title="Select to delete"
          loading={false}
          loadingProps={{ size: "small", color: "white" }}
          buttonStyle={{
            backgroundColor: "rgba(214, 61, 57, 1)",
            borderRadius: 5,
          }}
          containerStyle={{
            height: 50,
            width: 150,
            marginTop: 20,
          }}
        />
        <Button
          title="Delete all"
          loading={false}
          loadingProps={{ size: "small", color: "white" }}
          buttonStyle={{
            backgroundColor: "rgba(214, 61, 57, 1)",
            borderRadius: 5,
          }}
          containerStyle={{
            marginTop: 20,
            height: 50,
            width: 150,
          }}
        />
        <Button
          title="cancel"
          loading={false}
          loadingProps={{ size: "small", color: "white" }}
          buttonStyle={{
            backgroundColor: "rgba(214, 61, 57, 1)",
            borderRadius: 5,
          }}
          containerStyle={{
            marginTop: 20,
            height: 50,
            width: 70,
          }}
          onPress={() => setIsDeleteMode(!isDeleteMode)}
        />
      </View>
      <View className="flex flex-row flex-wrap justify-around h-screen">
        {categories.map((item) => renderCategoryItem(item))}
      </View>
      <SpeedDial
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
          onPress={() => {
            toggleDeleteMode();
            setOpen(false);
          }}
        />
        <SpeedDial.Action
          icon={{ name: "edit", color: "#fff" }}
          buttonStyle={{ backgroundColor: "rgba(255, 193, 7, 1)" }}
          title="Edit"
          onPress={() => console.log("Edit Something")}
        />
      </SpeedDial>
    </View>
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
  selected: {
    borderColor: "red",
    borderWidth: 2,
    margin: 4,
  },
});
