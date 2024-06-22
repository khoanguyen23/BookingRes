import * as ImagePicker from 'expo-image-picker';

export const pickImages = async (multiple = false) => {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: multiple,
      quality: 1,
    });

    if (!result.canceled) {
      return multiple ? result.assets.map(asset => asset.uri) : [result.assets[0].uri];
    } else {
      return [];
    }
  } catch (error) {
    console.log("Error picking images:", error);
    return [];
  }
};
