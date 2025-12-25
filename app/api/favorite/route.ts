import { errorHandler } from "@/lib/api/error-handler";
import { APIError } from "@/lib/api/errors";
import { requireAuth } from "@/lib/auth/guards";
import { connectDB } from "@/lib/db";
import { FavoriteItem } from "@/lib/models";

export async function POST(request: Request) {
  try {
    const session = await requireAuth(true);
    const { productId } = await request.json();

    if (!productId) throw new APIError("productId is not provided!", 404);

    await connectDB();
    let favoritedProduct;
    try {
      favoritedProduct = await FavoriteItem.create({
        productId,
        userId: session.user.id,
      });
    } catch (err: any) {
      if (err.code === 11000)
        throw new APIError("Product already in wishlist!", 409);
      throw err;
    }

    const populatedFavProduct = await favoritedProduct.populate(["productId"]);

    return new Response(
      JSON.stringify({
        message: "Product added to wishlist!",
        payload: populatedFavProduct,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return errorHandler(error);
  }
}

export async function GET() {
  try {
    const session = await requireAuth(true);
    await connectDB();
    const wishlist = await FavoriteItem.find({
      userId: session.user.id,
    }).populate({
      path: "productId",
      match: { deletedAt: null },
    });

    return new Response(
      JSON.stringify({
        message: "Wishlist fetched successfully!",
        payload: wishlist,
      })
    );
  } catch (err) {
    return errorHandler(err);
  }
}

export async function DELETE() {
  try {
    const session = await requireAuth(true);

    await connectDB();
    const result = await FavoriteItem.deleteMany({ userId: session.user.id });
    if (!result?.acknowledged) throw new APIError("Couldn't clear wishlist!");

    return new Response(
      JSON.stringify({
        message: "Wishlist has been cleared successfully!",
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
