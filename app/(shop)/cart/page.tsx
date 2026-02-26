import CartItemsWrapper from "@/components/cart/cart-items-wrapper";
import Checkout from "@/components/cart/checkout";
import CartItemSkeleton from "@/components/cart/skeleton/cart-item-skeleton";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "My Cart - Cartly",
};

function page() {
  return (
    <main className="mycontainer grid md:grid-cols-3 gap-4">
      <section className="my-5 col-span-2">
        <h3 className="text-primary/90 font-lg mb-3 font-semibold">My Cart</h3>
        <Suspense
          fallback={
            <div className="col-span-2 space-y-4 my-5">
              <CartItemSkeleton />
              <CartItemSkeleton />
            </div>
          }
        >
          <CartItemsWrapper></CartItemsWrapper>
        </Suspense>
      </section>
      <Checkout className="col-span-2 md:col-span-1 sticky top-21 self-start" />
    </main>
  );
}

export default page;
