"use client";

import { removeFromCartAction } from "@/actions/cart.action";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useCallback, useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart-store";

function RemoveFromCart({
  children,
  productId,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  productId: string;
  className?: string;
}) {
  const [isPending, startTransition] = useTransition();
  const { error, success } = useToast();
  const router = useRouter();
  const removeFromCart = useCartStore(state => state.removeFromCart);

  const handleRemoveFromCart = useCallback(() => {
    startTransition(async () => {
      try {
        const res = await removeFromCartAction(productId);
        if (!res.success) throw new Error(res.message);
        router.refresh();
        removeFromCart(productId);
        success("Product removed from cart!");
      } catch (err) {
        error(
          err instanceof Error ? err.message : "Failed to remove from cart!",
        );
      }
    });
  }, [productId, error, success, router, removeFromCart]);

  return (
    <Button
      disabled={isPending}
      onClick={handleRemoveFromCart}
      variant="outline"
      className={cn("[&_svg]:size-4", className)}
      {...props}
    >
      {children}
    </Button>
  );
}

export default RemoveFromCart;
