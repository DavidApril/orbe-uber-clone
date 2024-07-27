export interface Coupon {
  id: number;
  created_date: Date;
  updated_date: Date;
  delete_date: null;
  cupon_type: string;
  description: string;
  endDate: Date;
  name: string;
  startDate: Date;
  state: boolean;
}
