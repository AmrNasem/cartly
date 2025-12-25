import { errorHandler } from "@/lib/api/error-handler";
import { APIError } from "@/lib/api/errors";
import { requireAuth } from "@/lib/auth/guards";
import { connectDB } from "@/lib/db";
import { CartItem } from "@/lib/models";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth(true);
    const { id: cartItemId } = await params;

    if (!cartItemId) throw new APIError("Missing cartItemId param", 400);

    await connectDB();
    const removedProduct = await CartItem.findById(cartItemId);
    if (!removedProduct) throw new APIError("Product not found", 404);

    const result = await removedProduct.deleteOne();
    if (!result?.acknowledged) throw new APIError("Couldn't remove from cart!");

    return new Response(
      JSON.stringify({
        message: "Product removed from cart!",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    return errorHandler(err);
  }
}
