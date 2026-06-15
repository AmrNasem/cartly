import { ShippingAddress } from "@/lib/models/order";
import {
  CheckoutFieldErrors,
  CheckoutFormData,
} from "@/lib/types/checkout.types";
import { PaymentProvider } from "../models/payment";

const PHONE_PATTERN = /^[+]?[\d\s()-]{7,20}$/;

function isValidPaymentMethod(value: string): value is PaymentProvider {
  return value === "STRIPE" || value === "PAYMOB" || value === "COD";
}

export function validateCheckoutForm(
  data: CheckoutFormData,
): { valid: true } | { valid: false; fieldErrors: CheckoutFieldErrors } {
  const fieldErrors: CheckoutFieldErrors = {};
  const { shippingAddress } = data;

  if (!shippingAddress.fullName.trim()) {
    fieldErrors.fullName = "Full name is required";
  }

  if (!shippingAddress.phone.trim()) {
    fieldErrors.phone = "Phone number is required";
  } else if (!PHONE_PATTERN.test(shippingAddress.phone.trim())) {
    fieldErrors.phone = "Enter a valid phone number";
  }

  if (!shippingAddress.country.trim()) {
    fieldErrors.country = "Country is required";
  }

  if (!shippingAddress.city.trim()) {
    fieldErrors.city = "City is required";
  }

  if (!shippingAddress.street.trim()) {
    fieldErrors.street = "Street address is required";
  }

  if (!isValidPaymentMethod(data.paymentMethod)) {
    fieldErrors.paymentMethod = "Select a payment method";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { valid: false, fieldErrors };
  }

  return { valid: true };
}

export function normalizeShippingAddress(
  address: ShippingAddress,
): ShippingAddress {
  
  return {
    fullName: address.fullName.trim(),
    phone: address.phone.trim(),
    country: address.country.trim(),
    city: address.city.trim(),
    street: address.street.trim(),
    postalCode: address.postalCode?.trim() || "",
  };
}
