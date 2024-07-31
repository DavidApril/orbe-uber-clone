import {API_PREFIX, API_URL} from '@env';
import {orbeApi} from '../../config/api';

export class StorageService {
  static uploadPhoto = async (file: FormData) => {
    try {
      await orbeApi.postForm(`/storage/uploadImage`, file);
      return {ok: true};
    } catch (error) {
      return {ok: false};
    }
  };

  static getPhotoByFilename = (filename: string) => {
    const src = `https://orbeapi.devzeros.com/${API_PREFIX}/storage?fileName=${filename}`;
    return src;
  };

  static getPhotoFromCache = (filename: string) => {
    const src = `file:///data/user/0/com.orbe.www/cache/${filename}`
    return src
  }
}
