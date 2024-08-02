import {orbeApi} from '../../config/api';
import {Coupon} from '../../interfaces';
import {parseError} from '../../utils';

export class CouponService {
  static PREFIX: string = 'cupon';
  static take: number = 5;
  
  static async createCoupon() {
    try {
      const {data} = await orbeApi.post(`/${this.PREFIX}/createCupon`, {
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
      parseError(this.PREFIX + '/createCupon', error);
    }
  }

  static async getCoupons(
    skip: number = 0,
    take = this.take,
  ): Promise<Coupon[]> {
    try {
      const {data: response}: {data: {data: Coupon[]}} = await orbeApi.get(
        `/${this.PREFIX}/getCupons?skip=${skip}&take=${take}`,
      );
      return response.data;
    } catch (error) {
      parseError(this.PREFIX + '/getCupons', error);
      return [];
    }
  }

  static async addCouponUser(idCoupon: number, uidUser: string) {
    try {
      const {data: response} = await orbeApi.post(
        `/${this.PREFIX}/addCuponUser`,
        {
          idCoupon,
          uidUser,
        },
      );
    } catch (error) {
      parseError(this.PREFIX + '/addCuponUser', error);
    }
  }
}
