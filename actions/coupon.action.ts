"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth/guards";
import { connectDB } from "@/lib/db";
import {
  createCoupon,
  getAdminCoupons,
  toggleCouponActive,
} from "@/lib/services/coupon.service";
import { CouponFormState } from "@/lib/types/coupon.types";
import {
  parseCouponFormData,
  validateCouponCreate,
} from "@/lib/validators/coupon.validator";

const COUPONS_PATH = "/admin/coupons";

export async function fetchAdminCouponsAction() {
  await requireAdmin(true);
  await connectDB();
  return getAdminCoupons();
}

export async function createCouponAction(
  _prev: CouponFormState | null,
  formData: FormData
): Promise<CouponFormState> {
  try {
    const session = await requireAdmin(true);
    await connectDB();

    const input = parseCouponFormData(formData);
    const validation = validateCouponCreate(input);

    if (!validation.valid) {
      return {
        success: false,
        fieldErrors: validation.fieldErrors,
        error: "Please fix the highlighted fields",
      };
    }

    await createCoupon(validation.data, session.user.id);
    // revalidatePath(COUPONS_PATH);

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to create coupon",
    };
  }
}

export async function toggleCouponActiveAction(
  couponId: string,
  isActive: boolean
): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAdmin(true);
    await connectDB();
    await toggleCouponActive(couponId, isActive);
    revalidatePath(COUPONS_PATH);
    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to update coupon",
    };
  }
}
