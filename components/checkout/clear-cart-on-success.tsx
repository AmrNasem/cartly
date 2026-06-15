"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cart-store";

export function ClearCartOnSuccess() {
  const cartId = useCartStore((state) => state.cart.cartId);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    async function clear() {
      if (cartId) {
        await fetch("/api/cart", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cartId }),
        });
      }
      clearCart();
    }

    clear();
  }, [cartId, clearCart]);

  return null;
}
