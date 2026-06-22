"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useTransition } from "react";
import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import { Loader2 } from "lucide-react";
import { buyAgainAction, cancelOrderAction } from "@/actions/order.action";
import { Button } from "@/components/ui/button";
import { OrderStatus } from "@/lib/models/order";
import { canBuyAgain, canCancelOrder } from "@/lib/utils/order.utils";
import { useToast } from "@/hooks/use-toast";

type OrderActionsProps = {
  orderId: string;
  status: OrderStatus;
  layout?: "card" | "detail";
};

export function OrderActions({
  orderId,
  status,
  layout = "card",
}: OrderActionsProps) {
  const router = useRouter();
  const { success, error } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleCancel = useCallback(() => {
    startTransition(async () => {
      try {
        await cancelOrderAction(orderId);
        success("Order cancelled successfully.");
        router.refresh();
      } catch (err) {
        error(err instanceof Error ? err.message : "Failed to cancel order.");
      }
    });
  }, [orderId, error, success, router]);

  const handleBuyAgain = useCallback(() => {
    startTransition(async () => {
      try {
        const result = await buyAgainAction(orderId);
        if (result.addedCount === 0) {
          error("No items could be added to your cart.");
          return;
        }
        success("Items added to your cart!");
        router.push("/cart");
      } catch (err) {
        error(
          err instanceof Error ? err.message : "Failed to add items to cart.",
        );
      }
    });
  }, [orderId, error, success, router]);

  const buttonSize = layout === "detail" ? "default" : "sm";

  return (
    <div
      className={
        layout === "detail"
          ? "flex flex-col gap-2 sm:flex-row"
          : "flex flex-wrap gap-2"
      }
    >
      {layout === "card" && (
        <Button asChild size={buttonSize} variant="outline">
          <Link href={`/orders/${orderId}`}>View Details</Link>
        </Button>
      )}

      {canCancelOrder(status) && (
        <RadixAlertDialog.Root>
          <RadixAlertDialog.Trigger asChild>
            <Button
              size={buttonSize}
              variant="destructive"
              disabled={isPending}
            >
              Cancel Order
            </Button>
          </RadixAlertDialog.Trigger>
          <RadixAlertDialog.Portal>
            <RadixAlertDialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
            <RadixAlertDialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg bg-background p-6 shadow-lg">
              <RadixAlertDialog.Title className="text-lg font-semibold text-foreground">
                Cancel this order?
              </RadixAlertDialog.Title>
              <RadixAlertDialog.Description className="mt-2 text-sm text-muted-foreground">
                This action cannot be undone. Your order will be marked as
                cancelled.
              </RadixAlertDialog.Description>
              <div className="mt-6 flex justify-end gap-2">
                <RadixAlertDialog.Cancel className="rounded-md px-4 py-2 text-sm font-medium">
                  Keep order
                </RadixAlertDialog.Cancel>
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isPending}
                  className="inline-flex items-center gap-1 rounded-md bg-destructive px-4 py-2 text-sm font-medium text-white disabled:opacity-70"
                >
                  {isPending && <Loader2 className="size-4 animate-spin" />}
                  Cancel Order
                </button>
              </div>
            </RadixAlertDialog.Content>
          </RadixAlertDialog.Portal>
        </RadixAlertDialog.Root>
      )}

      {canBuyAgain(status) && (
        <Button size={buttonSize} onClick={handleBuyAgain} disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Adding...
            </>
          ) : (
            "Buy Again"
          )}
        </Button>
      )}
    </div>
  );
}
