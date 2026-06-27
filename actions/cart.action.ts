"use server";

import { requireAuth } from "@/lib/auth/guards";
import { getSession } from "@/lib/auth/session";
import { connectDB } from "@/lib/db";
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
  const session = await getSession();
  if (!session) return {payload: null};

  await connectDB();
  return getCart(session.user.id);
}

export async function removeCartCouponAction(cartCouponId: string, cartId: string) {
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
  const session = await requireAuth(true);
  await connectDB();
  return removeFromCart(productId, session.user.id);
}

export async function addToCartAction(productId: string) {
  const session = await requireAuth(true);
  await connectDB();
  return addToCart(productId, session.user.id);
}

export async function applyCouponAction({
  couponCode,
  cartId,
}: {
  couponCode: string;
  cartId: string;
}) {
  await requireAuth(true);
  await connectDB();
  return applyCoupon({ cartId, couponCode });
}

export async function clearCartAction(cartId: string) {
  await requireAuth(true);
  await connectDB();
  return clearCart(cartId);
}