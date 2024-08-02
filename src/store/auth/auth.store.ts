import {User} from 'firebase/auth';
import {StateCreator, create} from 'zustand';
import {
  AuthStatus,
  CLIENT,
  ClientRegisterForm,
  DELIVERY,
  DRIVER,
  GetClientByUidResponseData,
  WorkerDocument,
  WorkerRegisterForm,
  WorkerVehicle,
} from '../../interfaces';
import {AuthService, ClientService, WorkerService} from '../../services';
import {parseError} from '../../utils';

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;
  role: CLIENT | DELIVERY | DRIVER | null;
  registerForm: ClientRegisterForm | WorkerRegisterForm | any;
  image_url: string | null;
  userByUid: GetClientByUidResponseData | null;
  workerDocuments: WorkerDocument[];
  WorkerVehicle: WorkerVehicle | null;
  setUserByUid: (user: GetClientByUidResponseData) => void;
  setRole: (role: DRIVER | CLIENT | DELIVERY) => void;
  setRegisterForm: (form: ClientRegisterForm & WorkerRegisterForm) => void;
  registerImage: (image_url: string) => void;
  login: (email: string, password: string) => Promise<{ok: boolean}>;
  logout: () => void;
  checkIsAuthenticated: () => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  resetPassword: (actionCode: string, newPassword: string) => Promise<void>;
  googleSignIn: () => Promise<void>;
  addWorkerDocument: (document: WorkerDocument) => void;
  // addVehicleDocument: (document: any) => void;
}

const storeApi: StateCreator<AuthState> = (set, get) => ({
  user: undefined,
  token: undefined,
  status: 'unauthorized',

  role: null,
  userByUid: null,
  registerForm: null,
  image_url: null,
  workerDocuments: [],
  WorkerVehicle: null,

  setUserByUid: userByUid => set({userByUid}),
  setRole: role => set({role}),
  registerImage: image_url => set({image_url}),
  setRegisterForm: form => set({registerForm: form}),
  addWorkerDocument: document =>
    set(state => ({
      workerDocuments: [...state.workerDocuments, document],
    })),
  // addVehicleDocument: document =>
  //   set(state => ({
  //     WorkerVehicle: [...state.workerDocuments, document],
  //   })),

  login: async (email: string, password: string) => {
    try {
      const {user, token} = await AuthService.login(email, password);
      const userByUID = await ClientService.getClientByUid(user.uid);

      if(!userByUID) throw new Error("error at get user by uid");

      set({userByUid: userByUID});

      if (userByUID != null) {
        if (!!userByUID.cliente) {
          set({role: CLIENT});
        } else if (!!userByUID.driver) {
          set({role: DRIVER});
        } else if (!!userByUID.delivery) {
          set({role: DELIVERY});
        }
      }

      set({status: 'authorized', token, user});
      return {ok: true};
    } catch (error) {
      parseError('auth/login', error);
      set({status: 'unauthorized', token: undefined, user: undefined});
      return {ok: false};
    }
  },

  logout: () =>
    set({
      status: 'unauthorized',
      token: undefined,
      user: undefined,
      role: null,
    }),

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
