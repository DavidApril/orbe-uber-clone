import {Coupon} from './coupon.interface';

export interface ClientRegisterForm {
  firstName?: string;
  lastName?: string;
  selectedTypeId?: string;
  identification?: string;
  phone?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  image?: string;
}

export interface UserResponseByUid {
  id: number;
  created_date: Date;
  updated_date: Date;
  delete_date: null;
  email: string;
  uid_firebase: string;
  last_login: null;
  state: boolean;
  email_verify: boolean;
  roles: any[];
  cliente: Cliente | null;
  cupons: Coupon[];
  driver: Driver | null;
  points: number
  delivery: Delivery | null;
}

export interface Cliente {
  id: number;
  created_date: Date;
  updated_date: Date;
  delete_date: null;
  name: string;
  phone: string;
  photo: string;
}

export interface Driver {
  id: number;
  created_date: Date;
  updated_date: Date;
  delete_date: null;
  name: string;
  phone: string;
  photo: string;
}

export interface Delivery {
  id: number;
  created_date: Date;
  updated_date: Date;
  delete_date: null;
  name: string;
  phone: string;
  imageUrl: string;
}
