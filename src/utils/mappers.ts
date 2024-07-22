import {CLIENT, DRIVER, DELIVERY} from '../interfaces';

export const registerRoutesByRoleMapper: Record<
  CLIENT | DRIVER | DELIVERY,
  'RegisterClientScreen' | 'RegisterDriverScreen' | 'RegisterDeliveryScreen'
> = {
  CLIENTE: 'RegisterClientScreen',
  DELIVERY: 'RegisterDeliveryScreen',
  DRIVER: 'RegisterDriverScreen',
};
