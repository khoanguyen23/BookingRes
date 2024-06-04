import { View, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { Avatar } from "@rneui/themed";
import { Button } from "@rneui/themed";
import axios from "axios";
import { API_URL } from "@env";

const Customers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  // console.log(API_URL);

  useEffect(() => {
    // Fetch all users when the component mounts
    fetchUsers();
  }, []);

  // console.log(users);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin`);

      if (!response.data) {
        throw new Error("Failed to fetch users");
      }

      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      Alert.alert("Error", "Failed to fetch users");
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.delete(`${API_URL}/admin/${userId}`);

      if (response.status === 200) {
        // Update the user list after successful deletion
        fetchUsers();
        Alert.alert("Success", "User deleted successfully");
      } else {
        Alert.alert("Error", "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      Alert.alert("Error", "Failed to delete user");
    }
  };

  const AVATAR_DEFAULT =
    "https://scontent.fsgn2-11.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=2b6aad&_nc_ohc=FaPLa6I4CdUAX_MgB9o&_nc_ht=scontent.fsgn2-11.fna&oh=00_AfAr1sfq0gLcMllCAwN9pe8MpGIn1g5bXcJBi0YhiZMz-g&oe=65BB4078";

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={{ padding: 10 }}>
        {users.map((user) => (
          <View
            key={user._id}
            className="flex-row justify-between items-center mt-5"
          >
            <View className="flex-row items-center">
              <Avatar
                size={60}
                rounded
                source={{ uri: user.avatar || AVATAR_DEFAULT }}
              />
              <View className="ml-3">
                <Text>{user.name}</Text>
                <Text className="text-[#ABABAB] mt-2 font-bold">
                  {user.mobileNo}
                </Text>
              </View>
            </View>
            <View className="flex-row">
              <Button
                buttonStyle={{
                  marginRight: 15,
                }}
                radius={"md"}
                size="lg"
                color="#20C0ED"
              >
                Edit
              </Button>
              {/* <Button size="lg" color="#DB4C3F" radius={"md"}>
                Delete
              </Button> */}
              <Text onPress={handleDeleteUser} style={{padding :10, backgroundColor :"#DB4C3F", borderRadius: 10}}>
                Delete
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Customers;
