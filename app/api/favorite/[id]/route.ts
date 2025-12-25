import { errorHandler } from "@/lib/api/error-handler";
import { APIError } from "@/lib/api/errors";
import { requireAuth } from "@/lib/auth/guards";
import { connectDB } from "@/lib/db";
import { FavoriteItem } from "@/lib/models";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAuth(true);
    const { id: favProductId } = await params;

    if (!favProductId) throw new APIError("Missing id param", 400);

    await connectDB();
    const favProduct = await FavoriteItem.findOne({
      _id: favProductId,
      userId: session.user.id,
    });
    if (!favProduct) throw new APIError("Product not found", 404);

    const result = await favProduct.deleteOne();
    if (!result?.acknowledged)
      throw new APIError("Couldn't remove from wishlist!");

    return new Response(
      JSON.stringify({
        message: "Product removed from wishlist!",
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
