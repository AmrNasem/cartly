import { OrderItemDTO } from "@/lib/types/order.types";
import Image from "next/image";
import { Package } from "lucide-react";

type OrderReviewItemProps = {
  item: OrderItemDTO,
  lineSubtotal: number
};

function OrderReviewItem({ item, lineSubtotal }: OrderReviewItemProps) {
  return (
    <li
      className="flex gap-3 border border-muted rounded-lg p-2"
    >
      <figure className="relative size-16 shrink-0 overflow-hidden rounded-md bg-muted">
        {item.product.thumbnail ? (
          <Image
            src={item.product.thumbnail}
            alt={item.titleSnapshot}
            fill
            sizes="64px"
            className="object-cover"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-muted-foreground">
            <Package className="size-5" aria-hidden />
          </div>
        )}
      </figure>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-primary line-clamp-2">
          {item.titleSnapshot}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Qty: {item.quantity} × ${item.priceSnapshot.toFixed(2)}
        </p>
      </div>
      <p className="text-sm self-center font-semibold text-primary/80 shrink-0">
        ${lineSubtotal.toFixed(2)}
      </p>
    </li>
  )
}

export default OrderReviewItem
