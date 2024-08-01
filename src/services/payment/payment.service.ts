import {orbeApi} from '../../config/api';
import {
  GetPayMethodsUserResponse,
  GetTransactionsByUserResponse,
  ICreditCard,
  ITransaction,
  PaymentDetails,
  PayWithCardResponse,
  PayWithCardResponseData,
} from '../../interfaces';
import { parseError } from '../../utils';

export class PaymentService {
  static PREFIX: string = 'pay';

  static take: number = 10;

  static async rechagePoints(payment: PaymentDetails) {
    try {
      const {data: response}: {data: PayWithCardResponseData} =
        await orbeApi.post(`/${this.PREFIX}/rechargePoints`, payment);

      return response;
    } catch (error) {
      parseError(this.PREFIX + '/rechargePoints', error)
      return [];
    }
  }

  static async cardCreditPayment(
    payment: PaymentDetails,
  ): Promise<PayWithCardResponseData | null> {
    try {
      const {data: response}: {data: PayWithCardResponse} = await orbeApi.post(
        `/${this.PREFIX}/cardCreditPayment`,
        payment,
      );
      return response.data;
    } catch (error) {
      parseError(this.PREFIX + '/cardCreditPayment', error)
      return null;
    }
  }

  static async GetPayMethodsUser(user_uid: string): Promise<ICreditCard[]> {
    try {
      const {data: response}: {data: GetPayMethodsUserResponse} =
        await orbeApi.get(`/${this.PREFIX}/GetPayMethodsUser?user_uid=${user_uid}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  static async getTransactionsByUser(
    user_uid: string,
    take = this.take,
    skip = 0,
  ): Promise<ITransaction[]> {
    try {
      const {data: response}: {data: GetTransactionsByUserResponse} =
        await orbeApi.get(
          `/${this.PREFIX}/getTransactionsByUser?user_uid=${user_uid}&take=${take}&skip=${skip}`,
        );
      return response.data;
    } catch (error) {
      parseError(this.PREFIX + '/getTransactionsByUser', error)
      return [];
    }
  }
}
