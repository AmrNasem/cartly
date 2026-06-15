import { DiscountType } from "@/lib/models/coupon";
import {
  CouponFormInput,
  ValidatedCouponCreate,
} from "@/lib/types/coupon.types";

type ValidationResult =
  { valid: true; data: ValidatedCouponCreate }
  | {
    valid: false;
    fieldErrors: Partial<Record<keyof CouponFormInput | "form", string>>;
    error?: string;
  };

function parseOptionalPositiveNumber(
  value: string,
  field: string,
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
  fieldLabel: string,
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
    discountType: String(
      formData.get("discountType") ?? "percentage",
    ) as DiscountType,
    discountValue: String(formData.get("discountValue") ?? ""),
    maxDiscount: String(formData.get("maxDiscount") ?? ""),
    usageLimit: String(formData.get("usageLimit") ?? ""),
    perUserLimit: String(formData.get("perUserLimit") ?? ""),
    minCartValue: String(formData.get("minCartValue") ?? ""),
    startDate: String(formData.get("startDate") ?? ""),
    endDate: String(formData.get("endDate") ?? ""),
    isActive:
      formData.get("isActive") === "on" || formData.get("isActive") === "true",
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
    "Discount value",
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
    "maxDiscount",
  );
  if (maxDiscount.error) fieldErrors.maxDiscount = maxDiscount.error;

  const usageLimit = parseOptionalPositiveNumber(
    input.usageLimit,
    "usageLimit",
  );
  if (usageLimit.error) fieldErrors.usageLimit = usageLimit.error;

  const perUserLimit = parseOptionalPositiveNumber(
    input.perUserLimit,
    "perUserLimit",
  );
  if (perUserLimit.error) fieldErrors.perUserLimit = perUserLimit.error;

  const minCartValue = parseOptionalPositiveNumber(
    input.minCartValue,
    "minCartValue",
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

export function validateCouponUpdate(
  existing: CouponFormInput,
  updates: CouponFormInput,
  usedCount: number,
): ValidationResult {
  const fieldErrors: Partial<Record<keyof CouponFormInput | "form", string>> =
    {};

  if (updates.code !== existing.code) {
    fieldErrors.code = "Coupon code cannot be changed";
  }

  if (
    // Validate: "discountType" can't be updated
    updates.discountType !== existing.discountType
  ) {
    fieldErrors.discountType = "Discount type cannot be changed";
  }

  // Validate: "discountValue" can't be updated in case the coupon was used
  const parsedDiscountValue = parseRequiredPositiveNumber(
    updates.discountValue,
    "Discount value",
  );
  const parsedExistingDiscountValue = parseRequiredPositiveNumber(
    existing.discountValue,
    "Discount value",
  );


  if (parsedDiscountValue.value !== parsedExistingDiscountValue.value)
    if (usedCount > 0)
      fieldErrors.discountValue =
        "Cannot change discount value after coupon usage";

  if (parsedDiscountValue.error)
    fieldErrors.discountValue = parsedDiscountValue.error;

  // Validate: "maxDiscount" can't be dcreased in case the coupon was used
  const parsedMaxDiscount = parseOptionalPositiveNumber(
    updates.maxDiscount,
    "Max Discount",
  );
  const { value: parsedExistingMaxDiscountValue } = parseOptionalPositiveNumber(
    existing.maxDiscount,
    "Max Discount",
  );

  if (parsedMaxDiscount.value !== parsedExistingMaxDiscountValue)
    if (usedCount > 0)
      if (
        parsedExistingMaxDiscountValue &&
        parsedMaxDiscount.value &&
        parsedMaxDiscount.value < parsedExistingMaxDiscountValue
      )
        fieldErrors.maxDiscount =
          "Cannot decrease max discount after coupon usage";

  if (parsedMaxDiscount.error)
    fieldErrors.maxDiscount = parsedMaxDiscount.error;

  // Validate: "minCartValue" can't be updated in case the coupon was used
  const parsedMinCartValue = parseOptionalPositiveNumber(
    updates.minCartValue,
    "Min Cart Value",
  );
  const parsedExistingMinCartValue = parseOptionalPositiveNumber(
    existing.minCartValue,
    "Max Discount",
  );

  if (parsedMinCartValue.value !== parsedExistingMinCartValue.value && usedCount > 0)
    fieldErrors.minCartValue =
      "Cannot change min cart value after coupon usage";
  else if (parsedMinCartValue.error)
    fieldErrors.minCartValue = parsedMinCartValue.error;

  // Validate: "usageLimit" can't be less than number of actual usages
  const parsedUsageLimit = parseOptionalPositiveNumber(
    updates.usageLimit,
    "Usage limit",
  );
  const parsedExistingUsageLimit = parseOptionalPositiveNumber(
    existing.usageLimit,
    "Usage limit",
  );
  if (parsedUsageLimit.value !== parsedExistingUsageLimit.value) {
    if (parsedUsageLimit.value && parsedUsageLimit.value < usedCount) {
      fieldErrors.usageLimit =
        "Usage limit cannot be less than number of actual usages";
    } else if (parsedUsageLimit.error)
      fieldErrors.usageLimit = parsedUsageLimit.error;
  }

  // Validate: Parse "perUserLimit"
  const parsedPerUserLimit = parseOptionalPositiveNumber(updates.perUserLimit, "Per User Limit");
  if (parsedPerUserLimit.error)
    fieldErrors.perUserLimit = parsedPerUserLimit.error;

  // Validate: "startDate" can't be changed after coupon has started
  const parsedStartDate = parseOptionalDate(updates.startDate);
  const parsedExistingStartDate = parseOptionalDate(existing.startDate);
  const now = new Date();

  if (updates.startDate !== existing.startDate) {
    if (usedCount > 0)
      fieldErrors.startDate = "Cannot change start date after coupon was used"
    else if (parsedExistingStartDate && parsedExistingStartDate.getTime() <= now.getTime())
      fieldErrors.startDate = "Cannot change start date after coupon has started"
    else if (parsedStartDate && parsedStartDate.getTime() < now.getTime())
      fieldErrors.startDate = "Start Date must be in the future"
  }

  // Validate: "endDate" must come after NOW and "startDate"
  const parsedEndDate = parseOptionalDate(updates.endDate);

  if (updates.endDate !== existing.endDate) {
    if (parsedEndDate && parsedStartDate && parsedEndDate.getTime() <= parsedStartDate.getTime())
      fieldErrors.endDate = "End date must come after start date";
    else if (parsedEndDate && parsedEndDate.getTime() <= now.getTime())
      fieldErrors.endDate = "End date must be in the future";
  }

  if (Object.keys(fieldErrors).length > 0) return { valid: false, fieldErrors, error: "Fix invalid fields!" }

  return {
    valid: true,
    data: {
      code: updates.code,
      description: updates.description,
      discountType: updates.discountType,
      discountValue: parsedDiscountValue.value || 0,
      maxDiscount: parsedMaxDiscount.value,
      usageLimit: parsedUsageLimit.value,
      perUserLimit: parsedPerUserLimit.value,
      minCartValue: parsedMinCartValue.value,
      startDate: parsedStartDate,
      endDate: parsedEndDate,
      isActive: updates.isActive,

    }
  };
}
