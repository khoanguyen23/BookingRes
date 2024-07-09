import {
  View,
  Text,
  StyleSheet,
  Clipboard,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React from "react";
import { FontAwesome6 } from "@expo/vector-icons";

const ImageUploader = ({
  title,
  images,
  setImages,
  urls,
  setUrls,
  inputUrl,
  setInputUrl,
  handlePickImages,
  imageState,
  allowMultipleSelection,
}) => {
  const handlePaste = async () => {
    const clipboardContent = await Clipboard.getString();
    if (clipboardContent) {
      const uploadedUrl = await uploadImage(clipboardContent); // Upload image from URL
      if (uploadedUrl) {
        setUrls([...urls, uploadedUrl]);
        setInputUrl("");
      }
    }
  };

  const handleAddUrl = async () => {
    if (inputUrl) {
      const uploadedUrl = await uploadImage(inputUrl); // Upload image from URL
      if (uploadedUrl) {
        setUrls([...urls, uploadedUrl]);
        setInputUrl("");
      }
    }
  };

  const removeImage = (index) => {
    if (index < images.length) {
      setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    } else {
      const updatedUrls = [...urls];
      updatedUrls.splice(index - images.length, 1);
      setUrls(updatedUrls);
    }
  };

  return (
    <View>
      <Text className="text-xl">{title}</Text>
      <TouchableOpacity
        onPress={() =>
          handlePickImages(imageState, setImages, allowMultipleSelection)
        }
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
          onChangeText={setInputUrl}
        />
        <TouchableOpacity onPress={handlePaste} style={styles.button}>
          <Text style={styles.buttonText}>Paste</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAddUrl} style={styles.button}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default ImageUploader;

const styles = StyleSheet.create({
  button: {
    marginTop: 35,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  tinyLogo: {
    width: "100%",
    height: 250,
    objectFit: "cover",
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
