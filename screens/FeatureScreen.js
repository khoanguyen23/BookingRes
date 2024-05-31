import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Share,
  ScrollView,
} from "react-native";
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  SlideInDown,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import Colors from "../constants/Colors";
import { defaultStyles } from "../constants/Styles";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import RestaurantCard from "../components/restaurantCard";

const { width } = Dimensions.get("window");
const IMG_HEIGHT = 200;

const FeatureScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { title, subTitle, restaurants, layout } = route.params;

  // const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollRef = useAnimatedRef();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerBackVisible: false,
      headerTransparent: true,
      headerBackground: () => (
        <Animated.View
          style={[headerAnimatedStyle, styles.header]}
        ></Animated.View>
      ),
      headerRight: () => (
        <View style={styles.bar}>
          <TouchableOpacity style={styles.roundButton}>
            <Ionicons name="share-outline" size={22} color={"#ffffff"} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundButton}>
            <Ionicons name="heart-outline" size={22} color={"#ffffff"} />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={styles.roundButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={"#ffffff"} />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <Animated.Text style={[headerTitleAnimatedStyle, styles.headerTitle]}numberOfLines={1} ellipsizeMode="tail" >
          {title}
        </Animated.Text>
      ),
      
    });
  }, []);

  const scrollOffset = useScrollViewOffset(scrollRef);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1]),
    };
  }, []);

  const headerTitleAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [IMG_HEIGHT / 2, IMG_HEIGHT], [0, 1]),
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [IMG_HEIGHT / 2, IMG_HEIGHT],
            [20, 0]
          ),
        },
      ],
    };
  }, []);

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        ref={scrollRef}
        scrollEventThrottle={16}
      >
        <Animated.Image
          source={{
            uri: "https://pasgo.vn/Upload/anh-chi-tiet/slide-isushi-1-normal-2281058760960.webp",
          }}
          style={[styles.image, imageAnimatedStyle]}
          resizeMode="cover"
        />

        <View style={styles.infoContainer}>
          <Text style={styles.name}>
            {title}
          </Text>
          <Text style={styles.desc}>
           {subTitle}
          </Text>
          <View className="mt-2 flex-row justify-between items-center">
            <Text style={styles.rooms}>Bởi : Thanhdao</Text>
            <Text>Cập nhật : 28/12/2023</Text>
          </View>
          <TouchableOpacity>
            <View className="mt-3">
              <Text className="bg-[#F44236] p-3 text-center text-white font-bold text-lg rounded-lg">
                Theo dõi bộ sưu tập
              </Text>
            </View>
          </TouchableOpacity>
          <View className="mt-2 flex-row justify-between items-center">
            <Text style={styles.rooms}>0 người theo dõi</Text>
            <Text>114 điểm đến</Text>
          </View>
          {/* <View style={styles.divider} /> */}
          <View className="mt-2">
            <Text className="bg-white p-2 border rounded-lg border-[#CCCCCC]">
              Sắp xếp gần nhất
            </Text>
          </View>
          <View className="mt-4">
            <ScrollView>
              {restaurants.map((item, index) => (
                <View
                  key={item.id || index}
                  className="flex flex-row pb-10 border-b-[1px] border-b-[#B7B7B7] w-[95%]"
                >
                  <View className="mr-2">
                    <Image
                      source={{
                        uri: item.image || "default_image_url",
                      }}
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 8,
                      }}
                    />
                    <View className="mt-2">
                      <View className="flex-row">
                        <AntDesign name="star" size={18} color="#DDBC37" />
                        <Text className="ml-2">
                          {item.rating} |{" "}
                          <Text
                            style={{ color: "#FF7F27", fontWeight: "bold" }}
                          >
                            $$
                          </Text>
                        </Text>
                      </View>
                      <View className="flex-row">
                        <Entypo name="map" size={18} color="#3D9DC3" />
                        <Text className="ml-2"> 4.2 Km</Text>
                      </View>
                    </View>
                  </View>
                  <View className="w-72 h-48">
                    <View className="bg-[#FCECEE] p-1.5 w-28 rounded-md">
                      <Text className="text-sm text-[#C34039] text-center">
                        Được đề xuất
                      </Text>
                    </View>
                    <Text className="text-lg font-bold mt-1.5">
                      {item.name}
                    </Text>
                    <Text className="mt-1.5 text-gray-500">{item.address}</Text>
                    <Text className="mt-1.5 text-[#E15241] font-normal text-base">
                      {item.promotions}
                    </Text>
                    <View className=" mt-2">
                      <TouchableOpacity>
                        <Text className="w-1/3 text-center p-1 border-[#BF3431] border rounded-sm text-[#BF3431]">
                          Đặt chỗ
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Animated.ScrollView>

      {/* <Animated.View
        style={defaultStyles.footer}
        entering={SlideInDown.delay(200)}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity style={styles.footerText}>
            <Text style={styles.footerPrice}>€222</Text>
            <Text>night</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 20 }]}
          >
            <Text style={defaultStyles.btnText}>Reserve</Text>
          </TouchableOpacity>
        </View>
      </Animated.View> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    height: IMG_HEIGHT,
    width: width,
    // borderBottomLeftRadius: 30,
    // borderBottomRightRadius: 30,
  },
  infoContainer: {
    padding: 15,
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  desc: {
    fontSize: 17,
    marginTop: 10,
    color: "#282828",
  },
  rooms: {
    fontSize: 16,
    color: Colors.grey,
    marginVertical: 4,
  },
  ratings: {
    fontSize: 16,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.grey,
    marginVertical: 16,
  },
  host: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
  hostView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  footerText: {
    height: "100%",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  footerPrice: {
    fontSize: 18,
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "#000",
    opacity: 0.7,
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
  header: {
    backgroundColor: "red",
    height: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey,
  },

  description: {
    fontSize: 16,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    // width: width * 0.6,
  },
});

export default FeatureScreen;
