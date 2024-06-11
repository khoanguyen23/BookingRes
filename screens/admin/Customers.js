import {
  View,
  Text,
  ScrollView,
  TextInput,
  Alert,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Avatar, Button, Overlay } from "@rneui/themed";
import axios from "axios";
import { API_URL } from "@env";

const Customers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    mobileNo: "",
    avatar: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

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

  const handleAddUser = async () => {
    try {
      const response = await axios.post(`${API_URL}/admin`, newUser);
      if (response.status === 201) {
        setNewUser({ name: "", mobileNo: "", avatar: "" });
        setIsVisible(false);
        fetchUsers();
        Alert.alert("Success", "User added successfully");
      } else {
        Alert.alert("Error", "Failed to add user");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      Alert.alert("Error", "Failed to add user");
    }
  };

  const AVATAR_DEFAULT =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png";
  console.log(users);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Customers</Text>
        <Button title="Add User" onPress={() => setIsVisible(true)} />
      </View>
      <View style={styles.content}>
        {users.map((user) => (
          <View key={user._id} style={styles.userContainer}>
            <View style={styles.userDetails}>
              <Avatar
                size={60}
                rounded
                source={{ uri: user?.avatar || AVATAR_DEFAULT }}
              />
              <View style={styles.userInfo}>
                <View
                  className={`rounded-lg w-14 h-5 ${
                    user.admin ? "bg-[#FADCDE]" : "bg-[#CCEEDD]"
                  } `}
                >
                  <Text
                    className={`text-center ${
                      user.admin ? "text-[#E7515A]" : "text-[#00AB55]"
                    } `}
                  >
                    {user.admin ? "admin" : "user"}
                  </Text>
                </View>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userMobile}>{user.mobileNo}</Text>
              </View>
            </View>
            <View style={styles.userActions}>
              <Button
                buttonStyle={styles.editButton}
                radius={"md"}
                size="lg"
                color="#20C0ED"
              >
                Edit
              </Button>
              <Button
                buttonStyle={styles.deleteButton}
                onPress={() => handleDeleteUser(user._id)}
                radius={"md"}
                size="lg"
                color="#DB4C3F"
              >
                Delete
              </Button>
            </View>
          </View>
        ))}
      </View>
      <Overlay
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
      >
        <View style={styles.overlay}>
          <Text style={styles.overlayTitle}>Add New User</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={newUser.name}
            onChangeText={(text) => setNewUser({ ...newUser, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            value={newUser.mobileNo}
            onChangeText={(text) => setNewUser({ ...newUser, mobileNo: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Avatar URL"
            value={newUser.avatar}
            onChangeText={(text) => setNewUser({ ...newUser, avatar: text })}
          />
          <Button title="Add User" onPress={handleAddUser} />
        </View>
      </Overlay>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#20C0ED",
  },
  headerText: {
    fontSize: 24,
    color: "#fff",
  },
  content: {
    padding: 10,
  },
  userContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  userDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  userInfo: {
    marginLeft: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userMobile: {
    color: "#ABABAB",
    marginTop: 2,
  },
  userActions: {
    flexDirection: "row",
  },
  editButton: {
    marginRight: 10,
  },
  deleteButton: {},
  overlay: {
    padding: 20,
    width: 300,
  },
  overlayTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default Customers;
