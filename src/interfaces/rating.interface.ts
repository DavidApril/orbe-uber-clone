export interface CreateRatingDTO {
  value:       number;
  observation: string;
  user?:        Product;
  restaurant?:  Product;
  product?:     Product;
}

export interface Product {
  id: number;
}
