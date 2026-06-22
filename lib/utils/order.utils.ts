import { OrderStatus } from "@/lib/models/order";
import { PaymentProvider, PaymentStatus } from "@/lib/models/payment";
import { TAX_RATE } from "@/lib/utils/order-totals";

type BadgeVariant =
  | "default"
  | "secondary"
  | "success"
  | "sky"
  | "warning"
  | "destructive"
  | "outline";

export function formatOrderNumber(orderId: string): string {
  return `#${orderId.slice(-8).toUpperCase()}`;
}

export function formatOrderDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function getOrderStatusLabel(status: OrderStatus): string {
  switch (status) {
    case "PENDING":
      return "Pending Confirmation";
    case "CONFIRMED":
      return "Confirmed";
    case "SHIPPED":
      return "Shipped";
    case "DELIVERED":
      return "Delivered";
    case "CANCELED":
      return "Cancelled";
    default:
      return status;
  }
}

export function getOrderStatusVariant(status: OrderStatus): BadgeVariant {
  switch (status) {
    case "PENDING":
      return "warning";
    case "CONFIRMED":
      return "sky";
    case "SHIPPED":
      return "default";
    case "DELIVERED":
      return "success";
    case "CANCELED":
      return "destructive";
    default:
      return "outline";
  }
}

export function getOrderStatusClassName(status: OrderStatus): string | undefined {
  if (status === "SHIPPED") {
    return "bg-primary/10 text-primary border-primary/15";
  }

  return undefined;
}

const PAYMENT_PROVIDER_LABELS: Record<PaymentProvider, string> = {
  STRIPE: "Stripe",
  PAYMOB: "Paymob",
  COD: "Cash on Delivery",
};

export function formatPaymentMethod(provider?: PaymentProvider): string {
  if (!provider) return "Not specified";
  return PAYMENT_PROVIDER_LABELS[provider];
}

export function formatPaymentSummary(
  provider?: PaymentProvider,
  paymentStatus?: PaymentStatus,
): string {
  if (paymentStatus === "REFUNDED") return "Refunded";

  if (provider === "COD") {
    if (paymentStatus === "PAID") {
      return `Paid (${formatPaymentMethod(provider)})`;
    }
    return `Pending (${formatPaymentMethod(provider)})`;
  }

  if (paymentStatus === "PAID" && provider) {
    return `Paid via ${formatPaymentMethod(provider)}`;
  }

  if (paymentStatus === "FAILED") return "Payment failed";
  if (paymentStatus === "PENDING") return "Payment pending";

  return "Payment pending";
}

export function canCancelOrder(status: OrderStatus): boolean {
  return status === "PENDING";
}

export function canBuyAgain(status: OrderStatus): boolean {
  return status === "DELIVERED" || status === "CANCELED";
}

export function calculatePersistedOrderTotals(items: {
  priceSnapshot: number;
  quantity: number;
}[], totalAmount: number) {
  const subtotal = items.reduce(
    (acc, item) => acc + item.priceSnapshot * item.quantity,
    0,
  );
  const tax = subtotal * TAX_RATE;
  const discount = Math.max(subtotal + tax - totalAmount, 0);

  return { subtotal, tax, discount, shipping: 0, total: totalAmount };
}
