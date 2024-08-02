import {ResponseInterface} from './response.interface';

export interface ClientRegisterForm {
  firstName: string;
  lastName: string;
  selectedTypeId?: string;
  identification: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  image?: string;
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

