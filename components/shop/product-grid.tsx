import ProductCard from "@/components/product/ProductCard";
import { ProductCardDTO } from "@/lib/types/product.types";

function  ProductGrid({ products }: { products: ProductCardDTO[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-5">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
