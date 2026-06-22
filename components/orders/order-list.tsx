import { OrderListItemDTO } from "@/lib/types/order.types";
import { OrderCard } from "./order-card";

type OrderListProps = {
  orders: OrderListItemDTO[];
};

export function OrderList({ orders }: OrderListProps) {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
