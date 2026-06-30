import { WishlistContext } from "@/providers/wishilst-provider";
import { useContext } from "react";

function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context)
    throw new Error("useWishlist should be used within WishlistProvider");

  return context;
}

export default useWishlist;
