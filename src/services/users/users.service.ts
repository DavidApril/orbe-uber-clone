import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../config/firebase/config';

export class UsersService {
  static async createUserWithEmailAndPassword(email: string, password: string) {
    const newUser = await createUserWithEmailAndPassword(auth, email, password);
    console.log(newUser);
  }

  static async registerUser() {}
}
