import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const HomeAdminCard = ({ title, iconUri, borderColor, bgColor, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="w-[120] h-[180] bg-white items-center justify-center border border-[#DDDDDD] rounded-lg">
        <View
          style={{
            borderColor: borderColor,
            borderWidth: 2,
            width: 60,
            height: 60,
            borderRadius: 100,
            backgroundColor: bgColor,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            width={25}
            height={25}
            source={{
              uri: iconUri,
            }}
          />
        </View>
        <Text style={{ marginTop: 8, fontWeight: "600" }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default HomeAdminCard;
