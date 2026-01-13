"use server";

import { getSession } from "@/lib/auth/session";
import { connectDB } from "@/lib/db";
import {
  getFeaturedProducts,
  getRecommendedProducts,
} from "@/lib/services/product.service";

export async function fetchFeaturedProducts(limit = 8) {
  await connectDB();
  return getFeaturedProducts(limit);
}

export async function fetchRecommendedProducts(limit = 8) {
  await connectDB();
  const session = await getSession();
  console.log("SESSION", session);
  if (!session) return [];

  return getRecommendedProducts(session.user.id, limit);
}
