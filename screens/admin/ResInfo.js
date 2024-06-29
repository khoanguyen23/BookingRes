import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Clipboard,
  Button,
  Platform,
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
import { ActionSheet, Cell } from "@nutui/nutui-react-native";

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

  const [times, setTimes] = useState([]);
  const [show, setShow] = useState(false);

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
    hours = hours ? hours : 12; // Giờ 0 phải chuyển thành 12
    minutes = minutes < 10 ? "0" + minutes : minutes;
    const strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
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
            <View className="border p-2 rounded-lg border-slate-500">
              <ScrollView>
                <View className="flex-row flex-wrap items-center justify-around">
                  {times.map((time, index) => (
                    <TouchableOpacity
                      key={index}
                      style={{
                        backgroundColor: "#D0D0D0",
                        padding: 10,
                        // width: "25%",
                        alignItems: "center",
                        borderRadius: 20,
                        borderColor: "#D0D0D0",
                        borderWidth: 1.5,
                        marginTop: 5,
                        color: "#666666",
                        fontWeight: "bold",
                        fontSize: 17,
                        marginRight: 7,
                      }}
                    >
                      <Text
                        style={{
                          color: "#666666",
                          fontWeight: "bold",
                          fontSize: 17,
                        }}
                      >
                        {formatTime(time)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
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
