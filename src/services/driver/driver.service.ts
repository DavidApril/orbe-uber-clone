import { API_PREFIX, API_URL } from '@env';
import {orbeApi} from '../../config/api';
import {OIDriversResponse, DriverByID, OIDriverByUid} from '../../interfaces';

export class DriverService {
  static take: number = 6;

  static getDrivers = async (skip = 0, take = this.take) => {
    try {
      const {data: DriversResponse}: {data: OIDriversResponse} =
        await orbeApi.get(`/worker/getDrivers?skip=0&take=5`);
      const drivers = DriversResponse.data.map(user => user);
      return drivers;
    } catch (error) {
      // console.log('here')
      console.log(error);
      return [];
    }
  };

  static getTotalPages = async (): Promise<number> => {
    try {
      const {data: totalDrivers} = await orbeApi.get(`/worker/getDriversCount`);

      const totalPages = Math.ceil(totalDrivers.data / this.take);
      return totalPages;
    } catch (error) {
      console.log(error);
      throw new Error('Error at get total pages');
    }
  };

  static getDriverByUserId = async (id: string): Promise<DriverByID> => {
    try {
      const {data: DriverResponse} = await orbeApi.get(
        `/worker/getDriverByUserId?idUser=${id}`,
			);
      const driver = DriverResponse.data;
      return driver;
    } catch (error) {
      throw new Error('Error at get driver');
    }
  };

  static getDriverByUserUid = async (uid: string): Promise<OIDriverByUid> => {
    try {
      const {data: DriverResponse} = await orbeApi.get(
        `/worker/getDriversByUid?uid=${uid}`,
      );
      const driver = DriverResponse.data;
      return driver;
    } catch (error) {
      console.log({error});
      // throw new Error('Error at get driver');
    }
  };

  static updateDriver = async (driver: any) => {
    try {
      await orbeApi.put(`/worker/updateDriver`, {...driver});
      return {ok: true};
    } catch (error) {
      console.log(error);
      return {ok: false};
    }
  };

  static deleteDriver = async (id: string): Promise<{ok: boolean}> => {
    try {
      const {data} = await orbeApi.delete(`/worker/deleteDriver?idUser=${id}`);
      console.log(data);
      return {ok: true};
    } catch (error) {
      console.log(error);
      return {ok: false};
    }
  };
}
