"use client";

import { calculateOrderTotals } from "@/lib/utils/order-totals";
import { useCartStore } from "@/store/cart-store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import useCheckoutForm from "@/hooks/checkout/use-checkout-form";
import { PaymentProvider } from "@/lib/models/payment";

type CheckoutSummaryProps = {
  className?: string;
};

const getSubmittionLabel = (paymentMethod: PaymentProvider) => {
  if (paymentMethod === "COD") return "Place Order";
  return "Proceed to Payment";
};

export function CheckoutSummary({ className }: CheckoutSummaryProps) {
  const appliedCoupon = useCartStore(
    (state) => state.cart.appliedCoupon?.coupon ?? null,
  );
  const { items } = useCheckoutForm();

  const totals = calculateOrderTotals(items.map(item => ({ price: item.priceSnapshot, quantity: item.quantity })), appliedCoupon);

  const { paymentMethod } = useCheckoutForm();
  const status = useFormStatus();

  return (
    <aside
      className={cn(
        "border border-muted rounded-md shadow-md sticky top-21 self-start",
        className,
      )}
    >
      <div className="p-4 space-y-2">
        <h3 className="text-primary font-semibold mb-2">Order Summary</h3>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Items ({totals.itemCount})
          </span>
          <span className="font-semibold text-primary/80">
            ${totals.subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className="font-semibold text-green-600">Free</span>
        </div>
        {totals.discount > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Discount</span>
            <span className="font-semibold text-green-600">
              -${totals.discount.toFixed(2)}
            </span>
          </div>
        )}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Estimated tax</span>
          <span className="font-semibold text-primary/80">
            ${totals.tax.toFixed(2)}
          </span>
        </div>
      </div>
      <div className="border-t border-muted flex items-center justify-between p-4 text-lg">
        <h4 className="text-primary">Total</h4>
        <span className="font-semibold text-primary/80">
          ${totals.total.toFixed(2)}
        </span>
      </div>
      <div className="p-4">
        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={status.pending || items.length === 0}
        >
          {status.pending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Processing...
            </>
          ) : (
            getSubmittionLabel(paymentMethod)
          )}
        </Button>
      </div>
    </aside>
  );
}
