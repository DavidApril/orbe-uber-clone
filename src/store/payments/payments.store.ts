import {StateCreator, create} from 'zustand';
import {ICreditCard, ITransaction, PaymentDetails} from '../../interfaces';
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {PaymentService} from '../../services';

export interface PaymentState {
  creditCardsTokens: ICreditCard[];
  isPaying: boolean;
  creditCardsSelected: ICreditCard | null;
  rechargeValue: string;
  transactionsByUser: ITransaction[];
  transactionSelected: ITransaction | null;

  payWithCard: boolean;

  addTarjetBottomSheetRef: React.RefObject<BottomSheetMethods> | null;

  pay: (payment: PaymentDetails) => Promise<void>;
  setIsPaying: (value: boolean) => void;
  setTransactionsByUser: (transaction: ITransaction[]) => void;
  setCreditCardsTokens: (tokens: ICreditCard[]) => void;
  setAddTarjetBottomSheetRef: (value: any) => void;
  setCreditCardsSelected: (creditCard: ICreditCard | null) => void;
  setPayWithCard: (value: boolean) => void;
  setTransactionSelected: (transaction: ITransaction) => void;
  setRechargeValue: (values: string) => void;
}

const storeApi: StateCreator<PaymentState> = (set, get) => ({
  payWithCard: false,
  isPaying: false,
  isRechargin: false,
  creditCardsTokens: [],
  transactionsByUser: [],

  addTarjetBottomSheetRef: null,
  creditCardsSelected: null,
  transactionSelected: null,

  rechargeValue: '0',

  pay: async payment => {
    const response = await PaymentService.cardCreditPayment(payment);
    console.log({response});
  },
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
  setRechargeValue: value => set({rechargeValue: value}),
});

export const usePaymentStore = create<PaymentState>()(storeApi);
