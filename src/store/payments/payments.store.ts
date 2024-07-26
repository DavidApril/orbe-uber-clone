import {StateCreator, create} from 'zustand';
import {CreditCardInterface} from '../../interfaces/payment.interface';

export interface PaymentState {
  creditCards: CreditCardInterface[];
}

const storeApi: StateCreator<PaymentState> = (set, get) => ({
  creditCards: [],
});

export const useAuthStore = create<PaymentState>()(storeApi);
