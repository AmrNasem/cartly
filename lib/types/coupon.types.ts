import { DiscountType } from "../models/coupon";
import { CouponDisplayStatus } from "../utils/coupon.utils";

export type CouponDTO = {
  id: string;
  code: string;
  discountType: DiscountType;
  discountValue: number;
  isActive: boolean;
  minCartValue: number;
  maxDiscount: number;
};

export type CartCouponDTO = {
  id: string;
  cartId: string;
  coupon: CouponDTO;
};

export type AdminCouponListItem = {
  id: string;
  code: string;
  description: string;
  discountType: DiscountType;
  discountValue: number;
  maxDiscount: number | null;
  usageLimit: number | null;
  perUserLimit: number | null;
  minCartValue: number | null;
  startDate: string | null;
  endDate: string | null;
  isActive: boolean;
  status: CouponDisplayStatus;
  statusLabel: string;
  discountLabel: string;
  expiryLabel: string;
};

export type CouponFormInput = {
  code: string;
  description: string;
  discountType: DiscountType;
  discountValue: string;
  maxDiscount: string;
  usageLimit: string;
  perUserLimit: string;
  minCartValue: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
};

export type CouponFormState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Partial<Record<keyof CouponFormInput | "form", string>>;
};

export type ValidatedCouponCreate = {
  code: string;
  description: string;
  discountType: DiscountType;
  discountValue: number;
  maxDiscount: number | null;
  usageLimit: number | null;
  perUserLimit: number | null;
  minCartValue: number | null;
  startDate: Date | null;
  endDate: Date | null;
  isActive: boolean;
};
