import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Clipboard,
} from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import { pickImages } from "../../utils/pickImage";
import ImageUploader from "../../utils/uploadImage";
import { useNavigation, useRoute } from "@react-navigation/native";

const ResInfo = () => {
  const navigation = useNavigation();

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
            <TextInput mode="outlined" label="Description" multiline={true} />
            <TextInput mode="outlined" label="Address" multiline={true} />
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
            style={[styles.button]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.textStyle}>Turn back</Text>
          </Pressable>
          <Pressable
            style={[styles.button]}
            onPress={() => navigation}
          >
            <Text style={styles.textStyle}>Add Restaurant</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default ResInfo;

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: "white",
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
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
