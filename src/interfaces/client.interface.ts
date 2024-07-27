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

export interface ClientResponseByUid {
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
  delivery: null;
  cliente: Cliente;
  cupons: Coupon[];
  driver: null;
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
