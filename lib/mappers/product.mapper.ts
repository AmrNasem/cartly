import { IProductImage } from "../models/product";
import {
  ProductCardDTO,
  SingleProductDTO,
  SingleReviewDTO,
  Thumbnail,
} from "../types/product.types";

export function mapProductCardDTO(product: any): ProductCardDTO {
  return {
    id: product._id.toString(),
    slug: product.slug,
    thumbnail: product.images[0]?.url,
    title: product.title,
    price: product.price,
    compareAtPrice: product.compareAtPrice,
    isNew:
      Date.now() - new Date(product.createdAt).getTime() <
      1000 * 60 * 60 * 24 * 10, // 10 Days
    numOfReviews: product.numOfReviews,
    averageRate: product.averageRate,
    isCarted: product.isCarted || false,
    isWishlist: product.isWishList || false,
  };
}

export function mapThumbnailDTO(thumbnail: IProductImage): Thumbnail {
  return {
    id: thumbnail._id?.toString() || "",
    url: thumbnail.url,
    alt: thumbnail.alt,
    order: thumbnail.order,
    publicId: thumbnail.publicId,
  };
}

export function mapSingleProductDTO(
  product: any & { isCarted: boolean; isWishList: boolean },
): SingleProductDTO {
  return {
    id: product._id.toString(),
    slug: product.slug,
    title: product.title,
    description: product.description || "",
    price: product.price,
    compareAtPrice: product.compareAtPrice,
    stock: product.stock,
    lowStockThreshold: product.lowStockThreshold,
    images: product.images.map((img: IProductImage) => mapThumbnailDTO(img)),
    numOfReviews: product.numOfReviews,
    averageRate: product.averageRate,
    isCarted: product.isCarted,
    isWishList: product.isWishList,
  };
}

export function mapSingleReviewDTO(
  review: any,
  user?: { name: string; image?: string; email: string },
): SingleReviewDTO {
  return {
    comment: review.comment,
    createdAt: review.createdAt,
    rating: review.rating,
    user: user
      ? {
          image: user.image,
          name: user.name,
          email: user.email,
        }
      : review.userId.toString(),
    id: review._id.toString(),
  };
}
