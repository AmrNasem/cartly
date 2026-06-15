"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Banknote,
  CreditCard,
  Smartphone,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useCheckoutForm from "@/hooks/checkout/use-checkout-form";
import { PaymentProvider } from "@/lib/models/payment";

const PAYMENT_METHODS: {
  id: PaymentProvider;
  title: string;
  description: string;
  icon: typeof CreditCard;
  badge?: string;
  badgeVariant?: "success" | "sky" | "default";
}[] = [
    {
      id: "STRIPE",
      title: "Stripe",
      description: "Pay securely with cards and digital wallets",
      icon: CreditCard,
      badge: "Recommended",
      badgeVariant: "success",
    },
    {
      id: "PAYMOB",
      title: "Paymob",
      description: "Local payment methods (coming soon)",
      icon: Smartphone,
      badge: "Available",
      badgeVariant: "sky",
    },
    {
      id: "COD",
      title: "Cash on Delivery",
      description: "Pay when your order arrives",
      icon: Banknote,
      badge: "Available",
      badgeVariant: "default",
    },
  ];

export function PaymentMethodSelector() {
  const { paymentMethod, setPaymentMethod, fieldErrors: { paymentMethod: error } } = useCheckoutForm();

  return (
    <Card className="border-muted shadow-md">
      <CardHeader>
        <CardTitle className="text-primary">Payment Method</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          role="radiogroup"
          aria-label="Payment method"
          className="grid gap-3 sm:grid-cols-3"
        >
          {PAYMENT_METHODS.map((method) => {
            const Icon = method.icon;
            const selected = paymentMethod === method.id;

            return (
              <button
                key={method.id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setPaymentMethod(method.id)}
                className={cn(
                  "relative flex flex-col items-start gap-2 rounded-lg border p-4 text-left transition-colors",
                  "hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
                  selected
                    ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                    : "border-muted",
                )}
              >
                {method.badge && (
                  <Badge variant={method.badgeVariant} className="text-[10px]">
                    {method.badge}
                  </Badge>
                )}
                <Icon
                  className={cn(
                    "size-5",
                    selected ? "text-primary" : "text-muted-foreground",
                  )}
                  aria-hidden
                />
                <div>
                  <p className="text-sm font-semibold text-primary">
                    {method.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {method.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
        {error ? (
          <p className="text-[11px] text-destructive mt-2">{error}</p>
        ) : null}
      </CardContent>
    </Card>
  );
}
