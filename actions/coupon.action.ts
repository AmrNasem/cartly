"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth/guards";
import { connectDB } from "@/lib/db";
import {
  createCoupon,
  deleteCoupon,
  fetchCoupon,
  getAdminCoupons,
  toggleCouponActive,
  updateCoupon,
} from "@/lib/services/coupon.service";
import { CouponFormInput, CouponFormState } from "@/lib/types/coupon.types";
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
  formData: FormData,
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
    revalidatePath(COUPONS_PATH);

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to create coupon",
    };
  }
}

export async function updateCouponAction(
  _prev: CouponFormState | null,
  formData: FormData,
): Promise<CouponFormState> {
  try {
    await requireAdmin(true);
    await connectDB();

    const input = parseCouponFormData(formData);
    const couponId = String(formData.get("couponId") ?? "");

    console.log("COLLECTED FORM: ", input)
    const result = await updateCoupon(input, couponId);
    console.log("COUPON UPDATE: ", result)
    if (!result.valid)
      return {
        success: false,
        error: "Please fix the highlighted fields",
        fieldErrors: result.fieldErrors,
      };
    revalidatePath(COUPONS_PATH);

    return { success: true };
  } catch (err) {
    console.log("COUPON UPDATE ERROR: ", err)
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to create coupon",
    };
  }
}

export async function deleteCouponAction(
  couponId: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAdmin(true);
    await connectDB();
    await deleteCoupon(couponId);
    revalidatePath(COUPONS_PATH);
    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to delete coupon",
    };
  }
}

export async function getCouponToEditAction(
  couponId: string,
): Promise<{ success: boolean; error?: string; data?: CouponFormInput }> {
  try {
    await requireAdmin(true);
    await connectDB();
    const coupon = await fetchCoupon(couponId);
    return { success: true, data: coupon };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to get coupon",
    };
  }
}

export async function toggleCouponActiveAction(
  couponId: string,
  isActive: boolean,
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
