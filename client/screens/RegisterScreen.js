import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";
import React, { useRef, useState } from "react";
import { COLORS, SIZES } from "../constants/theme";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import styles from "../constants/loginStyle";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import BackBtn from "../components/BackBtn";
import Button from "../components/Button";
import { API_URL } from "@env";
const RegisterScreen = () => {
  console.log("first")
  console.log(API_URL);
  const animation = useRef(null);
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [name, setName] = useState("");
  const navigation = useNavigation();
  const [obsecureText, setObsecureText] = useState(true);
  const validatePassword = (password) => {
    const passwordErrors = [];

    // Kiểm tra chữ thường
    if (!/(?=.*[a-z])/.test(password)) {
      passwordErrors.push("Mật khẩu phải chứa ít nhất một chữ thường.");
    }

    // Kiểm tra chữ hoa
    if (!/(?=.*[A-Z])/.test(password)) {
      passwordErrors.push("Mật khẩu phải chứa ít nhất một chữ hoa.");
    }

    // Kiểm tra số
    if (!/(?=.*\d)/.test(password)) {
      passwordErrors.push("Mật khẩu phải chứa ít nhất một số.");
    }

    // Kiểm tra ký tự đặc biệt
    if (!/(?=.*[!@#$%^&*()_+])/.test(password)) {
      passwordErrors.push("Mật khẩu phải chứa ít nhất một ký tự đặc biệt.");
    }

    // Kiểm tra độ dài tối thiểu
    if (password.length < 8) {
      passwordErrors.push("Mật khẩu phải có ít nhất 8 ký tự.");
    }

    // Set thông báo lỗi
    if (passwordErrors.length > 0) {
      setPasswordError(passwordErrors);
      return false;
    } else {
      setPasswordError([]);
      return true;
    }
  };

  const handleRegister = () => {
    const isPasswordValid = validatePassword(password);

    if (isPasswordValid) {
        const user = {
            name: name,
            email: email,
            password: password,
        };

        // Gửi yêu cầu POST đến API để đăng ký người dùng
        axios
            .post(`${API_URL}/register`, user)
            .then((response) => {
                console.log(response);
                Alert.alert("Success", "Congratulations, you have successfully registered");
                setName("");
                setEmail("");
                setPassword("");
                navigation.navigate("Login");
            })
            .catch((error) => {
                Alert.alert(
                    "Thất bại",
                    "Vui lòng nhập đầy đủ và chính xác thông tin để đăng ký."
                );
                console.log("Đăng ký thất bại", error);
            });
    }
};

  return (
    <ScrollView
      style={{
        // flex: 1,
        backgroundColor: "white",
        // alignItems: "center",
        // marginTop: 50,
      }}
    >
      <View style={{ marginHorizontal: 20, marginTop: 50 }}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <LottieView
            autoPlay
            ref={animation}
            style={{ width: "100%", height: SIZES.height / 3.2 }}
            source={require("../assets/lottie/login.json")}
          />
        </View>
        <BackBtn onPress={() => navigation.goBack()} />

        <Text style={styles.titleLogin}>Booking App</Text>

        <KeyboardAvoidingView>
          <View>
            <View style={styles.wrapper}>
              <Text style={styles.label}>Fullname</Text>
              <View style={styles.inputWrapper(COLORS.offwhite)}>
                <MaterialCommunityIcons
                  name="face-man-profile"
                  size={20}
                  color={COLORS.gray}
                  style={styles.iconStyle}
                />

                <TextInput
                  placeholder="type fullname"
                  onChangeText={(text) => setName(text)}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={{ flex: 1 }}
                />
              </View>
            </View>

            <View style={styles.wrapper}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputWrapper(COLORS.offwhite)}>
                <MaterialCommunityIcons
                  name="email-outline"
                  size={20}
                  color={COLORS.gray}
                  style={styles.iconStyle}
                />

                <TextInput
                  placeholder="type email"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={{ flex: 1 }}
                />
              </View>
            </View>

            <View style={styles.wrapper}>
              <Text style={styles.label}>Password</Text>
              <View
                style={styles.inputWrapper(
                  // touched.password ? COLORS.secondary : COLORS.offwhite
                  passwordError.length > 0 ? COLORS.error : COLORS.offwhite
                )}
              >
                <MaterialCommunityIcons
                  name="lock-outline"
                  size={20}
                  color={COLORS.gray}
                  style={styles.iconStyle}
                />

                <TextInput
                  secureTextEntry={obsecureText}
                  placeholder="type password"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={{ flex: 1 }}
                />

                <TouchableOpacity
                  onPress={() => {
                    setObsecureText(!obsecureText);
                  }}
                >
                  <MaterialCommunityIcons
                    name={obsecureText ? "eye-off-outline" : "eye-outline"}
                    size={18}
                  />
                </TouchableOpacity>
              </View>
              {passwordError.length > 0 && (
                <View style={{ marginTop: 5 }}>
                  {passwordError.map((error, index) => (
                    <Text
                      key={index}
                      style={{ color: COLORS.error, fontSize: 12 }}
                    >
                      {error}
                    </Text>
                  ))}
                </View>
              )}
            </View>

            <Button
              title={"REGISTER"}
              onPress={handleRegister}
              loader={loader}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
