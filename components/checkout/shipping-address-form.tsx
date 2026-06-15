"use client";

import { FormField } from "@/components/admin/coupons/form-field";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useCheckoutForm from "@/hooks/checkout/use-checkout-form";

export function ShippingAddressForm() {
  const { fieldErrors: errors, shippingAddress, updateAddress } = useCheckoutForm()

  return (
    <Card className="border-muted shadow-md">
      <CardHeader>
        <CardTitle className="text-primary">Shipping Address</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        <FormField
          id="fullName"
          label="Full Name"
          required
          error={errors?.fullName}
          className="sm:col-span-2"
        >
          <Input
            id="fullName"
            name="fullName"
            autoComplete="name"
            value={shippingAddress.fullName}
            onChange={(e) => updateAddress("fullName", e.target.value)}
            aria-invalid={Boolean(errors?.fullName)}
          />
        </FormField>
        <FormField
          id="phone"
          label="Phone Number"
          required
          error={errors?.phone}
          className="sm:col-span-2"
        >
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={shippingAddress.phone}
            onChange={(e) => updateAddress("phone", e.target.value)}
            aria-invalid={Boolean(errors?.phone)}
          />
        </FormField>
        <FormField id="country" label="Country" required error={errors?.country}>
          <Input
            id="country"
            name="country"
            autoComplete="address-level2"
            value={shippingAddress.country}
            onChange={(e) => updateAddress("country", e.target.value)}
            aria-invalid={Boolean(errors?.country)}
          />
        </FormField>

        <FormField id="city" label="City" required error={errors?.city}>
          <Input
            id="city"
            name="city"
            autoComplete="address-level2"
            value={shippingAddress.city}
            onChange={(e) => updateAddress("city", e.target.value)}
            aria-invalid={Boolean(errors?.city)}
          />
        </FormField>
        
        <FormField
          id="street"
          label="Street Address"
          required
          error={errors?.street}
          // className=""
        >
          <Input
            id="street"
            name="street"
            autoComplete="street-address"
            value={shippingAddress.street}
            onChange={(e) => updateAddress("street", e.target.value)}
            aria-invalid={Boolean(errors?.street)}
          />
        </FormField>

        <FormField
          id="postalCode"
          label="Postal Code"
          error={errors?.postalCode}
        >
          <Input
            id="postalCode"
            name="postalCode"
            autoComplete="postal-code"
            value={shippingAddress.postalCode}
            onChange={(e) => updateAddress("postalCode", e.target.value)}
            aria-invalid={Boolean(errors?.postalCode)}
          />
        </FormField>
      </CardContent>
    </Card>
  );
}
