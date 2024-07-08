import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../config/firebase/config';
import {orbeApi} from '../../config/api';
import {DriverRegisterForm} from '../../interfaces';

export class UsersService {
  static async createUserWithEmailAndPassword(email: string, password: string) {
    const newUser = await createUserWithEmailAndPassword(auth, email, password);
    console.log(newUser);
  }

  static async createDriver(driver: DriverRegisterForm) {
    try {
      const {data: response} = await orbeApi.post('/worker/create', {
        email: driver.email,
        password: driver.password,
        createWithEmailAndPassword: true,
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

      console.log({response});
    } catch (error) {
      console.log(error);
    }
  }

  static async registerUser() {}
}
