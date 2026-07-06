"use server";

import { getSession } from "@/lib/auth/session";
import {
  ActionResponse,
  getUnAuthorizedActionResponse,
} from "@/lib/auth/types";
import { connectDB } from "@/lib/db";
import { reviewProduct } from "@/lib/services/review.service";
import { SingleReviewDTO } from "@/lib/types/product.types";

export async function reviewProductAction(
  productId: string,
  formData: { rating: number; comment?: string },
): Promise<ActionResponse<SingleReviewDTO>> {
  try {
    await connectDB();
    const session = await getSession();
    if (!session) return getUnAuthorizedActionResponse();
    const review = await reviewProduct(session.user.id, productId, formData);
    return {
      success: true,
      message: "Review submitted successfully",
      payload: review,
    };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Something went wrong!",
    };
  }
}
