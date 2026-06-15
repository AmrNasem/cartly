import { ShippingAddress } from "@/lib/models/order";
import { PaymentProvider } from "../models/payment";

export type CheckoutFormData = {
  shippingAddress: ShippingAddress;
  orderNotes: string;
  paymentMethod: PaymentProvider;
};

export type CheckoutFieldErrors = Partial<
  Record<
    | keyof ShippingAddress
    | "orderNotes"
    | "paymentMethod"
    | "form",
    string
  >
>;

export type PlaceOrderPayload = {
  items: { id: string; quantity: number }[];
  shippingAddress: ShippingAddress;
  couponCode: string | null;
  paymentMethod: PaymentProvider;
  orderNotes?: string;
};

export type PlaceOrderResponse = {
  message: string;
  payload: {
    orderId: string;
    clientSecret?: string;
  };
};


export type OrderItemInput = { id: string; quantity: number };

export type CreateOrderInput = {
  userId: string;
  cartId?: string;
  items: OrderItemInput[];
  shippingAddress?: ShippingAddress;
  couponCode: string | null;
  paymentMethod?: PaymentProvider;
  orderNotes?: string;
};