import { WishlistItemDTO } from "../types/wishlist.types";
import { mapProductCardDTO } from "./product.mapper";

export function mapWishlistItemToDTO(wishlistItem: any): WishlistItemDTO {
  const product = wishlistItem.productId;
  return {
    id: wishlistItem._id.toString(),
    userId: wishlistItem.userId.toString(),
    product: {
      ...mapProductCardDTO(product),
      description: product.description,
      stock: product.stock,
      lowStockThreshold: product.lowStockThreshold,
    },
  };
}
