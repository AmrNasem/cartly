import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OrderReviewItem from "@/components/checkout/order-review-item";
import { OrderDetailDTO } from "@/lib/types/order.types";
import {
  formatOrderDate,
  formatPaymentMethod,
  formatPaymentSummary,
} from "@/lib/utils/order.utils";
import { OrderActions } from "./order-actions";
import { OrderShippingAddress } from "./order-shipping-address";
import { OrderStatusBadge } from "./order-status-badge";
import { OrderTotalsSummary } from "./order-totals-summary";

type OrderDetailViewProps = {
  order: OrderDetailDTO;
};

export function OrderDetailView({ order }: OrderDetailViewProps) {
  return (
    <div className="space-y-6">
      <Link
        href="/orders"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="size-4" />
        Back to orders
      </Link>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-primary">
            Order {order.orderNumber}
          </h1>
          <p className="text-sm text-muted-foreground">
            Placed on {formatOrderDate(order.createdAt)}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="border-muted shadow-md">
            <CardHeader>
              <CardTitle className="text-primary">Products</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {order.items.map((item) => (
                  <OrderReviewItem
                    key={item.id}
                    item={item}
                    lineSubtotal={item.priceSnapshot * item.quantity}
                  />
                ))}
              </ul>
            </CardContent>
          </Card>

          <OrderShippingAddress address={order.shippingAddress} />
        </div>

        <aside className="space-y-6">
          <Card className="border-muted shadow-md sticky top-21 self-start">
            <CardHeader>
              <CardTitle className="text-primary">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Payment method</p>
                  <p className="font-medium">
                    {formatPaymentMethod(order.paymentMethod)}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Payment status</p>
                  <p className="font-medium">
                    {formatPaymentSummary(
                      order.paymentMethod,
                      order.paymentStatus,
                    )}
                  </p>
                </div>
              </div>

              <OrderTotalsSummary order={order} />

              <OrderActions
                orderId={order.id}
                status={order.status}
                layout="detail"
              />
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
