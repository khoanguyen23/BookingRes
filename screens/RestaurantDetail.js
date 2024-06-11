import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import MenuTab from "./MenuTab";
import NetworkImage from "../components/NetworkImage";
import {  SIZES } from "../constants/theme";
import PopUp from "../components/PopUp";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import  {
  useAnimatedRef,
} from "react-native-reanimated";
import Colors from "../constants/Colors";
import { UserType } from "../UserContext";
import axios from "axios";
import { API_URL } from "@env";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

export default function RestaurantDetail() {
  const { params } = useRoute();
  const navigation = useNavigation();
  const item = params;
  const { name, _id } = item;
  const scrollRef = useAnimatedRef();
  const { user, updateUser } = useContext(UserType);

  const [isFavorite, setIsFavorite] = useState(false);
  const restaurantId = item._id;
  const userId = user?._id;

  if (!item || !_id) {
    console.error("Item or _id is undefined in RestaurantDetail");
    return <Text>Error: Item not found</Text>;
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ fontWeight: "bold", fontSize: 18, color: "white" }}
        >
          {name}
        </Text>
      ),
      headerRight: () => (
        <View style={styles.bar}>
          <TouchableOpacity style={styles.roundButton}>
            <Ionicons name="share-outline" size={22} color={"#000"} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleFavoritePress}
            style={styles.roundButton}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={24}
              color={isFavorite ? "red" : "black"}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [isFavorite]);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (user && user.favoriteRestaurants) {
        setIsFavorite(user.favoriteRestaurants.includes(restaurantId));
      }
    };

    checkFavoriteStatus();
  }, [user, restaurantId]);

  const handleFavoritePress = async () => {
    try {
      const response = await axios.post(`${API_URL}/addToFavorites`, {
        userId,
        restaurantId,
      });

      if (response.status === 200) {
        if (response.data.message === "Restaurant already in favorites") {
          Alert.alert("Thông báo", "Nhà hàng đã có trong danh sách yêu thích");
        } else {
          setIsFavorite(true);
          updateUser((prevUser) => ({
            ...prevUser,
            favoriteRestaurants: [
              ...prevUser.favoriteRestaurants,
              restaurantId,
            ],
          }));
        }
      } else {
        console.warn("Error adding to favorites");
      }
    } catch (error) {
      console.error("Error handling favorite:", error);
    }
  };

  const bottomSheetRef = React.useRef(null);
  const snapPoints = React.useMemo(() => ["25%", "50%"], []);

  const handlePresentModalPress = React.useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);
  const handleSheetChanges = React.useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);
  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </BottomSheetView>
      </BottomSheetModal>

      <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: "#ffffff" }}>
          <NetworkImage
            source={item.image}
            height={SIZES.height / 5.5}
            width={SIZES.width}
            border={30}
          />
          <View style={styles.popupContainer}>
            <Text className="text-center font-bold text-lg">{item.name}</Text>
            <Text className="text-center text-gray-500">{item.address}</Text>
            <View className="flex-column mt-2">
              <View className="flex-row justify-between">
                <View className="flex-row items-center">
                  <FontAwesome5 name="door-open" size={24} color="#A0C69D" />
                  <Text className="ml-2">Đang mở cửa</Text>
                </View>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.truncateText}
                >
                  Gọi món Việt, Buffet nướng hàn quốc
                </Text>
              </View>
              <View className="flex-row justify-between mt-1">
                <View className="flex-row items-center">
                  <AntDesign name="star" size={24} color="gold" />
                  <Text className="ml-4">{item.rating}</Text>
                </View>
                <View className="flex-row mr-16">
                  <Ionicons name="location-sharp" size={24} color="red" />
                  <Text className="">4.5 km</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#ffffff",
            marginTop: 80,
            marginHorizontal: 8,
            marginBottom: 10,
          }}
        ></View>

        <View style={{ flex: 1 }}>
          <MenuTab
            item={item}
            handlePresentModalPress={handlePresentModalPress}
          />
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 5,
            right: 0,
            left: 0,
          }}
        >
          <PopUp
            buttonText="Đặt chỗ"
            onPress={() => {
              navigation.navigate("Order", { restaurant: item }); // assuming `item` is the restaurant data
            }}
          />
        </View>
      </View>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  truncateText: {
    maxWidth: 150,
    overflow: "hidden",
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    color: Colors.primary,
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  applyButton: {
    backgroundColor: "red",
    width: "90%",
    marginTop: 20,
    padding: 17,
    borderRadius: 5,
  },
  applyButtonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
  popupContainer: {
    position: "absolute",
    top: 80,
    backgroundColor: "white",
    borderTopColor: "#ccc",
    borderTopWidth: 1,
    padding: 10,
    margin: 10,
    width: "95%",
    height: 145,
    borderRadius: 5,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: "#000000",
    elevation: 4,
  },
  backBtn: {
    marginLeft: 15,
    alignItems: "center",
    zIndex: 999,
    position: "absolute",
    top: 15,
  },
  shareBtn: {
    marginRight: 12,
    alignItems: "center",
    zIndex: 999,
    right: 0,
    position: "absolute",
    top: 15,
  },
});
