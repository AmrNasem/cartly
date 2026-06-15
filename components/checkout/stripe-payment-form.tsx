"use client";

import { FormEvent, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import {
  Appearance,
  loadStripe,
  StripePaymentElementOptions,
} from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";
import { Loader2, Lock, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

function PaymentForm({ returnUrl }: { returnUrl: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { error: showError } = useToast();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);
    setMessage("");
    try {

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: { return_url: returnUrl },
      });

      if (error) {
        console.log(error)
        showError(error.message ? error.message : "Payment failed"
        );
      }
    } catch (err) {
      showError(err instanceof Error ? err.message : "Unknown Error")
    }

    setIsLoading(false);
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement options={paymentElementOptions} />
      {message ? (
        <p className="text-sm text-destructive" role="alert">
          {message}
        </p>
      ) : null}
      <Button
        type="submit"
        className="w-full"
        disabled={isLoading || !stripe || !elements}
      >
        {isLoading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Pay Now"
        )}
      </Button>
      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground pt-2">
        <span className="inline-flex items-center gap-1">
          <ShieldCheck className="size-3.5" aria-hidden />
          Secure Checkout
        </span>
        <span className="inline-flex items-center gap-1">
          <Lock className="size-3.5" aria-hidden />
          SSL Protected
        </span>
        <span className="inline-flex items-center gap-1">
          <Lock className="size-3.5" aria-hidden />
          Encrypted Payment
        </span>
      </div>
    </form>
  );
}

type StripePaymentFormProps = {
  clientSecret: string;
  returnUrl: string;
};

export function StripePaymentForm({
  clientSecret,
  returnUrl,
}: StripePaymentFormProps) {
  const appearance: Appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#030213",
      borderRadius: "8px",
    },
  };

  return (
    <Card className="border-muted shadow-md">
      <CardHeader>
        <CardTitle className="text-primary">Payment</CardTitle>
      </CardHeader>
      <CardContent>
        <Elements
          stripe={stripePromise}
          options={{ appearance, clientSecret }}
        >
          <PaymentForm returnUrl={returnUrl} />
        </Elements>
      </CardContent>
    </Card>
  );
}
