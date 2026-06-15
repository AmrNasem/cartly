import { getOrderForPaymentAction } from "@/actions/order.action";
import { PaymentPageClient } from "@/components/checkout/payment-page-client";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Payment",
};

export default async function PaymentPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;

  if (!orderId) {
    redirect("/");
  }

  const { order, clientSecret } = await getOrderForPaymentAction(orderId);

  if (!order) redirect("/");
  if (!clientSecret) redirect(`/checkout?orderId=${order.id}`);

  return <PaymentPageClient items={order.items} totalAmount={order.totalAmount} orderId={orderId} clientSecret={clientSecret} />;
}
