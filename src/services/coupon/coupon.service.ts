import {orbeApi} from '../../config/api';
import {Coupon} from '../../interfaces';

export class CouponService {
  static take: number = 5;

  static async createCoupon() {
    try {
      const {data} = await orbeApi.post(`/cupon/createCupon`, {
        name: 'Cupon 01',
        description: 'descripción cupón 01',
        cupon_type: 'discount',
        startDate: new Date(),
        endDate: new Date(),
        state: true,
      });
      console.log({
        name: 'Cupon 01',
        description: 'descripción cupón 01',
        cupon_type: 'discount',
        startDate: new Date(),
        endDate: new Date(),
        state: true,
      });
      return data;
    } catch (error) {
      console.log({error});
    }
  }

  static async getCoupons(
    skip: number = 0,
    take = this.take,
  ): Promise<Coupon[]> {
    try {
      const {data: response}: {data: {data: Coupon[]}} = await orbeApi.get(
        `/cupon/getCupons?skip=${skip}&take=${take}`,
      );
      return response.data;
    } catch (error) {
      console.log({error});
      return [];
    }
  }

  static async addCouponUser(idCoupon: number, uidUser: string) {
    try {
      const {data: response} = await orbeApi.post(`/coupon/addCuponUser`, {
        idCoupon,
        uidUser,
      });
      console.log(response);
    } catch (error) {}
  }
}
