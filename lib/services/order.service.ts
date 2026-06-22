import { APIError } from "@/lib/api/errors";
import { TAX_RATE } from "@/lib/utils/order-totals";
import { canCancelOrder } from "@/lib/utils/order.utils";
import { Coupon, CouponUsage, Order, Payment, Product } from "@/lib/models";
import { CreateOrderInput } from "../types/checkout.types";
import {
  mapOrderDTO,
  mapOrderDetailDTO,
  mapOrderListItemDTO,
} from "../mappers/order.mapper";
import { retrieveClientSecret } from "./payment.service";
import { addOrderItemsToCart } from "./cart.service";

export async function createOrder({
  userId,
  items,
  shippingAddress,
  couponCode,
  orderNotes,
}: CreateOrderInput) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new APIError("Cart is empty!", 400);
  }

  let subtotal = 0;
  const orderItems = [];

  for (const item of items) {
    const product = await Product.findOne({ _id: item.id, deletedAt: null });
    if (!product) throw new APIError("Product not found!", 404);

    const quantity = Math.max(item.quantity, 1);
    if (product.stock < quantity) {
      throw new APIError(`Not enough stock for ${product.title}`, 400);
    }

    subtotal += quantity * product.price;
    orderItems.push({
      quantity,
      productId: product._id,
      titleSnapshot: product.title,
      priceSnapshot: product.price,
    });
  }

  let discount = 0;
  let coupon;
  if (couponCode) {
    coupon = await Coupon.findOne({
      code: couponCode,
      deletedAt: null,
      isActive: true,
    });
    if (!coupon) throw new APIError("Invalid coupon!", 404);
    if (coupon.startDate && Date.now() < coupon.startDate.getTime()) {
      throw new APIError("Invalid coupon!", 400);
    }
    if (coupon.endDate && Date.now() > coupon.endDate.getTime()) {
      throw new APIError("Coupon has expired!", 400);
    }

    const couponUsages = await CouponUsage.find({ couponId: coupon._id });
    if (
      (coupon.usageLimit && couponUsages.length >= coupon.usageLimit) ||
      (coupon.perUserLimit &&
        couponUsages.filter((usage) => usage.userId?.toString() === userId)
          .length >= coupon.perUserLimit)
    ) {
      throw new APIError("Invalid coupon!", 400);
    }

    discount = coupon.calculateDiscount(subtotal);
  }

  const tax = subtotal * TAX_RATE;
  const totalAmount = Math.max(subtotal + tax - discount, 0);

  const order = await Order.create({
    userId,
    items: orderItems,
    totalAmount,
    couponCode: coupon ? coupon.code : null,
    shippingAddress,
    orderNotes: orderNotes?.trim() || "",
  });

  return mapOrderDTO(order);
}

export async function updateOrder({
  orderData: { userId, shippingAddress, orderNotes },
  orderId,
  paymentIntentId,
}: {
  orderData: Omit<CreateOrderInput, "items" | "couponCode">;
  orderId: string;
  paymentIntentId?: string;
}) {
  const order = await Order.findOneAndUpdate(
    { _id: orderId, userId },
    {
      shippingAddress,
      orderNotes,
      paymentIntentId,
    },
    { new: true },
  ).populate("items.productId");
  if (!order) throw new Error("Order not found!");
  return order;
}

export async function fulfillPaidOrder(
  orderId: string,
  paymentIntentId: string,
) {
  const order = await Order.findById(orderId);
  if (!order) return null;

  if (order.status === "CONFIRMED") return order;

  for (const item of order.items) {
    await Product.updateOne(
      { _id: item.productId },
      { $inc: { stock: -item.quantity } },
    );
  }

  if (order.couponCode) {
    const coupon = await Coupon.findOne({
      code: order.couponCode,
      deletedAt: null,
    });
    if (coupon) {
      const existingUsage = await CouponUsage.findOne({
        orderId: order._id,
      });
      if (!existingUsage) {
        await CouponUsage.create({
          couponId: coupon._id,
          userId: order.userId,
          orderId: order._id,
        });
      }
    }
  }

  order.status = "CONFIRMED";
  order.paidAt = new Date();
  order.paymentIntentId = paymentIntentId;
  await order.save();

  await Payment.findOneAndUpdate(
    { orderId: order._id, paymentIntentId },
    { status: "PAID" },
  );

  return order;
}

export async function getOrderForPayment(orderId: string, userId: string) {
  const order = await getOrder(orderId, userId);

  if (!order) return {};

  if (order.paymentIntentId) {
    const clientSecret = await retrieveClientSecret(order.paymentIntentId);
    return { order, clientSecret };
  }

  return { order };
}

export async function getOrder(orderId: string, userId: string) {
  const order = await Order.findOne({
    _id: orderId,
    userId,
  }).populate("items.productId");

  if (!order) throw new Error("Order not found!");

  if (order.status === "CANCELED") {
    const payment = await Payment.findOne({ orderId, status: "PAID" });
    if (payment) return;
  } else if (order.status !== "PENDING") return;

  const payments = await Payment.find({ orderId }).sort({ createdAt: -1 });

  if (payments.length > 0) {
    const payment = order.paymentIntentId
      ? payments.find((p) => p.paymentIntentId === order.paymentIntentId)
      : payments[0];

    return mapOrderDTO(order, payment?.provider);
  }

  return mapOrderDTO(order);
}

async function getLatestPayment(orderId: string) {
  return Payment.findOne({ orderId }).sort({ createdAt: -1 });
}

export async function getUserOrders(userId: string) {
  const orders = await Order.find({ userId, deletedAt: null })
    .sort({ createdAt: -1 })
    .populate("items.productId");

  const orderIds = orders.map((order) => order._id);
  const payments = await Payment.find({ orderId: { $in: orderIds } }).sort({
    createdAt: -1,
  });

  const paymentByOrderId = new Map<string, (typeof payments)[number]>();
  for (const payment of payments) {
    const key = payment.orderId.toString();
    if (!paymentByOrderId.has(key)) {
      paymentByOrderId.set(key, payment);
    }
  }

  return orders
    .filter((order) => paymentByOrderId.get(order._id.toString()))
    .map((order) =>
      mapOrderListItemDTO(order, paymentByOrderId.get(order._id.toString())),
    );
}

export async function getOrderByIdForUser(orderId: string, userId: string) {
  const order = await Order.findOne({
    _id: orderId,
    userId,
    deletedAt: null,
  }).populate("items.productId");

  if (!order) return null;

  const payment = await getLatestPayment(orderId);
  return mapOrderDetailDTO(order, payment);
}

export async function cancelOrder(orderId: string, userId: string) {
  const order = await Order.findOne({
    _id: orderId,
    userId,
    deletedAt: null,
  });

  if (!order) throw new APIError("Order not found!", 404);
  if (!canCancelOrder(order.status)) {
    throw new APIError("This order can no longer be cancelled.", 400);
  }

  order.status = "CANCELED";
  await order.save();

  await Payment.updateMany(
    { orderId: order._id, status: "PENDING" },
    { status: "FAILED" },
  );

  return { id: order._id.toString() };
}

export async function buyAgainFromOrder(orderId: string, userId: string) {
  const order = await Order.findOne({
    _id: orderId,
    userId,
    deletedAt: null,
  });

  if (!order) throw new APIError("Order not found!", 404);

  const items = order.items.map((item) => ({
    productId: item.productId.toString(),
    quantity: item.quantity,
  }));

  const addedItems = await addOrderItemsToCart(userId, items);

  return {
    message: "Items added to cart!",
    addedCount: addedItems.length,
  };
}
