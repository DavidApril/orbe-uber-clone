import {create} from 'zustand';
import {ProductRestaurant} from '../../interfaces';

interface State {
  productsInCart: {product: ProductRestaurant; count: number}[];
  addProduct: (product: ProductRestaurant, count: number) => void;
  deleteProduct: (idProduct: number) => void;
  increaseDecrementCount: (idProduct: string, value: -1 | 1) => void;
}

export const useShoppingCartStore = create<State>()((set, get) => ({
  productsInCart: [],
  data: {
    title: '',
    message: '',
  },

  addProduct: (product, count) => {
    set(state => ({
      productsInCart: [...state.productsInCart, {product, count}],
    }));
  },

  deleteProduct: idProduct => {
    set(state => ({
      productsInCart: state.productsInCart.filter(
        item => item.product.id !== idProduct,
      ),
    }));
  },

  increaseDecrementCount: (idProduct, value) => {
    const productsInCartUpdated = get().productsInCart.map(item =>
      item.product.id === +idProduct
        ? {...item, count: (item.count += value)}
        : item,
    );

    set({productsInCart: productsInCartUpdated});
  },
}));
