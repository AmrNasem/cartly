import { Product, Review } from "../models";

export async function reviewProduct(
  userId: string,
  productId: string,
  formData: { rating: number; comment?: string },
) {
  const product = await Product.findOne({ _id: productId, deletedAt: null });

  if (!product) throw new Error("Product not found!");
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

  return review.toJSON();
}
