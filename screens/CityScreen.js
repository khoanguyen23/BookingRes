import {
  View,
  Text,
  Modal,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { CheckBox, Icon } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import { Divider } from "react-native-elements";
import { Shadow } from "react-native-shadow-2";

const CityScreen = ({ navigation, route }) => {
  // const { selectedCity: initialSelectedCity } = route.params;
  // const [selectedCity, setLocalSelectedCity] = useState(initialSelectedCity);

  const { selectedCity: initialSelectedCity, setSelectedCity } = route.params;
  const [selectedCity, setLocalSelectedCity] = useState(initialSelectedCity);


  const cities = ["Hà Nội", "TPHCM", "Đà Nẵng", "Khánh Hòa"];
  
  // const isButtonVisible = selectedCity !== initialSelectedCity && selectedCity !== null;

  const isButtonVisible =
  selectedCity !== initialSelectedCity && selectedCity !== null;

  // const handleCitySelection = (city) => {
  //   if (selectedCity === city) {
  //     setLocalSelectedCity(null);
  //   } else {
  //     setLocalSelectedCity(city);
  //   }
  // };

  const handleCitySelection = (city) => {
    if (selectedCity === city) {
      setLocalSelectedCity(null);
    } else {
      setLocalSelectedCity(city);
    }
  };

  // const handleApplyButton = () => {
    
  //   // Pass the selected city back to the Home screen
  //   navigation.navigate('Home', { selectedCity });
  // };

  const handleApplyButton = () => {
    // Pass the selected city back to the Home screen
    setSelectedCity(selectedCity);
    navigation.navigate("Home", { selectedCity });
  };

  

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, width: "100%", padding: 0, margin: 0 }}>
        {cities.map((city, index) => (
          <React.Fragment key={city}>
            <CheckBox
              title={city}
              textStyle={{ fontSize: 20, fontWeight: "600", color: "black" }}
              containerStyle={{ backgroundColor: "#fff", borderColor: "#fff" }}
              checkedIcon={
                <Icon
                  name="radio-button-checked"
                  type="material"
                  color="red"
                  size={30}
                  iconStyle={{ marginRight: 10 }}
                />
              }
              uncheckedIcon={
                <Icon
                  name="radio-button-unchecked"
                  type="material"
                  color="gray"
                  size={30}
                  iconStyle={{ marginRight: 10 }}
                />
              }
              checked={selectedCity === city}
              onPress={() => handleCitySelection(city)}
            />
            {index < cities.length - 1 && (
              <>
                <Text></Text>
                <Divider
                  style={{
                    backgroundColor: "#ccc",
                    width: "90%",
                    marginLeft: 20,
                  }}
                />
              </>
            )}
          </React.Fragment>
        ))}
      </View>
      {isButtonVisible && (
      <Shadow style={styles.popupContainer}>
        <View>
          <TouchableOpacity
            style={styles.applyButton}
            onPress={handleApplyButton}
          >
            <Text style={styles.applyButtonText}>Áp dụng</Text>
          </TouchableOpacity>
        </View>
      </Shadow>
       )}
    </View>
  );
};

export default CityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  applyButton: {
    backgroundColor: "#f4978e",
    backgroundColor: "red",
    padding: 20,
    width: "90%",
    borderRadius: 10,
    marginBottom: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  applyButtonText: {
    width: "70%",
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  popupContainer: {
    width: 600,
    height: 200,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
