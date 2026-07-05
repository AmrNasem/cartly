import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getOrderDetailAction } from "@/actions/order.action";
import { OrderDetailView } from "@/components/orders/order-detail-view";

export const metadata: Metadata = {
  title: "Order Details",
};

type OrderDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = await params;
  const res = await getOrderDetailAction(id);

  if (!res.success) redirect("/");
  
  const order = res.payload;
  if (!order) notFound();

  return (
    <main className="mycontainer my-6">
      <OrderDetailView order={order} />
    </main>
  );
}
