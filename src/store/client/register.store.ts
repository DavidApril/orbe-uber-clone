import {create} from 'zustand';
import {ClientRegisterForm} from '../../interfaces';

interface ClientState {
  clientRegisterForm: ClientRegisterForm | null;
  setClientRegisterForm: (clientRegisterForm: ClientRegisterForm) => void;
}

export const useClientStore = create<ClientState>()(set => ({
  clientRegisterForm: null,

  setClientRegisterForm: clientRegisterForm =>
    set(state => ({
      clientRegisterForm: {...state.clientRegisterForm, ...clientRegisterForm},
    })),
}));
