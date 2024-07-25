import {createUserWithEmailAndPassword} from 'firebase/auth';
import {orbeApi} from '../../config/api';
import {
  ClientRegisterForm,
  ClientResponseByUid,
  DELIVERY,
  DRIVER,
  DriverRegisterForm,
  DriverResponseByUid,
} from '../../interfaces';
import {auth} from '../../config/firebase/config';
import {DeliveryRegisterForm} from '../../interfaces/delivery.interfaces';

export class UserService {
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

  static createDriver = async (
    driver: DriverRegisterForm,
    image_url: string,
  ) => {
    if (!driver.email || !driver.password) return;

    try {
      const {user} = await createUserWithEmailAndPassword(
        auth,
        driver.email,
        driver.password,
      );

      const {data: response} = await orbeApi.post('/worker/create', {
        email: driver.email,
        password: driver.password,
        uid: user.uid,
        createWithEmailAndPassword: false,
        driver: {
          identification: driver.identification,
          name: driver.firstName,
          lastName: driver.lastName,
          phone: driver.phone,
          imageUrl: image_url,
          documents: [],
          vehicles: [],
        },
        roles: [
          {
            name: DRIVER,
          },
        ],
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  static createDelivery = async (
    delivery: DeliveryRegisterForm,
    image_url: string,
  ) => {
    const {user} = await createUserWithEmailAndPassword(
      auth,
      delivery.email,
      delivery.password,
    );

    const {data} = await orbeApi.post('/worker/create', {
      email: delivery.email,
      password: delivery.password,
      uid: user.uid,
      createWithEmailAndPassword: false,
      delivery: {
        identification: delivery.identification,
        name: delivery.firstName,
        lastName: delivery.lastName,
        phone: delivery.lastName,
        imageUrl: image_url,
        documents: [],
        vehicles: [],
      },
      roles: [
        {
          name: DELIVERY,
        },
      ],
    });

    return data;
  };

  static getClientByUid = async (
    uid: string,
  ): Promise<ClientResponseByUid | undefined> => {
    try {
      // wmr4VwQyQQTpJSQLgZmiClncNci2
      const {data: response} = await orbeApi.get(
        `/user/getUserByUid?uid_firebase=${uid}`,
      );

      return response.data;
    } catch (error) {
      console.log({error});
      return undefined;
    }
  };

  static getDriverByUserUid = async (
    uid: string,
  ): Promise<DriverResponseByUid | undefined> => {
    try {
      const {data: DriverResponse}: {data: DriverResponseByUid} =
        await orbeApi.get(`/worker/getDriversByUid?uid=${uid}`);
      return DriverResponse;
    } catch (error) {
      console.log({error});
    }
  };
}
