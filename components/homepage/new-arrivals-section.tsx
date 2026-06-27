import { fetchShopProducts } from "@/actions/product.action";
import ProductCard from "../product/ProductCard";
import SectionHeading from "./section-heading";

async function NewArrivalsSection() {
  const { products } = await fetchShopProducts({ sort: "newest", limit: "8" });

  if (products.length === 0) return null;

  return (
    <section className="mycontainer my-12 md:my-16">
      <SectionHeading
        title="New Arrivals"
        description="Fresh picks just added to our collection — be the first to discover them."
      />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-5">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}

export default NewArrivalsSection;
