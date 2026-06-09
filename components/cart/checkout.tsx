"use client";

import { CheckCircle, Loader2, Percent } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import Link from "next/link";
import { FormEvent, useCallback, useState } from "react";
import { applyCouponAction, removeCartCouponAction } from "@/actions/cart.action";
import { useToast } from "@/hooks/use-toast";
import { CouponDTO } from "@/lib/types/coupon.types";

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

function Checkout({ className = "" }) {
  const [coupon, setCoupon] = useState<{
    value: string;
    loading: boolean;
  }>({ value: "", loading: false });
  const { items, cartId, appliedCoupon } = useCartStore((state) => state.cart);
  const setAppliedCoupon = useCartStore((state) => state.setAppliedCoupon);
  const { error, success } = useToast();

  const subtotal = items
    ? items.reduce((acc, i) => acc + i.product.price * i.quantity, 0)
    : 0;
  console.log(calcCartDiscount);
  const tax = subtotal * 0.05;
  const discount = appliedCoupon
    ? calcCartDiscount(appliedCoupon.coupon, subtotal)
    : 0;
  const total = subtotal + tax - discount;

  const handleCouponApplication = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!coupon.value.trim() || !cartId) return;
    setCoupon((prev) => ({ ...prev, loading: true }));
    const res = await applyCouponAction({
      couponCode: coupon.value.trim(),
      cartId: cartId,
    });
    console.log(res);
    if (res.error) {
      error(res.error);
      setCoupon((prev) => ({ ...prev, loading: false }));
    } else {
      setCoupon((prev) => ({ ...prev, loading: false, value: "" }));
      setAppliedCoupon(res.appliedCoupon);
    }
  };

  const handleRemoveCoupon = useCallback(async () => {
    if (!appliedCoupon || !cartId) return;
    try {
      setCoupon((prev) => ({ ...prev, loading: true }));
      await removeCartCouponAction(appliedCoupon.id, cartId);
      setAppliedCoupon();
      success("Coupon removed successfully!");
    } catch (err) {
      error(err instanceof Error ? err.message : "Failed to remove coupon!");
    } finally {
      setCoupon((prev) => ({ ...prev, loading: false }));
    }
  }, [appliedCoupon, setAppliedCoupon, error, success, cartId]);

  return (
    <div className={cn("my-5", className)}>
      <h3 className="text-primary/90 font-lg mb-3 md:text-end font-semibold">
        Continue Shopping
      </h3>
      <div className="border border-muted rounded-md shadow-md">
        <div className="p-4 space-y-2">
          <h3 className="text-primary mb-4">Order Summary</h3>
          {appliedCoupon ? (
            <div className="flex items-center gap-1 justify-between rounded-md border border-green-500 p-2">
              <CheckCircle className="size-6 text-green-600" />
              <div>
                <div className="flex gap-1 items-end">
                  <span className="uppercase text-sm font-semibold text-primary/80">
                    {appliedCoupon.coupon.code}
                  </span>
                  <span className="text-sm text-muted-foreground">applied</span>
                </div>
                <span className="text-[13px] text-muted-foreground">
                  {appliedCoupon.coupon.discountType === "percentage"
                    ? `-$${discount.toFixed(2)} (${appliedCoupon.coupon.discountValue}% off)`
                    : `-$${appliedCoupon.coupon.discountValue}`}
                </span>
              </div>
              <Button disabled={coupon.loading} onClick={handleRemoveCoupon} variant="ghost" size="sm" className="text-[11px] text-red-500 border-red-500 px-1 py-px hover:text-red-500 cursor-pointer hover:bg-white">Remove</Button>
            </div>
          ) : (
            <form
              onSubmit={handleCouponApplication}
              className="flex items-center duration-150 gap-1 p-1 border border-muted has-[input:focus]:border-primary/80 rounded-md"
            >
              <Percent className="size-4" />
              <input
                type="text"
                name="coupon"
                value={coupon.value}
                onChange={(e) =>
                  setCoupon((prev) => ({ ...prev, value: e.target.value }))
                }
                id="coupon"
                className="outline-none text-sm p-1 w-full grow"
                placeholder="Have a coupon?"
              />
              <Button
                size="sm"
                disabled={!coupon.value || coupon.loading}
                className={cn("py-2 duration-200")}
              >
                {coupon.loading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  "Apply"
                )}
              </Button>
            </form>
          )}
          <div className="flex items-center gap-1 justify-between">
            <h4 className="text-sm text-muted-foreground">Subtotal</h4>
            <span className="font-semibold text-primary/80">
              {subtotal.toFixed(2)}$
            </span>
          </div>
          <div className="flex items-center gap-1 justify-between">
            <h4 className="text-sm text-muted-foreground">Shipping</h4>
            <span className="font-semibold text-green-600">Free</span>
          </div>
          <div className="flex items-center gap-1 justify-between">
            <h4 className="text-sm text-muted-foreground">Estimated tax</h4>
            <span className="font-semibold text-primary/80">
              {tax.toFixed(2)}$
            </span>
          </div>
        </div>
        <div className="border-t border-b border-muted flex items-center gap-1 justify-between p-4 text-lg">
          <h4 className="text-primary">Total</h4>
          <span className="font-semibold text-primary/80">
            {total.toFixed(2)}$
          </span>
        </div>
        <div className="p-4 space-y-4">
          <Link
            href="/checkout"
            className="bg-primary text-white hover:bg-primary/90 block w-full font-semibold rounded-md text-sm text-center py-2"
          >
            Continue to checkout
          </Link>
          <Button className="w-full block text-center" variant="outline" asChild>
            <Link href="/shop" className="">
              Continue shopping
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
