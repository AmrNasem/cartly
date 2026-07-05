"use client";

import { CheckCircle, Loader2, Percent } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import Link from "next/link";
import { FormEvent, useCallback, useState } from "react";
import {
  applyCouponAction,
  removeCartCouponAction,
} from "@/actions/cart.action";
import { useToast } from "@/hooks/use-toast";
import {
  calcCartDiscount,
  calculateOrderTotals,
} from "@/lib/utils/order-totals";
import { createOrderAction } from "@/actions/order.action";
import { useRouter } from "next/navigation";

export { calcCartDiscount };

function Checkout({ className = "" }) {
  const [coupon, setCoupon] = useState<{
    value: string;
    loading: boolean;
  }>({ value: "", loading: false });
  const { items, cartId, appliedCoupon } = useCartStore((state) => state.cart);
  const setAppliedCoupon = useCartStore((state) => state.setAppliedCoupon);
  const { error, success } = useToast();
  const router = useRouter();
  const [checkingOut, setCheckingOut] = useState(false);

  const { subtotal, tax, discount, total } = calculateOrderTotals(
    items?.map((item) => ({
      price: item.product.price,
      quantity: item.quantity,
    })) ?? [],
    appliedCoupon?.coupon ?? null,
  );

  const handleCouponApplication = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!coupon.value.trim() || !cartId) return;
    setCoupon((prev) => ({ ...prev, loading: true }));
    const res = await applyCouponAction({
      couponCode: coupon.value.trim(),
      cartId: cartId,
    });
    console.log(res);
    if (!res.success) {
      error(res.message);
      setCoupon((prev) => ({ ...prev, loading: false }));
    } else {
      setCoupon((prev) => ({ ...prev, loading: false, value: "" }));
      setAppliedCoupon(res.payload);
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

  const handleCheckout = useCallback(async () => {
    if (!items || items.length === 0) return;

    try {
      setCheckingOut(true);
      const res = await createOrderAction({
        items: items.map((item) => ({
          id: item.product.id,
          quantity: item.quantity,
        })),
        couponCode: appliedCoupon?.coupon.code || null,
      });
      if (!res.success) throw new Error(res.message);
      const order = res.payload;
      if (!order) throw new Error();
      router.push(`/checkout?orderId=${order.id}`);
    } catch (err) {
      error(err instanceof Error ? err.message : "Something went wrong!");
    } finally {
      setCheckingOut(false);
    }
  }, [error, items, router, appliedCoupon]);

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
              <Button
                disabled={coupon.loading}
                onClick={handleRemoveCoupon}
                variant="ghost"
                size="sm"
                className="text-[11px] text-red-500 border-red-500 px-1 py-px hover:text-red-500 cursor-pointer hover:bg-white"
              >
                Remove
              </Button>
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
          <Button
            disabled={items?.length === 0 || checkingOut}
            onClick={handleCheckout}
            className="block w-full font-semibold rounded-md text-sm text-center py-2 cursor-pointer"
          >
            {checkingOut ? (
              <Loader2 className="animate-spin mx-auto" />
            ) : (
              "Continue to checkout"
            )}
          </Button>
          <Button
            className="w-full block text-center"
            variant="outline"
            asChild
          >
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
