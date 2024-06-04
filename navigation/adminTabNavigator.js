import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, TextInput, TouchableOpacity, Text, Alert } from "react-native";
import React from "react";
import HomeScreen from "../screens/Home";
import Statistical from "../screens/admin/Statistical";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import SearchScreen from "../screens/SearchScreen";
import * as Icon from "react-native-feather";

import AccountScreen from "../screens/Account";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeAdmin from "../screens/admin/HomeAdmin";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import Customers from "../screens/admin/Customers";
import { useNavigation } from "@react-navigation/native";
import Orders from "../screens/admin/Orders";
import DetailOrders from "../screens/admin/DetailOrders";
import ResAdmin from "../screens/admin/ResAdmin";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      navigation.replace("Login");
    } catch (error) {
      console.error("Error logging out:", error);
      Alert.alert("Logout Error", "An error occurred while logging out.");
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {/* Your app's logo or header */}
      </View>
      <DrawerItemList {...props} />
      <TouchableOpacity onPress={handleLogout} style={{ padding: 10, borderTopWidth: 1, borderTopColor: "#ccc" }}>
        <View style={{ flexDirection: "row", alignItems: "center", marginLeft:10 , marginTop : 10}}>
          <AntDesign name="logout" size={24} color="black" />
          <Text style={{ marginLeft: 10 }}>Logout</Text>
        </View>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};


const AdminTabNavigator = () => {
  const navigation = useNavigation();

  return (

      <Drawer.Navigator screenOptions={{ headerShown: true }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="Dashboard"
          component={HomeAdmin}
          options={{
            headerTitleAlign: "center",
            drawerIcon: ({ color, size }) => (
              <AntDesign name="home" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Customers"
          component={Customers}
          options={{
            headerTitleAlign: "center",
            drawerIcon: ({ color, size }) => (
              <AntDesign name="home" size={size} color={color} />
            ),
            headerLeft: ({ onPress, tintColor }) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Dashboard");
                }}
              >
                <View
                  style={{
                    marginLeft: 5,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="chevron-back" size={35} color="#037AFF" />
                  <Text
                    style={{
                      color: "#58A7FF",
                      fontSize: 17,
                      fontWeight: "bold",
                    }}
                  >
                    Home
                  </Text>
                </View>
              </TouchableOpacity>
            ),
            // Thêm dòng này nếu bạn muốn hiển thị tiêu đề "Home"
          }}
        />
        <Drawer.Screen
          name="RestaurantAdmin"
          component={ResAdmin}
          options={{
            headerTitleAlign: "center",
            drawerIcon: ({ color, size }) => (
              <AntDesign name="home" size={size} color={color} />
            ),
            headerLeft: ({ onPress, tintColor }) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Dashboard");
                }}
              >
                <View
                  style={{
                    marginLeft: 5,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="chevron-back" size={35} color="#037AFF" />
                  <Text
                    style={{
                      color: "#58A7FF",
                      fontSize: 17,
                      fontWeight: "bold",
                    }}
                  >
                    Home
                  </Text>
                </View>
              </TouchableOpacity>
            ),
            // Thêm dòng này nếu bạn muốn hiển thị tiêu đề "Home"
          }}
        />
        <Drawer.Screen
          name="Orders"
          component={Orders}
          options={{
            headerTitleAlign: "center",
            drawerIcon: ({ color, size }) => (
              <AntDesign name="home" size={size} color={color} />
            ),
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: "#1C212D" },
            headerLeft: ({ onPress, tintColor }) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Dashboard");
                }}
              >
                <View
                  style={{
                    marginLeft: 5,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="chevron-back" size={35} color="#34DBA1" />
                  {/* #037AFF */}
                  <Text
                    style={{
                      color: "#ffffff",
                      fontSize: 17,
                      fontWeight: "bold",
                    }}
                  >
                    {/* #58A7FF */}
                    Home
                  </Text>
                </View>
              </TouchableOpacity>
            ),
            // Thêm dòng này nếu bạn muốn hiển thị tiêu đề "Home"
          }}
        />
        <Drawer.Screen
          name="DetailOrders"
          component={DetailOrders}
          options={{
            headerTitleAlign: "center",
            drawerIcon: ({ color, size }) => (
              <AntDesign name="home" size={size} color={color} />
            ),
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: "#1C212D" },
            headerLeft: ({ onPress, tintColor }) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Orders");
                }}
              >
                <View
                  style={{
                    marginLeft: 5,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="chevron-back" size={35} color="#34DBA1" />
                  {/* #037AFF */}
                </View>
              </TouchableOpacity>
            ),
            // Thêm dòng này nếu bạn muốn hiển thị tiêu đề "Home"
          }}
        />
      </Drawer.Navigator>

  );
};

export default AdminTabNavigator;
