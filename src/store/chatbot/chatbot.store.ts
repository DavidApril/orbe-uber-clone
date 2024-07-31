import {create} from 'zustand';
import {Message} from '../../interfaces';

interface ChatBotState {
  chat_history: Message[];
  loadingAnswer: boolean;
  
  setNewMessage: (message: Message) => void;
  setLoadingAnswer: (value: boolean) => void;
}

export const useChatbotStore = create<ChatBotState>()((set, get) => ({
  chat_history: [],
  loadingAnswer: false,

  setNewMessage: message => {
    set({chat_history: [...get().chat_history, message]});
  },
  setLoadingAnswer: (value) => set({ loadingAnswer: false })
}));
