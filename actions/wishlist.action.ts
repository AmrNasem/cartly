"use server";

import { getSession } from "@/lib/auth/session";
import {
  ActionResponse,
  getUnAuthorizedActionResponse,
} from "@/lib/auth/types";
import { connectDB } from "@/lib/db";
import { mapWishlistItemToDTO } from "@/lib/mappers/wishlist.mapper";
import { enrichProducts } from "@/lib/product/enrich-product";
import {
  addToWishlist,
  getWishlist,
  getWishlistCount,
  removeFromWishList,
} from "@/lib/services/wishlist.service";
import { WishlistItemDTO } from "@/lib/types/wishlist.types";

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

export async function getWishlistCountAction(): Promise<
  ActionResponse<number>
> {
  await connectDB();
  const session = await getSession();
  if (!session) return getUnAuthorizedActionResponse();
  return { success: true, payload: await getWishlistCount(session.user.id) };
}

export async function addToWishListAction(
  productId: string,
): Promise<ActionResponse<WishlistItemDTO | string>> {
  await connectDB();
  const session = await getSession();
  if (!session) return getUnAuthorizedActionResponse();
  const res = await addToWishlist(session.user.id, productId);

  return typeof res === "string"
    ? { success: false, message: res }
    : { success: true, payload: res };
}

export async function removeFromWishListAction(
  productId: string,
): Promise<ActionResponse<boolean>> {
  await connectDB();
  const session = await getSession();
  if (!session) return getUnAuthorizedActionResponse();
  const res = await removeFromWishList(session.user.id, productId);
  return res
    ? { success: true, message: "Product removed from wishlist!" }
    : { success: false, message: "Failed to remove product from wishlist!" };
}
