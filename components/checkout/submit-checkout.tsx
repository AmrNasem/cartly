"use client";

import { createPaymentIntentAction } from "@/actions/order.action";
import useCheckoutForm from "@/hooks/checkout/use-checkout-form";
import { useToast } from "@/hooks/use-toast";
import {
  normalizeShippingAddress,
  validateCheckoutForm,
} from "@/lib/validators/checkout.validator";
import { useCartStore } from "@/store/cart-store";
import { useRouter } from "next/navigation";
import { FormEvent, ReactNode } from "react";

function SubmitCheckout({
  children,
  className = "",
  orderId,
}: {
  children: ReactNode;
  orderId: string;
  className?: string;
}) {
  const cartId = useCartStore((state) => state.cart.cartId);
  const clearCart = useCartStore((state) => state.clearCart);

  const { error, success } = useToast();
  const { shippingAddress, orderNotes, paymentMethod, setFieldErrors } =
    useCheckoutForm();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      shippingAddress: normalizeShippingAddress(shippingAddress),
      orderNotes,
      paymentMethod,
    };

    const validation = validateCheckoutForm(formData);
    if (!validation.valid) {
      setFieldErrors(validation.fieldErrors);
      return;
    }

    setFieldErrors({});

    try {
      const res = await createPaymentIntentAction(orderId, {
        cartId: cartId ?? undefined,
        shippingAddress: formData.shippingAddress,
        paymentMethod,
        orderNotes,
      });

      if (!res.success) throw new Error(res.message);
      if (paymentMethod === "COD") {
        clearCart();
        success(
          "Order placed successfully!",
          "Thank you for your order! Since you selected Cash on Delivery, your order is currently pending confirmation. We'll reach out to you soon to confirm it.",
        );
        router.push(`/orders`);
        return;
      } else if (paymentMethod === "STRIPE") {
        router.push(`/checkout/stripe?orderId=${orderId}`);
        return;
      } else if (paymentMethod === "PAYMOB") {
        router.push(`/checkout/paymob?orderId=${orderId}`);
        return;
      } else {
        error("Invalid payment method");
        return;
      }
    } catch (err) {
      error(err instanceof Error ? err.message : "Failed to place order");
    }

  };
  return (
    <form onSubmit={handleSubmit} className={className}>
      {children}
    </form>
  );
}

export default SubmitCheckout;
