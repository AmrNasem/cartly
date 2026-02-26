import { CartItemDTO } from "../types/product.types";
import { mapProductCardDTO } from "./product.mapper";

export function mapCartItemDTO(cartItem: any): CartItemDTO {
  return {
    id: cartItem._id.toString(),
    product: {
      ...mapProductCardDTO(cartItem.productId),
      description: cartItem.productId.description,
      stock: cartItem.productId.stock,
      lowStockThreshold: cartItem.productId.lowStockThreshold,
    },
    quantity: cartItem.quantity,
    cartId: cartItem.cartId.toString(),
  };
}
