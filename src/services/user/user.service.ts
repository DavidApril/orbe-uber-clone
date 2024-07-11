import {orbeApi} from '../../config/api';

export class UserService {
  static getUserByUid = async (uid: string) => {
    try {
      const {data: response} = await orbeApi.get(
        `/user/getUserByUid?uid_firebase=${uid}`,
      );

      return response.data;
    } catch (error) {
      // console.log({error});
      return false;
    }
  };
}
