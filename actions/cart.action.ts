"use server";

import { getSession } from "@/lib/auth/session";
import {
  ActionResponse,
  getUnAuthorizedActionResponse,
} from "@/lib/auth/types";
import { connectDB } from "@/lib/db";
import { mapCartItemDTO } from "@/lib/mappers/cart.mapper";
import { enrichProducts } from "@/lib/product/enrich-product";
import {
  addToCart,
  applyCoupon,
  getCart,
  removeCartCoupon,
  removeFromCart,
  updateQuantity,
} from "@/lib/services/cart.service";
import { CartCouponDTO } from "@/lib/types/coupon.types";
import { CartItemDTO } from "@/lib/types/product.types";

export async function fetchCart() {
  await connectDB();
  const session = await getSession();
  if (!session) return { payload: null };

  const { payload, ...cart } = await getCart(session.user.id);
  const enrichedItems = await enrichProducts(
    payload.items.map((item) => item.productId),
  );
  return {
    ...cart,
    payload: {
      ...payload,
      items: payload.items.map((item) =>
        mapCartItemDTO({
          ...item,
          productId: enrichedItems.find((product) =>
            product._id.equals(item.productId._id),
          ),
        }),
      ),
    },
  };
}

export async function removeCartCouponAction(
  cartCouponId: string,
  cartId: string,
) {
  await connectDB();
  return removeCartCoupon({ cartCouponId, cartId });
}

export async function updateQuantityAction(
  productId: string,
  quantity: number,
) {
  await connectDB();
  return updateQuantity(productId, quantity);
}

export async function removeFromCartAction(
  productId: string,
): Promise<ActionResponse> {
  await connectDB();
  const session = await getSession();
  if (!session) return getUnAuthorizedActionResponse();

  const { message } = await removeFromCart(productId, session.user.id);
  return { success: true, message };
}

export async function addToCartAction(
  productId: string,
): Promise<ActionResponse<CartItemDTO>> {
  await connectDB();
  const session = await getSession();
  if (!session) return getUnAuthorizedActionResponse();
  return { success: true, ...(await addToCart(productId, session.user.id)) };
}

export async function applyCouponAction({
  couponCode,
  cartId,
}: {
  couponCode: string;
  cartId: string;
}): Promise<ActionResponse<CartCouponDTO>> {
  await connectDB();
  const session = await getSession();
  if (!session) return getUnAuthorizedActionResponse();
  const { error, appliedCoupon } = await applyCoupon({ cartId, couponCode });

  return error
    ? { success: false, message: error }
    : { success: true, payload: appliedCoupon };
}

// export async function clearCartAction(cartId: string) {
//   await connectDB();
//   await requireAuth(true);
//   return clearCart(cartId);
// }
