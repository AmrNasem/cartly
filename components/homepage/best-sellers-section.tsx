import { fetchShopProducts } from "@/actions/product.action";
import HorizontalProductScroll from "./horizontal-product-scroll";
import SectionHeading from "./section-heading";

async function BestSellersSection() {
  const { products } = await fetchShopProducts({ sort: "reviews", limit: "8" });

  if (products.length === 0) return null;

  return (
    <section className="mycontainer my-12 md:my-16">
      <SectionHeading
        title="Best Sellers"
        description="Our most-loved products, trusted by thousands of happy customers."
        align="left"
      />
      <HorizontalProductScroll products={products} />
    </section>
  );
}

export default BestSellersSection;
