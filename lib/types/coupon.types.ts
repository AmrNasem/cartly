import { DiscountType } from "../models/coupon";

export type CouponDTO = {
  id: string;
  code: string;
  discountType: DiscountType;
  discountValue: number;
  isActive: boolean;
  minCartValue: number;
  maxDiscount: number;
}

export type CartCouponDTO = {
  id: string;
  cartId: string;
  coupon: CouponDTO,
}