"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetClose = DialogPrimitive.Close;
const SheetPortal = DialogPrimitive.Portal;

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/30 backdrop-blur-sm",
        className
      )}
      {...props}
    />
  );
}

function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  side?: "top" | "bottom" | "left" | "right";
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <DialogPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          "fixed z-50 gap-4 bg-background p-4 shadow-lg outline-none transition-transform duration-200 ease-out",
          side === "right" &&
            "inset-y-0 right-0 h-full w-80 border-l border-black/10 data-[state=closed]:translate-x-full data-[state=open]:translate-x-0",
          side === "left" &&
            "inset-y-0 left-0 h-full w-80 border-r border-black/10 data-[state=closed]:-translate-x-full data-[state=open]:translate-x-0",
          side === "top" &&
            "inset-x-0 top-0 w-full border-b border-black/10 data-[state=closed]:-translate-y-full data-[state=open]:translate-y-0",
          side === "bottom" &&
            "inset-x-0 bottom-0 w-full border-t border-black/10 data-[state=closed]:translate-y-full data-[state=open]:translate-y-0",
          className
        )}
        {...props}
      >
        {children}
        <SheetClose className="absolute right-3 top-3 rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20">
          <X className="size-4" />
          <span className="sr-only">Close</span>
        </SheetClose>
      </DialogPrimitive.Content>
    </SheetPortal>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 text-left", className)}
      {...props}
    />
  );
}

function SheetTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="sheet-title"
      className={cn("text-base font-semibold leading-none", className)}
      {...props}
    />
  );
}

function SheetDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="sheet-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetPortal,
  SheetOverlay,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
};

