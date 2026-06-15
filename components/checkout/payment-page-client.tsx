import Link from "next/link";
import { StripePaymentForm } from "./stripe-payment-form";
import { Button } from "@/components/ui/button";
import { PaymentOrderSummary } from "./payment-order-summary";
import { OrderItemDTO } from "@/lib/types/order.types";

type PaymentPageClientProps = {
  orderId: string;
  clientSecret: string;
  items: OrderItemDTO[];
  totalAmount: number;
};

export function PaymentPageClient({
  orderId,
  clientSecret,
  items,
  totalAmount,
}: PaymentPageClientProps) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";
  const returnUrl = `${appUrl}/checkout/success?orderId=${orderId}`;

  return (
    <main className="mycontainer my-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-primary font-semibold text-xl">Payment</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Complete your secure payment
          </p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/checkout?orderId=${orderId}`}>Back to checkout</Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
        <div className="lg:col-span-2">
          <StripePaymentForm
            clientSecret={clientSecret}
            returnUrl={returnUrl}
          />
        </div>
        <PaymentOrderSummary items={items} totalAmount={totalAmount} />
      </div>
    </main>
  );
}
