import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import type Stripe from "stripe";

import { stripe } from "@/lib/stripe";
import { connectDB } from "@/lib/db";
import { fulfillPaidOrder } from "@/lib/services/order.service";

export async function POST(req: NextRequest) {
  let event: Stripe.Event;

  try {
    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      throw new Error("STRIPE_WEBHOOK_SECRET is not defined");
    }

    event = stripe.webhooks.constructEvent(
      await req.text(),
      (await headers()).get("stripe-signature") ?? "",
      process.env.STRIPE_WEBHOOK_SECRET,
    );

  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown Error";
    console.error(`Webhook error: ${errorMessage}`);
    return NextResponse.json(
      { message: `Webhook Error: ${errorMessage}` },
      { status: 400 },
    );
  }
  
  if (event.type === "payment_intent.succeeded") {
    try {
      await connectDB();
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const orderId = paymentIntent.metadata?.orderId;

      if (orderId) {
        await fulfillPaidOrder(orderId, paymentIntent.id);
      }
    } catch (error) {
      console.error("Webhook handler failed:", error);
      return NextResponse.json(
        { message: "Webhook handler failed" },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ message: "Received" }, { status: 200 });
}
