"use client";

import { useCallback, useTransition } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { deleteCouponAction } from "@/actions/coupon.action";
import AlertDialog from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type DeleteCouponProps = {
  couponId: string;
  code: string;
};

export function DeleteCoupon({ couponId, code }: DeleteCouponProps) {
  const { error, success } = useToast();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = useCallback(() => {
    startTransition(async () => {
      const result = await deleteCouponAction(couponId);

      if (!result.success) {
        error("Could not delete coupon", result.error);
        return;
      }

      success("Coupon deleted", `${code} has been removed.`);
      router.refresh();
    });
  }, [code, couponId, error, router, success]);

  return (
    <AlertDialog
      loading={isPending}
      onConfirm={handleDelete}
      description={`This will permanently delete the coupon "${code}". This action cannot be undone.`}
    >
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="flex-1 text-destructive hover:bg-red-50 hover:text-destructive"
        disabled={isPending}
      >
        {isPending ? (
          <Loader2 className="size-3.5 animate-spin" />
        ) : (
          <Trash2 className="size-3.5" />
        )}
        Delete
      </Button>
    </AlertDialog>
  );
}
