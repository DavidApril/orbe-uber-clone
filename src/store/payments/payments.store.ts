import {StateCreator, create} from 'zustand';
import {ICreditCard} from '../../interfaces';
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';

export interface PaymentState {
  creditCardsTokens: ICreditCard[];
  isPaying: boolean;
  creditCardsSelected: ICreditCard | null;

  addTarjetBottomSheetRef: React.RefObject<BottomSheetMethods> | null;

  pay: () => Promise<void>;
  setIsPaying: (value: boolean) => void;

  setCreditCardsTokens: (tokens: ICreditCard[]) => void;
  setAddTarjetBottomSheetRef: (value: any) => void;
  setCreditCardsSelected: (creditCard: ICreditCard) => void;
}

const storeApi: StateCreator<PaymentState> = (set, get) => ({
  creditCardsTokens: [{token: '456'}, {token: '123'}],
  isPaying: false,
  addTarjetBottomSheetRef: null,
  creditCardsSelected: {token: '123'},

  pay: async () => {},
  setIsPaying: value => set({isPaying: value}),
  setCreditCardsTokens: tokens => set({creditCardsTokens: tokens}),
  setAddTarjetBottomSheetRef: (value: any) =>
    set({addTarjetBottomSheetRef: value}),
  setCreditCardsSelected: (creditCard: ICreditCard | null) => set({ creditCardsSelected: creditCard}),
});

export const usePaymentStore = create<PaymentState>()(storeApi);
