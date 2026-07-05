"use client";
import { getWishlistCountAction } from "@/actions/wishlist.action";
import useWishlist from "@/hooks/wishlist/use-wishlist";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

function WishlistNavigator() {
  const { setWishlistCount, wishlistCount } = useWishlist();
  useEffect(() => {
    getWishlistCountAction().then((res) =>
      setWishlistCount((prev) => (res.success ? (res.payload ?? prev) : prev)),
    );
  }, [setWishlistCount]);

  return (
    <Link
      href="/wishlist"
      className="relative hover:bg-[#e9ebef] p-1 rounded-md duration-150 cursor-pointer"
    >
      {wishlistCount > 0 && (
        <span className="absolute bottom-full end-full translate-3 h-5 min-w-5 flex items-center justify-center text-white bg-primary/80 rounded-full p-1 text-[12px] font-semibold">
          {wishlistCount}
        </span>
      )}
      <Heart className="size-4 text-foreground" />
    </Link>
  );
}

export default WishlistNavigator;
