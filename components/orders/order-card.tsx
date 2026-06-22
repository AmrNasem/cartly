import { Card, CardContent } from "@/components/ui/card";
import { OrderListItemDTO } from "@/lib/types/order.types";
import {
  formatOrderDate,
  formatPaymentMethod,
  formatPaymentSummary,
} from "@/lib/utils/order.utils";
import { OrderActions } from "./order-actions";
import { OrderProductPreview } from "./order-product-preview";
import { OrderStatusBadge } from "./order-status-badge";

type OrderCardProps = {
  order: OrderListItemDTO;
};

export function OrderCard({ order }: OrderCardProps) {
  return (
    <Card className="border-muted shadow-md">
      <CardContent className="space-y-4 p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-primary">
              Order {order.orderNumber}
            </p>
            <p className="text-xs text-muted-foreground">
              Placed on {formatOrderDate(order.createdAt)}
            </p>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>

        <div className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <p className="text-muted-foreground">Total</p>
            <p className="font-semibold text-primary">
              ${order.totalAmount.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Items</p>
            <p className="font-medium">{order.itemCount}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Payment method</p>
            <p className="font-medium">
              {formatPaymentMethod(order.paymentMethod)}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Payment status</p>
            <p className="font-medium">
              {formatPaymentSummary(order.paymentMethod, order.paymentStatus)}
            </p>
          </div>
        </div>

        <OrderProductPreview
          previewItems={order.previewItems}
          itemCount={order.itemCount}
          extraProductCount={order.extraProductCount}
        />

        <OrderActions orderId={order.id} status={order.status} />
      </CardContent>
    </Card>
  );
}
