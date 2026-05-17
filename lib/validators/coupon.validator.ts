import { DiscountType } from "@/lib/models/coupon";
import {
  CouponFormInput,
  ValidatedCouponCreate,
} from "@/lib/types/coupon.types";

type ValidationResult =
  | { valid: true; data: ValidatedCouponCreate }
  | {
      valid: false;
      fieldErrors: Partial<Record<keyof CouponFormInput | "form", string>>;
      error?: string;
    };

function parseOptionalPositiveNumber(
  value: string,
  field: keyof CouponFormInput
): { value: number | null; error?: string } {
  if (!value.trim()) return { value: null };

  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    return { value: null, error: `${field} must be a valid number` };
  }

  if (parsed < 0) {
    return { value: null, error: `${field} cannot be negative` };
  }

  return { value: parsed };
}

function parseRequiredPositiveNumber(
  value: string,
  fieldLabel: string
): { value?: number; error?: string } {
  if (!value.trim()) {
    return { error: `${fieldLabel} is required` };
  }

  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    return { error: `${fieldLabel} must be a valid number` };
  }

  if (parsed <= 0) {
    return { error: `${fieldLabel} must be greater than 0` };
  }

  return { value: parsed };
}

function parseOptionalDate(value: string): Date | null {
  if (!value.trim()) return null;

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function parseCouponFormData(formData: FormData): CouponFormInput {
  return {
    code: String(formData.get("code") ?? ""),
    description: String(formData.get("description") ?? ""),
    discountType: String(formData.get("discountType") ?? "percentage") as DiscountType,
    discountValue: String(formData.get("discountValue") ?? ""),
    maxDiscount: String(formData.get("maxDiscount") ?? ""),
    usageLimit: String(formData.get("usageLimit") ?? ""),
    perUserLimit: String(formData.get("perUserLimit") ?? ""),
    minCartValue: String(formData.get("minCartValue") ?? ""),
    startDate: String(formData.get("startDate") ?? ""),
    endDate: String(formData.get("endDate") ?? ""),
    isActive: formData.get("isActive") === "on" || formData.get("isActive") === "true",
  };
}

export function validateCouponCreate(input: CouponFormInput): ValidationResult {
  const fieldErrors: Partial<Record<keyof CouponFormInput | "form", string>> =
    {};

  const code = input.code.trim().toUpperCase();
  if (!code) {
    fieldErrors.code = "Coupon code is required";
  }

  const discountValueResult = parseRequiredPositiveNumber(
    input.discountValue,
    "Discount value"
  );
  if (discountValueResult.error) {
    fieldErrors.discountValue = discountValueResult.error;
  }

  const discountType: DiscountType =
    input.discountType === "fixed" ? "fixed" : "percentage";

  if (
    discountType === "percentage" &&
    discountValueResult.value !== undefined &&
    discountValueResult.value > 100
  ) {
    fieldErrors.discountValue = "Percentage discount cannot exceed 100";
  }

  const maxDiscount = parseOptionalPositiveNumber(
    input.maxDiscount,
    "maxDiscount"
  );
  if (maxDiscount.error) fieldErrors.maxDiscount = maxDiscount.error;

  const usageLimit = parseOptionalPositiveNumber(
    input.usageLimit,
    "usageLimit"
  );
  if (usageLimit.error) fieldErrors.usageLimit = usageLimit.error;

  const perUserLimit = parseOptionalPositiveNumber(
    input.perUserLimit,
    "perUserLimit"
  );
  if (perUserLimit.error) fieldErrors.perUserLimit = perUserLimit.error;

  const minCartValue = parseOptionalPositiveNumber(
    input.minCartValue,
    "minCartValue"
  );
  if (minCartValue.error) fieldErrors.minCartValue = minCartValue.error;

  const startDate = parseOptionalDate(input.startDate);
  const endDate = parseOptionalDate(input.endDate);

  if (input.startDate.trim() && !startDate) {
    fieldErrors.startDate = "Invalid start date";
  }

  if (input.endDate.trim() && !endDate) {
    fieldErrors.endDate = "Invalid end date";
  }

  if (startDate && endDate && endDate.getTime() < startDate.getTime()) {
    fieldErrors.endDate = "End date cannot be before start date";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { valid: false, fieldErrors };
  }

  return {
    valid: true,
    data: {
      code,
      description: input.description.trim(),
      discountType,
      discountValue: discountValueResult.value!,
      maxDiscount: maxDiscount.value,
      usageLimit: usageLimit.value,
      perUserLimit: perUserLimit.value,
      minCartValue: minCartValue.value,
      startDate,
      endDate,
      isActive: input.isActive,
    },
  };
}
