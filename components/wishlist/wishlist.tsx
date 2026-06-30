import WishlistItem from "./wish-list-item";
import { getWishlistAction } from "@/actions/wishlist.action";

async function Wishlist() {
  const wishlist = await getWishlistAction();

  return wishlist.length === 0 ? (
    <div className="flex flex-col items-center justify-center py-20">
      <h2 className="text-lg font-semibold text-primary">
        Your wishlist is empty.
      </h2>
    </div>
  ) : (
    <div className="space-y-4">
      {wishlist.map((item) => (
        <WishlistItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default Wishlist;
