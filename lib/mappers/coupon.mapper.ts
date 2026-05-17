import { AdminCouponListItem, CouponDTO } from "../types/coupon.types";
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

export function mapAdminCouponListItem(coupon: {
  _id: { toString(): string };
  code: string;
  description?: string;
  discountType: CouponDTO["discountType"];
  discountValue: number;
  maxDiscount?: number | null;
  usageLimit?: number | null;
  perUserLimit?: number | null;
  minCartValue?: number | null;
  startDate?: Date | string | null;
  endDate?: Date | string | null;
  isActive: boolean;
}): AdminCouponListItem {
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
