import { Toast } from "@/components/ui/toast/types";
import { createContext, useContext } from "react";

type ToastContextValue = {
  show: (toast: Omit<Toast, "id">) => void;
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
};

export const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    console.log("useToast must be used within ToastProvider")
    throw new Error("useToast must be used within ToastProvider");
  }
  return ctx;
}
