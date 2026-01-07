"use server";

import { connectDB } from "@/lib/db";
import { getFeaturedProducts } from "@/lib/services/product.service";

export async function fetchFeaturedProducts(limit = 8) {
  await connectDB();
  return getFeaturedProducts(limit);
}
