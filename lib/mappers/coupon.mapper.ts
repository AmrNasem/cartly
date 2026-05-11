import { CouponDTO } from "../types/coupon.types";

export function mapCouponDTO(
  coupon: any
): CouponDTO {
  return {
    id: coupon._id.toString(),
    code: coupon.code,
    discountType: coupon.discountType,
    discountValue: coupon.discountValue,
    isActive: coupon.isActive,
    minCartValue: coupon.minCartValue,
    maxDiscount: coupon.maxDiscount,
  };
}