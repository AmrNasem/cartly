import { CartCouponDTO } from "./coupon.types";
import { CartItemDTO } from "./product.types";

export 
type CartState = {
  items: CartItemDTO[] | null;
  cartId: string | null;
  appliedCoupon: CartCouponDTO | null;
};