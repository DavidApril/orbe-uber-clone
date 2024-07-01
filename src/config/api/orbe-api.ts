import axios from 'axios';

const orbeApi = axios.create({
  baseURL: `${process.env.API_URL}/${process.env.API_PREFIX}`,
  headers: {
    'Content-Type': 'application/json'
  }
});

// TODO: Interceptors

export { orbeApi };
