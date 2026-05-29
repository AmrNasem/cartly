"use client";

import { useActionState, useCallback, useEffect, useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { createCouponAction, updateCouponAction } from "@/actions/coupon.action";
import { FormField } from "@/components/admin/coupons/form-field";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { DiscountType } from "@/lib/models/coupon";
import { CouponFormInput, CouponFormState } from "@/lib/types/coupon.types";
import { generateCouponCode } from "@/lib/utils/coupon.utils";
import { cn, formatDateTimeLocal } from "@/lib/utils";
import { DeleteCoupon } from "./delete-coupon";

const initialForm: CouponFormInput = {
  code: "",
  description: "",
  discountType: "percentage",
  discountValue: "",
  maxDiscount: "",
  usageLimit: "",
  perUserLimit: "",
  minCartValue: "",
  startDate: formatDateTimeLocal(new Date()),
  endDate: "",
  isActive: true,
};

function fieldClass(hasError: boolean) {
  return cn(hasError && "border-destructive bg-red-50");
}

export function CouponForm({ data, couponId }: { data?: CouponFormInput, couponId?: string }) {
  const [form, setForm] = useState<CouponFormInput>(data || initialForm);
  const router = useRouter();
  const { error, success } = useToast();

  const [state, formAction, isPending] = useActionState<
    CouponFormState | null,
    FormData
  >(data || couponId ? updateCouponAction : createCouponAction, null);

  useEffect(() => {
    if (state?.success) {
      if (data)
        success("Coupon updated successfully");
      else
        success("Coupon created", "Your new coupon is ready to use.");
      router.push("/admin/coupons");
    } else if (state?.error && !state.fieldErrors) {
      error("Could not create coupon", state.error);
    }
  }, [state, router, success, error, data]);

  const fieldErrors = state?.fieldErrors ?? {};

  const updateField = useCallback(<K extends keyof CouponFormInput>(
    key: K,
    value: CouponFormInput[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  console.log("RESPONSE: ", state)
  console.log("FORM STATE: ", form)

  const handleSelectChange = useCallback((value: DiscountType) => {
    updateField("discountType", value);
  }
    , [updateField])

  return (
    <form action={formAction} className="space-y-4 md:space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold">{data ? "Edit coupon" : "New coupon"}</h2>
          <p className="text-xs text-muted-foreground">
            Create a discount code for promotions and campaigns.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/coupons">Cancel</Link>
          </Button>
          <Button type="submit" size="sm" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                {data ? "Saving" : "Creating"}...
              </>
            ) : (
              data ? "Save coupon"
                :
                "Create coupon"
            )}
          </Button>
        </div>
      </div>

      {state?.error && state.fieldErrors ? (
        <p className="rounded-md border border-destructive/20 bg-destructive/5 px-3 py-2 text-xs text-destructive">
          {state.error}
        </p>
      ) : null}
      {
        couponId &&
        <input type="hidden" name="couponId" value={couponId} />
      }
      <input type="hidden" name="discountType" value={form.discountType} />
      <input
        type="hidden"
        name="isActive"
        value={form.isActive ? "true" : "false"}
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)] lg:items-start">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">
                Coupon details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <FormField
                id="code"
                label="Coupon code"
                required
                hint="Customers enter this code at checkout."
                error={fieldErrors.code}
              >
                <div className="flex gap-2">
                  <Input
                    id="code"
                    name="code"
                    placeholder="e.g. WELCOME10"
                    value={form.code}
                    onChange={(e) =>
                      updateField("code", e.target.value.toUpperCase())
                    }
                    disabled={!!data?.code}
                    className={cn("", fieldClass(!!fieldErrors.code))}
                  />
                  {!!data?.code && <input type="hidden" name="code" value={data.code} />}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="shrink-0"
                    onClick={() => updateField("code", generateCouponCode())}
                    disabled={!!data?.code}
                  >
                    <Sparkles className="size-3.5" />
                    Generate
                  </Button>
                </div>
              </FormField>

              <FormField
                id="description"
                label="Description"
                hint="Internal note about this promotion."
                error={fieldErrors.description}
              >
                <Textarea
                  id="description"
                  name="description"
                  placeholder="e.g. Welcome discount for new customers"
                  value={form.description}
                  onChange={(e) => updateField("description", e.target.value)}
                />
              </FormField>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Discount</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              <FormField
                id="discountType"
                label="Discount type"
                error={state?.fieldErrors?.discountType}
                required
              >
                <Select
                  value={form.discountType}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger
                    disabled={!!data?.discountType}
                    className={cn("", fieldClass(!!fieldErrors.discountType))}
                    id="discountType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="fixed">Fixed amount</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              <FormField
                id="discountValue"
                label="Discount value"
                required
                hint={
                  form.discountType === "percentage"
                    ? "Enter a percentage (max 100)."
                    : "Enter a fixed dollar amount."
                }
                error={fieldErrors.discountValue}
              >
                <Input
                  id="discountValue"
                  name="discountValue"
                  type="number"
                  min="0"
                  step={form.discountType === "percentage" ? "1" : "0.01"}
                  placeholder={
                    form.discountType === "percentage" ? "10" : "5.00"
                  }
                  value={form.discountValue}
                  onChange={(e) => updateField("discountValue", e.target.value)}
                  className={cn("", fieldClass(!!fieldErrors.discountValue))}
                />
              </FormField>

              <FormField
                id="maxDiscount"
                label="Max discount"
                hint="Cap for percentage discounts (optional)."
                error={fieldErrors.maxDiscount}
                className="sm:col-span-2"
              >
                <Input
                  id="maxDiscount"
                  name="maxDiscount"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="e.g. 50"
                  value={form.maxDiscount}
                  onChange={(e) => updateField("maxDiscount", e.target.value)}
                  className={cn("", fieldClass(!!fieldErrors.maxDiscount))}
                />
              </FormField>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">
                Usage limits
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              <FormField
                id="usageLimit"
                label="Total usage limit"
                hint="Maximum times this coupon can be used."
                error={fieldErrors.usageLimit}
              >
                <Input
                  id="usageLimit"
                  name="usageLimit"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="Unlimited"
                  value={form.usageLimit}
                  onChange={(e) => updateField("usageLimit", e.target.value)}
                  className={cn("", fieldClass(!!fieldErrors.usageLimit))}
                />
              </FormField>

              <FormField
                id="perUserLimit"
                label="Per user limit"
                hint="Maximum uses per customer."
                error={fieldErrors.perUserLimit}
              >
                <Input
                  id="perUserLimit"
                  name="perUserLimit"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="Unlimited"
                  value={form.perUserLimit}
                  onChange={(e) => updateField("perUserLimit", e.target.value)}
                  className={cn("", fieldClass(!!fieldErrors.perUserLimit))}
                />
              </FormField>

              <FormField
                id="minCartValue"
                label="Minimum cart value"
                hint="Order subtotal required to apply."
                error={fieldErrors.minCartValue}
                className="sm:col-span-2"
              >
                <Input
                  id="minCartValue"
                  name="minCartValue"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="No minimum"
                  value={form.minCartValue}
                  onChange={(e) => updateField("minCartValue", e.target.value)}
                  className={cn("", fieldClass(!!fieldErrors.minCartValue))}
                />
              </FormField>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <FormField
                id="startDate"
                label="Start date"
                hint="Leave empty to start immediately."
                error={fieldErrors.startDate}
              >
                <Input
                  id="startDate"
                  name="startDate"
                  type="datetime-local"
                  value={form.startDate}
                  onChange={(e) => updateField("startDate", e.target.value)}
                  className={cn("", fieldClass(!!fieldErrors.startDate))}
                />
              </FormField>

              <FormField
                id="endDate"
                label="End date"
                hint="Leave empty for no expiration."
                error={fieldErrors.endDate}
              >
                <Input
                  id="endDate"
                  name="endDate"
                  type="datetime-local"
                  value={form.endDate}
                  onChange={(e) => updateField("endDate", e.target.value)}
                  className={cn("", fieldClass(!!fieldErrors.endDate))}
                />
              </FormField>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-medium">Active</p>
                  <p className="text-[11px] text-muted-foreground">
                    Inactive coupons cannot be applied at checkout.
                  </p>
                </div>
                <Switch
                  checked={form.isActive}
                  onCheckedChange={(checked) => updateField("isActive", checked)}
                />
              </div>
            </CardContent>
          </Card>
          {
            data && couponId &&
          <Card>
            <CardHeader>
              <CardTitle className="text-destructive text-sm font-semibold">Danger Area</CardTitle>
            </CardHeader>
            <CardContent>
              <DeleteCoupon className="border-destructive/30 font-semibold w-full" code={data.code} couponId={couponId}>Delete Coupon</DeleteCoupon>
            </CardContent>
          </Card>
          }
        </div>
      </div>
    </form>
  );
}
