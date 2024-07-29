import {orbeApi} from '../../config/api';
import {
  GetPayMethodsUserResponse,
  ICreditCard,
  PaymentDetails,
  PayWithCardResponse,
  PayWithCardResponseData,
} from '../../interfaces';

export class PaymentService {
  static PREFIX: string = 'pay';
  static async getPayMethod() {}

  static async cardCreditPayment(
    payment: PaymentDetails,
  ): Promise<PayWithCardResponseData | null> {
    try {
      const {data: response}: {data: PayWithCardResponse} = await orbeApi.post(
        `${this.PREFIX}/cardCreditPayment`,
        payment,
      );
      return response.data;
    } catch (error) {
      console.log({error});
      return null;
    }
  }
  static async GetPayMethodsUser(user_uid: string): Promise<ICreditCard[]> {
    try {
      const {data: response}: {data: GetPayMethodsUserResponse} =
        await orbeApi.get(`/pay/GetPayMethodsUser?user_uid=${user_uid}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  static async getTransactionById() {}
  static async getTransactions() {}
  static async getTransactionsByUser(): Promise<any> {
    try {
      const {data: response}: {data: any} = await orbeApi.get(
        `pay/getTransactionsByUser`,
      );

      return response;
    } catch (error) {
      console.log({error});
      return;
    }
  }
}
