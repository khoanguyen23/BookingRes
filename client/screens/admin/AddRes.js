import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef, useCallback, useMemo } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { TextInput } from "react-native-paper";
import MapView from "react-native-maps";
import BottomSheet from "@gorhom/bottom-sheet";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const AddRes = () => {
  const navigation = useNavigation();
  const bottomSheetRef = useRef(null);
  const [refresh, setRefresh] = useState(0);
  const snapPoints = useMemo(() => ["20%", "40%", "60%", "85%", "90%"], []);
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState("");

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <TouchableOpacity
        style={[styles.myLocationIcon, styles.shadow]}
        className="flex items-center justify-center"
      >
        <MaterialIcons name="my-location" size={40} color="#22BF73" />
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        onChange={handleSheetChanges}
        style={styles.sheetContainer}
        handleIndicatorStyle={styles.sheetHandleIndicator}
        backgroundStyle={{ backgroundColor: "#FAFAFA" }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ flex: 0.1 }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ResInfo", { longitude, latitude })
              }
              style={styles.shadow}
              className="flex-row items-center justify-between p-3 bg-[#f7f4f4] rounded-lg ml-3 mr-3 mt-2"
            >
              <View className="flex-row items-center space-x-4">
                <View className="bg-[#21BF73] w-10 h-10 rounded-lg items-center justify-center">
                  <Feather name="navigation" size={24} color="white" />
                </View>
                <Text className="text-lg">
                  Get location & Continue fill info
                </Text>
              </View>
              <AntDesign name="right" size={24} color="#B4B4BC" />
            </TouchableOpacity>
          </View>

          {address.length > 0 && (
            <View className="flex flex-row p-3 rounded-lg ml-3 mr-3 mt-10">
              <FontAwesome6 name="location-dot" size={24} color="#22BF73" />
              <Text className="ml-3 text-base">{address}</Text>
            </View>
          )}
          {/* <Pressable
            style={styles.button}
            onPress={() =>
              navigation.navigate("ResInfo", { longitude, latitude })
            }
          >
            <Text className="text-center text-white font-bold text-base">
              CONTINUE
            </Text>
          </Pressable> */}
          <View style={{ flex: 1 }}>
            <GooglePlacesAutocomplete
              onPress={(data, details = null) => {
                if (details) {
                  console.log("Selected Address:", data.description);
                  console.log("Latitude:", details.geometry.location.lat);
                  console.log("Longitude:", details.geometry.location.lng);
                  setAddress(data.description);
                  setLatitude(details.geometry.location.lat);
                  setLongitude(details.geometry.location.lng);
                }
              }}
              fetchDetails={true}
              query={{
                key: GOOGLE_MAPS_API_KEY,
                language: "en",
              }}
              textInputProps={{
                InputComp: TextInput,
                mode: "outlined",
                label: "type address...",
                style: { width: "100%", backgroundColor: "#EFEFF0" },
                activeOutlineColor: "red",
                outlineStyle: { borderRadius: 12, borderWidth: 0 },
              }}
              styles={{
                container: styles.autoCompleteContainer,
              }}
              renderRow={(data, index) => (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 2,
                  }}
                >
                  <Entypo name="location-pin" size={24} color="black" />
                  <Text style={{ marginLeft: 10 }}>{data.description}</Text>
                </View>
              )}
            />
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default AddRes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  autoCompleteContainer: {
    padding: 10,
    marginTop: 10,
  },
  sheetContainer: {
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  sheetHandleIndicator: {
    backgroundColor: "#000",
    width: 40,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  shadow: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  myLocationIcon: {
    position: "absolute",
    width: 50,
    height: 50,
    right: 10,
    top: "30%", // Đặt ở giữa theo chiều dọc
    marginTop: -12, // Điều chỉnh để biểu tượng nằm chính xác ở giữa
    zIndex: 1000,
  },
});
