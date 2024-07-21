import {createUserWithEmailAndPassword} from 'firebase/auth';
import {orbeApi} from '../../config/api';
import {DriverRegisterForm, DriverResponseByUid} from '../../interfaces';
import {auth} from '../../config/firebase/config';

export class DriverService {
  static take: number = 6;

  static createDriver = async (driver: DriverRegisterForm) => {
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
          imageUrl: 'driver.image',
          documents: [],
          vehicles: [],
        },
        roles: [
          {
            name: 'DRIVER',
          },
        ],
      });

      return response.data

    } catch (error) {
      console.log(error);
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
