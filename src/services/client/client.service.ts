import {createUserWithEmailAndPassword} from 'firebase/auth';
import {orbeApi} from '../../config/api';
import {ClientRegisterForm} from '../../interfaces';
import {auth} from '../../config/firebase/config';

export class ClientService {
  static take: number = 6;

  static createClient = async (client: ClientRegisterForm) => {
    if (!client.email || !client.password) {
      return {message: 'Email or password not registered'};
    }

    try {
      const {user} = await createUserWithEmailAndPassword(
        auth,
        client.email,
        client.password,
      );

      const {data: response} = await orbeApi.post('/user/createClient', {
        email: client.email,
        password: client.password,
        createWithEmailAndPassword: false,
        uid: user.uid,
        client: {
          name: client.firstName + ' ' + client.lastName,
          phone: client.phone,
          photo: 'client.image',
        },
        roles: [
          {
            name: 'CLIENTE',
          },
        ],
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
}
