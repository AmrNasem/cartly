import { ProductCardDTO } from "@/lib/types/product.types";
import { Heart, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function ProductCard({ product }: { product: ProductCardDTO }) {
  return (
    <article className="rounded-lg shadow-lg hover:shadow-xl duration-200 hover:-translate-y-1 block group h-full relative">
      <Link
        href={`/product/${product.slug}`}
        className="absolute inset-0 z-10 w-full h-full"
      />

      <figure className="relative h-48 overflow-hidden rounded-t-lg">
        <button className="z-20 md:opacity-0 group-hover:opacity-100 absolute end-2 top-2 w-7 h-7 flex items-center justify-center rounded-full bg-secondary hover:bg-secondary/80 duration-150 cursor-pointer">
          <Heart className="size-4 text-muted-primary" />
        </button>
        <div className="flex gap-2 absolute top-2 start-2">
          {product.isNew && (
            <span className="rounded-md text-white bg-primary text-[11px] px-2 py-0.5 block">
              New
            </span>
          )}
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="rounded-md text-white bg-destructive text-[11px] px-2 py-0.5 block">
              Sale
            </span>
          )}
        </div>
        <Image
          src={product.thumbnail}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 350px, 300px"
          alt={product.title}
          className="object-cover block group-hover:scale-[1.03] duration-150 -z-10"
        />
        <div className="z-20 md:opacity-0 group-hover:opacity-100 md:translate-y-1 group-hover:translate-y-0 absolute bottom-0 start-0 h-[22%] mx-auto w-full bg-linear-to-b from-transparent px-2 to-foreground duration-150">
          <button className="bg-primary hover:bg-primary/80 duration-200 text-white flex gap-2 items-center justify-center w-full text-sm p-1 rounded-md cursor-pointer">
            <ShoppingCart className="size-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </figure>
      <div className="p-4">
        <h3 className="text-primary font-semibold text-sm mb-2 line-clamp-2">
          <Link href={`/product/${product.slug}`}>{product.title}</Link>
        </h3>
        <div
          className="flex items-center text-[11px] mb-2"
          aria-label="Rated {product.rateAverage} out of 5"
        >
          {Array.from({ length: 5 }).map((_, i) =>
            i < Math.round(product.rateAverage) ? (
              <Star fill="orange" stroke="orange" key={i} className="size-3" />
            ) : (
              <Star key={i} className="size-3 text-gray-300" />
            )
          )}
          <span className="ms-1 text-muted-foreground">({product.rates})</span>
        </div>
        <div className="flex gap-1 items-end">
          <span className="text-primary font-semibold">${product.price}</span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-muted-foreground line-through text-sm">
              ${product.compareAtPrice}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
