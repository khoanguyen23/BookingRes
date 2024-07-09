import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import { TextInput } from "react-native-paper";
import { pickImages } from "../../utils/pickImage";
import ImageUploader from "../../utils/uploadImage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";
import { API_URL } from "@env";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AntDesign} from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";

const ResInfo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { longitude, latitude } = route.params || {};

  const [images, setImages] = useState([]);
  const [imagesPrice, setImagesPrice] = useState([]);
  const [imagesAlbum, setImagesAlbum] = useState([]);

  const [urls, setUrls] = useState([]);
  const [urlsImagePrice, setUrlsImagePrice] = useState([]);
  const [urlsImageAlbum, setUrlsImageAlbum] = useState([]);

  const [inputUrl, setInputUrl] = useState("");
  const [inputUrlPrice, setInputUrlPrice] = useState("");
  const [inputUrlAlbum, setInputUrlAlbum] = useState("");

  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [times, setTimes] = useState([]);
  const [show, setShow] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [openingHours, setOpeningHours] = useState("");

  const onChange = (event, selectedTime) => {
    if (event.type === "set" && selectedTime) {
      setTimes([...times, selectedTime]);
    }
    setShow(Platform.OS === "ios");
  };

  const showTimepicker = () => {
    setShow(true);
  };

  const formatTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? "0" + minutes : minutes;
    const strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };

  async function fetchCategories() {
    try {
      const response = await fetch(`${API_URL}/categories`);
      const data = await response.json();
      let newArray = data.map((item) => {
        return { key: item._id, value: item.name };
      });
      setCategories(newArray);
      setLoading(false);
    } catch (error) {
      setError("Error fetching categories");
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

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

  const removeTime = (index) => {
    setTimes(times.filter((_, i) => i !== index));
  };

  const uploadImage = async (imageUri) => {
    const formData = new FormData();
    if (imageUri.startsWith("http")) {
      formData.append("file", imageUri);
    } else {
      formData.append("file", {
        uri: imageUri,
        type: "image/jpeg",
        name: "upload.jpg",
      });
    }
    formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET_RES);
  
    try {
      const response = await axios.post(
        process.env.CLOUDINARY_UPLOAD_URL,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Cloudinary response:", response.data); // Log the entire response data
      if (response.data.secure_url) {
        console.log("Image uploaded successfully:", response.data.secure_url);
        return response.data.secure_url;
      } else {
        console.error("Failed to upload image:", response.data);
        return null;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };
  

  const handleAddRestaurant = async () => {
    try {
      console.log("Images to upload:", images);
      const imageUrls = await Promise.all(
        images.map((image) => uploadImage(image))
      );
      console.log("Uploaded image URLs:", imageUrls);

      const imagePriceUrls = await Promise.all(
        imagesPrice.map((image) => uploadImage(image))
      );
      const imageAlbumUrls = await Promise.all(
        imagesAlbum.map((image) => uploadImage(image))
      );

      const filteredImageUrls = imageUrls.filter((url) => url !== null);
      const filteredImagePriceUrls = imagePriceUrls.filter(
        (url) => url !== null
      );
      const filteredImageAlbumUrls = imageAlbumUrls.filter(
        (url) => url !== null
      );

      const restaurantData = {
        name,
        description,
        image: filteredImageUrls[0],
        address,
        location: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
        rating: 4, // Default rating
        type: selected,
        bookingHours: times.map((time) => formatTime(time)),
        imagePrice: filteredImagePriceUrls.map((url) => ({ image: url })),
        album: filteredImageAlbumUrls.map((url) => ({ image: url })),
        openingHours,
      };

      const response = await fetch(`${API_URL}/restaurants`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(restaurantData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Restaurant added successfully", data);
        navigation.navigate("ResAdmin");
      } else {
        console.error("Failed to add restaurant");
      }
    } catch (error) {
      console.error("Error adding restaurant:", error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.modalView}>
        {longitude && latitude ? (
          <View style={styles.modalView}>
            <Text className="text-base">Restaurant address selected :</Text>
            <Text className="text-base mt-2">Longitude: {longitude}</Text>
            <Text className="text-base mt-2">Latitude: {latitude}</Text>
          </View>
        ) : (
          <View className="border-dashed border p-4 border-red-400 mb-4">
            <View className="flex flex-row space-x-2 items-center justify-center">
              <AntDesign name="warning" size={30} color="red" />
              <Text className="text-base text-red-600 font-bold">
                Longitude and Latitude is missing !!!
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="flex flex-row mt-3 justify-center items-center bg-red-300 p-2 rounded-lg"
            >
              <Ionicons name="chevron-back" size={24} color="white" />
              <Text className="font-bold text-white uppercase">
                Turn back to fill
              </Text>
            </TouchableOpacity>
          </View>
        )}
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
            <TextInput
              mode="outlined"
              label="Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              mode="outlined"
              label="Description"
              multiline={true}
              value={description}
              onChangeText={setDescription}
            />
            <TextInput
              mode="outlined"
              label="Address"
              multiline={true}
              value={address}
              onChangeText={setAddress}
            />
            <TouchableOpacity
              onPress={showTimepicker}
              className="border p-3 rounded border-slate-500"
            >
              <Text className="text-base">Pick a time</Text>
            </TouchableOpacity>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date()}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
            {times.length > 0 && (
              <View className="border p-2 rounded-lg border-slate-500">
                <ScrollView>
                  <View className="flex-row flex-wrap items-center justify-around">
                    {times.map((time, index) => (
                      <TouchableOpacity
                        key={index}
                        style={{
                          position: "relative",
                          backgroundColor: "#D0D0D0",
                          padding: 10,
                          alignItems: "center",
                          borderRadius: 20,
                          borderColor: "#D0D0D0",
                          borderWidth: 1.5,
                          marginTop: 5,
                          color: "#333333",
                          textAlign: "center",
                          marginBottom: 5,
                        }}
                        onPress={() => removeTime(index)}
                      >
                        <Text>{formatTime(time)}</Text>
                        <View
                          style={{
                            position: "absolute",
                            top: -5,
                            right: -5,
                            width: 20,
                            height: 20,
                            backgroundColor: "#999999",
                            borderRadius: 10,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Text style={{ color: "#fff" }}>X</Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>
            )}
            <TextInput
              mode="outlined"
              label="Opening Hours"
              value={openingHours}
              onChangeText={setOpeningHours}
            />
          </View>
        </View>
        <View
          className="mt-4"
          // style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {/* <Text>Type:</Text> */}
          {error && <Text style={{ color: "red" }}>{error}</Text>}
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <SelectList setSelected={setSelected} data={categories} />
          )}
        </View>
        <TouchableOpacity
          onPress={handleAddRestaurant}
          style={{
            padding: 15,
            borderRadius: 10,
            backgroundColor: "#333333",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ color: "#fff" }}>Add Restaurant</Text>
        </TouchableOpacity>
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
