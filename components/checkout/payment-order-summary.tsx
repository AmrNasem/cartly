"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderItemDTO } from "@/lib/types/order.types";
import Image from "next/image";

type PaymentOrderSummaryProps = {
  items: OrderItemDTO[];
  totalAmount: number;
};

export function PaymentOrderSummary({
  items,
  totalAmount,
}: PaymentOrderSummaryProps) {
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <aside className="lg:col-span-1 sticky top-22">
      <Card className="border-muted shadow-md sticky top-21 self-start">
        <CardHeader>
          <CardTitle className="text-primary">Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {itemCount} item{itemCount === 1 ? "" : "s"}
          </p>
          <ul className="space-y-3">
            {items.map((item, index) => (
              <li
                key={`${item.titleSnapshot}-${index}`}
                className="flex items-start justify-between gap-3 text-sm border-b border-muted pb-3 last:border-0 last:pb-0"
              >
                <figure className="relative size-16 shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={item.product.thumbnail}
                    alt={item.titleSnapshot}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </figure>{" "}
                <div className="min-w-0">
                  <p className="font-medium text-primary line-clamp-2">
                    {item.titleSnapshot}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Qty: {item.quantity} × ${item.priceSnapshot.toFixed(2)}
                  </p>
                </div>
                <span className="font-semibold shrink-0">
                  ${(item.priceSnapshot * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div className="border-t border-muted pt-3 flex justify-between text-base font-semibold text-primary">
            <span>Total</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
