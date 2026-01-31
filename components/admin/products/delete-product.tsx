"use client";

import AlertDialog from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useTransition } from "react";

async function deleteProduct(productId: string) {
  try {
    const res = await fetch(`/api/product/${productId}`, {
      method: "DELETE"
    });
    const data = await res.json();
    if (data.error) throw new Error(data.message);
    return { error: false, message: data.message };
  } catch (err) {
    console.log(err);
    return { error: true, message: err instanceof Error ? err.message : "Something went wrong!" }
  }
}

function DeleteProduct({ productId }: { productId: string; }) {
  const { error, success } = useToast();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDeleteProduct = useCallback(() => {
    startTransition(async () => {
      const res = await deleteProduct(productId);
      if (res.error) {
        error(res.message)
        return;
      }
      success(res.message);
      router.refresh();
    })
  }, [success, error, productId, router])
  // - Should services import models?
  // - Confirm doesn't wait for spinner
  // - motion for deleting product
  return (
    <>
      <AlertDialog loading={isPending} onConfirm={handleDeleteProduct} description="This action cannot be undone. This will permanently delete the product.">
        <button className="px-2 py-1 text-destructive cursor-pointer duration-150 hover:bg-red-50"><Trash className="size-4" /></button>
      </AlertDialog>
    </>

  )
}

export default DeleteProduct