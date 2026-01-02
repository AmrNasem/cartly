import { errorHandler } from "@/lib/api/error-handler";
import { APIError } from "@/lib/api/errors";
import { requireAuth } from "@/lib/auth/guards";
import { connectDB } from "@/lib/db";
import { Coupon, CouponUsage, Order, Product } from "@/lib/models";
import { ShippingAddress } from "@/lib/models/order";

export async function POST(request: Request) {
  try {
    const session = await requireAuth(true);
    const { items, shippingAddress, couponCode, paymentMethod } =
      (await request.json()) as {
        items: { id: string; quantity: number }[];
        shippingAddress: ShippingAddress;
        couponCode: string;
        paymentMethod: string;
      };

    if (!Array.isArray(items) || items.length === 0)
      throw new APIError("Cart is empty!", 400);

    await connectDB();

    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findOne({ _id: item.id, deletedAt: null });
      if (!product) throw new APIError("Product not found!", 404);

      const quantity = Math.max(item.quantity, 1);
      if (product.stock < quantity)
        throw new APIError(`Not enough stock for ${product.title}`, 400);

      subtotal += quantity * product.price;
      orderItems.push({
        quantity: quantity,
        productId: product._id,
        titleSnapshot: product.title,
        priceSnapshot: product.price,
      });
    }

    // Validate coupon
    let discount = 0,
      coupon;
    if (couponCode) {
      coupon = await Coupon.findOne({
        code: couponCode,
        deletedAt: null,
        isActive: true,
      });
      if (!coupon) throw new APIError("Invalid coupon!", 404);
      if (coupon.startDate && Date.now() < coupon.startDate.getTime())
        throw new APIError("Invalid coupon!", 400);
      if (coupon.endDate && Date.now() > coupon.endDate.getTime())
        throw new APIError("Coupon has expired!", 400);

      const couponUsages = await CouponUsage.find({
        _id: coupon._id,
      });
      if (
        (coupon.usageLimit && couponUsages.length >= coupon.usageLimit) ||
        (coupon.perUserLimit &&
          couponUsages.filter(
            (owc) => owc.userId?.toString() === session.user.id
          ).length >= coupon.perUserLimit)
      )
        throw new APIError("Invalid coupon!", 400);

      discount = coupon.calculateDiscount(subtotal);
    }
    const totalAmount = Math.max(subtotal - discount, 0);

    // const admins = await auth.api.listUserAccounts();

    // if (!admins.length) {
    //   throw new APIError("No active admins available", 500);
    // }

    // const workload = await Order.aggregate([
    //   {
    //     $match: {
    //       status: { $in: ["CONFIRMED", "PENDING"] },
    //       assignedAdminId: { $ne: null },
    //     },
    //   },
    //   { $group: { _id: "$assignedAdminId", count: { $sum: 1 } } },
    // ]);

    // // 3️⃣ Build workload map
    // const workloadMap = new Map<string, number>();

    // for (const entry of workload) {
    //   workloadMap.set(entry._id.toString(), entry.count);
    // }

    // // 4️⃣ Pick least busy admin
    // let selectedAdminId: mongoose.Types.ObjectId | null = null;
    // let minLoad = Infinity;

    // for (const admin of admins) {
    //   const load = workloadMap.get(admin._id.toString()) ?? 0;

    //   if (load < minLoad) {
    //     minLoad = load;
    //     selectedAdminId = admin._id;
    //   }
    // }

    // if (!selectedAdminId) {
    //   throw new APIError("Failed to assign admin", 500);
    // }

    // // 5️⃣ Assign order atomically (CRITICAL)
    // const result = await Order.updateOne(
    //   { _id: orderId, assignedAdminId: null },
    //   {
    //     assignedAdminId: selectedAdminId,
    //     assignedAt: new Date(),
    //   }
    // );

    // // 6️⃣ Safety check
    // if (result.matchedCount === 0) {
    //   // Order already assigned by another process
    //   return;
    // }
    // if (!(["fullName", "phone", "country", "city", "street", "postalCode"] in shippingAddress)) throw new APIError("")

    if (!paymentMethod) throw new APIError("Payment method is required!", 400);
    if (!["COD", "STRIPE"].includes(paymentMethod.toUpperCase()))
      throw new APIError("Invalid payment method!", 400);

    const order = await Order.create({
      userId: session.user.id,
      items: orderItems,
      totalAmount,
      couponCode: coupon ? coupon.code : null,
      shippingAddress,
      paymentMethod: paymentMethod.toUpperCase(),
      // assignedAdminId: workload?.length ?workload[0]._id,
    });

    if (paymentMethod.toUpperCase() === "COD") {
      // Reduce stock immediately
      for (const item of orderItems) {
        await Product.updateOne(
          { _id: item.productId },
          { $inc: { stock: -item.quantity } }
        );
      }

      // Track coupon usage
      if (coupon) {
        await CouponUsage.create({
          couponId: coupon._id,
          userId: session.user.id,
          orderId: order._id,
        });
      }

      return new Response(
        JSON.stringify({
          message:
            "Your order has been sent, we will confirm it as soon as possible",
          payload: order,
        }),
        {
          status: 201,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    throw new APIError("Something went wrong!", 500);
  } catch (error) {
    return errorHandler(error);
  }
}

// export async function GET() {
//   try {
//     const session = await requireAuth(true);
//     await connectDB();
//     let cart = await Cart.findOne({
//       userId: session.user.id,
//     });

//     let cartProducts: ICartItem[] = [];
//     if (cart) cartProducts = await CartItem.find({ cartId: cart._id });
//     else cart = await Cart.create({ userId: session.user.id });

//     return new Response(
//       JSON.stringify({
//         message: "Cart fetched successfully!",
//         payload: {
//           cart,
//           products: cartProducts,
//         },
//       })
//     );
//   } catch (err) {
//     return errorHandler(err);
//   }
// }
