import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone } from "lucide-react";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Paymob - Coming Soon",
};

export default async function PaymobPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;
  if (!orderId)
    redirect("/");

  return (
    <main className="mycontainer my-6">
      <Card className="border-muted shadow-md max-w-lg mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-primary/10">
            <Smartphone className="size-6 text-primary" aria-hidden />
          </div>
          <CardTitle className="text-primary">Paymob Coming Soon</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Paymob payment integration is not available yet. Please choose
            another payment method to complete your order.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button asChild>
              <Link href={`/checkout?orderId=${orderId}`}>
                Back to Checkout
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/cart">Back to Cart</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
