import {Restaurant} from './restaurant.interface';

export interface CartProduct {
  product: ProductRestaurant;
  quantity: number;
}

export interface ProductRestaurant {
  id: number;
  created_date: Date;
  updated_date: Date;
  delete_date: null;
  name: string;
  description: string;
  priceUnitary: string;
  discount: string;
  category: string;
  state: boolean;
  imageUrl: string;
  extras: {
    name: string;
    description: string;
    price: number;
  }[];
  restaurant: Restaurant;
}
