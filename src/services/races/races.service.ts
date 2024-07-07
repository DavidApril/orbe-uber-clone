import {orbeApi} from '../../config/api';

export class RacesService {
  static createRequest = async (config: {
    id_driver: string;
    id_client: string;
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
        `/request/createRequest`,
        request,
      );
      console.log({response});
    } catch (error) {
      console.log(error);
    }
  };
}
