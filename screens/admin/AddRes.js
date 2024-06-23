import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  Image,
  ScrollView,
  Clipboard,
} from "react-native";

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
import { ActionSheet, Cell } from "@nutui/nutui-react-native";
import * as ImagePicker from "expo-image-picker";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { pickImages } from "../../utils/pickImage";

const AddRes = () => {
  const bottomSheetRef = useRef(null);
  const [refresh, setRefresh] = useState(0);
  const snapPoints = useMemo(() => ["20%", "40%", "60%", "85%", "90%"], []);
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [modalVisible, setModalVisible] = useState(true);
  
  const [images, setImages] = useState([]);
  const [imagesPrice, setImagesPrice] = useState([]);

  const [urls, setUrls] = useState([]);
  const [urlsImagePrice, setUrlsImagePrice] = useState([]);

  const [inputUrl, setInputUrl] = useState("");
  const [inputUrlPrice, setInputUrlPrice] = useState("");

 

  const handleChangeText = (text) => {
    setInputUrl(text);
  };
  const handleChangeTextPrice = (text) => {
    setInputUrlPrice(text);
  };

  const handlePaste = async () => {
    const clipboardContent = await Clipboard.getString();
    if (clipboardContent) {
      setUrls([...urls, clipboardContent]);
      setInputUrl("");
    }
  };
  const handlePastePrice = async () => {
    const clipboardContent = await Clipboard.getString();
    if (clipboardContent) {
      setUrlsImagePrice([...urlsImagePrice, clipboardContent]);
      setInputUrlPrice("");
    }
  };

  const handleAddUrl = () => {
    if (inputUrl) {
      setUrls([...urls, inputUrl]);
      setInputUrl("");
    }
  };
  const handleAddUrlPrice = () => {
    if (inputUrlPrice) {
      setUrlsImagePrice([...urlsImagePrice, inputUrlPrice]);
      setInputUrlPrice("");
    }
  };
  const handlePickImages = async () => {
    try {
      const result = await pickImages(images); // Pass `true` for allowsMultipleSelection

      if (result.length > 0) {
        setImages(result);
      }
    } catch (error) {
      console.log("Error picking images:", error);
    }
  };
  const handlePickImagesPrice = async () => {
    try {
      const result = await pickImages(imagesPrice,true); // Pass `true` for allowsMultipleSelection

      if (result.length > 0) {
        setImagesPrice(result);
      }
    } catch (error) {
      console.log("Error picking images:", error);
    }
  };

  const removeImage = (index) => {
    if (index < images.length) {
      // Xóa hình ảnh từ mảng images
      setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    } else {
      // Xóa URL từ mảng urls
      const updatedUrls = [...urls];
      updatedUrls.splice(index - images.length, 1); // Tính chỉ mục đúng trong mảng urls
      setUrls(updatedUrls);
    }
  };
  const removeImagePrice = (index) => {
    if (index < imagesPrice.length) {
      // Xóa hình ảnh từ mảng images
      setImagesPrice((prevImages) => prevImages.filter((_, i) => i !== index));
    } else {
      // Xóa URL từ mảng urls
      const updatedUrls = [...urlsImagePrice];
      updatedUrls.splice(index - imagesPrice.length, 1); // Tính chỉ mục đúng trong mảng urls
      setUrlsImagePrice(updatedUrls);
    }
  };

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

  
  const handlePickImagesAlbum = async () => {
    try {
      const result = await pickImages(true); // Pass `true` for allowsMultipleSelection

      if (result.length > 0) {
        setImagePrice(result);
      }
    } catch (error) {
      console.log("Error picking images:", error);
    }
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
                <Text className="text-lg">Get my current location</Text>
              </View>
              <AntDesign name="right" size={24} color="#B4B4BC" />
            </View>
          </View>
          <View className="p-4 mt-2">
            <Text className="text-base">Restaurant address selected : </Text>
            <Text className="text-base mt-2">Longitude: {longitude}</Text>
            <Text className="text-base mt-2">Latitude: {latitude}</Text>
          </View>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.textStyle}>Add infomation restaurant</Text>
          </Pressable>
          {/* <TouchableOpacity className="bg-slate-100 p-3 m-3 flex flex-row justify-between rounded">
            <Text className="text-base font-bold text-emerald-500">
              Tiếp theo
            </Text>
            <AntDesign name="arrowright" size={24} color="#21BF73" />
          </TouchableOpacity> */}
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
                label: "type address...",
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
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <ScrollView style={styles.centeredView}>
              <View style={styles.modalView}>
                {/* Image of Restaurant */}
                <Text className="text-xl mb-4">Image Restaurant</Text>
                <TouchableOpacity
                  onPress={handlePickImages}
                  className="border-dashed border-2 border-indigo-600 p-2"
                >
                  <Image
                    style={styles.tinyLogo}
                    source={{
                      uri:
                        images.length > 0
                          ? images[0]
                          : urls.length > 0
                          ? urls[0]
                          : "https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg",
                    }}
                  />
                  {(images.length > 0 || urls.length > 0) && (
                    <TouchableOpacity
                      style={styles.removeLargeIconContainer}
                      onPress={() => removeImage(0)}
                    >
                      <FontAwesome6 name="xmark" size={16} color="white" />
                    </TouchableOpacity>
                  )}
                  
                </TouchableOpacity>
                <View style={styles.imageList}>
                  {[...images, ...urls].slice(1).map((item, index) => (
                    <View key={index} style={styles.imageWrapper}>
                      <Image style={styles.smallImage} source={{ uri: item }} />
                      <TouchableOpacity
                        style={styles.removeIconContainer}
                        onPress={() => removeImage(index + 1)}
                      >
                        <FontAwesome6 name="xmark" size={16} color="white" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Paste URL here"
                    value={inputUrl}
                    onChangeText={handleChangeText}
                  />
                  <TouchableOpacity onPress={handlePaste} style={styles.button}>
                    <Text style={styles.buttonText}>Paste</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleAddUrl}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>Add</Text>
                  </TouchableOpacity>
                </View>

              {/* Image Price */}
                <Text className="text-xl mb-4">image price</Text>
                <TouchableOpacity
                  onPress={handlePickImagesPrice}
                  className="border-dashed border-2 border-indigo-600 p-2"
                >
                  <Image
                    style={styles.tinyLogo}
                    source={{
                      uri:
                        imagesPrice.length > 0
                          ? imagesPrice[0]
                          : urlsImagePrice.length > 0
                          ? urlsImagePrice[0]
                          : "https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg",
                    }}
                  />
                  {(imagesPrice.length > 0 || urlsImagePrice.length > 0) && (
                    <TouchableOpacity
                      style={styles.removeLargeIconContainer}
                      onPress={() => removeImagePrice(0)}
                    >
                      <FontAwesome6 name="xmark" size={16} color="white" />
                    </TouchableOpacity>
                  )}
                </TouchableOpacity>
                <View style={styles.imageList}>
                  {[...imagesPrice, ...urlsImagePrice].slice(1).map((item, index) => (
                    <View key={index} style={styles.imageWrapper}>
                      <Image style={styles.smallImage} source={{ uri: item }} />
                      <TouchableOpacity
                        style={styles.removeIconContainer}
                        onPress={() => removeImagePrice(index + 1)}
                      >
                        <FontAwesome6 name="xmark" size={16} color="white" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Paste URL here"
                    value={inputUrlPrice}
                    onChangeText={handleChangeTextPrice}
                  />
                  <TouchableOpacity onPress={handlePastePrice} style={styles.button}>
                    <Text style={styles.buttonText}>Paste</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleAddUrlPrice}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>Add</Text>
                  </TouchableOpacity>
                </View>

                {/* <View className="flex flex-row space-x-2">
                  {urls.length > 0 ? (
                    urls.map((url, index) => (
                      <Image
                        key={index}
                        source={{ uri: url }}
                        style={styles.smallImage}
                        resizeMode="cover"
                      />
                    ))
                  ) : (
                    <Text style={styles.placeholder}>
                      Images will appear here
                    </Text>
                  )}
                </View> */}
                <View className="mt-10" style={{}}>
                  {/* <Text>Phần ở dưới</Text> */}

                  <View className="space-y-4 grid">
                    <TextInput mode="outlined" label="Name" />

                    <TextInput
                      mode="outlined"
                      label="Description"
                      multiline={true}
                    />
                    <TextInput
                      mode="outlined"
                      label="Address"
                      multiline={true}
                    />
                    <TextInput
                      mode="outlined"
                      label="Outlined input"
                      placeholder="Type something"
                    />
                    <TextInput
                      mode="outlined"
                      label="Outlined input"
                      placeholder="Type something"
                    />
                    <TextInput
                      mode="outlined"
                      label="Outlined input"
                      placeholder="Type something"
                    />
                    <TextInput
                      mode="outlined"
                      label="Outlined input"
                      placeholder="Type something"
                    />
                  </View>
                </View>

                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </Pressable>
              </View>
            </ScrollView>
          </Modal>
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
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    marginTop: 35,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  tinyLogo: {
    width: "100%",
    height: 250,
    objectFit: "cover",
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
  imageList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  imageWrapper: {
    margin: 5,
    position: "relative",
  },
  smallImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  removeIconContainer: {
    position: "absolute",
    top: -4,
    left: -7,
    backgroundColor: "red",
    borderRadius: 50,
    width: 15,
    height: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  removeLargeIconContainer: {
    position: "absolute",
    top: 1,
    left: 0,
    backgroundColor: "red",
    borderRadius: 50,
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  buttonText: {
    color: "#fff",
  },
  imageContainer: {
    width: "100%",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  placeholder: {
    marginTop: 20,
    color: "#888",
    textAlign: "center",
  },
});
