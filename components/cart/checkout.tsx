"use client";

import { Percent } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import Link from "next/link";

function Checkout({ className = "" }) {
  const items = useCartStore((state) => state.items);
  const subtotal = items
    ? items.reduce((acc, i) => acc + i.product.price * i.quantity, 0)
    : 0;
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  return (
    <div className={cn("my-5", className)}>
      <h3 className="text-primary/90 font-lg mb-3 md:text-end font-semibold">
        Continue Shopping
      </h3>
      <form action="" className="border border-muted rounded-md shadow-md">
        <div className="p-4 space-y-2">
          <h3 className="text-primary mb-4">Order Summary</h3>
          <div className="flex items-center duration-150 gap-1 px-2 py-1 border border-muted has-[input:focus]:border-primary/80 rounded-md">
            <Percent className="size-4" />
            <input
              type="text"
              name="coupon"
              id="coupon"
              className="outline-none text-sm p-1 w-full grow"
              placeholder="Have a coupon?"
            />
          </div>
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
          <Link href="/checkout" className="bg-primary text-white hover:bg-primary/90 block w-full font-semibold rounded-md text-sm text-center py-2">
            Continue to checkout
          </Link>
          <Button className="w-full block" variant="outline">
            Continue shopping
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
