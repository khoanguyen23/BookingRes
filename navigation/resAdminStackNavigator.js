import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ResAdmin from "../screens/admin/ResAdmin";
import AddRes from "../screens/admin/AddRes";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const ResAdminStackNavigator = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ResAdmin"
        component={ResAdmin}
        options={{
          headerTitleAlign: "center",
          headerTitle: "Quản lý nhà hàng",
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "#1C212D" },
          headerLeft: ({ onPress, tintColor }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ダッシュボード");
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
        name="AddRes"
        component={AddRes}
        options={{
          headerStyle: { backgroundColor: "#1C212D" },
          headerTitleAlign: "center",
          headerTitle: "Thêm nhà hàng",
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
};

export default ResAdminStackNavigator;
