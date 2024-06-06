import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/themed";

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
          style: "destructive",
        },
      ]
    );
  };

  const renderRestaurant = ({ item }) => (
    <View style={styles.restaurantContainer}>
      <Image source={{ uri: item.image }} style={styles.restaurantImage} />
      <Text style={styles.restaurantName}>{item.name}</Text>
      <View style={styles.restaurantActions}>
        <Button
          buttonStyle={styles.editButton}
          onPress={() => navigation.navigate("EditRestaurant", { restaurant: item })}
          radius="md"
          size="sm"
          color="#FFA500"
        >
          Edit
        </Button>
        <Button
          buttonStyle={styles.deleteButton}
          onPress={() => handleDeleteRestaurant(item.id)}
          radius="md"
          size="sm"
          color="#FF0000"
        >
          Delete
        </Button>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button
        buttonStyle={styles.addButton}
        onPress={() => navigation.navigate("AddRestaurant")}
        radius="md"
        size="lg"
        color="#28a745"
      >
        Add Restaurant
      </Button>
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderRestaurant}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f8f8f8",
  },
  addButton: {
    marginVertical: 15,
  },
  list: {
    paddingBottom: 20,
  },
  restaurantContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 10,
  },
  restaurantImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  restaurantName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
  },
  restaurantActions: {
    flexDirection: "row",
  },
  editButton: {
    marginRight: 10,
  },
  deleteButton: {},
});

export default AdminRestaurants;
