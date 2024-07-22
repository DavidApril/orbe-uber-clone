export const CLIENT = 'CLIENTE';
export const DRIVER = 'DRIVER';
export const DELIVERY = 'DELIVERY';

export type CLIENT = 'CLIENTE';
export type DRIVER = 'DRIVER';
export type DELIVERY = 'DELIVERY';

export const ROLE_LIST = ['CLIENTE', 'DRIVER', 'DELIVERY'];
export const ROLE_LIST_WITH_DESCRIPTIONS: {
  name: CLIENT | DRIVER | DELIVERY;
  description: string;
  iconName: string;
}[] = [
  {
    name: 'CLIENTE',
    description:
      'Usuario convencional que busca servicios de transporte y/o reparto',
    iconName: 'person-outline',
  },
  {
    name: 'DRIVER',
    description: 'Desea prestar servicios automovilísticos',
    iconName: 'car-outline',
  },
  {
    name: 'DELIVERY',
    description: 'Desea prestar servicios de reparto y/o favores',
    iconName: 'shopping-bag-outline',
  },
];
