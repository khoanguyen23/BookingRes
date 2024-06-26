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
  KeyboardAvoidingView,
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
import ImageUploader from "../../utils/uploadImage";
import { useNavigation, useRoute } from "@react-navigation/native";

const ResInfo = () => {
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
  const [imagesAlbum, setImagesAlbum] = useState([]);

  const [urls, setUrls] = useState([]);
  const [urlsImagePrice, setUrlsImagePrice] = useState([]);
  const [urlsImageAlbum, setUrlsImageAlbum] = useState([]);

  const [inputUrl, setInputUrl] = useState("");
  const [inputUrlPrice, setInputUrlPrice] = useState("");
  const [inputUrlAlbum, setInputUrlAlbum] = useState("");

  const handlePickImages = async (
    imageState,
    setImagesCallback,
    allowMultipleSelection = false
  ) => {
    try {
      const result = await pickImages(imageState, allowMultipleSelection);
      if (result.length > 0) {
        setImagesCallback(result);
      }
    } catch (error) {
      console.log("Error picking images:", error);
    }
  };
  return (
    <ScrollView>
        <View style={styles.modalView}>
                {/* Image of Restaurant */}
                <ImageUploader
                  title="Image Restaurant"
                  images={images}
                  setImages={setImages}
                  urls={urls}
                  setUrls={setUrls}
                  inputUrl={inputUrl}
                  setInputUrl={setInputUrl}
                  handlePickImages={handlePickImages}
                  imageState={images}
                  allowMultipleSelection={false} // Single image selection for restaurant images
                />
                {/* Image Price */}
                <ImageUploader
                  title="Image Price"
                  images={imagesPrice}
                  setImages={setImagesPrice}
                  urls={urlsImagePrice}
                  setUrls={setUrlsImagePrice}
                  inputUrl={inputUrlPrice}
                  setInputUrl={setInputUrlPrice}
                  handlePickImages={handlePickImages}
                  imageState={imagesPrice}
                  allowMultipleSelection={true} // Multiple image selection for price images
                />
                {/* Image Album */}
                <ImageUploader
                  title="Image Album"
                  images={imagesAlbum}
                  setImages={setImagesAlbum}
                  urls={urlsImageAlbum}
                  setUrls={setUrlsImageAlbum}
                  inputUrl={inputUrlAlbum}
                  setInputUrl={setInputUrlAlbum}
                  handlePickImages={handlePickImages}
                  imageState={imagesAlbum}
                  allowMultipleSelection={true} // Multiple image selection for price images
                />
                <View className="mt-10" style={{}}>
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

                <View className="flex flex-row mt-4 justify-center">
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Close</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Add Restaurant</Text>
                  </Pressable>
                </View>
              </View>
    </ScrollView>
  )
}

export default ResInfo

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    
    backgroundColor: "white",
    // borderRadius: 20,
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
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
});
