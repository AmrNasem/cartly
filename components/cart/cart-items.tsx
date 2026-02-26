"use client";

import CartItem from "./cart-item";
import { cn } from "@/lib/utils";
import { CartItemDTO } from "@/lib/types/product.types";
import { useEffect } from "react";
import { useCartStore } from "@/store/cart-store";

function CartItems({ className = "", items }: { className?: string, items: CartItemDTO[] }) {
  const setCart = useCartStore(state => state.setCart);
  const cartedProducts = useCartStore(state => state.items);

  useEffect(() => {
    if (items && !cartedProducts) {
      setCart(items);
    }
  }, [items, cartedProducts, setCart]);


  return (
    <div className={cn("space-y-4", className)}>
      {
        items.length ? (
          items.map((item) => <CartItem key={item.id} item={item} />)
        ) : (
          <div className="flex md:block justify-center flex-col min-h-75">
            <p className="text-xl text-center p-2 md:py-4 bg-muted/20 text-muted-foreground rounded-xl border border-muted">
              Your cart is empty
            </p>
          </div>
        )
      }
    </div>
  );
}

export default CartItems;
