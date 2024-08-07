import {API_PREFIX, API_URL} from '@env';
import {orbeApi} from '../../config/api';
import {parseError} from '../../utils';

export class StorageService {
  static PREFIX: string = 'storage';

  static uploadPhoto = async (file: FormData) => {
    try {
      await orbeApi.postForm(`/${this.PREFIX}/uploadImage`, file);
      return {ok: true};
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
}
