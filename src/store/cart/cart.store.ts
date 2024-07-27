import {create} from 'zustand';
import {
  CartProduct,
  ProductRestaurant,
  SingleRestaurantResponse,
} from '../../interfaces';

interface State {
  cart: CartProduct[];
  favorites: ProductRestaurant[];

  restaurantSelected: SingleRestaurantResponse | null;
  productSelected: ProductRestaurant | null;
  cartNews: boolean;

  setCartNews: (value: boolean) => void;

  setRestaurantSelected: (restaurant: SingleRestaurantResponse) => void;
  setProductSelected: (product: ProductRestaurant) => void;

  getTotalItems: () => number;
  getSummaryInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  };

  addProductToCart: (product: ProductRestaurant) => void;
  addProductToFavorites: (product: ProductRestaurant) => void;
  updateProductQuantity: (
    quantity: number,
    productsCart: CartProduct | undefined,
  ) => void;
  removeProduct: (product: CartProduct) => void;
  removeFavorite: (product: ProductRestaurant) => void;
}

export const useCartStore = create<State>()((set, get) => ({
  cart: [],
  favorites: [],
  productSelected: null,
  cartNews: false,
  summaryBottomSheetRef: null,
  restaurantSelected: null,

  setProductSelected: product => set({productSelected: product}),
  setRestaurantSelected: restaurant => set({restaurantSelected: restaurant}),
  setCartNews: value => set({cartNews: value}),
  getTotalItems: () => {
    const {cart} = get();
    return cart.reduce((total, item) => total + item.quantity, 0);
  },

  getSummaryInformation: () => {
    const {cart} = get();
    const subTotal = cart.reduce(
      (subTotal, item) => item.quantity * +item.product.priceUnitary + subTotal,
      0,
    );
    const tax = subTotal * 0.15;
    const total = subTotal + tax;
    const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

    return {
      subTotal,
      tax,
      total,
      itemsInCart,
    };
  },
  addProductToCart: itemToAdd => {
    const {cart} = get();
    const productInCart = cart.some(
      item =>
        item.product.id === itemToAdd.id &&
        item.product.name === itemToAdd.name,
    );

    if (!productInCart) {
      set({cart: [...cart, {product: itemToAdd, quantity: 1}], cartNews: true});
      return;
    }

    const updatedCartProducts = cart.map(item => {
      if (
        item.product.id === itemToAdd.id &&
        item.product.name === itemToAdd.name
      ) {
        return {...item, quantity: item.quantity + item.quantity};
      }
      return item;
    });
    set({cart: updatedCartProducts, cartNews: true});
  },

  addProductToFavorites: (itemToAdd: ProductRestaurant) => {
    const {favorites} = get();
    const productInCart = favorites.some(
      item => item.id === itemToAdd.id && item.name === itemToAdd.name,
    );

    if (!productInCart) {
      set({favorites: [...favorites, itemToAdd]});
      return;
    }

    const updateFavorite = favorites.map(item => {
      if (item.id === itemToAdd.id && item.name === itemToAdd.name) {
        return {...item};
      }
      return item;
    });
    set({favorites: updateFavorite});
  },
  updateProductQuantity: (quantity, productItem) => {
    const {cart} = get();
    if (productItem) {
      const updateCartProducts = cart.map(item => {
        if (
          item.product.id === productItem.product.id &&
          item.product.name === productItem.product.name
        ) {
          return {
            ...item,
            quantity: Math.max((productItem.quantity += quantity), 0),
          };
        }
        return item;
      });
      set({cart: updateCartProducts, cartNews: true});
    } else {
      get().addProductToCart(productItem!.product);
    }
  },
  removeProduct: (itemToRemove: CartProduct) => {
    const {cart} = get();
    const updatedCartProducts = cart.filter(
      item =>
        item.product.id !== itemToRemove.product.id ||
        item.product.name != itemToRemove.product.name,
    );

    set({cart: updatedCartProducts});
  },
  removeFavorite: (itemToRemove: ProductRestaurant) => {
    const {favorites} = get();
    const updatedFavorites = favorites.filter(
      item => item.id !== itemToRemove.id || item.name != itemToRemove.name,
    );

    set({favorites: updatedFavorites});
  },
}));
