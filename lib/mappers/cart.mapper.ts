import { CartItemDTO } from "../types/product.types";
import { mapProductCardDTO } from "./product.mapper";
import { CartCouponDTO } from "../types/coupon.types";
import { mapCouponDTO } from "./coupon.mapper";

export function mapCartCouponDTO(
  cartCoupon: any,
): CartCouponDTO {
  return {
    id: cartCoupon._id.toString(),
    cartId: cartCoupon.cartId.toString(),
    coupon: mapCouponDTO(cartCoupon.couponId),
  };
}

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
