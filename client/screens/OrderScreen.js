import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useContext, useState } from "react";
import { InputNumber } from "@nutui/nutui-react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AntDesign } from "@expo/vector-icons";
import moment from "moment-timezone";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { API_URL } from "@env";
import { UserType } from "../UserContext";
import { Button, Dialog, Portal } from "react-native-paper";

const OrderScreen = ({ navigation }) => {
  const { params } = useRoute();
  const { restaurant, selectedItem } = params;
  const [inputState, setInputState] = useState({
    val1: 0,
  });
  const [inputState1, setInputState1] = useState({
    val2: 0,
  });
  const [selectedTime, setSelectedTime] = useState("");
  const [orderNote, setOrderNote] = useState("");
  const currentTime = new Date();
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();
  const currentTotalMinutes = currentHours * 60 + currentMinutes;
  const bookingHours = restaurant.bookingHours;
  let closestTime = null;
  let closestTimeDiff = Infinity;
  const { user } = useContext(UserType);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [nearestTime, setNearestTime] = useState("");
  const handleTimeChange = (newTime) => {
    setSelectedTime(newTime);
  };

  bookingHours.forEach((bookingTime) => {
    const [hour, minute] = bookingTime.split(":");
    const bookingTotalMinutes = parseInt(hour) * 60 + parseInt(minute);

    if (bookingTotalMinutes > currentTotalMinutes) {
      const timeDiff = bookingTotalMinutes - currentTotalMinutes;

      if (timeDiff < closestTimeDiff) {
        closestTimeDiff = timeDiff;
        closestTime = bookingTime;
      }
    }
  });

  const handleAdultsChange = (value) => {
    console.log("Adults value changed:", value);
    setInputState((prevState) => ({
      ...prevState,
      val1: value,
    }));
  };

  const handleChildrenChange = (value) => {
    console.log("Children value changed:", value);
    setInputState1((prevState) => ({
      ...prevState,
      val2: value,
    }));
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const submitOrder = async () => {
    try {
      if (!selectedDate) {
        showDialog("Please select a date.");
        return;
      }
      if (!user || !restaurant) {
        showDialog("User or restaurant not found");
        return;
      }
      const orderData = {
        userId: user._id,
        restaurantId: restaurant._id,
        adults: inputState.val1,
        children: inputState1.val2,
        date: selectedDate.toISOString(),
        selectedHour: selectedTime || closestTime,
        note: orderNote,
        selectedItem: selectedItem,
      };

      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Order submitted successfully:", responseData);
        navigation.navigate("OrderSuccess");
      } else {
        console.error("Failed to submit order. Status code:", response.status);
        const errorResponse = await response.json();
        console.error("Error response:", errorResponse);
      }
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  const validateAndNavigate = () => {
    if (!restaurant || !selectedDate || !bookingHours || !closestTime) {
      alert("Please ensure all required fields are filled.");
      return;
    }

    navigation.navigate("BookingHours", {
      restaurant,
      selectedDate,
      bookingHours,
      closestTime,
      onTimeChange: handleTimeChange,
    });
  };
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const showDialog = (message) => {
    setErrorMessage(message);
    setVisible(true);
  };

  const hideDialog = () => {
    setVisible(false);
    setErrorMessage("");
  };

  return (
    <>
      <ScrollView style={styles.container}>
        {/* THONG TIN DON HANG  */}
        <View style={{ margin: 15 }}>
          <Text className="font-medium text-lg py-4">Đặt chỗ đến</Text>
          <View className="border p-2 flex-row justify-between rounded-xl">
            <Image
              source={{ uri: restaurant.image }}
              style={{
                width: 90,
                height: 90,
                borderRadius: 5,
              }}
            />
            <View className="w-2/3">
              <Text className="text-lg text-gray-950">{restaurant.name}</Text>
              <Text className="text-gray-500">{restaurant.address}</Text>
            </View>
          </View>
          <Text className="py-4 text-lg font-medium">Thông tin đơn hàng</Text>
          <View className="flex-row border-b p-4 border-b-zinc-300 items-center">
            <FontAwesome5 name="user" size={24} color="black" />
            <View className="flex-row justify-around  items-center  w-9/12">
              <Text className="ml-0">Số người lớn :</Text>
              <InputNumber
                modelValue={inputState.val1}
                min="0"
                onChangeFuc={handleAdultsChange}
              />
            </View>
          </View>
          <View className="flex-row border-b p-4 border-b-zinc-300 items-center">
            <MaterialIcons name="child-care" size={24} color="black" />
            <View className="flex-row justify-around  items-center  w-9/12">
              <Text className="mr-4">Số trẻ em :</Text>
              <InputNumber
                modelValue={inputState1.val2}
                min="0"
                onChangeFuc={handleChildrenChange}
              />
            </View>
          </View>
          <View className="flex-row border-b p-4 border-b-zinc-300 items-center">
            <AntDesign name="calendar" size={24} color="black" />
            <View className="flex-row justify-around  items-center w-9/12">
              <Text className="mr-4">Ngày đến :</Text>
              <TouchableOpacity
                onPress={showDatePicker}
                className="flex-row items-center "
              >
                <Text className="relative">
                  {selectedDate
                    ? selectedDate.toLocaleDateString("vi-VN", {
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                      })
                    : "Chọn ngày"}
                </Text>
                <MaterialIcons
                  style={{ position: "absolute", right: -100 }}
                  name="keyboard-arrow-down"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex-row border-b p-4 border-b-zinc-300 items-center">
            <AntDesign name="clockcircleo" size={24} color="black" />
            <View className="flex-row justify-around  items-center w-9/12">
              <Text className="mr-14">Giờ đến :</Text>
              <TouchableOpacity
                className="flex-row items-center"
                onPress={validateAndNavigate}
              >
                <Text className="relative">{selectedTime || closestTime}</Text>
                <MaterialIcons
                  style={{ position: "absolute", right: -100 }}
                  name="keyboard-arrow-down"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{ backgroundColor: "#EAEAEA", height: 10, width: "100%" }}
        ></View>
        {/* SAN PHAM CHON KEM  */}
        <View style={{ margin: 15 }}>
          {selectedItem ? (
            <>
              <View className="flex flex-row items-center justify-between mb-4">
                <Text className="font-medium text-lg py-2">
                  Sản phẩm chọn kèm
                </Text>
                <TouchableOpacity className="border border-orange-600 p-1 rounded w-24 h-8">
                  <Text className="text-center text-rose-500">Thay đổi</Text>
                </TouchableOpacity>
              </View>

              <View className="flex flex-row items-center">
                <View className="w-[80%]">
                  <Text className="text-sm">{selectedItem.title}</Text>
                </View>
                <View className="w-[20%]">
                  <Text className="text-base font-bold">
                    {selectedItem.originalPrice}
                  </Text>
                </View>
              </View>
            </>
          ) : (
            <View className="flex flex-row items-center justify-between mb-4">
              <TouchableOpacity
                className="border border-orange-600 p-6 rounded w-full h-8 flex-row justify-between items-center"
                onPress={() => {
                  navigation.navigate("ListMenuRes", {
                    restaurant: restaurant,
                  });
                }}
              >
                <Text className="text-[#ED1C24] font-bold h-5 text-center">
                  Sản phẩm chọn kèm
                </Text>
                <Text className=" text-[#ED1C24] font-bold h-5 text-center ml-20">
                  Khám phá ngay
                </Text>
                <AntDesign
                  name="right"
                  size={24}
                  color="red"
                  width={20}
                  height={20}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View
          style={{ backgroundColor: "#EAEAEA", height: 10, width: "100%" }}
        ></View>
        {/* THONG TIN KHACH HANG  */}
        <View style={{ margin: 15 }}>
          <Text className="font-medium text-lg py-2">Thông tin khách hàng</Text>
          <View className="flex-row p-5  items-center">
            <View className="flex-row items-center w-2/4 justify-start">
              <FontAwesome5 name="user-circle" size={24} color="black" />
              <Text className="ml-4">Tên liên lạc</Text>
            </View>
            <Text className="w-2/4">{user?.name}</Text>
          </View>
          <View className="flex-row p-5  items-center">
            <View className="flex-row items-center w-2/4 justify-start">
              <Feather name="phone" size={24} color="black" />
              <Text className="ml-4">Số điện thoại</Text>
            </View>
            <Text className="w-2/4">{user?.mobileNo}</Text>
          </View>
          <View className="flex-row p-5  items-center">
            <View className="flex-row items-center w-2/4 justify-start">
              <FontAwesome name="envelope" size={24} color="black" />
              <Text className="ml-4">Email</Text>
            </View>
            <Text className="w-2/4">{user?.email}</Text>
          </View>
        </View>
        <View
          style={{ backgroundColor: "#EAEAEA", height: 10, width: "100%" }}
        ></View>
        {/* GHI CHU  */}
        <View style={{ margin: 15, height: 80 }}>
          <View className="flex-row p-5  items-center">
            <View className="flex-row w-2/5 h-14 justify-around items-center ">
              <Foundation name="clipboard-notes" size={24} color="black" />
              <Text className="mr-14">Ghi chú</Text>
            </View>
            <View className="w-3/5 h-14">
              <TextInput
                placeholder="nhập ghi chú"
                className="ml-2 p-2 flex-1 rounded-xl border border-slate-200"
                keyboardType="default"
                onChangeText={(text) => setOrderNote(text)}
              />
            </View>
          </View>
        </View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <Portal>
      <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog}>
        <Dialog.Title style={styles.dialogTitle}>Alert</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.dialogContent}>{errorMessage}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog} mode="contained" style={styles.dialogButton}>
            Done
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
      </ScrollView>
      <View style={styles.popupContainer}>
        <TouchableOpacity style={styles.applyButton} onPress={submitOrder}>
          <Text style={styles.applyButtonText}>Order</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    backgroundColor: "white",
    borderTopColor: "#ccc",
    borderTopWidth: 1,
    width: "100%",
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  dialog: {
    backgroundColor: '#fff3cd',
    borderWidth: 1,
    borderColor: '#ffeeba',
    borderRadius: 8,
  },
  dialogTitle: {
    color: '#856404',
    fontWeight: 'bold',
  },
  dialogContent: {
    color: '#856404',
  },
  dialogButton: {
    backgroundColor: '#856404',
  },
});
