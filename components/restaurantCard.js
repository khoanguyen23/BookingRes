import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Entypo } from "@expo/vector-icons";

export default function RestaurantCard({ item, layout }) {
  const navigation = useNavigation();
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + "...";
    }
    return text;
  };
  const handlePress = () => {
    navigation.navigate("RestaurantDetail", { ...item });
    navigation.setParams({ headerTitle: item.name });
  };
  const renderLayout = () => {
    if (layout === 2) {
      return (
        <View className="mr-4">
          <View className="">
            <Image
              className="w-40 h-40 rounded-md"
              source={{ uri: item.image }}
            />
          </View>
          <View className="w-36">
            <Text className="text-lg font-bold pt-2">{item.name}</Text>
          </View>
        </View>
      );
    } else if (layout === 3) {
      return (
        <View
          style={{ shadowColor: themeColors.bgColor(0.2), shadowRadius: 7 }}
          className="mr-6 bg-white rounded-3xl shadow-lg"
        >
          <Image
            className="h-36 w-64 rounded-t-lg"
            source={{ uri: item.image }}
          />
          <View className="px-3 pb-4 space-y-2">
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="text-lg font-bold pt-2"
            >
              {truncateText(item.name, 28)}
            </Text>
            <View className="flex-row items-center space-x-1">
              <Image
                source={require("../assets/img/star.png")}
                className="h-4 w-4"
              />
              <Text className="text-xs">
                <Text className="text-green-700">{item.rating}</Text>
                <Text className="text-gray-700"> đánh giá </Text>
              </Text>
            </View>
            <View className="flex-row items-center space-x-1">
              <Icon.MapPin color="gray" width={15} height={15} />
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                className="text-gray-700 text-xs"
              >
                Địa chỉ · {truncateText(item.address, 30)}
              </Text>
            </View>
          </View>
        </View>
      );
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
     {renderLayout()}
    </TouchableOpacity>
  );
}
