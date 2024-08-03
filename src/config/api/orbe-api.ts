import {API_PREFIX, API_URL} from '@env';
import axios from 'axios';
import {useAuthStore} from '../../store';

const orbeApi = axios.create({
  baseURL: `${API_URL}/${API_PREFIX}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

orbeApi.interceptors.request.use(config => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export {orbeApi};
