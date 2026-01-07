import { fetchFeaturedProducts } from "@/actions/product.action";
import ProductCard from "../product/ProductCard";
import { Suspense } from "react";
import SectionSekeleton from "./SectionSekeleton";

async function Featured() {
  const products = await fetchFeaturedProducts();
  console.log(products);

  return (
    <section className="mycontainer my-8 p-3">
      <h1 className="text-foreground text-3xl mb-3 font-semibold text-center">
        Featured Products
      </h1>
      <p className="text-muted-foreground text-center">
        Discover our most popular items, carefully selected for quality and
        style
      </p>
      <Suspense fallback={<SectionSekeleton />}>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-6 my-8">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </Suspense>
    </section>
  );
}

export default Featured;
