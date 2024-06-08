import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { API_URL } from "@env";
import { Image } from "react-native";
import { StyleSheet } from "react-native";
import SearchBar from "../../components/SearchBar";
import { useNavigation, useRoute } from "@react-navigation/native";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [restaurants, setRestaurants] = useState({});
  const [users, setUsers] = useState({});
  const [searchPhrase, setSearchPhrase] = useState("");

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_URL}/api/orders`);
      const data = await response.json();

      if (response.ok) {
        setOrders(data.orders);

        const restaurantIds = Array.from(
          new Set(data.orders.map((order) => order.restaurant))
        );

        const restaurantPromises = restaurantIds.map(async (restaurantId) => {
          const restaurantResponse = await fetch(
            `${API_URL}/restaurants/${restaurantId}`
          );
          const restaurantData = await restaurantResponse.json();

          if (restaurantResponse.ok) {
            setRestaurants((prevRestaurants) => ({
              ...prevRestaurants,
              [restaurantId]: restaurantData.restaurant,
            }));
          } else {
            console.error("khong lay duoc id nha hang", restaurantData.message);
          }
        });

        const userPromises = data.orders.map(async (order) => {
          const userResponse = await fetch(`${API_URL}/address/${order.user}`);
          const userData = await userResponse.json();

          if (userResponse.ok) {
            setUsers((prevUsers) => ({
              ...prevUsers,
              [order.user]: userData, // Store user data using user ID as key
            }));
          } else {
            console.error("Error fetching user:", userData.message);
          }
        });

        await Promise.all(userPromises);

        await Promise.all(restaurantPromises);
      } else {
        console.error("Error fetching orders:", data.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchOrders();
    });

    return unsubscribe;
  }, [navigation]);

  const formatDate = (dateString) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };

    return new Date(dateString).toLocaleDateString("vi-VN", options);
  };

  const filteredOrders = orders.filter((order) => {
    const orderStatus = order.status.toLowerCase();
    const customerName = users[order.user]?.name.toLowerCase();
    const restaurantName = restaurants[order.restaurant]?.name.toLowerCase();
    const searchTerm = searchPhrase.toLowerCase();

    return (
      orderStatus.includes(searchTerm) ||
      restaurantName.includes(searchTerm) ||
      customerName.includes(searchTerm)
    );
  });
  // console.log("Cac don hang", orders);

  const navigation = useNavigation();
  const route = useRoute();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#F8F8F9" }}>
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
      />
      <View className="mt-2">
        {filteredOrders.map((order) => (
          <View
            key={order._id}
            style={{
              backgroundColor: "#FFFFFF",
              padding: 10,
              borderWidth: 1,
              borderColor: "#DEDEDE",
              borderRadius: 5,
              marginTop: 5,
              marginRight: 5,
              marginLeft: 5,
            }}
          >
            <View
              className="flex-row"
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
                paddingBottom: 10,
              }}
            >
              <View className="mr-3">
                {restaurants[order.restaurant] && (
                  <Image
                    source={{
                      uri: restaurants[order.restaurant].image,
                    }}
                    style={{
                      width: 85,
                      height: 85,
                      borderRadius: 5,
                      objectFit: "cover",
                    }}
                  />
                )}
              </View>
              <View className="flex-column">
                <View className="flex-row justify-between w-3/4">
                  <Text style={{ color: "#A1A1A1" }}>
                    ID : {order._id.substring(0, 11)}
                  </Text>
                  <Text style={{ color: "#A1A1A1" }}>
                    {formatDate(order.date)}
                  </Text>
                </View>
                <Text
                  style={{
                    color: "#262626",
                    fontSize: 17,
                    fontWeight: "bold",
                    marginBottom: 7,
                    marginTop: 7,
                  }}
                >
                  {restaurants[order.restaurant]?.name || "khong co nha hang"}
                </Text>
                <Text style={{ color: "#4A4A4A" }}>
                  {/* Thời gian đến : {formatDate(order.date)} {order.selectedHour} */}
                  {users[order.user]?.name}
                </Text>
                <Text className="text-sm mt-2 text-orange-800 font-bold">{order.note}</Text>
              </View>
            </View>
            <View className="flex-row justify-between mt-2">
              <Text className="text-base">{order.status}</Text>
              <Text
                style={{
                  backgroundColor: "green",
                  color: "white",
                  padding: 5,
                  width: 70,
                  borderRadius: 3,
                  textAlign: "center",
                }}
                onPress={() =>
                  navigation.navigate("DetailOrders", {
                    order,
                    users,
                    restaurants,
                  })
                }
              >
                Chi tiết
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Orders;

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    width: "100%",
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: "10%",
  },
});
