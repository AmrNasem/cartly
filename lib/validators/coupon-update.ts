import { APIError } from "../api/errors";
import { ICoupon } from "../models/coupon";

export function validateCouponUpdate(
  existing: ICoupon,
  updates: Partial<ICoupon>,
  usedCount: number
) {
  // 1️⃣ Hard-immutable fields
  if ("code" in updates && updates.code !== existing.code) {
    throw new APIError("Coupon code cannot be changed", 400);
  }

  if (
    "discountType" in updates &&
    updates.discountType !== existing.discountType
  ) {
    throw new APIError("Discount type cannot be changed", 400);
  }

  // 2️⃣ If coupon has been used → restrict heavily
  if (usedCount > 0) {
    if ("discountValue" in updates) {
      throw new APIError(
        "Cannot change discount value after coupon usage",
        400
      );
    }

    if (
      "maxDiscount" in updates &&
      updates.maxDiscount! < existing.maxDiscount!
    ) {
      throw new APIError("Cannot decrease maxDiscount after coupon usage", 400);
    }

    if ("minCartValue" in updates) {
      throw new APIError("Cannot change minCartValue after coupon usage", 400);
    }
  }

  // 3️⃣ usageLimit validation
  if (
    "usageLimit" in updates &&
    updates.usageLimit! < usedCount
  ) {
    throw new APIError("usageLimit cannot be less than usedCount", 400);
  }

  // 4️⃣ startDate validation
  if ("startDate" in updates) {
    const now = new Date();
    if (existing.startDate! <= now) {
      throw new APIError(
        "Cannot change startDate after coupon has started",
        400
      );
    }
  }

  // 5️⃣ endDate validation
  if ("endDate" in updates) {
    const newEnd = new Date(updates.endDate!);
    if (newEnd <= existing.startDate!) {
      throw new APIError("endDate must be after startDate", 400);
    }
  }

  // 6️⃣ Sanity checks
  if (
    "discountValue" in updates &&
    updates.discountValue !== undefined &&
    updates.discountValue <= 0
  ) {
    throw new APIError("discountValue must be greater than 0", 400);
  }

  if (
    "maxDiscount" in updates &&
    updates.maxDiscount !== undefined &&
    updates.maxDiscount! <= 0
  ) {
    throw new APIError("maxDiscount must be greater than 0", 400);
  }

  return true;
}
