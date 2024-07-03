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
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import SectionList from "react-native-tabs-section-list";

const { width } = Dimensions.get("window");
const IMG_HEIGHT = 250;

const BottomSheetTest = () => {
  const SECTIONS = [
    {
      title: "Đề xuất",
      data: [
        {
          type: "menu",
          title: "Suất Buffet Trưa T2-T6 - D'Maris Lotte Mart Quận 7",
          description:
            "Gồm: Cá hồi xông khói, Pasta, Steak, Hải sản, Sushi, Sashimi, Salad, Bakery",
          price: "428K",
          discount: "-10%",
          originalPrice: "476K",
          image: "link_to_image_1", // Thay bằng đường dẫn thực tế của hình ảnh
        },
        {
          type: "text",
          text: "I. Đặt chỗ PasGo: Tư vấn - Giữ chỗ\n- Khách hàng cần đặt bàn ít nhất là 60 phút trước giờ đến nhà hàng.\n- Nhà hàng chỉ giữ bàn sau 15 phút.\n- Nhà hàng chỉ nhận bàn đặt trước từ 20 khách trở lên\nII. Ưu đãi tặng kèm: Chương trình ưu đãi, khuyến mại đang được xây dựng\nIII. Lưu ý\n- Nhà hàng chỉ nhận bàn đặt trước từ 20 khách trở lên\n- Giá Buffet chưa bao gồm VAT, phí phục vụ và khăn lạnh. Nhà hàng luôn thu VAT theo Quy định hiện hành và 5% phí phục vụ.\n- Ưu đãi không áp dụng các ngày: Tháng 1 (Ngày 1); Tháng 2 (Ngày 14); Tháng 3 (Ngày 8); Tháng 4 (Ngày 30); Tháng 5 (Ngày 1); Tháng 6 (Ngày 1); Tháng 9 (Ngày 2); Tháng 10 (Ngày 20); Tháng 11 (Ngày 20); Tháng 12 (Ngày 24, 25, 31) & 10/3 Âm Lịch\n- Nhà hàng quy định không mang thức ăn, thức uống từ bên ngoài vào\n- Từ 10 người trở lên đặt món trước, vui lòng đặt cọc trước với Nhà hàng",
        },
      ],
    },
    {
      title: "Tóm tắt",
      data: [
        {
          type: "summary",
          description:
            "D'Maris Lotte Mart Quận 7 là nhà hàng buffet nổi tiếng với hơn 200 món ăn đến từ Hàn Quốc, Nhật Bản, Trung Quốc và Việt Nam. Nhà hàng không chỉ có các món ăn ngon mà còn có không gian sang trọng, thích hợp cho các buổi tiệc gia đình, gặp gỡ bạn bè và các sự kiện đặc biệt.",
          featuredDishes: [
            "Cá hồi xông khói",
            "Pasta",
            "Steak",
            "Hải sản",
            "Sushi",
            "Sashimi",
          ],
        },
      ],
    },
    {
      title: "Bảng giá",
      data: [
        { image: "link_to_image_2" }, // Thay bằng đường dẫn thực tế của hình ảnh
        { image: "link_to_image_3" },
        { image: "link_to_image_4" },
      ],
    },
    {
      title: "Quy định",
      data: [
        {
          type: "rules",
          text: "I. Đặt chỗ PasGo: Tư vấn - Giữ chỗ\n- Khách hàng cần đặt bàn ít nhất là 60 phút trước giờ đến nhà hàng.\n- Nhà hàng chỉ giữ bàn sau 15 phút.\n- Nhà hàng chỉ nhận bàn đặt trước từ 20 khách trở lên\nII. Ưu đãi tặng kèm: Chương trình ưu đãi, khuyến mại đang được xây dựng\nIII. Lưu ý\n- Nhà hàng chỉ nhận bàn đặt trước từ 20 khách trở lên\n- Giá Buffet chưa bao gồm VAT, phí phục vụ và khăn lạnh. Nhà hàng luôn thu VAT theo Quy định hiện hành và 5% phí phục vụ.\n- Ưu đãi không áp dụng các ngày: Tháng 1 (Ngày 1); Tháng 2 (Ngày 14); Tháng 3 (Ngày 8); Tháng 4 (Ngày 30); Tháng 5 (Ngày 1); Tháng 6 (Ngày 1); Tháng 9 (Ngày 2); Tháng 10 (Ngày 20); Tháng 11 (Ngày 20); Tháng 12 (Ngày 24, 25, 31) & 10/3 Âm Lịch\n- Nhà hàng quy định không mang thức ăn, thức uống từ bên ngoài vào\n- Từ 10 người trở lên đặt món trước, vui lòng đặt cọc trước với Nhà hàng",
        },
      ],
    },
  ];
  const listRef = useRef();

  const navigation = useNavigation();

  // const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollRef = useAnimatedRef();

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

  const scrollOffset = useScrollViewOffset(scrollRef);
  const translateY = useSharedValue(0);

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

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -translateY.value }],
      // position : "fixed",
    };
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

  // const headerAnimatedStyle = useAnimatedStyle(() => {
  //   return {
  //     opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1]),
  //     position: "relative",
  //   };
  // }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1]),
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1,
    };
  });

  const renderTab = ({ title, isActive }) => (
    <View
      style={[styles.tabContainer, { borderBottomWidth: isActive ? 1 : 0 }]}
    >
      <Text
        style={[styles.tabText, { color: isActive ? "#090909" : "#9e9e9e" }]}
      >
        {title}
      </Text>
    </View>
  );

  const renderSectionHeader = ({ section }) => (
    <View>
      <View style={styles.sectionHeaderContainer} />
      <Text style={styles.sectionHeaderText}>{section.title}</Text>
    </View>
  );

  const renderItem = ({ item, section }) => {
    if (section.title === "Đề xuất") {
      if (item.type === "menu") {
        return (
          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
            <Text style={styles.itemPrice}>{item.price}</Text>
          </View>
        );
      } else if (item.type === "text") {
        return (
          <View style={styles.itemContainer}>
            <Text style={styles.itemDescription}>{item.text}</Text>
          </View>
        );
      }
    } else {
      switch (item.type) {
        case "summary":
          return (
            <View style={styles.itemContainer}>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <Text style={styles.featuredDishes}>Featured Dishes:</Text>
              {item.featuredDishes.map((dish) => (
                <Text key={dish} style={styles.featuredDishes}>
                  {dish}
                </Text>
              ))}
            </View>
          );
        case "rules":
          return (
            <View style={styles.itemContainer}>
              <Text style={styles.itemDescription}>{item.text}</Text>
            </View>
          );
        default:
          return <Image source={{ uri: item.image }} style={styles.image} />;
      }
    }
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y;
      translateY.value = Math.min(event.contentOffset.y, IMG_HEIGHT);
    },
  });

  // const scrollHandler = useAnimatedScrollHandler((event) => {
  //   scrollOffset.value = event.contentOffset.y;
  //   translateY.value = event.contentOffset.y > IMG_HEIGHT ? IMG_HEIGHT : event.contentOffset.y;
  // });
  const sectionListContainerAnimatedStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      width: "100%",
      top: 0,
      bottom: 0,
      zIndex: 100,
      height: "100%",
      // backgroundColor: scrollOffset.value > IMG_HEIGHT ? '#fff' : 'transparent',
      // Additional styles can be added based on the scroll position
    };
  });

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        ref={scrollRef}
        onScroll={scrollHandler}
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
          <View className="bg-white p-4">
            <Text style={styles.name}>Bò Tơ Quán Mộc - Trần Văn Giàu</Text>
            <View className="space-y-2 h-32 flex justify-center">
              <View className="flex flex-row items-start ml-2 space-x-4 max-h-12">
                <FontAwesome6 name="location-dot" size={24} color="black" />
                <Text className="text-base text-[#484848]">
                  Số 206-210 Trần Văn Giàu, P.Bình Trị Đông, Q.Bình Tân
                  adasdsadsa
                </Text>
              </View>
              <View className="flex flex-row items-start ml-2 space-x-4 max-h-12">
                <FontAwesome6 name="location-dot" size={24} color="black" />
                <Text className="text-base">Gọi món Việt (chuyên bò tơ)</Text>
              </View>
              <View className="flex flex-row items-start ml-2 space-x-4 max-h-12">
                <FontAwesome6 name="location-dot" size={24} color="black" />
                <Text className="text-base">250.000 - 300.000 đ/người</Text>
              </View>
            </View>
          </View>
          <View className="bg-white mt-2 p-4">
            <View className="flex flex-row items-start ml-2 space-x-4 max-h-12">
              <FontAwesome6 name="location-dot" size={24} color="black" />
              <TouchableOpacity>
                <Text className="text-base underline text-[#70A579]">
                  Đang mở cửa 10:00 - 22:00
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="bg-white mt-2 p-4">
            <View className="flex flex-row items-start ml-2 space-x-4 max-h-12">
              <FontAwesome6 name="location-dot" size={24} color="black" />
              <Text className="text-base">
                <Text className="font-bold">Đặt chỗ</Text> (Để có chỗ trước khi
                đến)
              </Text>
            </View>
            <View className="flex flex-row justify-between  items-center mt-3 ml-2">
              <View className="flex flex-row items-center space-x-2">
                <FontAwesome6 name="user" size={24} color="black" />
                <Text>2</Text>
              </View>
              <Text>10:15</Text>
              <Text>16/05</Text>
              <TouchableOpacity
                style={[
                  defaultStyles.btn,
                  { paddingRight: 50, paddingLeft: 50 },
                ]}
              >
                <Text className="text-base font-bold text-white">
                  Đặt chỗ ngay
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* <View className="mt-3">
          <Animated.View style={[styles.fixedSectionList, animatedStyle]}>
          <SectionList
            sections={SECTIONS}
            keyExtractor={(item, index) => item.title || index.toString()}
            stickySectionHeadersEnabled={false}
            scrollToLocationOffset={50}
            tabBarStyle={styles.tabBar}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderTab={renderTab}
            renderSectionHeader={renderSectionHeader}
            renderItem={renderItem}
          />
        </Animated.View>
          </View> */}
        </View>
        {/* <Animated.View style={[styles.fixedSectionList, animatedStyle]}>
          <SectionList
            sections={SECTIONS}
            keyExtractor={(item, index) => item.title || index.toString()}
            stickySectionHeadersEnabled={false}
            scrollToLocationOffset={50}
            tabBarStyle={styles.tabBar}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderTab={renderTab}
            renderSectionHeader={renderSectionHeader}
            renderItem={renderItem}
          />
        </Animated.View> */}
        {/* <View  style={[styles.sectionListContainer,styles.animatedStyle]}>
          <SectionList
            sections={SECTIONS}
            keyExtractor={(item, index) => item.key + index}
            stickySectionHeadersEnabled={true}
            renderTab={renderTab}
            renderSectionHeader={renderSectionHeader}
            renderItem={renderItem}
          />
        </View> */}
        <View style={styles.sectionListContainer}>
          <SectionList
            sections={SECTIONS}
            keyExtractor={(item, index) => item + index}
            ref={listRef}
            renderSectionHeader={renderSectionHeader}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            renderTab={renderTab}
            TabIndicatorComponent={() => (
              <View
                style={{
                  backgroundColor: "#1c1c1c",
                  height: 2,
                }}
              />
            )}
          />
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
    backgroundColor: "#E0E0E0",
  },
  sectionListContainer: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "white",
    // position: "fixed",
  },
  animatedStyle: {
    position: "fixed",
  },
  fixedSectionList: {
    // flex: 1,
    // zIndex: 100,
  },
  fixedSectionList: {
    position: "fixed",
    width: "100%",
    top: 0,
    bottom: 0,
    zIndex: 100,
    height: "100%",
  },
  image: {
    height: IMG_HEIGHT,
    width: width,
    // borderBottomLeftRadius: 30,
    // borderBottomRightRadius: 30,
  },
  infoContainer: {
    backgroundColor: "#E0E0E0",
  },
  name: {
    fontSize: 20,
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
    backgroundColor: "white",
    height: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey,
  },

  description: {
    fontSize: 16,
    marginTop: 10,
  },
  tabBar: {
    backgroundColor: "#fff",
    borderBottomColor: "#f4f4f4",
    borderBottomWidth: 1,
  },
  tabContainer: {
    borderBottomColor: "#090909",
  },
  tabText: {
    padding: 15,
    color: "#9e9e9e",
    fontSize: 18,
    fontWeight: "500",
  },
  separator: {
    height: 0.5,
    width: "96%",
    alignSelf: "flex-end",
    backgroundColor: "#eaeaea",
  },
  sectionHeaderContainer: {
    height: 10,
    backgroundColor: "#f6f6f6",
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
    borderBottomColor: "#f4f4f4",
    borderBottomWidth: 1,
  },
  sectionHeaderText: {
    color: "#010101",
    backgroundColor: "#fff",
    fontSize: 23,
    fontWeight: "bold",
    paddingTop: 25,
    paddingBottom: 5,
    paddingHorizontal: 15,
  },
  itemContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  itemTitle: {
    flex: 1,
    fontSize: 20,
    color: "#131313",
  },
  itemPrice: {
    fontSize: 18,
    color: "#131313",
  },
  itemDescription: {
    marginTop: 10,
    color: "#b6b6b6",
    fontSize: 16,
  },
  itemRow: {
    flexDirection: "row",
  },
  dishImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  galleryContainer: {
    paddingHorizontal: 15,
  },
  galleryImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 8,
  },
});

export default BottomSheetTest;
