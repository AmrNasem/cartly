"use client";

import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import { Loader2 } from "lucide-react";

export default function AlertDialog({
  onConfirm,
  children,
  description,
  loading
}: {
  onConfirm: () => void;
  children: React.ReactNode;
  description: string;
  loading?: boolean;
}) {
  return (
    <RadixAlertDialog.Root>
      <RadixAlertDialog.Trigger asChild>
        {children}
      </RadixAlertDialog.Trigger>

      <RadixAlertDialog.Portal>
        <RadixAlertDialog.Overlay
          className="
            fixed inset-0 z-50 bg-black/50
            data-[state=closed]:animate-fade-out
            data-[state=open]:animate-fade-in
          "
        />

        <RadixAlertDialog.Content
          className="
            fixed left-1/2 top-1/2 z-50 w-full max-w-lg
            -translate-x-1/2 -translate-y-1/2
            rounded-lg bg-background p-6 shadow-lg
            data-[state=open]:animate-in
            data-[state=closed]:animate-out
            data-[state=closed]:animate-fade-out
            data-[state=open]:animate-fade-in

            "
        >
          <RadixAlertDialog.Title className="text-lg font-semibold text-foreground">
            Are you absolutely sure?
          </RadixAlertDialog.Title>

          <RadixAlertDialog.Description className="mt-2 text-sm text-muted-foreground">
            {description}
          </RadixAlertDialog.Description>

          <div className="mt-6 flex justify-end gap-2">
            <RadixAlertDialog.Cancel
              className="rounded-md cursor-pointer duration-150 px-4 py-2 text-sm font-medium"
            >
              Cancel
            </RadixAlertDialog.Cancel>

            <button
              onClick={onConfirm}
              disabled={loading}
              className="flex gap-1 items-center text-white duration-150 rounded-md bg-red-600/90 disabled:opacity-70 cursor-pointer px-4 py-2 text-sm font-medium
                enabled:hover:bg-red-600
              "
            >
              {loading && <Loader2 className="size-4 animate-spin" />}
              <span>Delete</span>
            </button>
          </div>
        </RadixAlertDialog.Content>
      </RadixAlertDialog.Portal>
    </RadixAlertDialog.Root>
  );
}
