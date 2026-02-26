"use server";

import { requireAuth } from "@/lib/auth/guards";
import { connectDB } from "@/lib/db";
import { addToCart, getCart, removeFromCart, updateQuantity } from "@/lib/services/cart.service";

export async function fetchCart() {
  const session = await requireAuth();
  await connectDB();
  return getCart(session.user.id);
}

export async function updateQuantityAction(productId: string, quantity: number) {
  // try {
  await connectDB();
  return updateQuantity(productId, quantity);
  // } catch (err) {
  //   throw err;
  // }
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