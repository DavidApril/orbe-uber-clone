
import {StateCreator, create} from 'zustand';

export interface PaymentState {
}

const storeApi: StateCreator<PaymentState> = (set, get) => ({
});

export const useAuthStore = create<PaymentState>()(storeApi);
