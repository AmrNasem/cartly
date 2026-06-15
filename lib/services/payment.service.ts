import { mapOrderDTO } from "../mappers/order.mapper";
import { Order } from "../models";
import Payment, { PaymentProvider } from "../models/payment";
import { stripe } from "../stripe";
import { CreateOrderInput } from "../types/checkout.types";
import { toStripeAmount } from "../utils/order-totals";
import { clearCart } from "./cart.service";
import { fulfillPaidOrder, updateOrder } from "./order.service";

export async function createPaymentIntent({
  orderData: { cartId, paymentMethod, userId, shippingAddress, orderNotes },
  orderId,
}: {
  orderData: Omit<CreateOrderInput, "items" | "couponCode">;
  orderId: string;
}) {
  const order = await updateOrder({
    orderData: { userId, shippingAddress, orderNotes },
    orderId,
  });

  if (paymentMethod === "COD") {
    await createPayment(order._id.toString(), order.totalAmount);
    if (cartId) await clearCart(cartId);
    return { order: mapOrderDTO(order) };
  } else if (paymentMethod === "STRIPE") {
    const result = await payWithStripe(orderId, userId, order.totalAmount);
    order.paymentIntentId = result.payment.paymentIntentId;
    await order.save();

    return { order: mapOrderDTO(order), clientScret: result.clientSecret };
  }
}

export async function createPayment(
  orderId: string,
  amount: number,
  data?: {
    paymentIntentId?: string;
    provider?: PaymentProvider;
    currency?: string;
  },
) {
  const payment = await Payment.create({
    orderId,
    amount,
    provider: data?.provider ?? "COD",
    ...data,
  });

  return payment;
}

export async function payWithStripe(
  orderId: string,
  userId: string,
  totalAmount: number,
) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: toStripeAmount(totalAmount),
    currency: "usd",
    automatic_payment_methods: { enabled: true },
    metadata: {
      orderId,
      userId,
    },
  });


  const payment = await createPayment(orderId, totalAmount, {
    paymentIntentId: paymentIntent?.id ?? null,
    provider: "STRIPE",
  });

  return { payment, clientSecret: paymentIntent.client_secret ?? undefined };
}

export async function retrieveClientSecret(paymentIntentId: string) {

  const paymentIntent = await stripe.paymentIntents.retrieve(
    paymentIntentId,
  );

  if (!paymentIntent.client_secret) {
    throw new Error("Unable to load payment session!");
  }
  return paymentIntent.client_secret;
}

export async function getPaymentStatus({ orderId, paymentIntentId }: { orderId?: string; paymentIntentId?: string }) {

  let realPaymentIntentId = paymentIntentId;
  if (!realPaymentIntentId) {
    const order = await Order.findOne({ _id: orderId });
    if (order)
      realPaymentIntentId = order?.paymentIntentId;
  }

  if (!realPaymentIntentId) return;

  const payment = await Payment.findOne({ paymentIntentId: realPaymentIntentId })
  if (!payment) return;

  if (payment.provider === "STRIPE") {
    const paymentIntent = await stripe.paymentIntents.retrieve(realPaymentIntentId);
    if (!paymentIntent)
      return;

    const result = {
      status: paymentIntent.status,
      displayOrderId: paymentIntent.metadata?.orderId ?? orderId,
      totalAmount: paymentIntent.amount / 100,
    }

    if (result.status === "succeeded") {
      if (payment.status !== "PAID") await fulfillPaidOrder(result.displayOrderId, realPaymentIntentId)
    }

    return result
  }
}