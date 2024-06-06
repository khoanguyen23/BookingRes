import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeAdmin = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, padding: 10 }}>
      
      <View className="flex-row justify-between">
      <TouchableOpacity onPress={()=> {navigation.navigate('Restaurants')}}>
        <View
          style={{
            width: 120,
            height: 180,
            backgroundColor: "#ffffff",
            alignItems: "center",
            justifyContent: "center",
            borderColor: "#DDDDDD",
            borderWidth: 1,
            borderRadius: 5,
          }}
        >
          <View
            style={{
              borderColor: "#6FB168",
              borderWidth: 2,
              width: 60,
              height: 60,
              borderRadius: 100,
              backgroundColor: "#E4F0E3",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              width={25}
              height={25}
              source={{
                uri: "https://res.cloudinary.com/dc5xcbmvp/image/upload/v1704173088/icons8-restaurant-100_i1evvu.png",
              }}
            />
          </View>
          <Text className="mt-2 font-semibold">Restaurants</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> {navigation.navigate('Customers')}}>
          <View
            style={{
              width: 120,
              height: 180,
              backgroundColor: "#ffffff",
              alignItems: "center",
              justifyContent: "center",
              borderColor: "#DDDDDD",
              borderWidth: 1,
              borderRadius: 5,
            }}
          >
            <View
              style={{
                borderColor: "#FF8D09",
                borderWidth: 2,
                width: 60,
                height: 60,
                borderRadius: 100,
                backgroundColor: "#FFE9CF",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                width={25}
                height={25}
                source={{
                  uri: "https://res.cloudinary.com/dc5xcbmvp/image/upload/v1704173087/icons8-country-house-100_vjk4fr.png",
                }}
              />
            </View>
            <Text className="mt-2 font-semibold">Customers</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> {navigation.navigate('Orders')}}
          style={{
            width: 120,
            height: 180,
            backgroundColor: "#ffffff",
            alignItems: "center",
            justifyContent: "center",
            borderColor: "#DDDDDD",
            borderWidth: 1,
            borderRadius: 5,
          }}
        >
          <View
            style={{
              borderColor: "#E091D7",
              borderWidth: 2,
              width: 60,
              height: 60,
              borderRadius: 100,
              backgroundColor: "#F9EAF7",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              width={25}
              height={25}
              source={{
                uri: "https://res.cloudinary.com/dc5xcbmvp/image/upload/v1704173088/icons8-purchase-order-100_pligj9.png",
              }}
            />
          </View>
          <Text className="mt-2 font-semibold">Orders</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeAdmin;
