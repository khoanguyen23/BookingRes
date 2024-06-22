import { View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import HomeAdminCard from "../../components/HomeAdminCard";


const HomeAdmin = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <View className="flex flex-row justify-between">
        <HomeAdminCard
          title="Restaurants"
          iconUri="https://res.cloudinary.com/dc5xcbmvp/image/upload/v1704173088/icons8-restaurant-100_i1evvu.png"
          borderColor="#6FB168"
          bgColor="#E4F0E3"
          onPress={() => navigation.navigate("Restaurants")}
        />
        <HomeAdminCard
          title="Customers"
          iconUri="https://res.cloudinary.com/dc5xcbmvp/image/upload/v1704173087/icons8-country-house-100_vjk4fr.png"
          borderColor="#FF8D09"
          bgColor="#FFE9CF"
          onPress={() => navigation.navigate("Customers")}
        />
        <HomeAdminCard
          title="Orders"
          iconUri="https://res.cloudinary.com/dc5xcbmvp/image/upload/v1704173088/icons8-purchase-order-100_pligj9.png"
          borderColor="#E091D7"
          bgColor="#F9EAF7"
          onPress={() => navigation.navigate("OrderTab")}
        />
      </View>
    </View>
  );
};

export default HomeAdmin;
