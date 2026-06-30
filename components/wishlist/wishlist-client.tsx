"use client";

import { WishlistItemDTO } from "@/lib/types/wishlist.types";
import WishlistItem from "./wish-list-item";
import useWishlist from "@/hooks/wishlist/use-wishlist";
import { useEffect } from "react";

function WishlistClient({ wishlist }: { wishlist: WishlistItemDTO[] }) {
  const { setWishlistCount } = useWishlist();

  useEffect(() => {
    console.log(wishlist.length);
    setWishlistCount(wishlist.length);
  }, [setWishlistCount, wishlist]);

  return (
    <div className="space-y-4">
      {wishlist.map((item) => (
        <WishlistItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default WishlistClient;
