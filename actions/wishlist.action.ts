"use server";

import { requireAuth } from "@/lib/auth/guards";
import { getSession } from "@/lib/auth/session";
import { connectDB } from "@/lib/db";
import { mapWishlistItemToDTO } from "@/lib/mappers/wishlist.mapper";
import { enrichProducts } from "@/lib/product/enrich-product";
import {
  addToWishlist,
  getWishlist,
  getWishlistCount,
  removeFromWishList,
} from "@/lib/services/wishlist.service";

export async function getWishlistAction() {
  await connectDB();
  const session = await getSession();
  if (!session) return [];

  const wishlist = await getWishlist(session.user.id);
  const enrichedProducts = await enrichProducts(
    wishlist.map((item) => item.productId),
  );

  return wishlist.map((item) => {
    const productId = enrichedProducts.find((product) =>
      product._id.equals(item.productId._id),
    );
    return mapWishlistItemToDTO({
      ...item,
      productId,
    });
  });
}

export async function getWishlistCountAction() {
  await connectDB();
  const session = await requireAuth(true);
  return getWishlistCount(session.user.id);
}

export async function addToWishListAction(productId: string) {
  await connectDB();
  const session = await requireAuth(true);
  return addToWishlist(session.user.id, productId);
}

export async function removeFromWishListAction(productId: string) {
  await connectDB();
  const session = await requireAuth(true);
  return removeFromWishList(session.user.id, productId);
}
