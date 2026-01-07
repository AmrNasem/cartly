import { ProductCardSkeleton } from "../product/ProductCardSkeleton";

function SectionSekeleton() {
  return (
    <section className="mycontainer grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-6 my-8">
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
    </section>
  );
}

export default SectionSekeleton;
