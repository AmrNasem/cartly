import mongoose from "mongoose";
import { getSession } from "../auth/session";
import { CartItem, FavoriteItem } from "../models";

type ProductIdType = { _id: mongoose.Types.ObjectId };

export async function enrichProducts<T extends ProductIdType>(products: T[]) {
  const session = await getSession();
  if (!session)
    return products.map((product) =>
      enrichProduct({
        product,
        cartIdsSet: new Set(),
        wishlistIdsSet: new Set(),
      })
    );

  const [cartIds, wishlistIds] = await Promise.all([
    CartItem.find({ userId: session.user.id }).distinct("productId"),
    FavoriteItem.find({ userId: session.user.id }).distinct("productId"),
  ]);

  const cartIdsSet = new Set(cartIds.map((id) => id.toString()));
  const wishlistIdsSet = new Set(wishlistIds.map((id) => id.toString()));

  return products.map((product) =>
    enrichProduct({ product, cartIdsSet, wishlistIdsSet })
  );
}

export function enrichProduct<T extends ProductIdType>({
  product,
  cartIdsSet,
  wishlistIdsSet,
}: {
  product: T;
  cartIdsSet: Set<string>;
  wishlistIdsSet: Set<string>;
}) {
  return {
    ...product,
    isCarted: cartIdsSet.has(product._id.toString()),
    isWishList: wishlistIdsSet.has(product._id.toString()),
  };
}
