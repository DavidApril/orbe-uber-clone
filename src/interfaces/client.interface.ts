import {ResponseInterface} from './response.interface';

export interface ClientRegisterForm {
  firstName: string;
  lastName: string;
  selectedTypeId: string;
  identification: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  image: string;
}

export interface ClientUpdatedForm {
  firstName: string;
  lastName: string;
  selectedTypeId: string;
  identification: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  image: string;
}

export interface CreateClienteResponse extends ResponseInterface {
  data: CreateClienteResponseData;
}

export interface CreateClienteResponseData {
  email: string;
  client: {
    name: string;
    phone: string;
    photo: string;
  };
  roles: [{}];
}

export interface GetClientByUidResponse extends ResponseInterface {
  data: GetClientByUidResponseData;
}

export interface GetClientByUidResponseData {
  id: number;
  created_date: Date;
  updated_date: Date;
  delete_date: null;
  email: string;
  uid_firebase: string;
  last_login: null;
  state: boolean;
  email_verify: boolean;
  points: number;
  roles: any[];
  delivery: null;
  cliente: Cliente;
  driver: null;
  cupons: Cupon[];
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

export interface Cupon {
  id: number;
  created_date: Date;
  updated_date: Date;
  delete_date: null;
  name: string;
  description: string;
  value: string;
  cupon_type: string;
  startDate: Date;
  endDate: Date;
  state: boolean;
}
