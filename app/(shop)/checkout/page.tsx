import { getOrderAction } from "@/actions/order.action";
import { CheckoutSummary } from "@/components/checkout/checkout-summary";
import { OrderNotes } from "@/components/checkout/order-notes";
import { OrderReview } from "@/components/checkout/order-review";
import { PaymentMethodSelector } from "@/components/checkout/payment-method-selector";
import { ShippingAddressForm } from "@/components/checkout/shipping-address-form";
import SubmitCheckout from "@/components/checkout/submit-checkout";
import { Button } from "@/components/ui/button";
import { requireAuth } from "@/lib/auth/guards";
import CheckoutFormProvider from "@/providers/checkout-form-provider";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Checkout",
};

export default async function CheckoutPage({ searchParams }: { searchParams: Promise<{ orderId: string }> }) {
  await requireAuth();
  const orderId = (await searchParams).orderId;
  if (!orderId) redirect("/")

  const order = await getOrderAction(orderId);
  if (!order) redirect("/")

  return <CheckoutFormProvider initialData={order}>
    <main className="mycontainer my-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-primary font-semibold text-xl">Checkout</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Review your order and complete your purchase
          </p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/cart">Back to cart</Link>
        </Button>
      </div>

      <SubmitCheckout
        orderId={orderId}
        className="grid gap-6 lg:grid-cols-3 lg:items-start"
      >
        <div className="lg:col-span-2 space-y-6">
          <ShippingAddressForm />
          <OrderReview />
          <OrderNotes />
          <PaymentMethodSelector />
        </div>

        <CheckoutSummary className="lg:col-span-1" />
      </SubmitCheckout>
    </main>
  </CheckoutFormProvider>
}
