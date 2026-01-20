"use client";

import { useActionState, useCallback, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Organization from "./organization";
import { ProductFormState } from "@/lib/types/product.types";
import { categoryDTO } from "@/lib/types/category.types";
import Media from "./media";
import Link from "next/link";
import { MAX_IMGS_ALLOWED } from "@/lib/utils/constants";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

async function createProduct(formData: FormData, callback: () => void) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/product`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.error) throw new Error(data.message);
    callback();
  } catch (err) {
    console.log("Couldn't create product: ", err);
    return {
      error: err instanceof Error ? err.message : "Couldn't create product",
    };
  }
}

export default function NewProductForm({
  categories,
  categoriesError,
}: {
  categories?: categoryDTO[];
  categoriesError: string;
}) {
  const [form, setForm] = useState<ProductFormState>({
    title: "",
    description: "",
    price: "",
    compareAtPrice: "",
    stock: "",
    lowStockThreshold: "",
    categoryId: "",
    isPublished: true,
    images: [],
  });
  
  const [touched, setTouched] = useState({images: false, title: false, price: false, categoryId: false})
  const router = useRouter();

  const hasChildren = useCallback((categoryId: string): boolean =>
    !!categories?.find((category) => category.parentId === categoryId), [categories]);

  const updateField = useCallback(
    <K extends keyof ProductFormState>(key: K, value: ProductFormState[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const touchField = useCallback((key: string) => {
    if (!(key === "categoryId" && form.categoryId && !hasChildren(form.categoryId))) return;
    setTouched(prev => ({ ...prev, [key]: true }))
  }, [
    form.categoryId, hasChildren
  ]);

  const validate = (key?: (keyof typeof touched)) => {
    const validations: Record<keyof typeof touched, boolean> = {
      title: form.title.trim().length > 2,
      price: Number(form.price) > 0,
      images: form.images.length > 0 && form.images.length <= 8,
      categoryId: !!form.categoryId.trim() && !hasChildren(form.categoryId)
    }

    return key ? validations[key] : !Object.values(validations).some(input => !input);
  }

  // const isMediaValid = form.images.length > 0 && form.images.length <= 8;
  const addImages = useCallback(
    (files: File[] | null) => {
      if (!files?.length) return;

      const newImages = files
        .filter((file) => file.type.startsWith("image"))
        .slice(0, MAX_IMGS_ALLOWED - form.images.length)
        .map((file, index) => ({
          file,
          order: form.images.length + index + 1,
        }));

      if (newImages?.length === 0) return;

      setTouched(prev => ({ ...prev, images: true }));
      setForm((prev: ProductFormState) => ({
        ...prev,
        images: [...prev.images, ...newImages],
      }));

    },
    [form.images]
  );

  const removeImage = useCallback(
    (index: number) => {
      setForm((prev: ProductFormState) => {
        const next = prev.images.filter((_, i) => i !== index);
        return {
          ...prev,
          images: next.map((image, i) => ({ ...image, order: i + 1 })),
        };
      });

    },
    []
  );

  async function handleSubmit() {
    
    setTouched(prev => Object.keys(prev).reduce((acc, key) => ({...acc, [key]: true}), prev))
    if (!validate()) return;

    const formData = new FormData();
    const { images, isPublished, ...restForm } = form;
    const entries = Object.entries(restForm);
    for (const [key, value] of entries) {
      formData.append(key, value);
    }
    formData.append("isPublished", isPublished ? "1" : "0");
    images.forEach((img) => {
      formData.append("images", img.file, img.file.name);
    });
    await createProduct(formData, () => {
      router.push("/admin/products");
    });
  }
  const [, formAction, isPending] = useActionState(handleSubmit, null);

  return (
    <form action={formAction} className="space-y-4 md:space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold">Add new product</h2>
          <p className="text-xs text-muted-foreground">
            Create a new product listing for your storefront.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant={form.isPublished ? "default" : "outline"}
            className="duration-200"
            size="sm"
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="min-w-12 animate-spin m-0" />
            ) : form.isPublished ? (
              "Publish product"
            ) : (
              "Save product"
            )}
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] lg:items-start">
        <div className="space-y-4 md:space-y-5">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">
                Basic information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium" htmlFor="title">
                  Title <span className="text-destructive">*</span>
                </label>
                <Input
                  id="title"
                  placeholder="e.g. Minimal wooden chair"
                  value={form.title}
                  className={
                    touched.title && !validate("title") ? "border-destructive bg-red-50" : ""
                  }
                  onChange={(event) => updateField("title", event.target.value)}
                  onBlur={() => touchField("title")}
                />
                <p className="text-[11px] text-muted-foreground">
                  This is the main name shown to customers.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium" htmlFor="description">
                  Description
                </label>
                <Textarea
                  id="description"
                  placeholder="Write a concise, customer-friendly description..."
                  value={form.description}
                  onChange={(event) =>
                    updateField("description", event.target.value)
                  }
                />
                <p className="text-[11px] text-muted-foreground">
                  You can include key features, materials, and care
                  instructions.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Pricing</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-medium" htmlFor="price">
                  Price <span className="text-destructive">*</span>
                </label>
                <Input
                  id="price"
                  type="number"
                  inputMode="decimal"
                  placeholder="0.00"
                  value={form.price}
                  className={
                    (touched.price && !validate("price")) ? "border-destructive bg-red-50" : ""
                  }
                  onChange={(event) => updateField("price", event.target.value)}
                  onBlur={() => touchField("price")}

                />
                <p className="text-[11px] text-muted-foreground">
                  The price customers will pay at checkout.
                </p>
              </div>

              <div className="space-y-1.5">
                <label
                  className="text-xs font-medium"
                  htmlFor="compare-at-price"
                >
                  Compare-at price
                </label>
                <Input
                  id="compare-at-price"
                  type="number"
                  inputMode="decimal"
                  placeholder="Optional"
                  value={form.compareAtPrice}
                  onChange={(event) =>
                    updateField("compareAtPrice", event.target.value)
                  }
                />
                <p className="text-[11px] text-muted-foreground">
                  Show a higher &quot;was&quot; price to highlight discounts
                  (e.g. sale pricing).
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Inventory</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-medium" htmlFor="stock">
                  Stock quantity
                </label>
                <Input
                  id="stock"
                  type="number"
                  inputMode="numeric"
                  placeholder="0"
                  value={form.stock}
                  onChange={(event) => updateField("stock", event.target.value)}
                />
                <p className="text-[11px] text-muted-foreground">
                  Current physical stock available to sell.
                </p>
              </div>

              <div className="space-y-1.5">
                <label
                  className="text-xs font-medium"
                  htmlFor="low-stock-threshold"
                >
                  Low stock threshold
                </label>
                <Input
                  id="low-stock-threshold"
                  type="number"
                  inputMode="numeric"
                  placeholder="e.g. 5"
                  value={form.lowStockThreshold}
                  onChange={(event) =>
                    updateField("lowStockThreshold", event.target.value)
                  }
                />
                <p className="text-[11px] text-muted-foreground">
                  When stock drops below this value, the product can be flagged
                  as low stock.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4 md:space-y-5">
          <Media
            images={form.images}
            addImages={addImages}
            removeImage={removeImage}
            isValid={!touched.images || validate("images")}
          />
          <Organization
            isValid={!touched.categoryId || validate("categoryId")}
            error={categoriesError}
            updateField={updateField}
            touchField={touchField}
            categories={categories}
          />

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">
                Publishing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <p className="text-xs font-medium">Published</p>
                  <p className="text-[11px] text-muted-foreground">
                    Published products appear on the storefront and can be
                    purchased.
                  </p>
                </div>
                <Switch
                  checked={form.isPublished}
                  onCheckedChange={(checked) =>
                    updateField("isPublished", checked)
                  }
                  aria-label="Toggle publish status"
                />
              </div>
              <p className="text-[11px] text-muted-foreground">
                Leave this off to keep the product as a draft. You can publish
                it later once all details are ready.
              </p>
            </CardContent>
          </Card>

          <div className="flex items-center justify-end gap-3 text-xs">
            <Link
              href="/admin/products"
              className="text-muted-foreground underline-offset-4 hover:underline"
            >
              Cancel
            </Link>
            <Button
              variant={form.isPublished ? "default" : "outline"}
              className="duration-200"
              size="sm"
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="min-w-12 animate-spin m-0" />
              ) : form.isPublished ? (
                "Publish product"
              ) : (
                "Save product"
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
