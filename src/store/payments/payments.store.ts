import {StateCreator, create} from 'zustand';
import {ICreditCard} from '../../interfaces';
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';

export interface PaymentState {
  creditCardsTokens: ICreditCard[];
  isPaying: boolean;
  creditCardsSelected: ICreditCard | null;

  payWithCard: boolean;

  addTarjetBottomSheetRef: React.RefObject<BottomSheetMethods> | null;

  pay: () => Promise<void>;
  setIsPaying: (value: boolean) => void;

  setCreditCardsTokens: (tokens: ICreditCard[]) => void;
  setAddTarjetBottomSheetRef: (value: any) => void;
  setCreditCardsSelected: (creditCard: ICreditCard) => void;
  setPayWithCard: (value: boolean) => void;
}

const storeApi: StateCreator<PaymentState> = (set, get) => ({
  payWithCard: false,
  creditCardsTokens: [],
  isPaying: false,
  addTarjetBottomSheetRef: null,
  creditCardsSelected: null,

  pay: async () => {},
  setIsPaying: value => set({isPaying: value}),
  setCreditCardsTokens: tokens => set({creditCardsTokens: tokens}),
  setAddTarjetBottomSheetRef: (value: any) =>
    set({addTarjetBottomSheetRef: value}),
  setCreditCardsSelected: (creditCard: ICreditCard | null) =>
    set({creditCardsSelected: creditCard}),
  setPayWithCard: value => set({payWithCard: value}),
});

export const usePaymentStore = create<PaymentState>()(storeApi);
