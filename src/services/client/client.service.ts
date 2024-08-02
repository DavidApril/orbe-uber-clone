import {createUserWithEmailAndPassword} from 'firebase/auth';
import {orbeApi} from '../../config/api';
import {
  CLIENT,
  ClientRegisterForm,
  ClientUpdatedForm,
  CreateClienteResponse,
  GetClientByUidResponse,
  GetClientByUidResponseData,
} from '../../interfaces';
import {auth} from '../../config/firebase/config';
import {parseError} from '../../utils';
import axios from 'axios';

export class ClientService {
  static PREFIX = 'user';

  static createClient = async (client: ClientRegisterForm) => {
    try {
      const {user} = await createUserWithEmailAndPassword(
        auth,
        client.email,
        client.password,
      );

      const {data: response}: {data: CreateClienteResponse} =
        await orbeApi.post(`/${this.PREFIX}/createClient`, {
          email: client.email,
          password: client.password,
          createWithEmailAndPassword: false,
          uid: user.uid,
          client: {
            name: client.firstName + ' ' + client.lastName,
            phone: client.phone,
            photo: client.image,
          },
          roles: [
            {
              name: CLIENT,
            },
          ],
        });

      return response.data;
    } catch (error) {
      parseError(this.PREFIX + 'createClient', error);
    }
  };

  static getClientByEmail = async (email: string) => {
    try {
      // TODO: response interface
      const {data: response}: {data: any} = await orbeApi.get(
        `/${this.PREFIX}/getUserByUid?email=${email}`,
      );

      return response.data;
    } catch (error) {
      parseError('getUserByUid', error);

      return undefined;
    }
  };

  static getClientByUid = async (uid: string) => {
    try {
      
      const {data: response} = await axios.get(
        `https://orbeapi.devzeros.com/api_v1/user/getUserByUid?uid_firebase=${uid}`,
      );

      return response.data;
    } catch (error) {
      parseError('getUserByUid', error);

      return undefined;
    }
  };
  static updateClient = async (clientUpdated: ClientUpdatedForm) => {
    try {
      // TODO: response interface
      const {data: response} = await orbeApi.put(
        `/${this.PREFIX}/updateClient`,
        clientUpdated,
      );

      return response.data;
    } catch (error) {
      parseError('updateClient', error);

      return undefined;
    }
  };
}
