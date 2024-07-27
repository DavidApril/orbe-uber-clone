import {create} from 'zustand';
import {Coupon} from '../../interfaces';
import {CouponService} from '../../services';

interface CouponState {
  coupons: Coupon[];
  couponSelected: Coupon | null;

  setCuponSelected: (coupon: Coupon | null) => void;
  addNewCoupon: (coupon: Coupon) => void;
  removeCoupon: (couponToRemove: Coupon) => void;
  setCoupons: (coupons: Coupon[]) => void;
  buyCoupon: (idCoupon: number, uidUser: string) => Promise<{ok: boolean}>;
}

export const useCouponStore = create<CouponState>()((set, get) => ({
  coupons: [],
  couponSelected: null,

  addNewCoupon: coupon => set({coupons: [...get().coupons, coupon]}),
  removeCoupon: couponToRemove => {
    const {coupons} = get();
    const couponsUpdated = coupons.filter(
      coupon => coupon.id !== couponToRemove.id,
    );
    set({coupons: couponsUpdated});
  },
  setCuponSelected: coupon => set({couponSelected: coupon}),
  setCoupons: coupons => set({coupons}),
  buyCoupon: async (idCoupon, uidUser) => {
    try {
      await CouponService.addCouponUser(idCoupon, uidUser);
      return {ok: true};
    } catch (error) {
      console.log({error});
      return {ok: false};
    }
  },
}));
