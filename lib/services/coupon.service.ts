import { APIError } from "@/lib/api/errors";
import { mapAdminCouponListItem, mapCouponFormInput } from "@/lib/mappers/coupon.mapper";
import { Coupon, CouponUsage } from "@/lib/models";
import { AdminCouponListItem, CouponFormInput, ValidatedCouponCreate } from "@/lib/types/coupon.types";
import { validateCouponUpdate } from "../validators/coupon.validator";

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

export async function updateCoupon(
  input: CouponFormInput,
  couponId: string
) {
  const coupon = await Coupon.findOne({ _id: couponId, deletedAt: null });
  if (!coupon) throw new APIError("Coupon does not exist!", 404);

  const usedCount = await CouponUsage.find({ couponId }).countDocuments();
  const existingCoupon = mapCouponFormInput(coupon);

  const validationResult = validateCouponUpdate(existingCoupon, input, usedCount);

  if (validationResult.valid) {
    const data = validationResult.data;
    const updatedCoupon = await Coupon.findOneAndUpdate({
      _id: couponId,
      deletedAt: null,
    }, {
      ...data
    }, { new: true }
    );
    return { ...validationResult, data: updatedCoupon };
  } else return validationResult
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

export async function fetchCoupon(couponId: string): Promise<CouponFormInput> {
  const coupon = await Coupon.findOne(
    { _id: couponId, deletedAt: null }
  );

  if (!coupon) {
    throw new APIError("Coupon not found", 404);
  }

  return mapCouponFormInput(coupon);
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
