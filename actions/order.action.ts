"use server";

import { requireAuth } from "@/lib/auth/guards";
import { connectDB } from "@/lib/db";
import { createOrder, getOrder, getOrderForPayment } from "@/lib/services/order.service";
import { createPaymentIntent, getPaymentStatus } from "@/lib/services/payment.service";
import { CreateOrderInput } from "@/lib/types/checkout.types";

export async function createOrderAction(orderData: Omit<CreateOrderInput, "userId">) {
  const session = await requireAuth(true);
  await connectDB();
  return createOrder({ ...orderData, userId: session.user.id })
}

export async function createPaymentIntentAction(orderId: string, orderData: Omit<CreateOrderInput, "userId" | "couponCode" | "items">) {
  const session = await requireAuth(true);
  await connectDB();
  return createPaymentIntent({ orderData: { ...orderData, userId: session.user.id }, orderId })
}

export async function getOrderAction(orderId: string) {
  const session = await requireAuth(true);
  await connectDB();
  return getOrder(orderId, session.user.id)
}

export async function getOrderForPaymentAction(orderId: string) {
  const session = await requireAuth(true);
  await connectDB();
  return getOrderForPayment(orderId, session.user.id)
}


export async function getPaymentStatusAction({ orderId, paymentIntentId }: { orderId?: string; paymentIntentId?: string }) {
  await requireAuth(true);
  await connectDB();
  return getPaymentStatus({ orderId, paymentIntentId })
}

