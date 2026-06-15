"use client";

import { ShippingAddress } from "@/lib/models/order";
import { PaymentProvider } from "@/lib/models/payment";
import { CheckoutFieldErrors } from "@/lib/types/checkout.types";
import { OrderDTO, OrderItemDTO } from "@/lib/types/order.types";
import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useState } from "react";

type CheckoutForm = {
  items: OrderItemDTO[];
  shippingAddress: ShippingAddress;
  orderNotes: string;
  paymentMethod: PaymentProvider;
  setOrderNotes: Dispatch<SetStateAction<string>>,
  setPaymentMethod: Dispatch<SetStateAction<PaymentProvider>>,
  updateAddress: (field: keyof ShippingAddress, value: string) => void,
  fieldErrors: CheckoutFieldErrors
  setFieldErrors: Dispatch<SetStateAction<CheckoutFieldErrors>>
};

type CeckoutFormProviderProps = {
  children: ReactNode;
  initialData?: Partial<OrderDTO>
};
const EMPTY_ADDRESS: ShippingAddress = {
  fullName: "",
  phone: "",
  country: "",
  city: "",
  street: "",
  postalCode: "",
};

export const CheckoutContext = createContext<CheckoutForm | null>(null);

export function CheckoutFormProvider({ children, initialData }: CeckoutFormProviderProps) {
  const [shippingAddress, setShippingAddress] =
    useState<ShippingAddress>(initialData?.shippingAddress || EMPTY_ADDRESS);

  const [orderNotes, setOrderNotes] = useState(initialData?.orderNotes || "");

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentProvider>(initialData?.paymentMethod || "STRIPE");
  const [fieldErrors, setFieldErrors] = useState<CheckoutFieldErrors>({});

  const updateAddress = useCallback((field: keyof ShippingAddress, value: string) => {
    setShippingAddress((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  return (
    <CheckoutContext.Provider
      value={{ items: initialData?.items ? initialData.items : [], shippingAddress, orderNotes, paymentMethod, setOrderNotes, setPaymentMethod, updateAddress, fieldErrors, setFieldErrors }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export default CheckoutFormProvider;
