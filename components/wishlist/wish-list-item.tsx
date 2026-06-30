import { ShoppingCart } from "lucide-react";
import CartItem from "../cart/cart-item";
import RemoveFromCart from "../cart/remove-from-cart";
import AddToCart from "../cart/add.to-cart";
import { WishlistItemDTO } from "@/lib/types/wishlist.types";

function WishlistItem({ item }: { item: WishlistItemDTO }) {
  return (
    <CartItem key={item.id} item={item}>
      {item.product.isCarted ? (
        <RemoveFromCart productId={item.product.id} className="z-10">
          <ShoppingCart fill="" className="size-4" />
          <span>Remove from Cart</span>
        </RemoveFromCart>
      ) : (
        <AddToCart productId={item.product.id} className="z-10 cursor-pointer">
          <ShoppingCart className="size-4" />
          <span>Add to Cart</span>
        </AddToCart>
      )}
    </CartItem>
  );
}

export default WishlistItem;
