import React, { useContext, useState } from "react";
import { View, TouchableOpacity, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { API_URL } from "@env";
import { UserType } from "../UserContext";
import PopUp from "../components/PopUp";
import { TextInput } from "react-native-paper";

const ChangePassword = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { user } = useContext(UserType);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
  console.log(user,"changePassword")


  return (
    <View className="flex bg-white p-4 justify-between h-full mb-20">
      <View>
        {/* Input Old Password */}
        <View className="mb-5">
          <TextInput
            value={oldPassword}
            onChangeText={(text) => setOldPassword(text)}
            mode="outlined"
            label="Type old password"
            secureTextEntry={!showOldPassword}
            right={
              <TextInput.Icon
                icon={showOldPassword ? "eye-off" : "eye"}
                onPress={() => setShowOldPassword(!showOldPassword)}
              />
            }
            outlineColor="#D9D9D9"
            activeOutlineColor="#D73724"
            style={{ height: 60 }}
          />
        </View>
        {/* Input New Password */}
        <View className="mb-5">
          <TextInput
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
            mode="outlined"
            label="Type new password"
            secureTextEntry={!showNewPassword}
            right={
              <TextInput.Icon
                icon={showNewPassword ? "eye-off" : "eye"}
                onPress={() => setShowNewPassword(!showNewPassword)}
              />
            }
            outlineColor="#D9D9D9"
            activeOutlineColor="#D73724"
            style={{ height: 60 }}
          />
        </View>
        {/* Input Confirm Password */}
        <View className="mb-5">
          <TextInput
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            mode="outlined"
            label="Type new password again"
            secureTextEntry={!showConfirmPassword}
            right={
              <TextInput.Icon
                icon={showConfirmPassword ? "eye-off" : "eye"}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            }
            outlineColor="#D9D9D9"
            activeOutlineColor="#D73724"
            style={{ height: 60 }}
          />
        </View>
      </View>
      <PopUp buttonText="UPDATE" onPress={handleChangePassword} />
    </View>
  );
};

export default ChangePassword;
