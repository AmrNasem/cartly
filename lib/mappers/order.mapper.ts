import { PaymentProvider } from "../models/payment";
import { OrderDTO } from "../types/order.types";

export function mapOrderDTO(
  order: any,
  paymentMethod?: PaymentProvider,
): OrderDTO {

  return {
    id: order._id.toString(),
    items: order.items.map((item: any) => ({
      id: item._id.toString(),
      product: {
        id: item.productId._id.toString(),
        thumbnail: item.productId.images?.[0]?.url || "",
      },
      titleSnapshot: item.titleSnapshot,
      priceSnapshot: item.priceSnapshot,
      quantity: item.quantity,
    })),
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
