"use server";

import { requireAuth } from "@/lib/auth/guards";
import { connectDB } from "@/lib/db";
import { reviewProduct } from "@/lib/services/review.service";

export async function reviewProductAction(productId: string, formData: { rating: number; comment?: string; }) {
  try {
    await connectDB();
    const session = await requireAuth(true);
    return reviewProduct(session.user.id.toString(), productId, formData)
  } catch (err) {
    return { error: true, message: err instanceof Error ? err.message : "Something went wrong!" };
  }
}