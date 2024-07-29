import {ResponseInterface} from './response.interface';

export interface PaymentDto {
  id: number;
  bank: string;
  tokenCard: string;
}

export interface PaymentDetailsDto {
  key: string;
  value: string;
}

export interface HistoryFilterDto {
  skip: number;
  take: number;
  search?: string;
  uid_user: string;
}

export interface PaymentDetails {
  value?: string;
  docType?: string;
  docNumber?: string;
  name?: string;
  lastName?: string;
  email?: string;
  cellPhone?: string;
  phone?: string;
  cardNumber?: string;
  cardExpYear?: string;
  cardExpMonth?: string;
  cardCvc?: string;
  dues?: string;
  userUid?: string;
  description?: string;
  typeTransaction?: string;
  methodPay?: string;
  payment?: PaymentDto;
  _cardTokenId?: string;
  details?: PaymentDetailsDto[];
}

export interface PayWithCardResponse {
  data: PayWithCardResponseData;
  isArray: boolean;
  path: string;
  duration: string;
  method: string;
}

export interface PayWithCardResponseData {
  payMethod: string;
  typeTransaction: string;
  TotalTransaction: number;
  description: string;
  detailsPayment: DetailsPayment[];
}

export interface DetailsPayment {
  key: string;
  value: string;
}

export interface GetPayMethodsUserResponse extends ResponseInterface {
  data: ICreditCard[];
}

export interface ICreditCard {
  token: string;
}

export interface GetTransactionsByUserResponse extends ResponseInterface {
  data: ITransaction[];
}

export interface ITransaction {
  id: number;
  created_date: Date;
  updated_date: Date;
  delete_date: null;
  description: string;
  typeTransaction: string;
  payMethod: string;
  TotalTransaction: string;
  detailsPayment: DetailsPayment[];
}

export interface DetailsPayment {
  id: number;
  created_date: Date;
  updated_date: Date;
  delete_date: null;
  key: string;
  value: string;
}
