"use client";

import {
  addToWishListAction,
  removeFromWishListAction,
} from "@/actions/wishlist.action";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

function ToggleWishlistButton({
  productId,
  isWishlisted,
  className = "",
}: {
  productId: string;
  isWishlisted: boolean;
  className?: string;
}) {
  const [isPending, startTransition] = useTransition();
  const { error, success } = useToast();
  const [isWishlistedState, setIsWishlistedState] = useState(isWishlisted);
  const router = useRouter()

  const handleClick = () => {
    const buttonState = isWishlistedState
    setIsWishlistedState((prev) => !prev);
    startTransition(async () => {
      try {
        if (buttonState) {
          const res = await removeFromWishListAction(productId);
          if (!res) throw new Error("Failed to remove product from wishlist!");
          success("Product removed from wishlist!");
        } else {
          const res = await addToWishListAction(productId);
          if (typeof res === "string") throw new Error(res);
          success("Product added to wishlist!");
        }
        router.refresh()
      } catch (err) {
        setIsWishlistedState((prev) => !prev);
        console.log("Error adding to wishlist:", err);
        error(
          err instanceof Error
            ? err.message
            : "Failed to add product to wishlist!",
        );
      }
    });
  };

  return (
    <button
      disabled={isPending}
      onClick={handleClick}
      className={cn(
        "z-20 size-7 min-w-7 min-h-7 disabled:opacity-80 disabled:cursor-auto flex items-center justify-center rounded-full bg-secondary hover:bg-secondary/80 duration-150 cursor-pointer",
        className,
      )}
    >
      {isWishlistedState ? (
        <Heart fill="red" stroke="red" className="size-4 text-muted-primary" />
      ) : (
        <Heart className="size-4 text-muted-primary" />
      )}
    </button>
  );
}

export default ToggleWishlistButton;
