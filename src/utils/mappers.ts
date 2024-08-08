import {CLIENT, DRIVER, DELIVERY} from '../interfaces';
import {
  ProfileClientScreen,
  ProfileWorkerScreen,
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
    return ProfileWorkerScreen;
  } else if (role === DELIVERY) {
    return ProfileWorkerScreen;
  }
};
