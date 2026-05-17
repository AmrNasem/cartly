import { APIError } from "@/lib/api/errors";
import { mapAdminCouponListItem } from "@/lib/mappers/coupon.mapper";
import { Coupon } from "@/lib/models";
import { AdminCouponListItem, ValidatedCouponCreate } from "@/lib/types/coupon.types";

export async function getAdminCoupons(): Promise<AdminCouponListItem[]> {
  const coupons = await Coupon.find({ deletedAt: null })
    .sort({ createdAt: -1 })
    .lean();

  return coupons.map((coupon) => mapAdminCouponListItem(coupon));
}

export async function createCoupon(
  data: ValidatedCouponCreate,
  createdBy: string
) {
  const existing = await Coupon.findOne({
    code: data.code,
    deletedAt: null,
  });

  if (existing) {
    throw new APIError("A coupon with this code already exists", 400);
  }

  return Coupon.create({
    ...data,
    createdBy,
  });
}

export async function deleteCoupon(couponId: string): Promise<void> {
  const coupon = await Coupon.findOneAndUpdate(
    { _id: couponId, deletedAt: null },
    { deletedAt: new Date() }
  );

  if (!coupon) {
    throw new APIError("Coupon not found", 404);
  }
}

export async function toggleCouponActive(
  couponId: string,
  isActive: boolean
): Promise<AdminCouponListItem> {
  const coupon = await Coupon.findOneAndUpdate(
    { _id: couponId, deletedAt: null },
    { isActive },
    { new: true }
  ).lean();

  if (!coupon) {
    throw new APIError("Coupon not found", 404);
  }

  return mapAdminCouponListItem(coupon);
}
