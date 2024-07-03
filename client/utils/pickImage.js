import * as ImagePicker from 'expo-image-picker';

export const pickImages = async (currentImages = [], multiple = false) => {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: multiple,
      quality: 1,
    });

    if (!result.canceled) {
      let newImages = [];

      if (multiple) {
        newImages = [...currentImages, ...result.assets.map(asset => asset.uri)];
      } else {
        newImages = [...currentImages, result.assets[0].uri];
      }

      return newImages;
    } else {
      return currentImages;
    }
  } catch (error) {
    console.log("Error picking images:", error);
    return currentImages;
  }
};
