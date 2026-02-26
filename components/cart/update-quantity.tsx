"use client";

import { useCallback } from "react";
import Counter from "./counter"
import { useToast } from "@/hooks/use-toast";
import { updateQuantityAction } from "@/actions/cart.action";
import { useCartStore } from "@/store/cart-store";

function UpdateQuantity({
  productId,
  quantity,
  stock,
}: {
  productId: string;
  quantity: number;
  stock: number;
}) {
  const { error, success } = useToast();
  const updateQuantity = useCartStore(state => state.updateQuantity)
  
  const action = useCallback(
    async (newQuantity: number) => {
      try {
        updateQuantity(productId, newQuantity);
        await updateQuantityAction(productId, newQuantity);
        success("Product quantity updated!");
      } catch {
        updateQuantity(productId, quantity);
        error("Failed to update quantity!");
      }
    },
    [productId, error, success, updateQuantity, quantity],
  );

  return (
    <Counter
      action={action}
      value={quantity}
      className="z-10"
      maximum={stock}
    />
  );
}

export default UpdateQuantity