import {create} from 'zustand';
import {ProductRestaurant, SingleRestaurantResponse} from '../../interfaces';

interface RestaurantStore {
  restaurantSelected: SingleRestaurantResponse | null;
  productSelected: ProductRestaurant | null;
  setRestaurantSelected: (restaurant: any) => void;
  setProductSelected: (product: ProductRestaurant) => void;
}

export const useRestaurantStore = create<RestaurantStore>()(set => ({
  restaurantSelected: null,
  productSelected: null,
  setRestaurantSelected: restaurant => set({restaurantSelected: restaurant}),
  setProductSelected: product => set({productSelected: product}),
}));
