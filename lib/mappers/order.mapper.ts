import { PaymentProvider, PaymentStatus } from "../models/payment";
import {
  OrderDetailDTO,
  OrderDTO,
  OrderItemDTO,
  OrderListItemDTO,
} from "../types/order.types";
import { formatOrderNumber } from "../utils/order.utils";

function mapOrderItems(order: any): OrderItemDTO[] {
  return order.items.map((item: any) => ({
    id: item._id.toString(),
    product: {
      id: item.productId?._id?.toString() ?? item.productId?.toString() ?? "",
      thumbnail: item.productId?.images?.[0]?.url || "",
    },
    titleSnapshot: item.titleSnapshot,
    priceSnapshot: item.priceSnapshot,
    quantity: item.quantity,
  }));
}

export function mapOrderDTO(
  order: any,
  paymentMethod?: PaymentProvider,
): OrderDTO {
  return {
    id: order._id.toString(),
    items: mapOrderItems(order),
    orderNotes: order.orderNotes,
    paymentMethod,
    shippingAddress: {
      fullName: order.shippingAddress?.fullName || "",
      phone: order.shippingAddress?.phone || "",
      country: order.shippingAddress?.country || "",
      city: order.shippingAddress?.city || "",
      street: order.shippingAddress?.street || "",
      postalCode: order.shippingAddress?.postalCode || "",
    },
    paymentIntentId: order.paymentIntentId,
    totalAmount: order.totalAmount,
  };
}

export function mapOrderListItemDTO(
  order: any,
  payment?: { provider?: PaymentProvider; status?: PaymentStatus } | null,
): OrderListItemDTO {
  const items = mapOrderItems(order);
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return {
    id: order._id.toString(),
    orderNumber: formatOrderNumber(order._id.toString()),
    status: order.status,
    totalAmount: order.totalAmount,
    itemCount,
    createdAt: order.createdAt.toISOString(),
    paymentMethod: payment?.provider,
    paymentStatus: payment?.status,
    previewItems: items.slice(0, 3).map((item) => ({
      thumbnail: item.product.thumbnail,
      title: item.titleSnapshot,
    })),
    extraProductCount: Math.max(items.length - 3, 0),
  };
}

export function mapOrderDetailDTO(
  order: any,
  payment?: { provider?: PaymentProvider; status?: PaymentStatus } | null,
): OrderDetailDTO {
  return {
    ...mapOrderDTO(order, payment?.provider),
    orderNumber: formatOrderNumber(order._id.toString()),
    status: order.status,
    couponCode: order.couponCode ?? null,
    createdAt: order.createdAt.toISOString(),
    paidAt: order.paidAt ? order.paidAt.toISOString() : null,
    paymentStatus: payment?.status,
  };
}
