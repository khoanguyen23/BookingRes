import {
    View,
    TextInput,
    TouchableOpacity,
} from "react-native";
import React from "react";
import HomeScreen from "../screens/Home";
import Map from "../screens/Map";
import Map2d from "../screens/Map2d";
import MapDemo from "../screens/MapDemo";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import SearchScreen from "../screens/SearchScreen";
import * as Icon from "react-native-feather";
import AccountScreen from "../screens/Account";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MapCenter from "../screens/MapCenter";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: "Home",
                    tabBarLabelStyle: { color: "#008E97" },
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Entypo name="home" size={24} color="#008E97" />
                        ) : (
                            <AntDesign name="home" size={24} color="black" />
                        ),
                }}
            />
             <Tab.Screen
                name="Map2d"
                component={Map2d}
                options={{
                    tabBarLabel: "Map2d",
                    tabBarLabelStyle: { color: "#008E97" },
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Entypo name="home" size={24} color="#008E97" />
                        ) : (
                            <AntDesign name="home" size={24} color="black" />
                        ),
                }}
            />
             <Tab.Screen
                name="MapDemo"
                component={MapDemo}
                options={{
                    tabBarLabel: "MapDemo",
                    tabBarLabelStyle: { color: "#008E97" },
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Entypo name="home" size={24} color="#008E97" />
                        ) : (
                            <AntDesign name="home" size={24} color="black" />
                        ),
                }}
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
                            <Entypo name="home" size={24} color="#008E97" />
                        ) : (
                            <AntDesign name="home" size={24} color="black" />
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
                            <FontAwesome name="search" size={24} color="#008E97" />
                        ) : (
                            <FontAwesome name="search" size={24} color="black" />
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
                                    // flex: 1,
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
                                    // className="text-red-500"
                                    keyboardType="default"
                                />
                            </View>
                        </View>
                    ),
                })}
            />
            <Tab.Screen
                name="Map"
                component={Map}
                options={{
                    tabBarLabel: "Map",
                    tabBarLabelStyle: { color: "#008E97" },
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Entypo name="map" size={24} color="#008E97" />
                        ) : (
                            <Entypo name="map" size={24} color="black" />
                        ),
                }}
            />
            <Tab.Screen
                name="Account"
                component={AccountScreen}
                options={{
                    title: "Tài khoản",
                    headerStyle: { backgroundColor: "red" },
                    headerTintColor: "#fff",
                    headerTitleAlign: "center",

                    tabBarLabel: "Tài khoản",
                    tabBarLabelStyle: { color: "#008E97" },
                    headerShown: true,
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <MaterialCommunityIcons name="account" size={24} color="#008E97" />
                        ) : (
                            <MaterialCommunityIcons name="account" size={24} color="black" />
                        ),
                }}
            />
        </Tab.Navigator>
    );
}

export default BottomTabNavigator;
