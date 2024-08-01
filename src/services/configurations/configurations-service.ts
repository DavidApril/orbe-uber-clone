import {orbeApi} from '../../config/api';
import {
  getConfigurationResponseData,
  GetConfigurationsResponse,
} from '../../interfaces/configurations.interface';
import {parseError} from '../../utils';

export class ConfigurationService {
  static PREFIX: string = 'configurations';

  static async getConfigurations(): Promise<getConfigurationResponseData[]> {
    try {
      const {data: response}: {data: GetConfigurationsResponse} =
        await orbeApi.get(`/${this.PREFIX}/getConfigurations`);

      return response.data;
    } catch (error) {
      parseError(this.PREFIX + '/getConfigurations', error);
      return [];
    }
  }

  static async getConfigurationById(id_configuration: string) {
    try {
      const {data: response} = await orbeApi.get(
        `/${this.PREFIX}/getConfigurationbyID?id_configuration=${id_configuration}`,
      );
      return response.data;
    } catch (error) {
      parseError(this.PREFIX + '/getConfigurationbyID', error);
    }
  }
}
