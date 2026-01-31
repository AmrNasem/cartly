import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center text-nowrap rounded-full border border-black/10 px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-muted text-foreground",
        secondary: "bg-accent text-accent-foreground",
        success: "bg-primary/10 text-primary border-primary/15",
        warning: "bg-[#f59e0b]/10 text-[#b45309] border-[#f59e0b]/20",
        destructive:
          "bg-destructive/10 text-destructive border-destructive/20",
        outline: "bg-background text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
