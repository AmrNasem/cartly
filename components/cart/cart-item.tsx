import { CartItemDTO } from "@/lib/types/product.types";
import Image from "next/image";
import Link from "next/link";
import { Star, Trash2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { getProductStatusVariant } from "@/lib/product/product.utils";
import { cn } from "@/lib/utils";
import RemoveFromCart from "./remove-from-cart";
import UpdateQuantity from "./update-quantity";

function CartItem({ item }: { item: CartItemDTO }) {
  const stock = getProductStatusVariant(
    item.product.stock,
    item.product.lowStockThreshold,
  );

  return (
    <article
      className={cn(
        "flex gap-2 p-2 border border-muted rounded-lg relative",
        // isPending ? "pointer-events-none opacity-50" : "",
      )}
    >
      <Link
        href={`/product/${item.product.slug}`}
        className="absolute inset-0 z-10 w-full h-full"
      />
      <figure className="relative min-w-35 aspect-square overflow-hidden rounded-t-lg">
        <Image
          src={item.product.thumbnail}
          fill
          sizes=""
          alt={item.product.title}
          className="object-cover block group-hover:scale-[1.03] duration-150 -z-10"
        />
      </figure>
      <div className="p-4 grow">
        <h3 className="text-primary font-semibold text-sm mb-2 line-clamp-2">
          <Link href={`/product/${item.product.slug}`}>
            {item.product.title}
          </Link>
        </h3>
        <p className="line-clamp-1 text-muted-foreground text-[12px] my-2">
          {item.product.description}
        </p>
        <div
          className="flex items-center gap-0.5 text-[11px] mb-2"
          aria-label="Rated {product.rateAverage} out of 5"
        >
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) =>
              i < Math.round(item.product.averageRate) ? (
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
          {item.product.numOfReviews ? (
            <span className="ms-1 text-muted-foreground">
              ({item.product.numOfReviews})
            </span>
          ) : (
            <p className="text-muted-foreground text-[11px]">
              (No reviews yet!)
            </p>
          )}
        </div>
        <Badge variant={stock.variant} className="block w-fit text-nowrap">
          {stock.text}
        </Badge>
        <div className="flex text-xl my-2 items-center justify-between flex-wrap gap-3">
          <div className="flex gap-1 items-end">
            <span className="text-primary font-semibold">
              ${item.product.price}
            </span>
            {item.product.compareAtPrice &&
              item.product.compareAtPrice > item.product.price && (
                <span className="text-muted-foreground line-through text-sm">
                  ${item.product.compareAtPrice}
                </span>
              )}
          </div>
          <UpdateQuantity
            productId={item.product.id}
            quantity={item.quantity}
            stock={item.product.stock}
          />
          <RemoveFromCart
            className="z-10 cursor-pointer p-2 [&_svg]:size-3"
            productId={item.product.id}
          >
            <Trash2 />
          </RemoveFromCart>
        </div>
      </div>
    </article>
  );
}

export default CartItem;
