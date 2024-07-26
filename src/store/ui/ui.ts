import {create} from 'zustand';

interface UIState {
  isDarkMode: boolean;

  setisDarkMode: (value: boolean) => void;
}

export const useUIStore = create<UIState>()(set => ({
  isDarkMode: false,
  setisDarkMode: value => set({isDarkMode: value}),
}));
