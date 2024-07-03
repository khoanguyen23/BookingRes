import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import LottieView from "lottie-react-native";

const NotificationScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
       <View style={styles.center}>
       <LottieView
          style={{ width: 200, height: 200, marginTop: 100}}
          source={require("../assets/lottie/empty.json")}
          autoPlay={true}
          loop={true}
        />
        <Text style={{fontSize: 20, color :"#BABABA", fontWeight: "bold", marginTop: 170}}>Rất tiếc! Không có dữ liệu</Text>
    </View>
    </SafeAreaView>
   
  );
}

export default NotificationScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    position: "relative",
  },
  center: {
    flex: 1,
    alignItems: "center",
  },
})
