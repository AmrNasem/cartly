import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function OrdersEmpty() {
  return (
    <Card className="border-muted shadow-md">
      <CardContent className="flex flex-col items-center justify-center gap-4 py-14 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <ShoppingBag className="size-8" aria-hidden />
        </div>
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-primary">
            You haven&apos;t placed any orders yet.
          </h2>
          <p className="max-w-sm text-sm text-muted-foreground">
            When you make a purchase, your orders will appear here so you can
            track them and buy your favorites again.
          </p>
        </div>
        <Button asChild>
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
