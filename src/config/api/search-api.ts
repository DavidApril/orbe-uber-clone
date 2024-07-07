import {MAPBOX_ACCESS_TOKEN} from '@env';
import axios from 'axios';

export const searchApi = axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
  params: {
    limit: 5,
    language: 'es',
    access_token: MAPBOX_ACCESS_TOKEN,
  },
});
