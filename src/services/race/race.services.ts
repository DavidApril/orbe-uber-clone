import {orbeApi} from '../../config/api';
import {parseError} from '../../utils';

export class RaceService {
  static PREFIX: string = 'request';

  static createOrder = async (config: {
    id_client: string;
    id_driver: string;
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
      id_client: config.id_client,
      id_driver: config.id_driver,
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
    id_client: string,
    id_driver: string,
    id_request: string,
    price: number,
  ) => {
    try {
      const {data: acceptRequestResponse} = await orbeApi.post(
        `/${this.PREFIX}/acceptRequest`,
        {
          id_client,
          id_driver,
          id_request,
          price,
        },
      );
      return acceptRequestResponse;
    } catch (error) {
      parseError(this.PREFIX + '/acceptRequest', error);
    }
  };

  static createRequest = async () => {
    try {
      const {} = await orbeApi.post(`/${this.PREFIX}/`);
    } catch (error) {
      parseError(this.PREFIX + '/createRequest', error);
    }
  };
}
