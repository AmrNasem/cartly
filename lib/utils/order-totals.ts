import { CouponDTO } from "@/lib/types/coupon.types";

export const TAX_RATE = 0.05;
export const SHIPPING_COST = 0;

export function calcCartDiscount(coupon: CouponDTO, subtotal: number): number {
  if (!coupon.isActive) return 0;

  if (coupon.minCartValue && subtotal < coupon.minCartValue) {
    return 0;
  }

  let discount = 0;

  if (coupon.discountType === "percentage") {
    discount = (subtotal * coupon.discountValue) / 100;
  }

  if (coupon.discountType === "fixed") {
    discount = coupon.discountValue;
  }

  if (coupon.maxDiscount) {
    discount = Math.min(discount, coupon.maxDiscount);
  }

  return Math.max(discount, 0);
}

export type OrderTotals = {
  subtotal: number;
  tax: number;
  discount: number;
  shipping: number;
  total: number;
  itemCount: number;
};

export function calculateOrderTotals(
  items: { price: number;  quantity: number}[],
  coupon?: CouponDTO | null,
): OrderTotals {
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const discount = coupon ? calcCartDiscount(coupon, subtotal) : 0;
  const tax = subtotal * TAX_RATE;
  const shipping = SHIPPING_COST;
  const total = Math.max(subtotal + tax + shipping - discount, 0);

  return { subtotal, tax, discount, shipping, total, itemCount };
}

export function toStripeAmount(amount: number): number {
  return Math.round(amount * 100);
}
