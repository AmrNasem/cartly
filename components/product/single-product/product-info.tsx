import AddToCart from "@/components/cart/add.to-cart";
import RemoveFromCart from "@/components/cart/remove-from-cart";
import { Badge } from "@/components/ui/badge";
import { getProductStatusVariant } from "@/lib/product/product.utils";
import { SingleProductDTO } from "@/lib/types/product.types";
import { Heart, ChevronRight, ShoppingCart, Star } from "lucide-react";

function ProductInfo({
  product,
  categoryPath,
}: {
  product: SingleProductDTO;
  categoryPath: string[];
}) {
  const stock = getProductStatusVariant(
    product.stock,
    product.lowStockThreshold,
  );

  return (
    <section>
      <div className="mb-3 rounded-md bg-foreground/70 flex items-center w-fit">
        {categoryPath.map((cat, i) => (
          <button
            key={i}
            className="py-1 px-2 text-[12px] text-white flex gap-1 hover:bg-foreground/80 cursor-pointer duration-150 rounded-md items-center"
          >
            <span>{cat}</span>
            {i + 1 < categoryPath.length && <ChevronRight className="size-3" />}
          </button>
        ))}
      </div>
      <div className="flex gap-3 justify-between my-3">
        <h2 className="text-3xl font-semibold">{product.title}</h2>
        <button className="size-7 min-w-7 min-h-7 flex items-center justify-center rounded-full bg-secondary hover:bg-secondary/80 duration-150 cursor-pointer">
          {product.isWishList ? (
            <Heart fill="red" color="red" className={`size-4`} />
          ) : (
            <Heart className={`size-4 text-muted-primary`} />
          )}
        </button>
      </div>
      <div className="text-muted-foreground text-[12px]">
        {product.description?.split("\n").map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
      {/* <hr className="my-3" /> */}
      <div className="flex gap-2 flex-wrap justify-between items-center my-5">
        <div className="flex gap-2 items-end font-semibold">
          {/* <span className="text-2xl text-primary">Price:</span> */}
          <span className="text-3xl text-primary">{product.price}$</span>
          {product.compareAtPrice && (
            <span className="text-xl line-through text-muted-foreground">
              {product.compareAtPrice}$
            </span>
          )}
        </div>
        <div
          className="flex items-center gap-1 text-[11px] mb-2"
          aria-label="Rated {product.rateAverage} out of 5"
        >
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) =>
              i < Math.round(product.averageRate) ? (
                <Star
                  fill="orange"
                  stroke="orange"
                  key={i}
                  className="size-3"
                />
              ) : (
                <Star key={i} className="size-3 text-gray-300" />
              ),
            )}
          </div>
          {product.numOfReviews ? (
            <span className="ms-1 text-muted-foreground">
              ({product.numOfReviews})
            </span>
          ) : (
            <p className="text-muted-foreground text-[11px]">
              (No reviews yet!)
            </p>
          )}
        </div>
      </div>
      <Badge variant={stock.variant} className="block w-fit text-nowrap">
        {stock.text}
      </Badge>
      {product.isCarted ? (
        <RemoveFromCart
          productId={product.id}
          className="flex gap-2 items-center justify-center w-full my-6"
        >
          <ShoppingCart fill="" className="size-4" />
          <span>Remove from Cart</span>
        </RemoveFromCart>
      ) : (
        <AddToCart
          productId={product.id}
          className="flex gap-2 items-center justify-center cursor-pointer w-full my-6"
        >
          <ShoppingCart className="size-4" />
          <span>Add to Cart</span>
        </AddToCart>
      )}
    </section>
  );
}

export default ProductInfo;
