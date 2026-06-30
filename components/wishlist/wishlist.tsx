import WishlistItem from "./wish-list-item";
import { getWishlistAction } from "@/actions/wishlist.action";
import WishlistClient from "./wishlist-client";

async function Wishlist() {
  const wishlist = await getWishlistAction();

  return wishlist.length === 0 ? (
    <div className="flex flex-col items-center justify-center py-20">
      <h2 className="text-lg font-semibold text-primary">
        Your wishlist is empty.
      </h2>
    </div>
  ) : (
    <WishlistClient wishlist={wishlist} />
  );
}

export default Wishlist;
