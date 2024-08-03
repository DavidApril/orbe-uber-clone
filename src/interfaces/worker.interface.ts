import {ResponseInterface} from './response.interface';

export interface WorkerRegisterForm {
  firstName: string;
  lastName: string;
  selectedTypeId?: string;
  identification: string;
  phone: string;
  email: string;
  password: string;
  image?: string;
  confirmPassword: string;
}
// TODO: set correctly forms to update worker
export interface UpdateWorkerForm {
  firstName: string;
  lastName: string;
  selectedTypeId?: string;
  identification: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  image: string;
}

export interface WorkerDocument {
  type: string;
  description: string;
  imageUrl: string;
}

export interface WorkerVehicle {
  licensePlate: string;
  model: string;
  marca: string;
  stateDescription: string;
  vehicleType: TypeVehicleDto;
}

export interface TypeVehicleDto {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

export interface GetDeliveryByUserIDResponse extends ResponseInterface {
  data: GetDeliveryByUserIDResponseData;
}

export interface GetDeliveryByUserIDResponseData {
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
  delivery: Delivery;
  roles: any[];
  driver: null;
}

export interface Driver {
  id: number;
  created_date: Date;
  updated_date: Date;
  delete_date: null;
  identification: string;
  name: string;
  lastName: string;
  phone: string;
  imageUrl: string;
}

export interface GetDriverByUserIDResponse extends ResponseInterface {
  data: GetDriverByUserIDResponseData;
}

export interface GetDriverByUserIDResponseData {
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
  delivery: Delivery;
  roles: any[];
  driver: null;
}

export interface Delivery {
  id: number;
  created_date: Date;
  updated_date: Date;
  delete_date: null;
  identification: string;
  name: string;
  lastName: string;
  phone: string;
  imageUrl: string;
}

export interface GetDeliveryByUidResponse extends ResponseInterface {
  data: GetDeliveryByUidResponseData;
}

export interface GetDeliveryByUidResponseData {
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
  delivery: Delivery;
}

export interface GetDriverByUidResponse extends ResponseInterface {
  data: GetDriverByUidResponseData;
}

export interface GetDriverByUidResponseData {
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
  delivery: Delivery;
}

