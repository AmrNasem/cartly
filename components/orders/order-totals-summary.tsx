import { OrderDetailDTO } from "@/lib/types/order.types";
import { calculatePersistedOrderTotals } from "@/lib/utils/order.utils";

type OrderTotalsSummaryProps = {
  order: OrderDetailDTO;
};

export function OrderTotalsSummary({ order }: OrderTotalsSummaryProps) {
  const totals = calculatePersistedOrderTotals(order.items, order.totalAmount);

  return (
    <div className="space-y-2 text-sm">
      <div className="flex justify-between">
        <span className="text-muted-foreground">Subtotal</span>
        <span className="font-medium">${totals.subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Shipping</span>
        <span className="font-medium text-green-600">Free</span>
      </div>
      {totals.discount > 0 && (
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Discount{order.couponCode ? ` (${order.couponCode})` : ""}
          </span>
          <span className="font-medium text-green-600">
            -${totals.discount.toFixed(2)}
          </span>
        </div>
      )}
      <div className="flex justify-between">
        <span className="text-muted-foreground">Estimated tax</span>
        <span className="font-medium">${totals.tax.toFixed(2)}</span>
      </div>
      <div className="flex justify-between border-t border-muted pt-2 text-base font-semibold text-primary">
        <span>Total</span>
        <span>${totals.total.toFixed(2)}</span>
      </div>
    </div>
  );
}
