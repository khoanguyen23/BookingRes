import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import ResHor from "../components/ResHor";


const ResultScreen = ({navigation,route}) => {

  return (
    <View>
       <ResHor route={route}  />
    </View>
  );
};

export default ResultScreen;
