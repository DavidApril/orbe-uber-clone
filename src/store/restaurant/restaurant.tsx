import {create} from 'zustand';
import {SingleRestaurantResponse} from '../../interfaces';

interface RestaurantStore {
  restaurantSelected: SingleRestaurantResponse | null;

  setRestaurantSelected: (restaurant: any) => void;
}

export const useRestaurantStore = create<RestaurantStore>()(set => ({
  restaurantSelected: null,

  setRestaurantSelected: restaurant => set({restaurantSelected: restaurant}),
}));
