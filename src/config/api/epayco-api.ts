import {EPAYCO_API_KEY, EPAYCO_API_URL} from '@env';
import axios from 'axios';

const epaycoApi = axios.create({
  baseURL: `${EPAYCO_API_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

epaycoApi.interceptors.request.use(config => {
    config.headers['Authorization'] = `Bearer ${EPAYCO_API_KEY}`;
  return config;
});


export {epaycoApi};
