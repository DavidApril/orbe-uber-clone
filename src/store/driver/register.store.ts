import {create} from 'zustand';
import {DriverRegisterForm} from '../../interfaces';

interface DriverState {
  driverRegisterForm: DriverRegisterForm | null;
  setDriverRegisterForm: (driverRegisterForm: DriverRegisterForm) => void;
}

export const useDriverStore = create<DriverState>()(set => ({
  driverRegisterForm: null,

  setDriverRegisterForm: driverRegisterForm =>
    set(state => ({
      driverRegisterForm: {...state.driverRegisterForm, ...driverRegisterForm},
    })),
}));
