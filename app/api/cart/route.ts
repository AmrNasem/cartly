import { errorHandler } from "@/lib/api/error-handler";
import { APIError } from "@/lib/api/errors";
import { requireAuth } from "@/lib/auth/guards";
import { connectDB } from "@/lib/db";
import { Cart, CartItem } from "@/lib/models";
import { ICartItem } from "@/lib/models/cart";

export async function POST(request: Request) {
  try {
    const session = await requireAuth(true);
    const { productId, quantity } = await request.json();

    if (!productId) throw new APIError("productId is not provided!", 404);

    await connectDB();
    let cart = await Cart.findOne({ userId: session.user.id });
    if (!cart) {
      cart = await Cart.create({ userId: session.user.id });
    }

    let addedProduct;
    try {
      addedProduct = await CartItem.create({
        productId,
        cartId: cart._id,
        quantity,
      });
    } catch (err: any) {
      if (err.code === 11000)
        throw new APIError("Product already in cart!", 409);
      throw err;
    }

    const populatedAddedProduct = await addedProduct.populate(["productId"]);

    return new Response(
      JSON.stringify({
        message: "Product added to cart!",
        payload: populatedAddedProduct,
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
    let cart = await Cart.findOne({
      userId: session.user.id,
    });

    let cartProducts: ICartItem[] = [];
    if (cart) cartProducts = await CartItem.find({ cartId: cart._id });
    else cart = await Cart.create({ userId: session.user.id });

    return new Response(
      JSON.stringify({
        message: "Cart fetched successfully!",
        payload: {
          cart,
          products: cartProducts,
        },
      })
    );
  } catch (err) {
    return errorHandler(err);
  }
}

export async function DELETE(req: Request) {
  try {
    await requireAuth(true);

    const { cartId } = await req.json();
    if (!cartId) throw new APIError("cartId is required!", 400);

    await connectDB();
    const result = await CartItem.deleteMany({ cartId });
    if (!result?.acknowledged) throw new APIError("Couldn't clear cart!");

    return new Response(
      JSON.stringify({
        message: "Cart has been cleared successfully!",
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
