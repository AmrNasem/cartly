"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { toggleCouponActiveAction } from "@/actions/coupon.action";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

type CouponStatusSwitchProps = {
  couponId: string;
  isActive: boolean;
};

export function CouponStatusSwitch({
  couponId,
  isActive,
}: CouponStatusSwitchProps) {
  const [active, setActive] = useState(isActive);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setActive(isActive);
  }, [isActive]);
  const router = useRouter();
  const { error, success } = useToast();

  const handleToggle = useCallback(
    (checked: boolean) => {
      const previous = active;
      setActive(checked);

      startTransition(async () => {
        const result = await toggleCouponActiveAction(couponId, checked);

        if (!result.success) {
          setActive(previous);
          error("Could not update coupon", result.error);
          return;
        }

        success(
          checked ? "Coupon activated" : "Coupon deactivated",
          "Coupon status updated successfully."
        );
        router.refresh();
      });
    },
    [active, couponId, error, router, success]
  );

  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={active}
        disabled={isPending}
        onCheckedChange={handleToggle}
        aria-label={active ? "Deactivate coupon" : "Activate coupon"}
      />
      {isPending ? (
        <Loader2 className="size-3.5 animate-spin text-muted-foreground" />
      ) : (
        <span className="text-[11px] text-muted-foreground">
          {active ? "Active" : "Inactive"}
        </span>
      )}
    </div>
  );
}
