import { ProductCardSkeleton } from "@/components/product/ProductCardSkeleton";

function ShopLoading() {
  return (
    <main className="mycontainer my-6">
      <div className="mb-6 space-y-2 animate-pulse">
        <span className="block h-8 w-32 rounded-md bg-secondary" />
        <span className="block h-4 w-56 rounded-md bg-secondary" />
      </div>

      <div className="flex gap-8">
        <aside className="hidden md:block w-52 shrink-0 space-y-2">
          <span className="block h-4 w-24 rounded-md bg-secondary mb-4" />
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="block h-9 rounded-md bg-secondary" />
          ))}
        </aside>

        <section className="min-w-0 flex-1 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </section>
      </div>
    </main>
  );
}

export default ShopLoading;
