"use server";

import { getSession } from "@/lib/auth/session";
import { connectDB } from "@/lib/db";
import { mapProductCardDTO, mapSingleProductDTO } from "@/lib/mappers/product.mapper";
import { enrichProducts } from "@/lib/product/enrich-product";
import {
  getFeaturedProducts,
  getProductBySlug,
  getProducts,
  getRecommendedProducts,
  getReviewsByProductId,
  getRatingStats,
} from "@/lib/services/product.service";
import {
  ProductCardDTO,
  ProductsMeta,
  queryOptions,
} from "@/lib/types/product.types";

export async function fetchFeaturedProducts(limit = 8) {
  await connectDB();
  const products = await getFeaturedProducts(limit);
  const enrichedProducts = await enrichProducts(products);
  return enrichedProducts.map((product) => mapProductCardDTO(product));
}

export async function fetchRecommendedProducts(limit = 8) {
  await connectDB();
  const session = await getSession();
  if (!session) return [];

  const products = await getRecommendedProducts(session.user.id, limit);
  const enrichedProducts = await enrichProducts(products);
  return enrichedProducts.map((product) => mapProductCardDTO(product));
}

export async function fetchProducts(options: queryOptions = {}) {
  await connectDB();
  return getProducts(options);
}

export async function fetchShopProducts(
  options: queryOptions = {},
): Promise<{ products: ProductCardDTO[]; meta: ProductsMeta }> {
  await connectDB();
  const { products, meta } = await getProducts({
    ...options,
    publishedOnly: true,
  });
  const enrichedProducts = await enrichProducts(products);
  return {
    products: enrichedProducts.map((product) => mapProductCardDTO(product)),
    meta,
  };
}


export async function fetchProductBySlug(slug: string) {
  await connectDB();
  const res = await getProductBySlug(slug);
  const { product } = res;
  if (!product) return res;

  const enrichedProducts = await enrichProducts([product]);
  return { ...res, product: mapSingleProductDTO(enrichedProducts[0]) };
}

export async function fetchReviewsByProductId(productId: string, page = 1, limit = 10) {
  await connectDB();
  return getReviewsByProductId(productId, page, limit);
}

export async function fetchRatingStats(productId: string) {
  await connectDB();
  return getRatingStats(productId);
}