import Link from "next/link";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPaymentStatusAction } from "@/actions/order.action";

export const metadata: Metadata = {
  title: "Order Confirmation",
};

const STATUS_CONTENT: Record<
  string,
  { title: string; description: string; icon: "success" | "error" | "pending" }
> = {
  succeeded: {
    title: "Payment Successful",
    description: "Thank you! Your payment has been received.",
    icon: "success",
  },
  processing: {
    title: "Payment Processing",
    description: "Your payment is being processed. We'll update you shortly.",
    icon: "pending",
  },
  requires_payment_method: {
    title: "Payment Failed",
    description: "Your payment was not successful. Please try again.",
    icon: "error",
  },
  default: {
    title: "Order Placed",
    description: "Your order has been received.",
    icon: "success",
  },
};

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{
    payment_intent?: string;
    orderId?: string;
  }>;
}) {
  const params = await searchParams;
  const { payment_intent: paymentIntentId, orderId } = params;

  if (!paymentIntentId && !orderId) {
    redirect("/");
  }

  const result = await getPaymentStatusAction({ orderId, paymentIntentId })

  if (!result) redirect("/");

  const { status, displayOrderId, totalAmount } = result;

  const content = STATUS_CONTENT[status] ?? STATUS_CONTENT.default;

  return (
    <main className="mycontainer my-6">
      <Card className="border-muted shadow-md max-w-lg mx-auto">
        <CardHeader className="text-center">
          <div
            className={`mx-auto mb-3 flex size-12 items-center justify-center rounded-full ${content.icon === "success"
                ? "bg-green-600/10"
                : content.icon === "error"
                  ? "bg-destructive/10"
                  : "bg-muted"
              }`}
          >
            {content.icon === "success" ? (
              <CheckCircle2 className="size-6 text-green-600" />
            ) : content.icon === "error" ? (
              <XCircle className="size-6 text-destructive" />
            ) : (
              <Loader2 className="size-6 text-muted-foreground animate-spin" />
            )}
          </div>
          <CardTitle className="text-primary">{content.title}</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">{content.description}</p>
          {displayOrderId ? (
            <p className="text-xs text-muted-foreground">
              Order ID: <span className="font-mono">{displayOrderId}</span>
            </p>
          ) : null}
          {totalAmount !== null ? (
            <p className="text-lg font-semibold text-primary">
              ${totalAmount.toFixed(2)}
            </p>
          ) : null}
          <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
            <Button asChild>
              <Link href="/shop">Continue Shopping</Link>
            </Button>
            {
              status === "requires_payment_method" &&
                displayOrderId ? (
                <Button variant="outline" asChild>
                  <Link href={`/checkout/payment?orderId=${displayOrderId}`}>
                    Try Again
                  </Link>
                </Button>
              ) : null}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
