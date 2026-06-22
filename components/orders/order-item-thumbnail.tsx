import Image from "next/image";
import { Package } from "lucide-react";
import { cn } from "@/lib/utils";

type OrderItemThumbnailProps = {
  src?: string;
  alt: string;
  className?: string;
};

export function OrderItemThumbnail({
  src,
  alt,
  className,
}: OrderItemThumbnailProps) {
  if (!src) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-muted text-muted-foreground",
          className,
        )}
        aria-hidden
      >
        <Package className="size-5" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="64px"
      className="object-cover"
    />
  );
}
