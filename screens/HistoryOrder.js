import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { UserType } from "../UserContext";
import { API_URL } from "@env";
import { Image } from "react-native";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { Feather } from "@expo/vector-icons";
import Status from "../components/Status";
import PopUp from "../components/PopUp";

const HistoryOrder = () => {
  const [orders, setOrders] = useState([]);
  const [restaurants, setRestaurants] = useState({});
  const { user } = useContext(UserType);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const userId = user._id;
  const [selectedContentType, setSelectedContentType] = useState("status");
  const [selectedStatus, setSelectedStatus] = useState("Tất cả");
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["25%", "55%"], []);
  const status = [
    "Tất cả",
    "Chờ xác nhận",
    " Đã tiếp nhận",
    "Hoàn thành",
    "Đã hủy",
  ];
  const services = ["Tất cả", "Đặt chỗ", "Giao hàng", "Tự đến lấy"];
  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await fetch(`${API_URL}/api/orders/${userId}`);
        const data = await response.json();
        if (response.ok) {
          setOrders(data.orders);
          setFilteredOrders(data.orders);
          const restaurantIds = Array.from(
            new Set(data.orders.map((order) => order.restaurant))
          );
          const restaurantPromises = restaurantIds.map(async (restaurantId) => {
            const restaurantResponse = await fetch(
              `${API_URL}/restaurants/${restaurantId}`
            );
            const restaurantData = await restaurantResponse.json();
            if (restaurantResponse.ok) {
              setRestaurants((prevRestaurants) => ({
                ...prevRestaurants,
                [restaurantId]: restaurantData.restaurant,
              }));
            } else {
              console.error(
                "khong lay duoc id nha hang",
                restaurantData.message
              );
            }
          });

          await Promise.all(restaurantPromises);
        } else {
          console.error("khong lay duoc order cua user", data.message);
        }
      } catch (error) {
        console.error("loi fetch data:", error.message);
      }
    };

    fetchUserOrders();
  }, [userId]);

  const formatDate = (dateString) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };

    return new Date(dateString).toLocaleDateString("vi-VN", options);
  };

  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleSnapPress = useCallback((index) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);

  const filterOrdersByStatus = (status) => {
    if (status === "Tất cả") {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter((order) => order.status === status);
      setFilteredOrders(filtered);
    }
  };

  const handleStatusPress = (status) => {
    setSelectedStatus(status);
  };

  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
    if (selectedContentType === "status") {
      filterOrdersByStatus(selectedStatus);
    }
  }, [selectedStatus, selectedContentType]);

  return (
    <View style={styles.container}>
      <Status
        onPress={() => handleSnapPress(1)}
        onPress1={() => handleSnapPress(1)}
        setSelectedContentType={setSelectedContentType}
        selectedStatus={selectedStatus}
      />

      <ScrollView className="mt-2">
        {filteredOrders.map((order) => (
          <View
            key={order._id}
            style={{
              backgroundColor: "#FFFFFF",
              padding: 10,
              borderWidth: 1,
              borderColor: "#DEDEDE",
              borderRadius: 5,
              marginTop: 5,
            }}
          >
            <View
              className="flex-row"
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
                paddingBottom: 10,
              }}
            >
              <View className="mr-3">
                {restaurants[order.restaurant] && (
                  <Image
                    source={{
                      uri: restaurants[order.restaurant].image,
                    }}
                    style={{
                      width: 85,
                      height: 85,
                      borderRadius: 5,
                      objectFit: "cover",
                    }}
                  />
                )}
              </View>
              <View className="flex-column">
                <View className="flex-row justify-between w-3/4">
                  <Text style={{ color: "#A1A1A1" }}>
                    ID : {order._id.substring(0, 11)}
                  </Text>
                  <Text style={{ color: "#A1A1A1" }}>
                    {formatDate(order.date)}
                  </Text>
                </View>
                <Text
                  style={{
                    color: "#262626",
                    fontSize: 17,
                    fontWeight: "bold",
                    marginBottom: 7,
                    marginTop: 7,
                  }}
                >
                  {restaurants[order.restaurant]?.name || "khong co nha hang"}
                </Text>
                <Text style={{ color: "#4A4A4A" }}>
                  Thời gian đến : {formatDate(order.date)} {order.selectedHour}
                </Text>
              </View>
            </View>
            <View className="flex-row justify-between mt-2">
              <Text className="text-base">{order.status}</Text>
              <Text
                style={{
                  backgroundColor: "red",
                  color: "white",
                  padding: 5,
                  width: 70,
                  borderRadius: 3,
                  textAlign: "center",
                }}
              >
                Đặt lại
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <BottomSheet
        index={-1}
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={(props) => (
          <BottomSheetBackdrop {...props} opacity={0.5} />
        )}
      >
        <View className="flex-row">
          <View className="w-2/3 flex-row items-center justify-between">
            <View className="p-4">
              <Feather name="x" size={24} color="black" />
            </View>
            <Text className="text-lg">Chọn trạng thái</Text>
          </View>
          <View className="w-2/4"></View>
        </View>
        <BottomSheetScrollView style={styles.contentContainer}>
          {selectedContentType === "status" &&
            status.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  padding: 16,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                  backgroundColor:
                    selectedStatus === item ? "#e0e0e0" : "white",
                }}
                onPress={() => handleStatusPress(item)}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            ))}
          {selectedContentType === "services" &&
            services.map((item, index) => (
              <View
                key={index}
                style={{
                  padding: 16,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                }}
              >
                <Text>{item}</Text>
              </View>
            ))}
        </BottomSheetScrollView>
        <PopUp buttonText="Xác nhận" onPress={handleClosePress} />
      </BottomSheet>
    </View>
  );
};

export default HistoryOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#F2F2F2",
  },
  button: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderRadius: 50,
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
});
