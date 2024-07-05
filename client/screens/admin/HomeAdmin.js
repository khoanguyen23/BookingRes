import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView, Text, View } from "react-native";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import HomeAdminCard from "../../components/HomeAdminCard";
import { UserType } from "../../UserContext";
import { API_URL } from "@env";
import Entypo from "@expo/vector-icons/Entypo";
import { LinearGradient } from "expo-linear-gradient";
import { Avatar } from "@rneui/themed";
import { LineChart } from "react-native-gifted-charts";
import jwt_decode from "jwt-decode";
import axios from "axios";

const HomeAdmin = () => {
  const { userId, setUserId, user, updateUser } = useContext(UserType);
  const [address, setAddress] = useState([]);
  const navigation = useNavigation();
  const [info, setInfo] = useState([]);
  const [error, setError] = useState(null);

  console.log("User ID:", userId);
  console.log("User:", user);

  const fetchAddress = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        throw new Error("Token not found");
      }
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
      await fetchAddressData(userId);
    } catch (error) {
      console.log("Error fetching address", error);
    }
  }, [setUserId]);

  useEffect(() => {
    fetchAddress();
  }, [fetchAddress]);

  const fetchAddressData = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/address/${userId}`);
      const addressData = response.data;
      updateUser(addressData);
      console.log(addressData, "user fetch");
    } catch (error) {
      console.log(`${API_URL} /address/${userId}`);
      console.log("Error fetching address data", error);
    }
  };

  const data = [
    { value: 300, label: "M" },
    { value: 150, label: "T" },
    { value: 200, label: "W" },
    { value: 250, label: "T" },
    { value: 300, label: "F" },
    { value: 450, label: "S" },
    { value: 350, label: "S" },
  ];

  const lineData = [
    { value: 5, dataPointText: "5" },
    { value: 12, dataPointText: "12" },
    { value: 45, dataPointText: "45" },
    { value: 35, dataPointText: "35" },
    { value: 62, dataPointText: "62" },
    { value: 90, dataPointText: "90" },
    { value: 100, dataPointText: "100" },
  ];

  const lineData2 = [
    { value: 20, dataPointText: "20" },
    { value: 35, dataPointText: "35" },
    { value: 70, dataPointText: "70" },
    { value: 12, dataPointText: "12" },
    { value: 37, dataPointText: "37" },
    { value: 55, dataPointText: "55" },
    { value: 90, dataPointText: "90" },
  ];

  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={["#ffffff", "#fff"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1 }}
        >
          <View className="p-4 flex flex-row justify-between">
            <View>
              <Text className="text-[#0B36A6] text-2xl">
                Hello {user?.name}
                <Entypo name="hand" size={24} color="#FFE3C6" />
              </Text>
              <Text className="text-xl">Welcome to Dashboard</Text>
            </View>
            <Avatar size={70} rounded source={{ uri: user.avatar }} />
          </View>
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 2,
              elevation: 2,
            }}
            className="p-4 m-2"
          >
            <Text
              style={{ fontSize: 18, textAlign: "center", marginBottom: 10 }}
            >
              Last Week's Orders
            </Text>
            <Text
              style={{ fontSize: 14, textAlign: "center", marginBottom: 20 }}
            >
              15 April - 21 April
            </Text>
            <LineChart
              data={lineData}
              data2={lineData2}
              height={300}
              width={320}
              thickness={1}
              hideRules={true}
              spacing={47}
              color="#42a5f5"
              color2="#ff0000"
              showDataPoints={true}
              showScrollIndicator={true}
              areaChart={false}
              startFillColor="transparent"
              endFillColor="transparent"
              noOfSections={5}
              maxValue={150}
              yAxisThickness={0}
              xAxisThickness={0}
              yAxisTextStyle={{ color: "grey", fontSize: 12 }}
              xAxisTextStyle={{ color: "grey", fontSize: 12 }}
              xAxisLabelTexts={[
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
                "Sun",
              ]}
              onDataPointClick={(item, index) => {
                alert(`Value: ${item.value}, Additional Text: additional text`);
              }}
              initialSpacing={20}
            />
          </View>
          <View className="flex flex-row flex-wrap justify-around mb-10">
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
        </LinearGradient>
      </View>
    </ScrollView>
  );
};

export default HomeAdmin;
