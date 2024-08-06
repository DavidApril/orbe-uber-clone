
export interface ProductsRequestDTO {
  id_client: string;
  id_restaurant: string;
  products: ProductDTO[];
  address_destination: string;
  method_pay: string;
}

export interface ExtraDTO {
  // id: string;
  name: string;
  description: string;
  price: number;
}

export interface ProductDTO {
  // id: string;
  name: string;
  description: string;
  price: number;
  extras: ExtraDTO[];
}
