import { FormField } from "@/components/admin/coupons/form-field"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Skeleton from "@/components/ui/skeleton"
import { Sparkles } from "lucide-react"

function CouponFormSkeleton() {
  return (
    <form className="space-y-4 md:space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold">Edit coupon</h2>
          <p className="text-xs text-muted-foreground">
            Create a discount code for promotions and campaigns.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm">
            Cancel
          </Button>
          <Button type="submit" size="sm" disabled>
            Save coupon
          </Button>
        </div>
      </div>

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
              >
                <div className="flex gap-2 items-center">
                  <Skeleton className="h-5" />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="shrink-0"
                    disabled
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
              >
                <Skeleton className="h-12" />
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
                required
              >
                <Skeleton className="h-5" />
              </FormField>

              <FormField
                id="discountValue"
                label="Discount value"
                required
              >
                <Skeleton className="h-5" />
              </FormField>

              <FormField
                id="maxDiscount"
                label="Max discount"
                hint="Cap for percentage discounts (optional)."
                className="sm:col-span-2"
              >
                <Skeleton className="h-5" />
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
              >
                <Skeleton className="h-5" />
              </FormField>

              <FormField
                id="perUserLimit"
                label="Per user limit"
                hint="Maximum uses per customer."
              >
                <Skeleton className="h-5" />
              </FormField>

              <FormField
                id="minCartValue"
                label="Minimum cart value"
                hint="Order subtotal required to apply."
                className="sm:col-span-2"
              >
                <Skeleton className="h-5" />
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
              >
                <Skeleton className="h-5" />
              </FormField>
              <FormField
                id="endDate"
                label="End date"
                hint="Leave empty for no expiration."
              >
                <Skeleton className="h-5" />
              </FormField>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between gap-3">
                <Skeleton className="h-5" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  )
}

export default CouponFormSkeleton