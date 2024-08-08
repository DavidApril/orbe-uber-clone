import {API_PREFIX, API_URL} from '@env';
import {orbeApi} from '../../config/api';
import {parseError} from '../../utils';
import RNFS from 'react-native-fs';

export class StorageService {
  static PREFIX: string = 'storage';

  static uploadPhoto = async (file: FormData) => {
    try {
      const response = await orbeApi.postForm(`/${this.PREFIX}/uploadImage`, file);
      return {ok: true, image: response.data.imageUrl};
    } catch (error) {
      parseError(this.PREFIX + '/uploadImage', error);
    }
    console.log(file)
  };

  static getPhotoByFilename = (filename: string) => {
    const src = `${API_URL}/${API_PREFIX}/${this.PREFIX}?fileName=${filename}`;
    return src;
  };

  static getPhotoFromCache = (filename: string) => {
    const src = `file:///data/user/0/com.orbe.www/cache/${filename}`;
    return src;
  };


  static async convertToBlob(fileName: string) {
    try {
      // Obtener la ruta completa
      const filePath = `${RNFS.TemporaryDirectoryPath}/${fileName}`;

      // Leer el archivo como base64
      const base64Data = await RNFS.readFile(filePath, 'base64');

      // Convertir a Blob
      const blob = new Blob([base64Data], { type: 'image/jpeg', lastModified: 1 });

      return blob;
    } catch (error) {
      console.error('Error al convertir el archivo a Blob:', error);
      return null;
    }
  }
}
