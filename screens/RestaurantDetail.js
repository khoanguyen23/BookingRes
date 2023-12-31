import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import MenuTab from "./MenuTab";
import NetworkImage from "../components/NetworkImage";
import { COLORS, SIZES } from "../constants/theme";
import PopUp from "../components/PopUp";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Animated, {
  SlideInDown,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import Colors from '../constants/Colors';
import { defaultStyles } from '../constants/Styles';

const { width } = Dimensions.get('window');
const IMG_HEIGHT = 150;


export default function RestaurantDetail({ route }) {
  const { name  } = route.params;
  const { params } = useRoute();
  const navigation = useNavigation();
  let item = params;
  const scrollRef = useAnimatedRef();


  useEffect(() => {
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
            <Ionicons name="share-outline" size={22} color={'#000'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundButton}>
            <Ionicons name="heart-outline" size={22} color={'#000'} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);


  

  

  return (
    <View style={{}}>
      <View style={{backgroundColor:"#ffffff"}}>
        <NetworkImage
          source={item.image}
          height={SIZES.height / 5.5}
          width={SIZES.width}
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
        style={{ backgroundColor:"#ffffff" ,marginTop: 80, marginHorizontal: 8, marginBottom: 10 }}
      ></View>

      <View style={{ height: 500 }}>
        <MenuTab item={item} />
      </View>
      <View
        style={{
          height: 100,
          backgroundColor: "#ccc",
          justifyContent: "flex-end",
        }}
      >
        <PopUp
          buttonText="Đặt chỗ"
          onPress={(restaurantItem) => {
            // Custom logic for onPress
            navigation.navigate("Order", { restaurant: restaurantItem });
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#ffffff"
  },
  truncateText: {
    maxWidth: 150,
    overflow: "hidden",
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.primary,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    // bottom : 0 ,
    top: 80,
    // backgroundColor: "red",
    backgroundColor: "white",
    borderTopColor: "#ccc",
    borderTopWidth: 1,
    padding: 10,
    margin: 10,
    width: "95%",
    height: 145,
    // justifyContent: "center",
    borderRadius: 5,
    // alignItems: "center",
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
    // top: SIZES.xxLarge + 3,
    top: 15,
  },
  shareBtn: {
    marginRight: 12,
    alignItems: "center",
    zIndex: 999,
    right: 0,
    position: "absolute",
    // top: SIZES.xxLarge,
    top: 15,
  },
});
