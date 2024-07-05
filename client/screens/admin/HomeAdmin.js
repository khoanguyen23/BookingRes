import { Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import HomeAdminCard from "../../components/HomeAdminCard";
import { UserType } from "../../UserContext";
import { API_URL } from "@env";

const HomeAdmin = () => {
  const { userId, user } = useContext(UserType); // Get userId and user from context
  const navigation = useNavigation();
  const [info, setInfo] = useState([])
  const [error, setError] = useState(null);

  console.log("User ID:", userId); // Add a label to the console log for clarity
  console.log("User:", user);

  useEffect(() => {
    getUser();
  }, []);

  async function getUser()  {
    try {
      const response = await fetch(`${API_URL}/address/${userId}`);
      const data = await response.json();
      setInfo(data);
    } catch (error) {
      setError("Error fetching categories");
    }
  }
  return (
    <View style={{ flex: 1 }}>
      <View>
        <Text>Hello {info.name} </Text>
      </View>
      <View className="flex flex-row flex-wrap justify-around">
        <HomeAdminCard
          title="Analytics"
          iconUri="https://res.cloudinary.com/dc5xcbmvp/image/upload/v1719304124/icons8-chart-100_bptvcu.png"
          borderColor="#F9D860"
          bgColor="#FEF7DC"
          onPress={() => navigation.navigate("OrderTab")}
        />
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
        <HomeAdminCard
          title="Category"
          iconUri="https://res.cloudinary.com/dc5xcbmvp/image/upload/v1719304124/icons8-restaurant-menu-100_c30g2b.png"
          borderColor="#7277FC"
          bgColor="#E1E2FE"
          onPress={() => navigation.navigate("Category")}
        />

        <HomeAdminCard
          title="Notification"
          iconUri="https://res.cloudinary.com/dc5xcbmvp/image/upload/v1719304124/icons8-bell-100_qslekd.png"
          borderColor="#CA8B98"
          bgColor="#F2E4E7"
          onPress={() => navigation.navigate("OrderTab")}
        />
      </View>
    </View>
  );
};

export default HomeAdmin;
