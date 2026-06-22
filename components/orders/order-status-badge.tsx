import { OrderStatus } from "@/lib/models/order";
import { Badge } from "@/components/ui/badge";
import {
  getOrderStatusClassName,
  getOrderStatusLabel,
  getOrderStatusVariant,
} from "@/lib/utils/order.utils";
import { cn } from "@/lib/utils";

type OrderStatusBadgeProps = {
  status: OrderStatus;
};

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const customClassName = getOrderStatusClassName(status);

  return (
    <Badge
      variant={getOrderStatusVariant(status)}
      className={cn(customClassName)}
    >
      {getOrderStatusLabel(status)}
    </Badge>
  );
}
