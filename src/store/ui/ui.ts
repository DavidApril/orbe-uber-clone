import {create} from 'zustand';
import {PermissionStatus} from '../../interfaces';
import {PermissionsService} from '../../services';

interface UIState {
  isDarkMode: boolean;

  setIsDarkMode: (value: boolean) => void;
}

export const useUIStore = create<UIState>()(set => ({
  isDarkMode: false,
  setIsDarkMode: value => set({isDarkMode: value}),
}));
