import {create} from 'zustand';
import { Message } from '../../interfaces';

interface ChatBotState {
  chat_history: Message[];
  setNewMessage: (message: Message) => void;
}

export const useChatbotStore = create<ChatBotState>()((set, get) => ({
  chat_history: [],

  setNewMessage: message => {
    set({chat_history: [...get().chat_history, message]});
  },
}));
