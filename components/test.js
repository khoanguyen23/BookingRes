import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";

const Menu = ({ items }) => {
  return (
    <View className="flex p-6 bg-white mt-2">
      <Text className="text-lg font-semibold">Đề xuất</Text>
      <ScrollView>
        {items.map((item, index) => (
          <View key={index}>
            <Text className="text-lg font-semibold mt-2">{item.title}</Text>
            <View className="flex flex-row pb-10 border-b-[1px] border-b-[#B7B7B7] w-[95%] mt-2">
              <View className="mr-2">
                <Image
                  style={{ width: 110, height: 110, borderRadius: 8 }}
                  source={{ uri: item.image }}
                />
                <View className="mt-2">
                  <TouchableOpacity>
                    <Text className="text-center p-1 border-[#BF3431] border rounded-sm text-[#BF3431]">
                      {item.highLight || "Chọn ngay"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View className="w-60">
                <Text className="text-lg font-bold mt-1.5">{item.title}</Text>
                <Text className="mt-1.5 text-gray-500">{item.description}</Text>
                <Text className="mt-1.5 text-[#E15241] font-normal text-base">
                  {item.discountedPrice || item.originalPrice}
                </Text>
                <Text>{item.note}</Text>
                <Text className="text-sky-500 underline">
                  Quy định & điều kiện sử dụng sản phẩm này
                </Text>
                <View className="mt-2 ">
                  <TouchableOpacity>
                    <Text className="w-full text-center p-1 border-[#BF3431] border rounded-sm text-[#BF3431]">
                      Chọn ngay
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Menu;
