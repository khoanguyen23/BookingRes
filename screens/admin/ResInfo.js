import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Clipboard,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import { TextInput } from "react-native-paper";
import { pickImages } from "../../utils/pickImage";
import ImageUploader from "../../utils/uploadImage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import { API_URL } from "@env";
import DateTimePicker from "@react-native-community/datetimepicker";

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

  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [time, setTime] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShow(Platform.OS === "ios");
    setTime(currentTime);
  };

  const showTimepicker = () => {
    setShow(true);
  };

  async function fetchCategories() {
    try {
      const response = await fetch(`${API_URL}/categories`);

      const data = await response.json();
      console.log(data);
      let newArray = data.map((item) => {
        return { key: item._id, value: item.name };
      });
      console.log("new array: ", newArray);
      setCategories(newArray);

      setLoading(false);
      // console.log("categories:", data);
    } catch (error) {
      setError("Error fetching categories");
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  const data = [
    { key: "1", value: "Mobiles", disabled: true },
    { key: "2", value: "Appliances" },
    { key: "3", value: "Cameras" },
    { key: "4", value: "Computers", disabled: true },
    { key: "5", value: "Vegetables" },
    { key: "6", value: "Diary Products" },
    { key: "7", value: "Drinks" },
  ];

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
  // console.log("pick select categories", categories)
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
            <Button onPress={showTimepicker} title="Show Time Picker" />
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={time}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
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
          <View className="mt-4">
            <SelectList
              setSelected={(val) => setSelected(val)}
              data={categories}
              save="value"
              // onSelect={() => alert(selected)}
              label="Categories"
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
          <Pressable style={[styles.button]} onPress={() => navigation}>
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
