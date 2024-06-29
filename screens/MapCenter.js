import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  View,
  Text,
  Modal,
  Button,
  StyleSheet,
  Image,
  Animated,
  Easing,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  LocationAccuracy,
} from "expo-location";
import BottomSheet from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import MapView, { Marker } from "react-native-maps";
import Geocoding from "react-native-geocoding";
import { API_URL, GOOGLE_MAPS_API_KEY } from "@env";
import ListRes from "../components/ListRes";

const MapCenter = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState("loading...");
  const [markerCoordinate, setMarkerCoordinate] = useState(null);
  const [selectedLatitude, setSelectedLatitude] = useState(null);
  const [selectedLongitude, setSelectedLongitude] = useState(null);
  const [nearbyRestaurants, setNearbyRestaurants] = useState([]);
  const [searchAddress, setSearchAddress] = useState("");
  const [showRedView, setShowRedView] = useState(false);
  const scaleAnimationRef = useRef(new Animated.Value(0)).current;
  const opacityAnimationRef = useRef(new Animated.Value(1)).current;

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          searchAddress
        )}&key=${GOOGLE_MAPS_API_KEY}`
      );

      if (response.data.results.length > 0) {
        const location = response.data.results[0].geometry.location;
        setMarkerCoordinate({
          latitude: location.lat,
          longitude: location.lng,
        });

        mapRef.current?.animateToRegion({
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
      } else {
        console.log("No results found for the provided address");
      }
    } catch (error) {
      console.error("Error searching address:", error);
    }
  };

  const mapRef = useRef(null);
  // ref
  const bottomSheetRef = useRef(null);

  const [refresh, setRefresh] = useState(0);

  const onShowMap = () => {
    bottomSheetRef.current?.collapse();
    setRefresh(refresh + 1);
  };

  // variables
  //   const snapPoints = useMemo(() => ["55%", "20%"], []);
  const snapPoints = useMemo(() => ["20%", "40%", "60%", "85%", "100%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
    setShowRedView(index === snapPoints.length - 1);
  }, []);

  async function requestLocationPermissions() {
    const { status } = await requestForegroundPermissionsAsync();

    if (status === "granted") {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
      setMarkerCoordinate({
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude,
      });
      fetchDataFromServer(
        currentPosition.coords.latitude,
        currentPosition.coords.longitude
      );
      setLoading(false);
    } else {
      console.error("Quyền truy cập vị trí không được cấp");
      setLoading(false);
    }
  }

  const handleRegionChangeComplete = async (region) => {
    if (region) {
      setMarkerCoordinate({
        latitude: region.latitude,
        longitude: region.longitude,
      });
      // Fetch data from the server using the new coordinates
      fetchDataFromServer(region.latitude, region.longitude);

      const address = await getAddressFromCoords(
        region.latitude,
        region.longitude
      );
      setSearchAddress(address);
    }
  };

  const fetchDataFromServer = async (latitude, longitude) => {
    const radius = 1; // bán kính
    try {
      const response = await fetch(
        `${API_URL}/restaurants-in-circle?latitude=${latitude}&longitude=${longitude}&radius=${radius}`
      );
      const data = await response.json();
      const restaurantsWithDistance = data.map((restaurant) => {
        const distance = calculateDistance(
          latitude,
          longitude,
          restaurant.location.coordinates[1],
          restaurant.location.coordinates[0]
        ).toFixed(2);
        return { ...restaurant, distance };
      });
      setNearbyRestaurants(restaurantsWithDistance);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    requestLocationPermissions();
  }, []);

  useEffect(() => {
    if (location) {
      watchPositionAsync(
        {
          accuracy: LocationAccuracy.Highest,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (response) => {
          if (response && response.coords) {
            setLocation(response);
            mapRef.current?.animateCamera({
              pitch: 40,
              center: response.coords,
            });
          }
        }
      );
    }
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.timing(scaleAnimationRef, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ).start();
  }, [scaleAnimationRef]);

  useEffect(() => {
    Animated.loop(
      Animated.timing(opacityAnimationRef, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ).start();
  }, [opacityAnimationRef]);

  Geocoding.init(GOOGLE_MAPS_API_KEY);
  const getAddressFromCoords = async (latitude, longitude) => {
    try {
      const result = await Geocoding.from(latitude, longitude);
      if (result.status === "OK" && result.results.length > 0) {
        const address = result.results[0].formatted_address;
        return address;
      } else {
        return "Address not found";
      }
    } catch (error) {
      console.error("Error performing reverse geocoding:", error);
      return "Unable to fetch address.";
    }
  };

  const convertToAddress = async () => {
    if (selectedLatitude && selectedLongitude) {
      const address = await getAddressFromCoords(
        selectedLatitude,
        selectedLongitude
      );
      setSelectedAddress(address);
    }
  };

  return (
    <View style={styles.container}>
 {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Đang tải...</Text>
        </View>
      ) : (
        <>
          <View style={styles.searchBox}>
            <Text style={{ flex: 1 }} numberOfLines={1} ellipsizeMode="tail">
              {searchAddress}
            </Text>
            <Ionicons name="location-sharp" size={24} color="red" />
            {/* <Button title="Tìm kiếm" onPress={handleSearch} /> */}
          </View>
          {location && location.coords && (
            <MapView
              ref={mapRef}
              style={styles.map}
              initialRegion={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
              onPress={(event) => {
                const { latitude, longitude } = event.nativeEvent.coordinate;
                setMarkerCoordinate({ latitude, longitude });
                fetchDataFromServer(latitude, longitude);
              }}
              onRegionChangeComplete={handleRegionChangeComplete}
            >
              {markerCoordinate && (
                <>
                  <Marker coordinate={markerCoordinate}>
                    <Animated.View style={styles.markerWrap}>
                      <Animated.View
                        style={[
                          styles.ring,
                          { opacity: opacityAnimationRef },
                          { transform: [{ scale: scaleAnimationRef }] },
                        ]}
                      />
                      <View style={styles.marker} />
                    </Animated.View>
                  </Marker>
                  {nearbyRestaurants.map((restaurant) => (
                    <Marker
                      key={restaurant._id}
                      coordinate={{
                        latitude: restaurant.location.coordinates[1],
                        longitude: restaurant.location.coordinates[0],
                      }}
                      title={restaurant.name}
                    >
                      <Image
                        source={require("../assets/img/restaurant.png")}
                        style={{ width: 40, height: 40 }}
                        resizeMode="cover"
                      />
                    </Marker>
                  ))}
                </>
              )}
            </MapView>
          )}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>Latitude: {selectedLatitude}</Text>
                <Text style={styles.modalText}>Longitude: {selectedLongitude}</Text>
                <Button title="Convert to Address" onPress={convertToAddress} />
                <Text style={styles.modalText}>
                  Converted Address: {selectedAddress}
                </Text>
                <Button title="Close" onPress={() => setModalVisible(false)} />
              </View>
            </View>
          </Modal>
          <BottomSheet
            ref={bottomSheetRef}
            index={1}
            snapPoints={snapPoints}
            enablePanDownToClose={false}
            onChange={handleSheetChanges}
            style={styles.sheetContainer}
            handleIndicatorStyle={styles.sheetHandleIndicator}
          >
            <View
              style={styles.contentContainer}
              className="rounded-tl-lg rounded-tr-lg"
            >
              <ListRes
                nearbyRestaurants={nearbyRestaurants}
                navigation={navigation}
                refresh={refresh}
              />
            </View>
          </BottomSheet>
          <View style={[styles.redView, showRedView && styles.showRedView]} />
        </>
      )}
    </View>
  );
};

export default MapCenter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  redView: {
    position: "absolute",
    backgroundColor: "#EA1D0A",
    width: "100%",
    height: "10%",
    top: 0,
    zIndex: 0,
    opacity: 0,
  },
  showRedView: {
    opacity: 1,
  },
  contentContainer: {
    flex: 1,
  },
  searchBox: {
    position: "absolute",
    top: 20,
    left: 10,
    right: 10,
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: 5,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
    zIndex: 1,
  },
  map: {
    flex: 1,
    width: "100%",
  },
  text: {
    marginTop: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    width: "80%",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  absoluteView: {
    position: "absolute",
    top: 50,
    width: "100%",
  },
  btn: {
    position: "absolute",
    backgroundColor: "#1A1A1A",
    padding: 14,
    height: 50,
    borderRadius: 30,
    flexDirection: "row",
  },
  sheetContainer: {
    backgroundColor: "#fff",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  sheetHandleIndicator: {
    backgroundColor: "#000",
    width: 40,
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "red",
    position: "absolute",
  },
  ring: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(222, 27, 62, 0.3)",
    borderWidth: 1,
    borderColor: "rgba(222, 27, 62, 0.86)",
    opacity: 1,
  },
});
