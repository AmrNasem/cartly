import { ProductCardDTO } from "../types/product.types";

export function mapProductCardDTO(product: any): ProductCardDTO {
  return {
    slug: product.slug,
    thumbnail:
      product.images[0]?.url ||
      "https://images.unsplash.com/photo-1767518782549-e2f459dc4295",
    title: product.title,
    price: product.price,
    compareAtPrice: product.compareAtPrice,
    isNew:
      Date.now() - new Date(product.createdAt).getTime() <
      1000 * 60 * 60 * 24 * 10,
    rates: 5,
    rateAverage: 2.4,
  };
}
