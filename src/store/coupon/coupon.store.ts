import {create} from 'zustand';
import {Coupon} from '../../interfaces';
import {CouponService} from '../../services';

interface CouponState {
  coupons: Coupon[];
  myCoupons: Coupon[];
  couponSelected: Coupon | null;
  couponToUse: Coupon | null;

  setCouponToUse: (coupon: Coupon | null) => void;
  setCuponSelected: (coupon: Coupon | null) => void;
  setMyCoupons: (coupon: Coupon[]) => void;
  addNewCoupon: (coupon: Coupon) => void;
  removeCoupon: (couponToRemove: Coupon) => void;
  setCoupons: (coupons: Coupon[]) => void;
  buyCoupon: (idCoupon: number, uidUser: string) => Promise<{ok: boolean}>;
}

export const useCouponStore = create<CouponState>()((set, get) => ({
  coupons: [],
  myCoupons: [],
  couponToUse: null,
  couponSelected: null,

  setCouponToUse: couponToUse => set({couponToUse}),
  setMyCoupons: myCoupons => set({myCoupons}),
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
