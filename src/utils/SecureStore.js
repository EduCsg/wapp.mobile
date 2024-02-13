import * as SecureStore from "expo-secure-store";
import { CACHE_KEYS } from "../constants/Cache";

export async function storeInCache(key, value) {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.error(error);
  }
}

export async function getFromCache(key) {
  try {
    const result = await SecureStore.getItemAsync(key);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function clearCache() {
  try {
    await SecureStore.deleteItemAsync(CACHE_KEYS.USER_DATA);
    await SecureStore.deleteItemAsync(CACHE_KEYS.TOKEN);
  } catch (error) {
    console.error(error);
  }
}
