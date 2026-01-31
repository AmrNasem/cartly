"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitives.Root>) {
  return (
    <SwitchPrimitives.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full duration-150 border border-black/10 bg-muted transition-colors data-[state=checked]:bg-primary/90",
        className
      )}
      {...props}
    >
      <SwitchPrimitives.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block h-[14px] w-[14px] translate-x-0 rounded-full bg-background shadow-sm ring-0 transition-transform data-[state=checked]:translate-x-4 relative start-0.5 top-0"
      />
    </SwitchPrimitives.Root>
  );
}

export { Switch };
