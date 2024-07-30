import {orbeApi} from '../../config/api';
import {
  getConfigurationResponseData,
  GetConfigurationsResponse,
} from '../../interfaces/configurations.interface';

export class ConfigurationService {
  static async getConfigurations(): Promise<getConfigurationResponseData[]> {
    try {
      const {data: response}: {data: GetConfigurationsResponse} =
        await orbeApi.get(`/configurations/getConfigurations`);

      return response.data;
    } catch (error) {
      console.log({error});
      return [];
    }
  }

  static async getConfigurationById(id_configuration: string) {
    try {
      const {data: response} = await orbeApi.get(
        `/configurations/getConfigurationbyID?id_configuration=${id_configuration}`,
      );
      return response.data;
    } catch (error) {
      console.log({error});
    }
  }
}
