import mongoose from "mongoose";
import { mapSingleReviewDTO } from "../mappers/product.mapper";
import { Product, Review } from "../models";
import { db } from "../auth/auth";

export async function reviewProduct(
  userId: string,
  productId: string,
  formData: { rating: number; comment?: string },
) {
  const product = await Product.findOne({ _id: productId, deletedAt: null });

  if (!product) throw new Error("Product not found!");

  const user = await db
    .collection<{ name: string; image?: string; email: string }>("user")
    .findOne({ _id: new mongoose.Types.ObjectId(userId) });
  const review = await Review.create({
    userId,
    productId,
    rating: formData.rating,
    comment: formData.comment || "",
  });
  if (!review) throw new Error("Unable to review this product!");

  product.averageRate =
    (product.averageRate * product.numOfReviews++ + formData.rating) /
    product.numOfReviews;
  await product.save();

  return mapSingleReviewDTO(
    review,
    user
      ? {
          name: user.name,
          email: user.email,
          image: user.image,
        }
      : undefined,
  );
}
