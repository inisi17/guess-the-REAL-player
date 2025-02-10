import AsyncStorage from '@react-native-async-storage/async-storage';

const getItem = async (key: string) => {
  try {
    const item = await AsyncStorage.getItem(key);

    return item && JSON.parse(item);
  } catch (e) {
    console.warn(`Failed to get data: ${e}`);
  }
};

const setItem = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.warn(`Failed to set data: ${e}`);
  }
};

const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.warn(`Failed to remove data: ${e}`);
  }
};

export { getItem, setItem, removeItem };
