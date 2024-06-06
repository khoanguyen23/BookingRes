import { View, Text, ScrollView } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import PopUp from "../components/PopUp";


const FilterScreen = () => {
  return (
    <View style={styles.container}>
      <View className="fixed">
        <Text className="text-lg uppercase font-bold mt-8 p-4">Ngành hàng</Text>
        <Text style={[styles.tag, styles.customWidth, styles.customStyles]}>
          Nhà hàng
        </Text>
      </View>
      <ScrollView className="mt-2 bg-[#ffffff]">
        <View className="">
          <Text className="text-lg uppercase font-bold mt-8 p-4">
            Giá Trung bình
          </Text>
          <View className="flex flex-row flex-wrap gap-4 p-4">
            <Text style={styles.tag}>150k</Text>
            <Text style={styles.tag}>150k-250k</Text>
            <Text style={styles.tag}>250k-500k</Text>
            <Text style={[styles.tag,styles.red]}>500k-1000k</Text>
            <Text style={styles.tag}>1000k</Text>
          </View>
        </View>
        <View className="">
          <Text className="text-lg uppercase font-bold mt-8 p-4">
            Khoảng cách
          </Text>
          <View className="flex flex-row flex-wrap gap-4 p-4">
            <Text style={[styles.tag,styles.red]}>{'<'}500m</Text>
            <Text style={styles.tag}>500m-1km</Text>
            <Text style={styles.tag}>1km-5km</Text>
            <Text style={styles.tag}>{'>'}5km</Text>
          </View>
        </View>
        <View className="">
          <Text className="text-lg uppercase font-bold mt-8 p-4">
            loại hình
          </Text>
          <View className="flex flex-row flex-wrap gap-4 p-4">
            <Text style={styles.tag}>Món miền Bắc</Text>
            <Text style={[styles.tag,styles.red]}>Món miền Trung</Text>
            <Text style={styles.tag}>Món miền Nam</Text>
            <Text style={styles.tag}>Món miền Tây</Text>
            <Text style={styles.tag}>Món Nhật-Hàn</Text>
            <Text style={styles.tag}>Món Âu</Text>
            <Text style={styles.tag}>Món Thái</Text>
            <View style={[styles.tag, styles.more]}>
              <Feather name="more-horizontal" size={24} color="red" />
              <Text className="ml-2 text-[#C72A35] text-lg">Xem thêm</Text>
            </View>
          </View>
        </View>
        <View className="">
          <Text className="text-lg uppercase font-bold mt-8 p-4">
            đặt tiệc công ty 
          </Text>
          <View className="flex flex-row flex-wrap gap-4 p-4">
            <Text style={styles.tag}>Tiệc công ty dưới 20 người</Text>
            <Text style={styles.tag}>Tiệc công ty 20-35 người</Text>
            <Text style={styles.tag}>Tiệc công ty 35-50 người</Text>
            <Text style={styles.tag}>Tiệc công ty 50-100 người</Text>
            <Text style={styles.tag}>Tiệc công ty 100 người trở lên</Text>
            <Text style={styles.tag}>Tiệc công ty Quận Phú Nhuận</Text>
            <View style={[styles.tag, styles.more]}>
              <Feather name="more-horizontal" size={24} color="red" />
              <Text className="ml-2 text-[#C72A35] text-lg">Xem thêm</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View>
        <PopUp buttonText="Áp dụng"  />
      </View>
    </View>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : "#ffffff"
  },
  tag: {
    backgroundColor: "#F3F2F8",
    color: "#000005",
    borderRadius: 3,
    marginLeft: 25,
    width: "auto",
    padding: 10,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 17,
    borderColor: "#ADACB1",
    borderWidth: 1,
  },
  red: {
    backgroundColor : "red",
    color : "#FFFFFF",
  },
  customWidth: {
    width: 100,
  },
  customStyles: {
    backgroundColor: "red",
    color: "white",
  },
  more: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // marginRight: 5,
  },
});
