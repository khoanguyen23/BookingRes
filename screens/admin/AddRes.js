import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { TextInput } from "react-native-paper";
import PopUp from "../../components/PopUp";
import MapView, { Marker } from "react-native-maps";
import BottomSheet from "@gorhom/bottom-sheet";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";

const AddRes = () => {
  const bottomSheetRef = useRef(null);
  const [refresh, setRefresh] = useState(0);
  const snapPoints = useMemo(() => ["20%", "40%", "60%", "85%", "100%"], []);
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const FooterComponent = ({}) => {
    return (
      <View
        style={{
          position: "absolute",
          bottom: 40,
          right: 0,
          left: 0,
        }}
      >
        <PopUp
          buttonText="Tiếp tục"
          onPress={() => {
            navigation.navigate("Order", { restaurant: item }); // assuming `item` is the restaurant data
          }}
        />
      </View>
    );
  };

  const SearchIcon = () => (
    <View className="">
      <AntDesign
        name="search1"
        size={24}
        width="15"
        height="15"
        color="black"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        //specify our coordinates.
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />

      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        onChange={handleSheetChanges}
        style={styles.sheetContainer}
        handleIndicatorStyle={styles.sheetHandleIndicator}
        backgroundStyle={{ backgroundColor: "#FFFFFF" }}
        // footerComponent={() => <FooterComponent />}
      >
        <View style={{ flex: 1 }}>
          <View style={{ flex: 0.1 }}>
            <View className="flex-row items-center justify-between p-3 bg-[#f7f4f4] rounded-lg ml-3 mr-3 mt-2">
              <View className="flex-row items-center space-x-4">
                <View className="bg-[#21BF73] w-10 h-10 rounded-lg items-center justify-center">
                  <Feather name="navigation" size={24} color="white" />
                </View>
                <Text className="text-lg">Use my current location</Text>
              </View>
              <AntDesign name="right" size={24} color="#B4B4BC" />
            </View>
          </View>
          <View className="p-4">
            <Text className="text-base">Địa chỉ nhà hàng : </Text>
            <Text className="text-base mt-2">Longitude: {longitude}</Text>
            <Text className="text-base mt-2">Latitude: {latitude}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <GooglePlacesAutocomplete
              onPress={(data, details = null) => {
                if (details) {
                  console.log("Selected Address:", data.description);
                  console.log("Latitude:", details.geometry.location.lat);
                  console.log("Longitude:", details.geometry.location.lng);
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
                label: "Search location ....",
                style: { width: "100%", backgroundColor: "#EFEFF0" },
                activeOutlineColor: "red",
                outlineStyle: { borderRadius: 12, borderWidth: 0 },
              }}
              styles={{
                container: styles.autoCompleteContainer,
              }}
              // renderHeaderComponent={() => (
              //   <View style={{ padding: 10, backgroundColor: "#9DDEF0", marginTop : 5, borderRadius: 10 }}>
              //     <Text>Kết quả tìm kiếm</Text>
              //   </View>
              // )}
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
    // flex: 1,
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
});
