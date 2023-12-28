import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useContext, useState } from "react";
import { View, Text, Pressable, StyleSheet, Alert, TouchableOpacity, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { UserType } from "../UserContext";
import jwt_decode from "jwt-decode";
import { COLORS, SIZES } from "../constants/theme";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import NetworkImage from "../components/NetworkImage";
import ProfileTile from "../components/ProfileTile";
import { API_URL } from "@env";

const AccountScreen = () => {
  // const [user, setUser] = useState(null);
  const navigation = useNavigation();
  // const { userId, setUserId } = useContext(UserType);
  const { userId, setUserId, user, updateUser } = useContext(UserType);
  const [address, setAddress] = useState([]);


  const handleAvatarPress = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert("Permission Denied", "Please allow access to the media library.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (result.assets.length > 0) {
        const selectedImage = result.assets[0];
        const imageUri = selectedImage.uri;

        // Lưu đường dẫn ảnh vào state và gọi hàm fetchAddressData
        setAddress({ ...address, avatar: imageUri });
        await updateAddressData({ ...address, avatar: imageUri });
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const updateAddressData = async (updatedData) => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;

      // Gọi API để cập nhật dữ liệu địa chỉ với đường dẫn ảnh mới
      await axios.put(`${API_URL}/address/${userId}`, updatedData);

      // Gọi lại fetchAddressData để cập nhật state với dữ liệu mới
      await fetchAddressData(userId);
    } catch (error) {
      console.log("Error updating address data", error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      navigation.replace("Login");
    } catch (error) {
      console.error("Error logging out:", error);
      Alert.alert("Logout Error", "An error occurred while logging out.");
    }
  };

  const fetchAddress = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
      await fetchAddressData(userId);
    } catch (error) {
      console.log("Error fetching address", error);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  const fetchAddressData = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/address/${userId}`);
      // const response = await axios.get("http://192.168.1.2:8000/address/${userId}");
      const addressData = response.data;
      // setAddress(addressData);
      updateUser(addressData);

      // console.log(response.data, "done");
      console.log(addressData, "user fetch")
    } catch (error) {
      console.log(`${API_URL} /address/${userId}`);
      console.log("Error fetching address data", error);
    }
  };

  return (
    <View>
      <ScrollView>
        <View style={{ backgroundColor: COLORS.offwhite, height: SIZES.height }}>
          <View
            style={{
              backgroundColor: COLORS.offwhite,
              height: SIZES.height - 170,
            }}
          >
            <View style={styles.profile}>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity onPress={handleAvatarPress}>
                  {user?.avatar ? (
                    <NetworkImage
                      source={user?.avatar}
                      width={100}
                      height={100}
                      radius={99}
                    />
                  ) : (
                    <Image
                      source={require("../assets/img/default-profile.png")}
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: 99,
                      }}
                    />
                  )}
                </TouchableOpacity>
                <View style={{ marginLeft: 10, marginTop: 30 }}>
                  <Text style={styles.text}>
                    {user?.name}
                  </Text>
                  <Text style={styles.email}>
                    {user?.email}
                  </Text>
                </View>
              </View>

              <TouchableOpacity>
                <MaterialIcons
                  onPress={() => navigation.navigate("EditAccount")}
                  name="arrow-forward-ios"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                height: 210,
                backgroundColor: COLORS.lightWhite,
                // margin: 10,
                borderRadius: 12,
              }}
            >
              <ProfileTile title={"Id khách hàng"} icon={"user"} font={3} />
              <ProfileTile title={"Tình trạng"} icon={"bar-chart"} font={3} />
              <ProfileTile title={"Thay đổi mật khẩu"} icon={"lock"} />
              <ProfileTile
                title={"Lịch sử giao dịch"}
                icon={"sticker-text-outline"}
                font={4}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 20,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TouchableOpacity>
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", color: "#6E6E6E" }}
                >
                  Trải nghiệm
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: 100,
                backgroundColor: COLORS.lightWhite,
                margin: 2,
                borderRadius: 12,
              }}
            >
              <ProfileTile title={"Yêu thích"} icon={"heart"} font={2} />
              <ProfileTile title={"Hoạt động gần đây"} icon={"clockcircleo"} />
            </View>

            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 20,

                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TouchableOpacity>
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", color: "#6E6E6E" }}
                >
                  Cài đặt
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                height: 100,
                backgroundColor: COLORS.lightWhite,
                margin: 2,
                borderRadius: 12,
              }}
            >
              <ProfileTile title={"Chat"} icon={"chatbox-outline"} font={1} />
              <ProfileTile title={"Mời bạn bè"} icon={"adduser"} />
              <ProfileTile title={"Setting"} icon={"settings-outline"} font={1} onPress={()=>{navigation.navigate("Privacy")}} />
            </View>
            <View className="items-center mt-20" >
              <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}>Đăng xuất</Text>
              </TouchableOpacity>
              <Text style={{ color: "#6C6C6C", marginTop: 20 }}>Copyright 2023 by NHK & NTH</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: "#FEF2F2", // Use your desired color
    padding: 15,
    borderRadius: 8,
    width: "60%",
  },
  logoutButtonText: {
    color: "#D02B39",
    textAlign: "center",
    fontWeight: "bold",
  },
  text: {
    fontSize: 17,
    marginLeft: 10,
    fontFamily: "bold",
    color: COLORS.black,
  },
  email: {
    marginLeft: 10,
    fontFamily: "regular",
    color: COLORS.gray,
  },
  profile: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    // marginTop: 60,
    margin: 20,
  },
});

export default AccountScreen;
