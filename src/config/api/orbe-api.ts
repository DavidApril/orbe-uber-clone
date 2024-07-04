import { API_PREFIX, API_URL } from '@env';
import axios from 'axios';

const orbeApi = axios.create({
  baseURL: `${API_URL}/${API_PREFIX}`,
  headers: {
    'Content-Type': 'application/json'
  }
});

// TODO: Interceptors

export { orbeApi };
