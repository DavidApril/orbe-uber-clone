import {StateCreator, create} from 'zustand';
import {ICreditCard, ITransaction} from '../../interfaces';
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';

export interface PaymentState {
  creditCardsTokens: ICreditCard[];
  isPaying: boolean;
  creditCardsSelected: ICreditCard | null;

  transactionsByUser: ITransaction[];
  transactionSelected: ITransaction | null;

  payWithCard: boolean;

  addTarjetBottomSheetRef: React.RefObject<BottomSheetMethods> | null;

  pay: () => Promise<void>;
  setIsPaying: (value: boolean) => void;
  setTransactionsByUser: (transaction: ITransaction[]) => void;
  setCreditCardsTokens: (tokens: ICreditCard[]) => void;
  setAddTarjetBottomSheetRef: (value: any) => void;
  setCreditCardsSelected: (creditCard: ICreditCard) => void;
  setPayWithCard: (value: boolean) => void;
  setTransactionSelected: (transaction: ITransaction) => void;
}

const storeApi: StateCreator<PaymentState> = (set, get) => ({
  payWithCard: false,
  creditCardsTokens: [],
  isPaying: false,
  transactionsByUser: [],
  addTarjetBottomSheetRef: null,
  creditCardsSelected: null,
  transactionSelected: null,

  pay: async () => {},
  setIsPaying: value => set({isPaying: value}),
  setCreditCardsTokens: tokens => set({creditCardsTokens: tokens}),
  setAddTarjetBottomSheetRef: (value: any) =>
    set({addTarjetBottomSheetRef: value}),
  setCreditCardsSelected: (creditCard: ICreditCard | null) =>
    set({creditCardsSelected: creditCard}),
  setPayWithCard: value => set({payWithCard: value}),
  setTransactionsByUser: transaction => set({transactionsByUser: transaction}),
  setTransactionSelected: transaction =>
    set({transactionSelected: transaction}),
});

export const usePaymentStore = create<PaymentState>()(storeApi);
