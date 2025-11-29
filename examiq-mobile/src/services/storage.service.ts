// TODO: Implement Storage service (AsyncStorage wrapper)
import AsyncStorage from '@react-native-async-storage/async-storage';

export class StorageService {
  // TODO: Implement get item
  async getItem(key: string): Promise<string | null> {
    // Add get item logic here
    return await AsyncStorage.getItem(key);
  }

  // TODO: Implement set item
  async setItem(key: string, value: string): Promise<void> {
    // Add set item logic here
    await AsyncStorage.setItem(key, value);
  }

  // TODO: Implement remove item
  async removeItem(key: string): Promise<void> {
    // Add remove item logic here
    await AsyncStorage.removeItem(key);
  }

  // TODO: Implement clear all
  async clear(): Promise<void> {
    // Add clear all logic here
    await AsyncStorage.clear();
  }
}

export default new StorageService();

