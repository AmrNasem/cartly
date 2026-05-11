"use client";

import CartItem from "./cart-item";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useCartStore } from "@/store/cart-store";
import { CartState } from "@/lib/types/cart.types";
import { CartItemDTO } from "@/lib/types/product.types";

function CartItems({ className = "", cart }: { className?: string, cart: CartState & {items: CartItemDTO[]} }) {
  const setCart = useCartStore(state => state.setCart);
  const cartedProducts = useCartStore(state => state.cart.items);

  useEffect(() => {
    if (cart && !cartedProducts) {
      setCart(cart);
    }
  }, [cart, cartedProducts, setCart]);


  return (
    <div className={cn("space-y-4", className)}>
      {
        cart.items.length ? (
          cart.items.map((item) => <CartItem key={item.id} item={item} />)
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
