import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const PopUp = ({ buttonText, onPress }) => {
  const { params } = useRoute();
  const navigation = useNavigation();
  let item = params;
  return (
    <View style={{}} className="items-center">
      <TouchableOpacity
        style={styles.applyButton}
        onPress={() => {
          onPress(item);
        }}
      >
        <Text style={styles.applyButtonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PopUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
  },
  applyButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    width: "90%"
  },
  applyButtonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
  popupContainer: {
    backgroundColor: "white",
    borderTopColor: "#ccc",
    borderTopWidth: 1,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
