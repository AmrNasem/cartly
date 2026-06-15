import { CheckoutContext } from "@/providers/checkout-form-provider"
import { useContext } from "react"

function useCheckoutForm() {
  const ctx = useContext(CheckoutContext)
  if (!ctx) throw new Error("useCheckoutForm should be used within CheckoutFormProvider")
  return ctx;
}

export default useCheckoutForm