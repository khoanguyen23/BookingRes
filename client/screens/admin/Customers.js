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
  const [selectedUserId, setSelectedUserId] = useState(null);

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

  const handleDeleteUser = (userId) => {
    setSelectedUserId(userId);
    setIsVisible(true);
  };

  const confirmDeleteUser = async () => {
    try {
      const response = await axios.delete(`${API_URL}/admin/${selectedUserId}`);
      if (response.status === 200) {
        fetchUsers();
        Alert.alert("Success", "User deleted successfully");
      } else {
        Alert.alert("Error", "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      Alert.alert("Error", "Failed to delete user");
    } finally {
      setIsVisible(false);
      setSelectedUserId(null);
    }
  };

  const cancelDeleteUser = () => {
    setIsVisible(false);
    setSelectedUserId(null);
  };

  const AVATAR_DEFAULT =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png";
  console.log(users);
  return (
    <ScrollView style={styles.container}>
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
        onBackdropPress={cancelDeleteUser}
        overlayStyle={styles.overlay}
      >
        <Text style={styles.overlayTitle}>Confirm Delete</Text>
        <Text className="text-base text-center">
          Are you sure you want to delete this user?
        </Text>
        <View className="flex flex-row mt-7 justify-center">
          <Button
            buttonStyle={styles.cancelButton}
            onPress={cancelDeleteUser}
            radius={"lg"}
            size="lg"
            color="#999"
          >
            Cancel
          </Button>
          <Button
            buttonStyle={styles.confirmButton}
            onPress={confirmDeleteUser}
            radius={"lg"}
            size="lg"
            color="#DB4C3F"
          >
            OK
          </Button>
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
    width: 150,
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
    borderRadius: 15,
    padding: 20,
    width: 300,
  },
  overlayTitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  overlayActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  cancelButton: {
    width: 100,
    marginRight: 10,
    backgroundColor: "#999",
  },
  confirmButton: {
    width: 100,
    backgroundColor: "#DB4C3F",
  },
});

export default Customers;
