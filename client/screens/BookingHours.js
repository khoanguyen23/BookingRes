import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import PopUp from "../components/PopUp";
import { useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const BookingHours = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { restaurant, selectedDate, bookingHours, closestTime, onTimeChange } =
    route.params;
  const [selectedTime, setSelectedTime] = useState(closestTime);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const isPastTime = (bookingTime) => {
    const currentDate = new Date();
    const selectedDateWithoutTime = new Date(selectedDate.setHours(0, 0, 0, 0));
    const currentDateWithoutTime = new Date(currentDate.setHours(0, 0, 0, 0));

    if (selectedDateWithoutTime > currentDateWithoutTime) {
      return false; // selected date is in the future, so all times are valid
    }
    
    const [hour, minute] = bookingTime.split(":");
    const bookingTotalMinutes = parseInt(hour) * 60 + parseInt(minute);
    const currentTotalMinutes =
      new Date().getHours() * 60 + new Date().getMinutes();
    return bookingTotalMinutes <= currentTotalMinutes;
  };

  const handleApply = () => {
    onTimeChange(selectedTime);
    navigation.goBack();
  };

  return (
    <View style={{ backgroundColor: "#FAFAFA" }}>
      <View
        style={{
          height: 100,
          backgroundColor: "#ffffff",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          position: "relative",
        }}
      >
        <TouchableOpacity
          className="left-0 absolute ml-2 top-15  p-2"
          onPress={handleGoBack}
        >
          <Feather name="x" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-center w-3/4">
          Các khung giờ khả dụng trong ngày{" "}
          {selectedDate
            ? selectedDate.toLocaleDateString("vi-VN", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
              })
            : "Chọn ngày"}
        </Text>
      </View>
      <View style={{ height: 300, backgroundColor: "#ffffff", marginTop: 50 }}>
        <ScrollView>
          <View className="flex-row p-2 flex-wrap items-center justify-around mt-10">
            {restaurant.bookingHours.map((hour, index) => (
              <TouchableOpacity
                style={{
                  backgroundColor:
                    selectedTime === hour
                      ? "red"
                      : isPastTime(hour)
                      ? "#D0D0D0"
                      : "#ffffff",
                  padding: 10,
                  width: "20%",
                  alignItems: "center",
                  borderRadius: 20,
                  borderColor: "#D0D0D0",
                  borderWidth: 1.5,
                  marginTop: 5,
                  color: "#666666",
                  fontWeight: "bold",
                  fontSize: 17,
                  marginRight: 7,
                }}
                onPress={() => setSelectedTime(hour)}
                disabled={isPastTime(hour)}
              >
                <Text
                  style={{
                    color:
                      selectedTime === hour
                        ? "#ffffff"
                        : isPastTime(hour)
                        ? "#666666"
                        : "#666666",
                    fontWeight: "bold",
                    fontSize: 17,
                  }}
                >
                  {hour}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
      <View style={{ height: 500, backgroundColor: "#FAFAFA" }}>
        <View style={{ height: 300 }}></View>
        <PopUp buttonText="Áp dụng" onPress={handleApply} />
      </View>
    </View>
  );
};

export default BookingHours;
