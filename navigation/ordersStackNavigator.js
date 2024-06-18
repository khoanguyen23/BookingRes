import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Orders from "../screens/admin/Orders";
import DetailOrders from "../screens/admin/DetailOrders";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const OrdersStackNavigator = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Orders"
        component={Orders}
        options={{
          headerTitleAlign: "center",
          headerTitle: "List Orders",
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "#1C212D" },
          headerLeft: ({ onPress, tintColor }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Dashboard");
              }}
            >
              <View
                style={{
                  marginLeft: 5,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Ionicons name="chevron-back" size={35} color="#34DBA1" />
                {/* #037AFF */}
                <Text
                  style={{
                    color: "#ffffff",
                    fontSize: 17,
                    fontWeight: "bold",
                  }}
                >
                  {/* #58A7FF */}
                </Text>
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="DetailOrders"
        component={DetailOrders}
        options={{
          headerStyle: { backgroundColor: "#1C212D" },
          headerTitleAlign: "center",
          headerTitle: "Details Orders",
          headerTintColor: "#fff",
         
        }}
      />
    </Stack.Navigator>
  );
};

export default OrdersStackNavigator;
