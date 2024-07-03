import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { UserType } from "../UserContext";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "@env";
import ProfileTile from "../components/ProfileTile";
import NetworkImage from "../components/NetworkImage";
import { Ionicons } from "@expo/vector-icons";

const AddressScreen = () => {
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [mobileNo, setMobileNo] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [occupation, setOccupation] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const { user } = useContext(UserType);
  const pickerItems = [
    { label: "Nam", value: "Nam" },
    { label: "Nữ", value: "Nữ" },
    { label: "Khác", value: "Khác" },
  ];
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    setDateOfBirth(date.toISOString().split("T")[0]);
    hideDatePicker();
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };
    fetchUser();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${API_URL}/address/${userId}`);
      const userData = response.data; 
      setName(userData.name);
      setAvatar(userData.avatar);
      setMobileNo(userData.mobileNo);
      setStreet(userData.street);
      setCity(userData.city);
      setOccupation(userData.occupation);
      setGender(userData.gender);
      setDateOfBirth(userData.dateOfBirth);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const handleUpdateAddress = () => {
    const updatedAddress = {
      name,
      avatar,
      mobileNo,
      street,
      city,
      occupation,
      gender,
      dateOfBirth,
    };
    axios
      .put(`${API_URL}/address/${userId}`, updatedAddress)
      // .put("http://192.168.1.2:8000/address/${userId}", updatedAddress)
      .then((response) => {
        Alert.alert("Success", "Address updated successfully");
        fetchUserData();
        setTimeout(() => {
          navigation.goBack();
        }, 500);
      })
      .catch((error) => {
        Alert.alert("Error", "Failed to update address");
        console.log("error", error);
      });
  };
  const formatDate = (dateString) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };

    return new Date(dateString).toLocaleDateString("vi-VN", options);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <TouchableOpacity>
          {user?.avatar ? (
            <>
              <NetworkImage
                source={user?.avatar}
                width={70}
                height={70}
                radius={99}
              />
              <View
                style={{
                  position: "absolute",
                  backgroundColor: "#ccc",
                  borderRadius: 50,
                  bottom: -3,
                  right: 0,
                }}
              >
                <Ionicons name="camera-outline" size={20} color="black" />
              </View>
            </>
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
      </View>
      <View className="mt-2">
        <ProfileTile
          title={"Tên người dùng"}
          temp={user.name}
          icon={"edit-3"}
          font={3}
        />
        <ProfileTile title={"Tình trạng"} icon={"bar-chart"} font={3} />
      </View>
      <View
        style={{ backgroundColor: "#EAEAEA", height: 10, width: "100%" }}
      ></View>
      <View>
        <View className="mt-3"></View>
        <ProfileTile
          title={"Số điện thoại"}
          temp={user?.mobileNo}
          icon={"phone"}
          font={3}
        />
        <View className="mt-3"></View>

        <ProfileTile
          title={"Nghề nghiệp"}
          temp={user?.occupation}
          icon={"shopping-bag"}
          font={3}
        />
        <View className="mt-3"></View>

        <ProfileTile
          title={"Email"}
          temp={user?.email}
          icon={"email-edit-outline"}
          font={4}
        />
        <View className="mt-3"></View>

        <ProfileTile
          title={"Giới tính"}
          temp={user?.gender}
          icon={"gender-male-female"}
          font={4}
        />
        <View className="mt-3"></View>

        <ProfileTile
          title={"Ngày sinh"}
          temp={formatDate(user.dateOfBirth)}
          icon={"cake-variant-outline"}
          font={4}
        />
        <View className="mt-3"></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  profile: {
    alignItems: "center",
  },
});

export default AddressScreen;
