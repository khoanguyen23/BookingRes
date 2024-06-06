import React, { useContext, useState } from "react";
import { View, TextInput, TouchableOpacity, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { API_URL } from "@env";
import { UserType } from "../UserContext";
import PopUp from "../components/PopUp";

const ChangePassword = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [obscureTextOld, setObscureTextOld] = useState(true);
  const [obscureTextNew, setObscureTextNew] = useState(true);
  const [obscureTextConfirm, setObscureTextConfirm] = useState(true);
  const { user } = useContext(UserType);

  const handleToggleObscureText = (field) => {
    switch (field) {
      case "oldPassword":
        setObscureTextOld(!obscureTextOld);
        break;
      case "newPassword":
        setObscureTextNew(!obscureTextNew);
        break;
      case "confirmPassword":
        setObscureTextConfirm(!obscureTextConfirm);
        break;
      default:
        break;
    }
  };

  const handleChangePassword = async () => {
    try {
      if (newPassword !== confirmPassword) {
        Alert.alert("Error", "New Password and Confirm Password do not match");
        return;
      }
      const response = await fetch(`${API_URL}/change-password/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
          confirmPassword,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      Alert.alert("Success", "Password changed successfully");
      navigation.goBack();
    } catch (error) {
      console.error("API Error:", error.message);
      Alert.alert("Error", "Failed to change password. Please try again.");
    }
  };

  return (
    <View
      style={{
        backgroundColor: "#ffffff",
        padding: 10,
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      <View>
        {/* Input Old Password */}
        <View
          style={{
            borderWidth: 2,
            borderColor: "#E4E4E4",
            height: 60,
            borderRadius: 5,
            flexDirection: "row",
            paddingHorizontal: 15,
            alignItems: "center",
            marginBottom: 20,
            justifyContent: "space-between",
          }}
        >
          <TextInput
            secureTextEntry={obscureTextOld}
            placeholder="Old Password"
            value={oldPassword}
            onChangeText={(text) => setOldPassword(text)}
          />
          <TouchableOpacity
            onPress={() => handleToggleObscureText("oldPassword")}
          >
            <MaterialCommunityIcons
              name={obscureTextOld ? "eye-off-outline" : "eye-outline"}
              size={18}
            />
          </TouchableOpacity>
        </View>
        {/* Input New Password */}
        <View
          style={{
            borderWidth: 2,
            borderColor: "#E4E4E4",
            height: 60,
            borderRadius: 5,
            flexDirection: "row",
            paddingHorizontal: 15,
            alignItems: "center",
            marginBottom: 20,
            justifyContent: "space-between",
          }}
        >
          <TextInput
            secureTextEntry={obscureTextNew}
            placeholder="New Password"
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
          />
          <TouchableOpacity
            onPress={() => handleToggleObscureText("newPassword")}
          >
            <MaterialCommunityIcons
              name={obscureTextNew ? "eye-off-outline" : "eye-outline"}
              size={18}
            />
          </TouchableOpacity>
        </View>
        {/* Input Confirm Password */}
        <View
          style={{
            borderWidth: 2,
            borderColor: "#E4E4E4",
            height: 60,
            borderRadius: 5,
            flexDirection: "row",
            paddingHorizontal: 15,
            alignItems: "center",
            marginBottom: 20,
            justifyContent: "space-between",
          }}
        >
          <TextInput
            secureTextEntry={obscureTextConfirm}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <TouchableOpacity
            onPress={() => handleToggleObscureText("confirmPassword")}
          >
            <MaterialCommunityIcons
              name={obscureTextConfirm ? "eye-off-outline" : "eye-outline"}
              size={18}
            />
          </TouchableOpacity>
        </View>
      </View>
      <PopUp buttonText="Cập nhật" onPress={handleChangePassword} />
    </View>
  );
};

export default ChangePassword;
