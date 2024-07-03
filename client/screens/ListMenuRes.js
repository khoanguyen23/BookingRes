import React from "react";
import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import Menu from "../components/Menu";
import MenuLayout2 from "../components/MenuLayout2";

const ListMenuRes = () => {
  const { params } = useRoute();
  const { restaurant } = params;

  return (
    <View>
       <MenuLayout2 restaurant={restaurant} />
    </View>
  );
};

export default ListMenuRes;
