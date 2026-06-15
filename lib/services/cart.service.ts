import { mapCartCouponDTO, mapCartItemDTO } from "../mappers/cart.mapper";
import { Cart, CartCoupon, Coupon, CouponUsage } from "../models";
import { CartItem } from "../models/cart";

export async function getCart(userId: string) {
  try {
    let cart = await Cart.findOne({
      userId,
    }).lean();

    let cartItems, cartCoupon;
    if (cart) {
      cartItems = await CartItem.find({ cartId: cart._id })
        .populate("productId")
        .lean();
      cartCoupon = await CartCoupon.findOne({ cartId: cart._id }).populate("couponId")
    }
    else cart = (await Cart.create({ userId })).toJSON();

    return {
      message: "Cart fetched successfully!",
      payload: {
        cartId: cart._id.toString(),
        appliedCoupon: cartCoupon ? mapCartCouponDTO(cartCoupon) : null,
        items: cartItems?.map((product) => mapCartItemDTO(product)) || [],
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

export async function applyCoupon({
  couponCode,
  cartId,
}: {
  couponCode: string;
  cartId: string;
}) {
  try {
    const coupon = await Coupon.findOne({ code: couponCode });
    if (!coupon) throw new Error("Invalid coupon!");
    if (!coupon.isActive) throw new Error("This coupon is no longer available");
    if (coupon.startDate && new Date(coupon.startDate).getTime() > Date.now())
      throw new Error("Invalid coupon!");
    if (coupon.endDate && new Date(coupon.endDate).getTime() < Date.now())
      throw new Error("Coupon Expired!");

    const totalUsage = await CouponUsage.countDocuments({
      couponId: coupon._id,
    });
    if (coupon.usageLimit && totalUsage >= coupon.usageLimit)
      throw new Error("This coupon is no longer available");

    const userUsage = await CouponUsage.countDocuments({
      couponId: coupon._id,
      cartId,
    });
    if (coupon.perUserLimit && userUsage >= coupon.perUserLimit)
      throw new Error("This coupon is no longer available");

    await CartCoupon.findOneAndDelete({ cartId });
    const cartCoupon = await CartCoupon.create({ cartId, couponId: coupon._id });

    return {
      appliedCoupon: mapCartCouponDTO(await cartCoupon.populate("couponId")),
      // discount,
    };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Something went wrong!",
    };
  }
}

export async function removeCartCoupon({ cartCouponId, cartId }: { cartCouponId: string, cartId: string }) {
  try {
    const cartCoupon = await CartCoupon.findOne({ _id: cartCouponId, cartId });
    if (!cartCoupon) throw new Error("Cart coupon not found!");
    await cartCoupon.deleteOne();
    return { message: "Cart coupon removed successfully!" };
  } catch (err) {
    throw err;
  }
}

export async function clearCart(cartId: string) {
  if (!cartId) throw new Error("cartId is required!");

  const result = await CartItem.deleteMany({ cartId });
  if (!result?.acknowledged) throw new Error("Couldn't clear cart!");
  return true;
}