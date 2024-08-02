import AsyncStorage from '@react-native-async-storage/async-storage';
import {parseError} from '../../utils';

export class StorageAdapter {
  static PREFIX: string = 'storage-adapter';

  static async getItem(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  static async setItem(key: string, value: string) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      throw new Error(`Error setting item ${key} ${value}`);
    }
  }

  static async removeItem(key: string) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      parseError(this.PREFIX + '/remove-item', error);
    }
  }
}
