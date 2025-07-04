import React, { useCallback, useLayoutEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Share,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  SlideInDown,
  interpolate,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useScrollViewOffset,
  useSharedValue,
} from "react-native-reanimated";
import Colors from "../constants/Colors";
import { defaultStyles } from "../constants/Styles";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome6 } from "@expo/vector-icons";
import SectionList from "react-native-tabs-section-list";

const { width } = Dimensions.get("window");
const IMG_HEIGHT = 250;

const FoodDetail = ({route}) => {
  const listRef = useRef();
  const navigation = useNavigation();
  const scrollRef = useAnimatedRef();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const translateY = useSharedValue(0);
  const { item, restaurant } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
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
    });
  }, []);

  useAnimatedReaction(
    () => scrollOffset.value,
    (offset) => {
      translateY.value = offset > IMG_HEIGHT ? IMG_HEIGHT : offset;
    }
  );
  useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y;
      translateY.value = Math.min(event.contentOffset.y, IMG_HEIGHT);
    },
  });

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
      opacity: interpolate(
        scrollOffset.value,
        [IMG_HEIGHT / 2, IMG_HEIGHT],
        [0, 1]
      ),
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

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y;
      translateY.value = Math.min(event.contentOffset.y, IMG_HEIGHT);
    },
  });

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        ref={scrollRef}
        scrollEventThrottle={16}
      >
        <Animated.Image
          source={{
            uri: item.image
          }}
          style={[styles.image, imageAnimatedStyle]}
          resizeMode="cover"
        />

        <View style={styles.infoContainer}>
          <View className="p-4">
            <View className="">
              <Text className="text-xl font-bold">
                <Text className="text-base text-[#E84C3F]">Độc quyền  </Text>
               {item.title}
              </Text>
              <Text className="text-base">
              {item.subTitle}
              </Text>
              {item.originalPrice !== item.discountedPrice ? (
                    <Text className="font-bold mt-2">
                      <Text className="line-through text-[#ccc] font-normal">
                        {item.originalPrice}đ
                      </Text>
                      /{item.discountedPrice}đ
                      <Text className="text-[#E84C3F]">
                        -{item.discountPercentage}%
                      </Text>
                    </Text>
                  ) : (
                    <Text className="font-bold mt-2">{item.originalPrice}đ</Text>
                  )}
              <Text className="text-[#ED1C24] text-base mt-2">
              {item.highLight}
              </Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text className="text-base text-[#337ab7] underline mt-2">
                  {restaurant.name}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="w-full bg-[#E0E0E0] h-2"></View>
       
          <View className="p-4">
            <View className="flex flex-row space-x-4">
            <Ionicons name="location-sharp" size={24} color="red" />
            <Text className="text-base">
                <Text className="font-bold">Đặt chỗ</Text> (Để có chỗ trước khi
                đến)
              </Text>
            </View>
            <TouchableOpacity className="bg-[#F44236] p-4 mt-3 rounded">
              <Text className="text-white text-center text-base font-bold">
              Select now
              </Text>
            </TouchableOpacity>
          </View>
          <View className="w-full bg-[#E0E0E0] h-2"></View>
          <View className="p-4">
            <Text className="font-bold text-base">Điều kiện áp dụng</Text>
            <Text className="font-bold text-base">1. Ưu đãi</Text>
            <Text className="text-base">
            <Text className="text-[#B20606] font-bold text-base">- Giảm 10%/suất buffet (sau VAT)</Text> cho
              khách hàng: Sử dụng dịch vụ vào buổi trưa T2-T6 hàng tuần. Áp dụng
              đến hết 30/06/2024.
            </Text>
            <Text className="font-bold text-base">2. Quy định ưu đãi</Text>
            <Text className="text-base">
            - Ưu đãi được áp dụng tất cả các ngày lễ/tết trong năm, xem các ngày Lễ tết bên dưới.
            </Text>
            <Text className="text-base">
            - Ưu đãi không được áp dụng đồng thời cùng với các chương trình ưu đãi khác tại Nhà hàng.
            </Text>
            <Text className="font-bold text-base">3. Giá buffet đã bao gồm VAT</Text>
            <Text className="font-bold text-base">4. Thời gian bán:</Text>
            <Text className="text-base">
            - <Text className="font-bold">Buổi trưa</Text> các ngày <Text className="font-bold">T2-T6</Text> hàng tuần.
            </Text>
            <Text className="text-base">
            - Không bán vào các ngày Lễ tết, xem chi tiết các ngày bên dưới.
            </Text>
            <Text className="font-bold text-base">5. Quy định thời gian đặt chỗ trước:</Text>
            <Text className="text-base">
             - Thời gian đặt chỗ trước tối thiểu: 120 phút
            </Text>
            <Text className="font-bold text-base">6. Quy định thời gian giữ chỗ:</Text>
            <Text className="text-base">
            - Thời gian nhà hàng giữ chỗ tối đa: 30 phút
            </Text>
            <Text className="font-bold text-base">7. Quy định giá buffet:</Text>
            <Text className="text-base font-bold">
            - Quy định giá Buffet trẻ em:
            </Text>
            <Text>
            Dưới 4 tuổi: Miễn phí
            Từ 4 đến 6 tuổi: 227.000đ/suất
            Từ 7 đến 12 tuổi: 357.000đ/suất
            Từ 13 tuổi trở lên: Tính giá Buffet người lớn
            </Text>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0E0E0",
  },
  image: {
    height: IMG_HEIGHT,
    width: width,
    // borderBottomLeftRadius: 30,
    // borderBottomRightRadius: 30,
  },
  infoContainer: {
    // padding: 15,
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

export default FoodDetail;
