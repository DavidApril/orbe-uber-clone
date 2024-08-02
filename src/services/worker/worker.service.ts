import {createUserWithEmailAndPassword} from 'firebase/auth';
import {orbeApi} from '../../config/api';
import {auth} from '../../config/firebase/config';
import type {
  DELIVERY,
  DRIVER,
  GetDeliveryByUidResponse,
  GetDeliveryByUidResponseData,
  GetDeliveryByUserIDResponse,
  GetDriverByUidResponse,
  GetDriverByUserIDResponse,
  UpdateWorkerForm,
  WorkerDocument,
  WorkerRegisterForm,
  WorkerVehicle,
} from '../../interfaces';
import {parseError} from '../../utils';

export class WorkerService {
  static PREFIX: string = 'worker';
  static take = 5;

  static create = async (
    driver: WorkerRegisterForm,
    role: DELIVERY | DRIVER,
    image_url: string,
  ) => {
    if (!driver.email || !driver.password) return;

    try {
      const {user} = await createUserWithEmailAndPassword(
        auth,
        driver.email,
        driver.password,
      );

      const {data: response} = await orbeApi.post(`/${this.PREFIX}/create`, {
        email: driver.email,
        password: driver.password,
        uid: user.uid,
        createWithEmailAndPassword: false,
        driver: {
          identification: driver.identification,
          name: driver.firstName,
          lastName: driver.lastName,
          phone: driver.phone,
          imageUrl: image_url,
          documents: [],
          vehicles: [],
        },
        roles: [
          {
            name: role,
          },
        ],
      });

      return response.data;
    } catch (error) {
      parseError(this.PREFIX + '/create', error);
    }
  };

  static createDocuments = async (documents: WorkerDocument[]) => {
    try {
      // TODO: response interface
      const {data: response}: {data: any} = await orbeApi.post(
        `/${this.PREFIX}/ createDocuments`,
        {documents},
      );

      console.log({response});

      return response;
    } catch (error) {
      console.log({error});
    }
  };

  static deleteDocument = async (idDocument: string) => {
    try {
      // TODO: response interface
      const {data: response}: {data: any} = await orbeApi.delete(
        `/${this.PREFIX}/deleteDocument?idDocument=${idDocument}`,
      );

      return response;
    } catch (error) {
      console.log({error});
    }
  };

  static createVehicles = async (vehicles: WorkerVehicle[]) => {
    try {
      // TODO: response interface
      const {data: response}: {data: any} = await orbeApi.post(
        `/${this.PREFIX}/createVehicles`,
        {vehicles},
      );

      return response;
    } catch (error) {
      console.log({error});
    }
  };

  static deleteVehicle = async (idVehicle: string) => {
    try {
      // TODO: response interface
      const {data: response}: {data: any} = await orbeApi.delete(
        `/${this.PREFIX}/deleteVehicle?idVehicle=${idVehicle}`,
      );

      return response;
    } catch (error) {
      console.log({error});
    }
  };

  static getDeliveryByUserId = async (idUser: string) => {
    try {
      // TODO: response interface
      const {data: response}: {data: GetDeliveryByUserIDResponse} =
        await orbeApi.get(
          `/${this.PREFIX}/getDeliveryByUserId?idUser=${idUser}`,
        );

      return response.data;
    } catch (error) {
      console.log({error});
    }
  };

  static getDriverByUserId = async (idUser: string) => {
    try {
      // TODO: response interface
      const {data: response}: {data: GetDriverByUserIDResponse} =
        await orbeApi.get(`/${this.PREFIX}/getDriverByUserId?idUser=${idUser}`);

      return response.data;
    } catch (error) {
      console.log({error});
    }
  };

  static getDeliveryByUid = async (
    uid: string,
  ): Promise<GetDeliveryByUidResponseData | null> => {
    try {
      // TODO: response interface
      const {data: response}: {data: GetDeliveryByUidResponse} =
        await orbeApi.get(`/${this.PREFIX}/getDeliveryByUid?uid=${uid}`);

      return response.data;
    } catch (error) {
      parseError(this.PREFIX + '/getDeliveryByUid', error);
      return null;
    }
  };

  static getDriverByUid = async (uid: string) => {
    try {
      // TODO: response interface
      const {data: response}: {data: GetDriverByUidResponse} =
        await orbeApi.get(`/${this.PREFIX}/getDriverByUid?uid=${uid}`);

      return response.data;
    } catch (error) {
      console.log({error});
    }
  };

  static updateDelivery = async (deliveryUpdated: UpdateWorkerForm) => {
    try {
      // TODO: response interface
      const {data: response}: {data: any} = await orbeApi.put(
        `/${this.PREFIX}/updateDelivery`,
        deliveryUpdated,
      );

      return response.data;
    } catch (error) {
      console.log({error});
    }
  };

  static updateDriver = async (driverUpdated: UpdateWorkerForm) => {
    try {
      // TODO: response interface
      const {data: response}: {data: any} = await orbeApi.put(
        `/${this.PREFIX}/updateDelivery`,
        driverUpdated,
      );

      return response.data;
    } catch (error) {
      console.log({error});
    }
  };

  static deleteDelivery = async (idUser: string) => {
    try {
      // TODO: response interface
      const {data: response}: {data: any} = await orbeApi.delete(
        `/${this.PREFIX}/deleteDelivery?idUser=${idUser}`,
      );

      return response.data;
    } catch (error) {
      console.log({error});
    }
  };

  static deleteDriver = async (idUser: string) => {
    try {
      // TODO: response interface
      const {data: response}: {data: any} = await orbeApi.delete(
        `/${this.PREFIX}/deleteDriver?idUser=${idUser}`,
      );

      return response.data;
    } catch (error) {
      console.log({error});
    }
  };
}
