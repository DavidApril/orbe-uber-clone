import {create} from 'zustand';

interface UIState {
  isDarkMode: boolean;
  keyboardHeight: number;
  setKeyboardHeight: (height: number) => void;
  setisDarkMode: (value: boolean) => void;
}

export const useUIStore = create<UIState>()(set => ({
  isDarkMode: false,
  keyboardHeight: 0,

  setisDarkMode: value => set({isDarkMode: value}),
  setKeyboardHeight: hight => set({ keyboardHeight: hight})
}));
