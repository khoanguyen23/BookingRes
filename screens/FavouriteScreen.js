import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { UserType } from "../UserContext";
import { API_URL } from "@env";
import axios from "axios";
import Swipeable from "react-native-gesture-handler/Swipeable";

const FavouriteScreen = () => {
  const { user } = useContext(UserType);
  const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);
  const navigation = useNavigation();


  useEffect(() => {
    axios
      .get(`${API_URL}/${user._id}/favoriteRestaurants`)
      .then((response) => {
        setFavoriteRestaurants(response.data);
      })
      .catch((error) => {
        console.error("Error fetching favorite restaurants:", error);
      });
  }, [user._id]);

  const rightSwipeActions = (restaurantId) => {
    const removeFromFavorites = async () => {
      try {
        const response = await axios.post(`${API_URL}/removeFromFavorites`, {
          userId: user._id,
          restaurantId: restaurantId,
        });

        if (response.status === 200) {
          setFavoriteRestaurants((prevFavorites) =>
            prevFavorites.filter((r) => r._id !== restaurantId)
          );
        } else {
          console.error("Failed to remove from favorites");
        }
      } catch (error) {
        console.error("Error removing from favorites:", error);
      }
    };

    return (
      <View
        style={{
          backgroundColor: "#ff8303",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <TouchableOpacity onPress={removeFromFavorites}>
          <Text
            style={{
              color: "white",
              paddingHorizontal: 10,
              fontWeight: "600",
              paddingHorizontal: 30,
              paddingVertical: 20,
            }}
          >
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const swipeFromRightOpen = () => {
    alert("Swipe from right");
  };

  return (
    <ScrollView>
      {favoriteRestaurants.map((restaurant) => (
        <Swipeable
          key={restaurant._id}
          renderRightActions={() => rightSwipeActions(restaurant._id)}
          // onSwipeableOpen={swipeFromRightOpen}
        >
          <TouchableOpacity
            key={restaurant._id}
            onPress={() => navigation.navigate("Restaurant", { ...restaurant })}
          >
            {/* <Text>{user._id}</Text> */}
            <View className="m-2 mt-2 p-2 flex-row justify-between rounded-xl">
              <View className="w-2/6 relative">
                <Image
                  source={{ uri: restaurant.image }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 5,
                  }}
                />
                <View className="items-center w-2/3 mt-1">
                  <View className="flex-row items-center">
                    <AntDesign name="star" size={24} color="#DDBC37" />
                    <Text className="ml-2">{restaurant.rating} |</Text>
                  </View>
                  <View className="flex-row items-center ml-4">
                    <Entypo name="map" size={24} color="#3D9DC3" />
                    <Text className="ml-2">{restaurant.distance} Km</Text>
                  </View>
                </View>
              </View>
              <View className="w-4/6 right-4">
                <Text className="text-lg text-gray-950 font-bold">
                  {restaurant.name}
                </Text>

                <Text style={{ width: 200 }} className="text-gray-500">
                  {restaurant.address}
                </Text>
                <Text className="text-[#E34B40] font-semibold mt-1 text-base">
                  Đặt bàn giữ chỗ
                </Text>

                <Text className="text-gray-500 mt-2">Gọi món nhậu</Text>

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
        </Swipeable>
      ))}
    </ScrollView>
  );
};

export default FavouriteScreen;
