import { orbeApi } from "../../config/api";

export class OrderService {
  static createOrder = async (config: {
    id_delivery: string;
    id_restaurant: string;
    origin: {
      latitude: number;
      longitude: number;
    };
    destination: {
      latitude: number;
      longitude: number;
    };
  }) => {
    const request = {
      coordinates: [
        {
          type: 'origen',
          latitud: config.origin?.latitude,
          longitud: config.origin?.longitude,
        },
        {
          type: 'destino',
          latitud: config.destination?.latitude,
          longitud: config.destination?.longitude,
        },
      ],
      id_restaurant: config.id_restaurant,
      id_delivery: config.id_delivery,
    };

    try {
      const {data: response} = await orbeApi.post(
        `/request/createRequest`,
        request,
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  static acceptRequest = async (
    id_restaurant: string,
    id_delivery: string,
    id_request: string,
    price: number,
  ) => {
    try {
      const {data: acceptRequestResponse} = await orbeApi.post(
        '/request/acceptRequest',
        {
          id_restaurant,
          id_delivery,
          id_request,
          price,
        },
      );
      return acceptRequestResponse;
    } catch (error) {
      console.log({error});
    }
  };



}