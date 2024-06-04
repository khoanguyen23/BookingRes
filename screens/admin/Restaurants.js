import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AdminRestaurants = () => {
  const [restaurants, setRestaurants] = useState([
    { id: 1, name: "Restaurant 1", image: "https://via.placeholder.com/50" },
    { id: 2, name: "Restaurant 2", image: "https://via.placeholder.com/50" },
  ]);
  const navigation = useNavigation();

  const handleDeleteRestaurant = (id) => {
    Alert.alert(
      "Delete Restaurant",
      "Are you sure you want to delete this restaurant?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id));
          },
        },
      ]
    );
  };

  const renderRestaurant = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#DDDDDD",
        alignItems: "center",
      }}
    >
      <Image
        source={{ uri: item.image }}
        style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
      />
      <Text style={{ flex: 1 }}>{item.name}</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("EditRestaurant", { restaurant: item })}
        style={{
          backgroundColor: "#FFA500",
          padding: 10,
          borderRadius: 5,
          marginRight: 5,
        }}
      >
        <Text style={{ color: "#FFF" }}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleDeleteRestaurant(item.id)}
        style={{ backgroundColor: "#FF0000", padding: 10, borderRadius: 5 }}
      >
        <Text style={{ color: "#FFF" }}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TouchableOpacity
        onPress={() => navigation.navigate("AddRestaurant")}
        style={{
          backgroundColor: "#28a745",
          padding: 15,
          borderRadius: 5,
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "#FFF", fontWeight: "bold" }}>Add Restaurant</Text>
      </TouchableOpacity>
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderRestaurant}
      />
    </View>
  );
};

export default AdminRestaurants;
