import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "@env";
import RestaurantUI from "./ResHorUI";
import { Text } from "react-native";

const ResHor = ({ route }) => {
  const navigation = useNavigation();
  const [restaurantData, setRestaurantData] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { selectedCategory,selectedCategoryName, searchKeyword: routeSearchKeyword } = route.params || {};
        const usedSearchKeyword = routeSearchKeyword || searchKeyword;

        if (selectedCategory) {
          const response = await fetch(
            `${API_URL}/restaurants/categories/${selectedCategory}`
          );
          const data = await response.json();
          // console.log(data)
          // console.log(selectedCategory, "category")

          if (Array.isArray(data) && data.length > 0) {
            setRestaurantData(data);

            navigation.setOptions({
              headerTitle: () => (
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{ fontWeight: "bold", fontSize: 18, color: "white" }}
                >
                  {`Kết quả: ${selectedCategoryName} (${data.length})`}
                </Text>
              ),
            });
          } else {
            console.error("Invalid or empty data returned from the server");
          }
        } else if (usedSearchKeyword) {
          const response = await fetch(
            `${API_URL}/restaurants-in-city?cityName=${usedSearchKeyword}`
            // `http://localhost:8000/restaurants-in-city?cityName=${usedSearchKeyword}`
          );

          const data = await response.json();

          if (Array.isArray(data) && data.length > 0) {
            setRestaurantData(data);

            navigation.setOptions({
              headerTitle: () => (
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{ fontWeight: "bold", fontSize: 18, color: "white" }}
                >
                  {`${data.length} nhà hàng cho tìm kiếm ${usedSearchKeyword}`}
                </Text>
              ),
            });
          } else {
            console.error("Invalid or empty data returned from the server");
          }
        } else {
          console.error("Both selectedCategory and searchResults are undefined");
        }
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };

    fetchData();
  }, [route.params, route.params?.selectedCategory, searchKeyword, navigation]);

  return <RestaurantUI restaurantData={restaurantData} />;
};

export default ResHor;
