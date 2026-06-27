import { ProductCardDTO } from "@/lib/types/product.types";
import ProductCard from "../product/ProductCard";

function HorizontalProductScroll({ products }: { products: ProductCardDTO[] }) {
  return (
    <div className="-mx-3 px-3">
      <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory [scrollbar-width:thin]">
        {products.map((product) => (
          <div
            key={product.slug}
            className="min-w-[220px] max-w-[260px] shrink-0 snap-start sm:min-w-[240px] sm:max-w-[280px]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HorizontalProductScroll;
