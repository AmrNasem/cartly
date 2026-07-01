"use server";

import { requireAuth } from "@/lib/auth/guards";
import { connectDB } from "@/lib/db";
import {
  buyAgainFromOrder,
  cancelOrder,
  createOrder,
  getOrder,
  getOrderByIdForUser,
  getOrderForPayment,
  getUserOrders,
} from "@/lib/services/order.service";
import { createPaymentIntent, getPaymentStatus } from "@/lib/services/payment.service";
import { CreateOrderInput } from "@/lib/types/checkout.types";

export async function createOrderAction(orderData: Omit<CreateOrderInput, "userId">) {
  await connectDB();
  const session = await requireAuth(true);
  return createOrder({ ...orderData, userId: session.user.id })
}

export async function createPaymentIntentAction(orderId: string, orderData: Omit<CreateOrderInput, "userId" | "couponCode" | "items">) {
  await connectDB();
  const session = await requireAuth(true);
  return createPaymentIntent({ orderData: { ...orderData, userId: session.user.id }, orderId })
}

export async function getOrderAction(orderId: string) {
  await connectDB();
  const session = await requireAuth(true);
  return getOrder(orderId, session.user.id)
}

export async function getOrderForPaymentAction(orderId: string) {
  await connectDB();
const session = await requireAuth(true);
  return getOrderForPayment(orderId, session.user.id)
}

export async function listOrdersAction() {
  await connectDB();
  const session = await requireAuth(true);
  return getUserOrders(session.user.id);
}

export async function getOrderDetailAction(orderId: string) {
  await connectDB();
  const session = await requireAuth(true);
  return getOrderByIdForUser(orderId, session.user.id);
}

export async function cancelOrderAction(orderId: string) {
  await connectDB();
  const session = await requireAuth(true);
  return cancelOrder(orderId, session.user.id);
}

export async function buyAgainAction(orderId: string) {
  await connectDB();
  const session = await requireAuth(true);
  return buyAgainFromOrder(orderId, session.user.id);
}

export async function getPaymentStatusAction({ orderId, paymentIntentId }: { orderId?: string; paymentIntentId?: string }) {
  await connectDB();
  await requireAuth(true);
  return getPaymentStatus({ orderId, paymentIntentId })
}

