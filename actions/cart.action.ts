"use server";

import { requireAuth } from "@/lib/auth/guards";
import { getSession } from "@/lib/auth/session";
import { connectDB } from "@/lib/db";
import { mapCartItemDTO } from "@/lib/mappers/cart.mapper";
import { enrichProducts } from "@/lib/product/enrich-product";
import {
  addToCart,
  applyCoupon,
  clearCart,
  getCart,
  removeCartCoupon,
  removeFromCart,
  updateQuantity,
} from "@/lib/services/cart.service";

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

export async function removeFromCartAction(productId: string) {
  await connectDB();
  const session = await requireAuth(true);
  return removeFromCart(productId, session.user.id);
}

export async function addToCartAction(productId: string) {
  await connectDB();
  const session = await requireAuth(true);
  return addToCart(productId, session.user.id);
}

export async function applyCouponAction({
  couponCode,
  cartId,
}: {
  couponCode: string;
  cartId: string;
}) {
  await connectDB();
  await requireAuth(true);
  return applyCoupon({ cartId, couponCode });
}

export async function clearCartAction(cartId: string) {
  await connectDB();
  await requireAuth(true);
  return clearCart(cartId);
}
