import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import Categories from "../components/Categories";
import FeaturedRow from "../components/featureRow";
import * as Icon from "react-native-feather";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { API_URL } from "@env";
import { UserType } from "../UserContext";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Banner from "../components/Banner";

export default function HomeScreen({ navigation, route }) {
  const { userId, setUserId, user, updateUser } = useContext(UserType);
  const [address, setAddress] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCity, setSelectedCity] = useState(
    route.params?.selectedCity || "TPHCM"
  );
  const [featuredData, setFeaturedData] = useState([]);
  const bannerImages = [
    "https://pastaxi-manager.onepas.vn/Photo/ShowPhotoBannerVsSlide?Id=5AC03585-1C3B-4F28-B708-01337E3904E9&2023-12-18%2016:12:30",
    "https://pastaxi-manager.onepas.vn/Photo/ShowPhotoBannerVsSlide?Id=DBEFFE71-6DCE-4F40-8A31-6D4F72A30B90&2023-12-18%2016:12:30",
    "https://pastaxi-manager.onepas.vn/Photo/ShowPhotoBannerVsSlide?Id=7F14089A-CF08-4FA4-B04F-9FAA31B9CE02&2023-12-18%2016:12:30",
    "https://pastaxi-manager.onepas.vn/Photo/ShowPhotoBannerVsSlide?Id=FC15E6C4-5E82-42E6-8A1D-C724DA4E6E36&2023-12-18%2016:12:30",
  ];

  const fetchFeaturedData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/featured`);
      setFeaturedData(response.data);
    } catch (error) {
      console.error("Failed to fetch featured data:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/api/featured`);
      const textResponse = await response.text();
      console.log('Raw response:', textResponse);
      const data = JSON.parse(textResponse);
      setFeaturedData(data);
    } catch (error) {
      console.error('Error fetching featured data:', error);
    }
  };


  const fetchAddress = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
      await fetchAddressData(userId);
    } catch (error) {
      console.log("Error fetching address", error);
    }
  };

  const fetchAddressData = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/address/${userId}`);
      const addressData = response.data;
      updateUser(addressData);
      console.log(addressData, "user fetch");
    } catch (error) {
      console.log(`${API_URL}/address/${userId}`);
      console.log("Error fetching address data", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/categories`);
      const fetchedCategories = response.data;
      setCategories(fetchedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchFeaturedData();
    // fetchData();
    fetchAddress();
    fetchCategories();
  }, []);


  return (
    <SafeAreaView className="bg-white">
      <StatusBar barStyle="dark-content" />
      {/* header  */}
      <View className="justify-between p-4 flex-row items-center max-w-full h-14 ju">
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("City", { selectedCity, setSelectedCity })
          }
        >
          <View className="flex-row">
            <Ionicons name="location-sharp" size={24} color="red" />
            <Text
              style={{
                textTransform: "uppercase",
                fontSize: 17,
                marginLeft: 10,
                fontWeight: "bold",
                marginRight: 5,
                color: "#DA4C40",
              }}
            >
              {selectedCity}
            </Text>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="gray" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
          <EvilIcons name="bell" size={30} color="black" />
        </TouchableOpacity>
      </View>
      {/* search bar */}
      <TouchableOpacity onPress={() => navigation.navigate("Search")}>
        <View className="flex-row items-center space-x-2 px-4 pb-2">
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              padding: 3,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: "gray",
              padding: 7,
            }}
            onPress={() => navigation.navigate("Search")}
          >
            <Icon.Search
              className="ml-2"
              height="25"
              width="25"
              stroke="gray"
            />
            <Text
              style={{
                marginLeft: 10,
                flex: 1,
                color: "#888888",
                fontSize: 16,
              }}
            >
              Tìm kiếm địa chỉ, món ăn...
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Filter");
              }}
            >
              <Icon.Sliders
                height={20}
                width={20}
                strokeWidth="2.5"
                stroke="#828282"
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      {/* main */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        <Text className="font-bold text-xl pl-4 mt-2">Danh mục</Text>
        <Categories categories={categories}/>
        <Banner images={bannerImages} />
        <View className="mt-5">
          {featuredData.map((item, index) => {
            if (item.title) {
              return (
                <FeaturedRow
                  key={index}
                  title={item.title} 
                  restaurants={item.restaurants}
                  subTitle={item.subTitle}
                  layout={item.layout}
                />
              );
            }
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
