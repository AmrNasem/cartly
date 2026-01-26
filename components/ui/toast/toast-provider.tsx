"use client";

import * as ToastPrimitive from "@radix-ui/react-toast";
import { useCallback, useState } from "react";
import { Toast } from "./types";
import { ToastItem } from "./toast-item";
import { v4 as uuid } from "uuid"
import { ToastContext } from "@/hooks/use-toast";

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const show = useCallback((toast: Omit<Toast, "id">) => {
    setToasts((prev) => [
      ...prev,
      { id: uuid(), duration: 4000, ...toast },
    ]);
  }, []);

  const success = (title: string, description?: string) =>
    show({ title, description, variant: "success" });

  const error = (title: string, description?: string) =>
    show({ title, description, variant: "error" });

  const info = (title: string, description?: string) =>
    show({ title, description, variant: "info" });

  const remove = (id: string) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ show, success, error, info }}>
      <ToastPrimitive.Provider swipeDirection="right">
        {children}
        {toasts.map((toast) => (
          <ToastItem key={toast.id}
            onOpenChange={(open: boolean) => !open && remove(toast.id)}
            {...toast} />
        ))}
        <ToastPrimitive.Viewport className="fixed bottom-4 right-4 z-50 flex w-[360px] max-w-full flex-col gap-2 outline-none" />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
}