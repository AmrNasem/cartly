import { AdminCouponListItem, CouponDTO, CouponFormInput, RawCoupon } from "../types/coupon.types";
import { formatDateTimeLocal } from "../utils";
import {
  formatCouponDiscount,
  formatCouponExpiry,
  getCouponDisplayStatus,
} from "../utils/coupon.utils";

export function mapCouponDTO(coupon: {
  _id: { toString(): string };
  code: string;
  discountType: CouponDTO["discountType"];
  discountValue: number;
  isActive: boolean;
  minCartValue?: number | null;
  maxDiscount?: number | null;
}): CouponDTO {
  return {
    id: coupon._id.toString(),
    code: coupon.code,
    discountType: coupon.discountType,
    discountValue: coupon.discountValue,
    isActive: coupon.isActive,
    minCartValue: coupon.minCartValue ?? 0,
    maxDiscount: coupon.maxDiscount ?? 0,
  };
}

export function mapAdminCouponListItem(coupon: RawCoupon): AdminCouponListItem {
  const { status, label } = getCouponDisplayStatus(coupon);

  return {
    id: coupon._id.toString(),
    code: coupon.code,
    description: coupon.description ?? "",
    discountType: coupon.discountType,
    discountValue: coupon.discountValue,
    maxDiscount: coupon.maxDiscount ?? null,
    usageLimit: coupon.usageLimit ?? null,
    perUserLimit: coupon.perUserLimit ?? null,
    minCartValue: coupon.minCartValue ?? null,
    startDate: coupon.startDate
      ? new Date(coupon.startDate).toISOString()
      : null,
    endDate: coupon.endDate ? new Date(coupon.endDate).toISOString() : null,
    isActive: coupon.isActive,
    status,
    statusLabel: label,
    discountLabel: formatCouponDiscount(
      coupon.discountType,
      coupon.discountValue,
      coupon.maxDiscount
    ),
    expiryLabel: formatCouponExpiry(coupon.endDate),
  };
}

export function mapCouponFormInput(coupon: RawCoupon): CouponFormInput {
  return {
    code: coupon.code,
    description: String(coupon.description ?? ""),
    discountType: coupon.discountType,
    discountValue: String(coupon.discountValue ?? ""),
    maxDiscount: String(coupon.maxDiscount ?? ""),
    usageLimit: String(coupon.usageLimit ?? ""),
    perUserLimit: String(coupon.perUserLimit ?? ""),
    minCartValue: String(coupon.minCartValue ?? ""),
    startDate: coupon.startDate ? formatDateTimeLocal(coupon.startDate) : "",
    endDate: coupon.endDate ? formatDateTimeLocal(coupon.endDate) : "",
    isActive: coupon.isActive,
  }
}