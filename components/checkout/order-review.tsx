"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { calculateOrderTotals } from "@/lib/utils/order-totals";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OrderReviewItem from "./order-review-item";
import useCheckoutForm from "@/hooks/checkout/use-checkout-form";

export function OrderReview() {
  const { items } = useCheckoutForm();
  const appliedCoupon = useCartStore(
    (state) => state.cart.appliedCoupon?.coupon ?? null,
  );
  const totals = calculateOrderTotals(items.map(item => ({ price: item.priceSnapshot, quantity: item.quantity })), appliedCoupon);

  if (items.length === 0) {
    return (
      <Card className="border-muted shadow-md">
        <CardHeader>
          <CardTitle className="text-primary">Order Review</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Your cart is empty.{" "}
            <Link href="/shop" className="text-primary underline">
              Continue shopping
            </Link>
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-muted shadow-md">
      <CardHeader>
        <CardTitle className="text-primary">Order Review</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-3">
          {items.map((item) => {
            const lineSubtotal = item.priceSnapshot * item.quantity;
            return (
              <OrderReviewItem key={item.id} item={item} lineSubtotal={lineSubtotal} />
            );
          })}
        </ul>

        <div className="border-t border-muted pt-3 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">${totals.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span className="font-medium text-green-600">Free</span>
          </div>
          {totals.discount > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Discount</span>
              <span className="font-medium text-green-600">
                -${totals.discount.toFixed(2)}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Estimated tax</span>
            <span className="font-medium">${totals.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-base font-semibold text-primary pt-1">
            <span>Total</span>
            <span>${totals.total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
