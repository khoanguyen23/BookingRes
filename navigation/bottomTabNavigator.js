import { View, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import HomeScreen from "../screens/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import SearchScreen from "../screens/SearchScreen";
import * as Icon from "react-native-feather";
import AccountScreen from "../screens/Account";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MapCenter from "../screens/MapCenter";
import ResultScreen from "../screens/ResultScreen";
import RestaurantDetail from "../screens/RestaurantDetail";
import ChatScreen from "../screens/ChatScreen";

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Result"
      component={ResultScreen}
      options={{
        title: "",
        headerStyle: { backgroundColor: "red" },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    />
    <Stack.Screen
      name="Restaurant"
      component={RestaurantDetail}
      options={{
        headerShown: true,
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTransparent: true,
      }}
    />
  </Stack.Navigator>
);

const AccountStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Account"
      component={AccountScreen}
      options={{
        title: "Tài khoản",
        headerStyle: { backgroundColor: "red" },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
        tabBarLabelStyle: { color: "#008E97" },
        headerShown: true,
        tabBarIcon: ({ focused }) =>
          focused ? (
            <MaterialCommunityIcons name="account" size={24} color="#D71537" />
          ) : (
            <MaterialCommunityIcons name="account" size={24} color="#7E7E80" />
          ),
      }}
    />
    <Stack.Screen
      name="Chat"
      component={ChatScreen}
      options={{
        headerShown: true,
        title: "Trò chuyện",
        headerStyle: { backgroundColor: "red" },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    />
  </Stack.Navigator>
);

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: { color: "#008E97" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={24} color="#D71537" />
            ) : (
              <AntDesign name="home" size={24} color="#7E7E80" />
            ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={({ navigation }) => ({
          headerStyle: { backgroundColor: "red" },
          tabBarLabelStyle: { color: "#008E97" },
          title: "Tìm kiếm",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome name="search" size={24} color="#D71537" />
            ) : (
              <FontAwesome name="search" size={24} color="#7E7E80" />
            ),
          headerTitleAlign: "center",
          headerTitle: () => (
            <View style={{}}>
              <View
                style={{
                  borderRadius: 100,
                  color: "#008E97",
                  alignItems: "center",
                  justifyContent: "space-around",
                  padding: 10,
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name="arrow-back" size={30} color="white" />
                </TouchableOpacity>
                <Icon.Search
                  style={{
                    position: "absolute",
                    left: 60,
                    zIndex: 2,
                  }}
                  height="20"
                  width="20"
                  stroke="gray"
                />
                <TextInput
                  placeholder="Tìm kiếm"
                  style={{
                    zIndex: 1,
                    position: "relative",
                    borderRadius: 100,
                    backgroundColor: "white",
                    width: 320,
                    height: 35,
                    paddingLeft: 40,
                    marginLeft: 30,
                  }}
                  keyboardType="default"
                />
              </View>
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="MapCenter"
        component={MapCenter}
        options={{
          tabBarLabel: "MapCenter",
          tabBarLabelStyle: { color: "#008E97" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="map" size={24} color="#D71537" />
            ) : (
              <Entypo name="map" size={24} color="#7E7E80" />
            ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountStack}
        options={{
          title: "Tài khoản",
          headerStyle: { backgroundColor: "red" },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          tabBarLabelStyle: { color: "#008E97" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialCommunityIcons
                name="account"
                size={24}
                color="#D71537"
              />
            ) : (
              <MaterialCommunityIcons
                name="account"
                size={24}
                color="#7E7E80"
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
