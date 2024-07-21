import {AxiosError} from 'axios';
import {FirebaseError} from 'firebase/app';
import {
  GoogleAuthProvider,
  UserCredential,
  confirmPasswordReset,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  verifyPasswordResetCode,
} from 'firebase/auth';
import {auth} from '../../config/firebase/config';
import {INVALID_CREDENTIALS} from '../../interfaces';
import {orbeApi} from '../../config/api';

export class AuthService {
  static login = async (
    email: string,
    password: string,
  ): Promise<UserCredential & {token: string}> => {
    try {
      // const response = await signInWithEmailAndPassword(auth, email, password);
      const response = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await response.user.getIdToken();

      // const token = await this.sendIdToken(idToken);

      return {...response, token: idToken};
    } catch (error) {
      // Axios error
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        throw new Error(error.response?.data);
      }

      // Firebase error
      if (error instanceof FirebaseError) {
        if (error.code === INVALID_CREDENTIALS.code) {
          throw new Error(INVALID_CREDENTIALS.message);
        }
      }

      throw new Error('Unable to login');
    }
  };

  static googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const {user} = await signInWithPopup(auth, provider);
      const idToken = await user.getIdToken();
      return {user, token: idToken};
    } catch (error) {
      console.log(error);
      throw new Error('Error at sign in with google');
    }
  };

  static sendPasswordResetEmail = async (email: string) => {
    const actionCodeSettings = {
      url: 'http://localhost:3000/cambiar_contrase-a',
    };
    try {
      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      return {ok: true};
    } catch (error) {
      console.log(error);
      throw new Error('Error at send email');
    }
  };

  static resetPassword = async (actionCode: string, newPassword: string) => {
    try {
      await verifyPasswordResetCode(auth, actionCode);
      await confirmPasswordReset(auth, actionCode, newPassword);
    } catch (error) {
      console.log(error);
      throw new Error('Error at reset passoword');
    }
  };

  // Backend not implemented
  static checkIsAuthenticated = async () => {
    try {
      // TODO: const response = await orbeApi.get('/auth/is_authenticated');
      // return { ...response };
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        throw new Error(error.response?.data);
      }

      console.log(error);
      throw new Error('failure to send token');
    }
  };

  // Backend partially implemented
  static sendIdToken = async (idToken: string) => {
    try {
      const {data: token} = await orbeApi.post('/auth/login', {
        token: idToken,
      });
      return token;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        throw new Error(error.response?.data);
      }

      console.log(error);
      throw new Error('failure to send token');
    }
  };

  // Backend not implemented
  static refreshToken = async () => {
    try {
      const response = await orbeApi.get('/auth/refresh');
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        throw new Error(error.response?.data);
      }

      console.log(error);
      throw new Error('failure to send token');
    }
  };
}
