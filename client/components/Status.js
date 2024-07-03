import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
const Status = ({ onPress, onPress1,setSelectedContentType,selectedStatus }) => {

    const labels = ["Trạng thái", "Dịch vụ"];

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 5,
        }}
      >
        {labels.map((label, index) => (
        <TouchableOpacity 
        key={index}
        onPress={() => {
          if (index === 0) {
            onPress();
            setSelectedContentType("status");
          } else {
            onPress1();
            setSelectedContentType("services");
          }
        }}
        >
          <View className="mr-3 flex-row justify-center items-center p-2 bg-white border border-[#E6E6E6] rounded-full w-auto h-10">
              <Text>{index === 0 ? selectedStatus : label}</Text>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={24}
                color="black"
              />
            </View>
          </TouchableOpacity>
        ))}
        <View className="flex-row justify-center items-center p-2 bg-white border border-[#E6E6E6] rounded-full w-auto h-10">
          <Text className="ml-2">15/12/2023 - 14/01/2024</Text>
          <View className="ml-2">
            <Entypo name="calendar" size={24} color="black" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Status;
