import { Metadata } from "next";
import { listOrdersAction } from "@/actions/order.action";
import { OrderList } from "@/components/orders/order-list";
import { OrdersEmpty } from "@/components/orders/orders-empty";
import { requireAuth } from "@/lib/auth/guards";

export const metadata: Metadata = {
  title: "My Orders - Cartly",
};

export default async function OrdersPage() {
  await requireAuth();
  const orders = await listOrdersAction();

  return (
    <main className="mycontainer my-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold text-primary">My Orders</h1>
        <p className="text-sm text-muted-foreground">
          View and manage your recent purchases.
        </p>
      </div>

      {orders.length === 0 ? <OrdersEmpty /> : <OrderList orders={orders} />}
    </main>
  );
}
