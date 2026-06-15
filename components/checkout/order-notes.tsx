"use client";

import { FormField } from "@/components/admin/coupons/form-field";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useCheckoutForm from "@/hooks/checkout/use-checkout-form";

export function OrderNotes() {
  const { orderNotes, setOrderNotes } = useCheckoutForm();

  return (
    <Card className="border-muted shadow-md">
      <CardHeader>
        <CardTitle className="text-primary">Order Notes</CardTitle>
      </CardHeader>
      <CardContent>
        <FormField
          id="orderNotes"
          label="Additional notes for your order"
          hint="e.g. Leave at reception, Call before delivery"
        >
          <Textarea
            id="orderNotes"
            name="orderNotes"
            rows={3}
            value={orderNotes}
            onChange={(e) => setOrderNotes(e.target.value)}
            placeholder="Any special delivery instructions..."
          />
        </FormField>
      </CardContent>
    </Card>
  );
}
