"use server";

import { requireAuth } from "@/lib/auth/guards";
import { getSession } from "@/lib/auth/session";
import {
  ActionResponse,
  getUnAuthorizedActionResponse,
} from "@/lib/auth/types";
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
import {
  createPaymentIntent,
  getPaymentStatus,
} from "@/lib/services/payment.service";
import { CreateOrderInput } from "@/lib/types/checkout.types";
import {
  OrderDetailDTO,
  OrderDTO,
  OrderListItemDTO,
} from "@/lib/types/order.types";
import Stripe from "stripe";

export async function createOrderAction(
  orderData: Omit<CreateOrderInput, "userId">,
): Promise<ActionResponse<OrderDTO>> {
  await connectDB();
  const session = await getSession();
  if (!session) return getUnAuthorizedActionResponse();
  const order = await createOrder({ ...orderData, userId: session.user.id });
  return {
    success: true,
    message: "Order created successfully",
    payload: order,
  };
}

export async function createPaymentIntentAction(
  orderId: string,
  orderData: Omit<CreateOrderInput, "userId" | "couponCode" | "items">,
): Promise<ActionResponse<{ clientSecret?: string; order: OrderDTO }>> {
  await connectDB();
  const session = await getSession();
  if (!session) return getUnAuthorizedActionResponse();
  const paymentIntent = await createPaymentIntent({
    orderData: { ...orderData, userId: session.user.id },
    orderId,
  });
  return {
    success: true,
    message: "Payment intent created successfully",
    payload: paymentIntent,
  };
}

export async function getOrderAction(
  orderId: string,
): Promise<ActionResponse<OrderDTO>> {
  await connectDB();
  const session = await requireAuth();

  const order = await getOrder(orderId, session.user.id);
  return order
    ? {
        success: true,
        message: "Order fetched successfully",
        payload: order,
      }
    : {
        success: false,
        message: "Order not found",
      };
}

export async function getOrderForPaymentAction(
  orderId: string,
): Promise<ActionResponse<{ order: OrderDTO; clientSecret?: string } | null>> {
  await connectDB();
  const session = await requireAuth();
  const order = await getOrderForPayment(orderId, session.user.id);
  return order
    ? {
        success: true,
        message: "Order fetched successfully",
        payload: order,
      }
    : {
        success: false,
        message: "Order not found",
      };
}

export async function listOrdersAction(): Promise<
  ActionResponse<OrderListItemDTO[]>
> {
  await connectDB();
  const session = await requireAuth();
  return {
    success: true,
    message: "Orders fetched successfully",
    payload: await getUserOrders(session.user.id),
  };
}

export async function getOrderDetailAction(
  orderId: string,
): Promise<ActionResponse<OrderDetailDTO | null>> {
  await connectDB();
  const session = await requireAuth();
  const order = await getOrderByIdForUser(orderId, session.user.id);
  return {
    success: true,
    message: "Order details fetched successfully!",
    payload: order,
  };
}

export async function cancelOrderAction(
  orderId: string,
): Promise<ActionResponse> {
  await connectDB();
  const session = await getSession();
  if (!session) return getUnAuthorizedActionResponse();
  await cancelOrder(orderId, session.user.id);

  return { success: true, message: "Order cancelled successfully!" };
}

export async function buyAgainAction(
  orderId: string,
): Promise<ActionResponse<{ message: string; addedCount: number }>> {
  await connectDB();
  const session = await getSession();
  if (!session) return getUnAuthorizedActionResponse();
  const payload = await buyAgainFromOrder(orderId, session.user.id);
  return { success: true, payload };
}

export async function getPaymentStatusAction({
  orderId,
  paymentIntentId,
}: {
  orderId?: string;
  paymentIntentId?: string;
}): Promise<
  ActionResponse<
    | {
        status: Stripe.PaymentIntent.Status;
        displayOrderId: string;
        totalAmount: number;
        paymentProvider: "STRIPE";
      }
    | undefined
  >
> {
  await connectDB();
  await requireAuth();
  const status = await getPaymentStatus({ orderId, paymentIntentId });
  return { success: true, payload: status };
}
