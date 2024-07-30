import {ResponseInterface} from './response.interface';

export interface GetConfigurationsResponse extends ResponseInterface {
  data: getConfigurationResponseData[];
}

export interface getConfigurationResponseData {
  id: number;
  created_date: Date;
  updated_date: Date;
  delete_date: null;
  key: string;
  value: string;
  description: string;
}
