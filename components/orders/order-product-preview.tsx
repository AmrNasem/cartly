import { OrderListItemDTO } from "@/lib/types/order.types";
import { OrderItemThumbnail } from "./order-item-thumbnail";

type OrderProductPreviewProps = {
  previewItems: OrderListItemDTO["previewItems"];
  itemCount: number;
  extraProductCount: number;
};

export function OrderProductPreview({
  previewItems,
  itemCount,
  extraProductCount,
}: OrderProductPreviewProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2">
        {previewItems.map((item, index) => (
          <figure
            key={`${item.title}-${index}`}
            className="relative size-12 overflow-hidden rounded-md border-2 border-background bg-muted"
          >
            <OrderItemThumbnail
              src={item.thumbnail}
              alt={item.title}
              className="size-12"
            />
          </figure>
        ))}
        {extraProductCount > 0 && (
          <div className="relative z-10 flex size-12 items-center justify-center rounded-md border-2 border-background bg-muted text-xs font-semibold text-muted-foreground">
            +{extraProductCount} more
          </div>
        )}
      </div>
      <p className="text-sm text-muted-foreground">
        {itemCount} item{itemCount === 1 ? "" : "s"}
      </p>
    </div>
  );
}
