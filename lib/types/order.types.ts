import { PaymentProvider } from "../models/payment";
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
