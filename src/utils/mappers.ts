import {CLIENT, DRIVER, DELIVERY} from '../interfaces';
import {
  HomeClientDeliveryScreen,
  HomeDeliveryScreen,
  HomeDriverScreen,
  ProfileClientScreen,
  ProfileDeliveryScreen,
  ProfileDriverScreen,
} from '../presentation/screens';
export const registerRoutesByRoleMapper: Record<
  CLIENT | DRIVER | DELIVERY,
  'RegisterClientScreen' | 'RegisterDriverScreen' | 'RegisterDeliveryScreen'
> = {
  CLIENTE: 'RegisterClientScreen',
  DELIVERY: 'RegisterDeliveryScreen',
  DRIVER: 'RegisterDriverScreen',
};

export const profileRoutesByRoleMapper = (role: DRIVER | DELIVERY | CLIENT) => {
  if (role === CLIENT) {
    return ProfileClientScreen;
  } else if (role === DRIVER) {
    return ProfileDriverScreen;
  } else if (role === DELIVERY) {
    return ProfileDeliveryScreen;
  }
};

export const routesHomeByRoleMapper = (role: DRIVER | DELIVERY | CLIENT) => {
  if (role === CLIENT) {
    return HomeClientDeliveryScreen;
  } else if (role === DRIVER) {
    return HomeDriverScreen;
  } else if (role === DELIVERY) {
    return HomeDeliveryScreen;
  }
};
