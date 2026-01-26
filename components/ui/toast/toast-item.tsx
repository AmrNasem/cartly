"use client";

import * as Toast from "@radix-ui/react-toast";
import { CircleAlert, CircleCheck, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";
import { ToastVariant, Toast as ToastType } from "./types";

const variantStyles: Record<ToastVariant, string> = {
  success: "border-green-500/20 bg-green-50 text-green-800",
  error: "border-red-500/20 bg-red-50 text-red-800",
  info: "border-blue-500/20 bg-blue-50 text-blue-800",
};

const icons: Record<ToastVariant, React.ReactNode> = {
  success: <CircleCheck className="mt-0.5 size-4 text-emerald-800" />,
  error: <CircleAlert className="mt-0.5 size-4 text-red-800" />,
  info: <Info className="mt-0.5 size-4 text-blue-800" />,
}

// type ToastItemProps = {
//   title: string;
//   description?: string;
//   variant?: ToastVariant;
//   duration?: number;
// };

export function ToastItem({
  title,
  description,
  variant = "info",
  duration,
  onOpenChange
}: ToastType & {onOpenChange: (open: boolean) => void}) {
  return (
    <Toast.Root
      duration={duration}
      onOpenChange={onOpenChange}
      className={cn(
        "group pointer-events-auto relative flex w-full max-w-sm gap-4 rounded-lg border p-4 pr-6 shadow-lg",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-80 data-[state=open]:slide-in-from-bottom-full",
        variantStyles[variant]
      )}
    >
      <div className="flex gap-1">
        {icons[variant]}
        <div className="flex flex-col gap-1">
          <Toast.Title className="text-sm font-semibold">
            {title}
          </Toast.Title>

          {description && (
            <Toast.Description className="text-sm opacity-90">
              {description}
            </Toast.Description>
          )}
        </div>
      </div>

      <Toast.Close
        className="
          absolute right-2 top-2 rounded-md p-1 opacity-0
          transition-opacity group-hover:opacity-100
          focus:opacity-100 focus:outline-none
        "
      >
        <X className="h-4 w-4" />
      </Toast.Close>
    </Toast.Root>
  );
}
