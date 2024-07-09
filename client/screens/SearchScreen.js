// SearchScreen.js
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { API_URL } from "@env";
import { Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Keyboard } from "react-native";
import axios from "axios";
import useNearbyRestaurants from "../hooks/useNearbyRestaurants";

const SearchScreen = ({ route }) => {
  const navigation = useNavigation();
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSubmitPressed, setIsSubmitPressed] = useState(false);
  const { nearbyRestaurants } = useNearbyRestaurants();

  const handleSearch = async (searchKeyword) => {
    try {
      if (searchKeyword.trim() !== "") {
        const response = await fetch(
          `${API_URL}/restaurants/search/${searchKeyword}`
        );

        if (response.ok) {
          const data = await response.json();
          setSearchResults(data);
          if (isSubmitPressed) {
            navigation.navigate("Home", { searchResults: data });
          }
        } else {
          console.error("Error fetching search results");
        }
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error fetching search results", error);
    } finally {
      setIsSubmitPressed(false);
    }
  };

  const handleEnterPress = () => {
    Keyboard.dismiss();
    // get value from input field
    const searchKeyword = keyword.trim();
    if (searchKeyword !== "") {
      navigation.navigate("Result", { searchKeyword });
      setKeyword("");
    } else {
      handleSearch(searchKeyword);
    }
  };

  useEffect(() => {
    // Trigger the search when the keyword changes
    handleSearch(keyword);
  }, [keyword]);

  return (
    <ScrollView style={{ padding: 10 }}>
      <View
        style={{
          borderWidth: 2,
          borderColor: "#E5E5E5",
          height: 60,
          borderRadius: 10,
          paddingHorizontal: 15,
          marginBottom: 20,
          justifyContent: "center",
        }}
      >
        <TextInput
          style={{ position: "relative" }}
          placeholder="Enter keyword"
          value={keyword}
          onChangeText={(text) => setKeyword(text)}
          onSubmitEditing={handleEnterPress}
          returnKeyType="done"
        />
        <View style={{ position: "absolute", right: 0, marginRight: 20 }}>
          <FontAwesome5 name="search" size={17} color="gray" />
        </View>
      </View>

      <Text
        style={{
          textTransform: "uppercase",
          marginLeft: 10,
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        Từ khóa
      </Text>

      <View className="mt-4 flex-row flex-wrap">
        {searchResults.map((restaurant) => (
          <TouchableOpacity
            key={restaurant._id}
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              borderBottomWidth: 1,
              borderBottomColor: "gray",
              width: "44%",
              margin: 10,
            }}
          >
            <FontAwesome5 name="search" size={17} color="gray" />
            <Text className="w-3/4 max-h-20 border-b border-b-gray-200 p-2">
              {restaurant.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View>
        <Text className="uppercase text-xl font-bold mt-6">Được đề xuất</Text>
        {keyword.trim() !== "" ? (
          <ScrollView>
            {searchResults.map((restaurant, index) => (
              <TouchableOpacity
                key={restaurant?._id}
                onPress={() =>
                  navigation.navigate("RestauranDetail", { ...restaurant })
                }
              >
                <View className="m-2 mt-2 p-2 flex-row justify-between rounded-xl">
                  <View className=" w-4/12 items-center">
                    <Image
                      source={{
                        uri: restaurant.image || "default_image_url",
                      }}
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: 5,
                      }}
                    />
                    <View className="items-center w-2/3 mt-1">
                      <View className="flex-row items-center">
                        <AntDesign name="star" size={24} color="#DDBC37" />
                        <Text className="ml-2">
                          {restaurant.rating} |{" "}
                          <Text
                            style={{ color: "#FF7F27", fontWeight: "bold" }}
                          >
                            $$
                          </Text>
                        </Text>
                      </View>
                      <View className="flex-row items-center ml-4">
                        <Entypo name="map" size={24} color="#3D9DC3" />
                        <Text className="ml-2 w-full"> 4.2 Km</Text>
                      </View>
                    </View>
                  </View>

                  <View className="w-8/12">
                    <Text className="text-lg text-gray-950 font-bold">
                      {restaurant.name}
                    </Text>
                    <View className="flex-row">
                      <Text
                        style={{ width: 200 }}
                        className="text-gray-500 ml-1"
                      >
                        {restaurant.address}
                      </Text>
                    </View>

                    <View className=" mt-2">
                      <TouchableOpacity>
                        <Text className="w-1/3 text-center p-1 border-[#A2A2A2] border rounded-sm">
                          Đặt chỗ
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <ScrollView>
            {nearbyRestaurants.map((restaurant, index) => (
              <TouchableOpacity
                key={restaurant?._id}
                onPress={() =>
                  navigation.navigate("RestaurantDetail", { ...restaurant })
                }
              >
                <View className="m-2 p-2 mt-4 flex-row justify-between rounded-xl">
                  <View className=" w-3/12 items-center">
                    <Image
                      source={{
                        uri: restaurant.image || "default_image_url",
                      }}
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: 5,
                      }}
                    />
                    <View className="items-center w-2/3 mt-1">
                      <View className="flex-row items-center">
                        <AntDesign name="star" size={24} color="#DDBC37" />
                        <Text className="ml-2">
                          {restaurant.rating} |{" "}
                          <Text
                            style={{ color: "#FF7F27", fontWeight: "bold" }}
                          >
                            $$
                          </Text>
                        </Text>
                      </View>
                      <View className="flex-row items-center">
                        <Entypo name="map" size={24} color="#3D9DC3" />
                        <Text className="ml-2 w-full">
                          {restaurant.distance}km
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View className="w-9/12 ml-8">
                    <Text className="text-lg text-gray-950 font-bold">
                      {restaurant.name}
                    </Text>
                    <View className="flex-row">
                      <Text
                        style={{ width: 200 }}
                        className="text-gray-500 ml-1"
                      >
                        {restaurant.address}
                      </Text>
                    </View>

                    <View className=" mt-2">
                      <TouchableOpacity>
                        <Text className="w-1/3 text-center p-1 border-[#A2A2A2] border rounded-sm">
                          Đặt chỗ
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    </ScrollView>
  );
};

export default SearchScreen;
