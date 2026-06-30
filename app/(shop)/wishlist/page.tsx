import CartItemSkeleton from "@/components/cart/skeleton/cart-item-skeleton";
import Wishlist from "@/components/wishlist/wishlist";
import { Suspense } from "react";

export const metadata = {
  title: "My Wishlist",
};

function WishlistPage() {
  return (
    <main className="mycontainer my-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold text-primary">My Wishlist</h1>
        <p className="text-sm text-muted-foreground">
          View and manage your favorite products.
        </p>
      </div>
      <Suspense
        fallback={
          <div className="col-span-2 space-y-4 my-5">
            <CartItemSkeleton />
            <CartItemSkeleton />
          </div>
        }
      >
        <Wishlist />
      </Suspense>
    </main>
  );
}

export default WishlistPage;
