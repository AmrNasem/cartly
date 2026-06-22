import { OrderStatus } from "../models/order";
import { PaymentProvider, PaymentStatus } from "../models/payment";
import { CheckoutFormData } from "./checkout.types";

export type OrderItemDTO = {
  id: string;
  product: {
    id: string;
    thumbnail: string;
  };
  titleSnapshot: string;
  priceSnapshot: number;
  quantity: number;
};

export type OrderDTO = Omit<CheckoutFormData, "paymentMethod"> & {
  id: string;
  items: OrderItemDTO[];
  paymentMethod?: PaymentProvider;
  paymentIntentId: string | null;
  totalAmount: number;
};

export type OrderListItemDTO = {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  totalAmount: number;
  itemCount: number;
  createdAt: string;
  paymentMethod?: PaymentProvider;
  paymentStatus?: PaymentStatus;
  previewItems: {
    thumbnail: string;
    title: string;
  }[];
  extraProductCount: number;
};

export type OrderDetailDTO = OrderDTO & {
  orderNumber: string;
  status: OrderStatus;
  couponCode: string | null;
  createdAt: string;
  paidAt: string | null;
  paymentStatus?: PaymentStatus;
};
