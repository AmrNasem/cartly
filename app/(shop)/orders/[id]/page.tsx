import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getOrderDetailAction } from "@/actions/order.action";
import { OrderDetailView } from "@/components/orders/order-detail-view";
import { requireAuth } from "@/lib/auth/guards";

export const metadata: Metadata = {
  title: "Order Details",
};

type OrderDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  await requireAuth();
  const { id } = await params;
  const order = await getOrderDetailAction(id);

  if (!order) notFound();

  return (
    <main className="mycontainer my-6">
      <OrderDetailView order={order} />
    </main>
  );
}
