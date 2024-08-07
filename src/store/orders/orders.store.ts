import {StateCreator, create} from 'zustand';
import {ProductsRequestDTO} from '../../interfaces';

export interface OrderState {
  order: ProductsRequestDTO | null;

  createOrder: (order: ProductsRequestDTO | null) => void;
}

const storeApi: StateCreator<OrderState> = (set, get) => ({
  order: null,

  createOrder: order => set({order}),
});

export const useOrderStore = create<OrderState>()(storeApi);
