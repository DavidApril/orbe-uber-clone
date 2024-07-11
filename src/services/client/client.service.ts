import {orbeApi} from '../../config/api';
import {ClientRegisterForm} from '../../interfaces';

export class ClientService {
  static take: number = 6;

  static createClient = async (client: ClientRegisterForm) => {
    try {
      const {data: response} = await orbeApi.post('/user/createClient', {
        email: client.email,
        password: client.password,
        createWithEmailAndPassword: true,
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
