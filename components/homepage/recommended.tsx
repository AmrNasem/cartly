import { Suspense } from "react";
import SectionSekeleton from "./SectionSekeleton";
import ProductCard from "../product/ProductCard";
import { fetchRecommendedProducts } from "@/actions/product.action";

async function Recommended() {
  const products = await fetchRecommendedProducts();

  if (products?.length === 0) return null;

  return (
    <section className="mycontainer my-8 py-3">
      <h2 className="text-foreground text-3xl mb-3 font-semibold text-center">
        Recommended
      </h2>
      <p className="text-muted-foreground text-center">
        Personalized picks based on your shopping history and interests.
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

export default Recommended;
