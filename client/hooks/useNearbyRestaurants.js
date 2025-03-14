// hooks/useNearbyRestaurants.js
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import * as Location from "expo-location";
import { API_URL } from "@env";
import useDistance from "./useDistance";

const useNearbyRestaurants = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyRestaurants, setNearbyRestaurants] = useState([]);
  const { calculateDistance } = useDistance();

  const getUserLocation = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } else {
        console.log("Permission to access location was denied");
      }
    } catch (error) {
      console.error("Error getting user location:", error);
    }
  }, []);

  const fetchDataAndCalculateDistances = useCallback(async () => {
    try {
      if (!userLocation) {
        await getUserLocation();
      }
      if (userLocation) {
        const response = await axios.get(`${API_URL}/nearby-restaurants`, {
          params: {
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          },
        });
        const restaurantsWithDistance = response.data.nearbyRestaurants.map(
          (restaurant) => {
            const distance = calculateDistance(
              userLocation.latitude,
              userLocation.longitude,
              restaurant.location.coordinates[1],
              restaurant.location.coordinates[0]
            );
            return { ...restaurant, distance };
          }
        );

        setNearbyRestaurants(restaurantsWithDistance);
      }
    } catch (error) {
      console.error("Error fetching or calculating distances:", error);
    }
  }, [userLocation, getUserLocation, calculateDistance]);

  useEffect(() => {
    fetchDataAndCalculateDistances();
  }, [fetchDataAndCalculateDistances]);

  return { nearbyRestaurants, userLocation };
};

export default useNearbyRestaurants;
