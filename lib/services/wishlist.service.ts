import { mapWishlistItemToDTO } from "../mappers/wishlist.mapper";
import { FavoriteItem } from "../models";
import { WishlistItemDTO } from "../types/wishlist.types";

export async function getWishlist(userId: string) {
  const wishlist = await FavoriteItem.find({userId}).populate("productId").lean();
  return wishlist;
}

export function getWishlistCount(userId: string) {
  return FavoriteItem.countDocuments({userId})
}

export async function addToWishlist(userId: string, productId: string): Promise<WishlistItemDTO | string> {
  const existingWishlistItem = await FavoriteItem.findOne({userId, productId});
  if (existingWishlistItem) {
    return "Product already in wishlist!";
  }

  const wishlistItem = await FavoriteItem.create({userId, productId});
  await wishlistItem.populate("productId");
  return mapWishlistItemToDTO(wishlistItem);
}

export async function removeFromWishList(userId: string, productId: string): Promise<boolean> {
  const existingWishlistItem = await FavoriteItem.findOne({userId, productId});
  if (existingWishlistItem) {
    await existingWishlistItem.deleteOne();
    return true;
  }

return false;
}