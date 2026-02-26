"use client";

import { addToCartAction } from "@/actions/cart.action";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useCallback, useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart-store";

function AddToCart({
  children,
  productId,
  className = "",
}: {
  children: React.ReactNode;
  productId: string;
  className?: string;
}) {
  const [isPending, startTransition] = useTransition();
  const { error, success } = useToast();
  const router = useRouter();
  const addToCart = useCartStore(state => state.addToCart)

  const handleAddToCart = useCallback(() => {
    startTransition(async () => {
      try {
        const res = await addToCartAction(productId);
        addToCart(res.payload)
        router.refresh();
        success("Product added to cart!");
      } catch (err) {
        error(
          err instanceof Error ? err.message : "Failed to add product to cart!",
        );
      }
    });
  }, [productId, error, success, router, addToCart]);

  return (
    <Button
      disabled={isPending}
      onClick={handleAddToCart}
      className={cn("[&_svg]:size-4", className)}
    >
      {children}
    </Button>
  );
}

export default AddToCart;
