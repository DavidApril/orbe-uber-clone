import {orbeApi} from '../../config/api';
import {
  ICreateRestaurante,
  SingleRestaurantResponse,
  RestaurantsResponse,
  ProductRestaurant,
} from '../../interfaces';

export class RestaurantService {
  static take: number = 6;

  static createRestaurant = async (restaurant: ICreateRestaurante) => {
    try {
      const {data: Response} = await orbeApi.post(`/restaurant/create`, {
        ...restaurant,
      });

      if (Response.statusCode < 200 || Response.statusCode > 300) {
        throw new Error();
      }

      return {ok: true, id: Response.data.id};
    } catch (error) {
      return {ok: false};
    }
  };

  static getRestaurants = async (
    skip = 0,
    take = this.take,
  ): Promise<SingleRestaurantResponse[]> => {
    try {
      const {data: Restaurants}: {data: RestaurantsResponse} =
        await orbeApi.get(`/restaurant?&skip=${skip}&take=${take}`);

      const restaurants: SingleRestaurantResponse[] = Restaurants.data.map(
        restaurant => restaurant,
      );
      return restaurants;
    } catch (error) {
      return [];
    }
  };

  static getRestaurantById = async (
    id: string,
  ): Promise<SingleRestaurantResponse> => {
    try {
      const {data: Restaurant} = await orbeApi.get(
        `/restaurant/getById?idRestaurant=${id}`,
      );
      const restaurant: SingleRestaurantResponse = Restaurant.data;
      return restaurant;
    } catch (error) {
      throw 'Not found';
    }
  };

  static getTotalPages = async (): Promise<number> => {
    const {data: totalRestaurants} = await orbeApi.get(
      `/restaurant/TotalRestaurants`,
    );

    const totalPages = Math.ceil(totalRestaurants.data / this.take);

    return totalPages;
  };

  static deleteRestaurant = async (id: string) => {
    try {
      await orbeApi.delete(`/restaurant?idRestaurant=${id}`);
      return true;
    } catch (error) {
      return false;
    }
  };

  static updateRestaurant = async (values: any) => {
    try {
      await orbeApi.put(`/restaurant`, {
        data: values,
      });
      return {ok: true};
    } catch (error) {
      return {ok: false};
    }
  };

  static getProducts = async (
    idRestaurant: number,
    skip = 0,
    take = 5,
    search = '',
  ): Promise<ProductRestaurant[]> => {
    try {
      const {data: response}: {data: {data: ProductRestaurant[]}} =
        await orbeApi.get(
          `product/getProducts?skip=${skip}&take=${take}&idRestaurant=${idRestaurant}&appWeb=false`,
        );
      return response.data;
    } catch (error) {
      console.log({error});
      return [];
    }
  };
}
