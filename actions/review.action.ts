"use server";

import { getSession } from "@/lib/auth/session";
import {
  ActionResponse,
  getUnAuthorizedActionResponse,
} from "@/lib/auth/types";
import { connectDB } from "@/lib/db";
import { reviewProduct } from "@/lib/services/review.service";

export async function reviewProductAction(
  productId: string,
  formData: { rating: number; comment?: string },
): Promise<ActionResponse<any>> {
  try {
    await connectDB();
    const session = await getSession();
    if (!session) return getUnAuthorizedActionResponse();
    const review = await reviewProduct(productId, session.user.id, formData);
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
