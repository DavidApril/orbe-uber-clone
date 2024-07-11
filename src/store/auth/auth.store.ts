import {User} from 'firebase/auth';
import {StateCreator, create} from 'zustand';
import {AuthStatus, CLIENT, DRIVER} from '../../interfaces';
import {AuthService} from '../../services/auth/auth.service';
import {UsersService} from '../../services';

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  role: 'CLIENTE' | 'DRIVER' | null;

  login: (email: string, password: string) => Promise<{ok: boolean}>;
  logout: () => void;
  checkIsAuthenticated: () => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  resetPassword: (actionCode: string, newPassword: string) => Promise<void>;
  googleSignIn: () => Promise<void>;
}

const storeApi: StateCreator<AuthState> = (set, get) => ({
  status: 'unauthorized',
  token: undefined,
  user: undefined,

  role: null,

  login: async (email: string, password: string) => {
    try {
      const {user, token} = await AuthService.login(email, password);
      const userByUID = await UsersService.getUserByUid(user.uid);

      const role = !userByUID ? DRIVER : CLIENT;

      set({status: 'authorized', token, user, role});
      return {ok: true};
    } catch (error) {
      set({status: 'unauthorized', token: undefined, user: undefined});
      return {ok: false};
    }
  },

  logout: () =>
    set({status: 'unauthorized', token: undefined, user: undefined}),

  checkIsAuthenticated: async () => {
    try {
      // await AuthService.checkIsAuthenticated();
      const token = get().token;
      const user = get().user;
      set({status: 'authorized', token, user});
    } catch (error) {
      set({status: 'unauthorized', token: undefined, user: undefined});
    }
  },

  sendPasswordResetEmail: async (email: string) => {
    try {
      await AuthService.sendPasswordResetEmail(email);
    } catch (error) {
      throw error;
    }
  },

  resetPassword: async (actionCode, newPassword) => {
    try {
      await AuthService.resetPassword(actionCode, newPassword);
    } catch (error) {
      throw error;
    }
  },

  googleSignIn: async () => {
    try {
      const {token, user} = await AuthService.googleSignIn();
      set({status: 'authorized', token, user});
    } catch (error) {
      throw error;
    }
  },
});

export const useAuthStore = create<AuthState>()(storeApi);
