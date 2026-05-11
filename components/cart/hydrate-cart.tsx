"use client";

import { fetchCart } from "@/actions/cart.action";
import { useCartStore } from "@/store/cart-store";
import { useEffect } from "react";

function HydrateCart() {
  const setCart = useCartStore(state => state.setCart);

  useEffect(() => {
    const hydrateCart = async () => {
      const cart = await fetchCart()
      if (cart.payload)
        setCart(cart.payload)
    };
    hydrateCart();
  }, [setCart])

  return null;
}

export default HydrateCart