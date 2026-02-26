import { mapCartItemDTO } from "../mappers/cart.mapper";
import { Cart } from "../models";
import { CartItem } from "../models/cart";

export async function getCart(userId: string) {
  try {
    let cart = await Cart.findOne({
      userId,
    }).lean();

    let cartProducts;
    if (cart)
      cartProducts = await CartItem.find({ cartId: cart._id })
        .populate("productId")
        .lean();
    else cart = (await Cart.create({ userId })).toJSON();

    return {
      message: "Cart fetched successfully!",
      payload: {
        cart,
        products: cartProducts?.map((product) => mapCartItemDTO(product)) || [],
      },
    };
  } catch (err) {
    throw err;
  }
}

export async function updateQuantity(productId: string, quantity: number) {
  try {
    const updatedCartItem = await CartItem.findOneAndUpdate(
      { productId },
      { quantity },
      { new: true },
    )
      .populate("productId")
      .lean();

    if (!updatedCartItem) throw new Error("Cart item not found!");

    return {
      message: "product quantity updated successfully!",
    };
  } catch (err) {
    throw err;
  }
}

export async function removeFromCart(productId: string, userId: string) {
  try {
    const cartItem = await CartItem.findOne({ productId, userId }).populate(
      "productId",
    );

    if (!cartItem) throw new Error("Cart item not found!");

    await cartItem.deleteOne();

    return {
      message: "Product removed from cart!",
    };
  } catch (err) {
    throw err;
  }
}

export async function addToCart(productId: string, userId: string) {
  try {
    if (!productId) throw new Error("productId is not provided!");

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = await Cart.create({ userId });
    }

    let addedProduct;
    try {
      addedProduct = await CartItem.create({
        productId,
        cartId: cart._id,
        userId,
        quantity: 1,
      });
    } catch (err: any) {
      if (err.code === 11000) throw new Error("Product already in cart!");
      throw err;
    }

    const populatedAddedProduct = (
      await addedProduct.populate(["productId"])
    ).toObject();

    return {
      message: "Product added to cart!",
      payload: mapCartItemDTO(populatedAddedProduct),
    };
  } catch (error) {
    throw error;
  }
}
