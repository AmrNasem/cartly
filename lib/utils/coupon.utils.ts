import { DiscountType } from "@/lib/models/coupon";

export type CouponDisplayStatus =
  | "active"
  | "inactive"
  | "scheduled"
  | "expiring"
  | "expired";

const EXPIRING_SOON_DAYS = 7;

export function getCouponDisplayStatus(coupon: {
  isActive: boolean;
  startDate?: Date | string | null;
  endDate?: Date | string | null;
}): { status: CouponDisplayStatus; label: string } {
  const now = Date.now();

  if (!coupon.isActive) {
    return { status: "inactive", label: "Inactive" };
  }

  if (coupon.endDate && new Date(coupon.endDate).getTime() < now) {
    return { status: "expired", label: "Expired" };
  }

  if (coupon.startDate && new Date(coupon.startDate).getTime() > now) {
    return { status: "scheduled", label: "Scheduled" };
  }

  if (coupon.endDate) {
    const msUntilExpiry =
      new Date(coupon.endDate).getTime() - now;
    const daysUntilExpiry = msUntilExpiry / (1000 * 60 * 60 * 24);

    if (daysUntilExpiry > 0 && daysUntilExpiry <= EXPIRING_SOON_DAYS) {
      return { status: "expiring", label: "Expiring soon" };
    }
  }

  return { status: "active", label: "Active" };
}

export function getCouponStatusVariant(
  status: CouponDisplayStatus
): "success" | "warning" | "destructive" | "default" | "secondary" {
  switch (status) {
    case "active":
      return "success";
    case "expiring":
      return "warning";
    case "expired":
      return "destructive";
    case "scheduled":
      return "secondary";
    case "inactive":
    default:
      return "default";
  }
}

export function formatCouponDiscount(
  discountType: DiscountType,
  discountValue: number,
  maxDiscount?: number | null
): string {
  if (discountType === "percentage") {
    const base = `${discountValue}% off`;
    return maxDiscount ? `${base} (max $${maxDiscount})` : base;
  }

  return `$${discountValue.toFixed(2)} off`;
}

export function formatCouponExpiry(endDate?: Date | string | null): string {
  if (!endDate) return "No expiry";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(endDate));
}

export function generateCouponCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";

  for (let i = 0; i < 6; i += 1) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }

  return `SAVE${suffix}`;
}
