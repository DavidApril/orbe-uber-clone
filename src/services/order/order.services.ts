import {orbeApi} from '../../config/api';
import {parseError} from '../../utils';

export class OrderService {
  static PREFIX: string = 'request';

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
        `/${this.PREFIX}/createRequest`,
        request,
      );

      return response;
    } catch (error) {
      parseError(this.PREFIX + '/createRequest', error);
    }
  };

  static acceptOrder = async (
    id_restaurant: string,
    id_delivery: string,
    id_request: string,
    price: number,
  ) => {
    try {
      const {data: acceptRequestResponse} = await orbeApi.post(
        `/${this.PREFIX}/acceptRequest`,
        {
          id_restaurant,
          id_delivery,
          id_request,
          price,
        },
      );
      return acceptRequestResponse;
    } catch (error) {
      parseError(this.PREFIX + '/acceptRequest', error);
    }
  };
}
