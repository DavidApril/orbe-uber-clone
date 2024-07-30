import {create} from 'zustand';
import {
  ProductRestaurant,
  SingleRestaurantResponse,
} from '../../interfaces';

interface State {
  restaurants: SingleRestaurantResponse[];
  restaurantSelected: SingleRestaurantResponse | null;
  productSelected: ProductRestaurant | null;
  favorites: SingleRestaurantResponse[];

  setRestaurantSelected: (restaurant: SingleRestaurantResponse) => void;
  setProductSelected: (product: ProductRestaurant) => void;
  addRestaurantToFavorites: (restaurant: SingleRestaurantResponse) => void;
  removeFavorite: (restaurant: SingleRestaurantResponse) => void;
}

export const useRestaurantStore = create<State>()((set, get) => ({
  restaurants: [],
  restaurantSelected: null,
  productSelected: null,
  favorites: [],

  setRestaurantSelected: (restaurant) => set({restaurantSelected: restaurant}),
  setProductSelected: (product) => set({productSelected: product}),

  addRestaurantToFavorites: (restaurantToAdd) => {
    const {favorites} = get();
    const restaurantInFavorites = favorites.some(
      (item) => item.id === restaurantToAdd.id
    );

    if (!restaurantInFavorites) {
      set({favorites: [...favorites, restaurantToAdd]});
    }
  },

  removeFavorite: (restaurantToRemove) => {
    const {favorites} = get();
    const updatedFavorites = favorites.filter(
      (item) => item.id !== restaurantToRemove.id
    );

    set({favorites: updatedFavorites});
  },
}));
