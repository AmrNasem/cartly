"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categoryDTO } from "@/lib/types/category.types";
import { ProductFormState } from "@/lib/types/product.types";
import Link from "next/link";
import { memo, useState } from "react";

function Organization({
  updateField,
  categories,
  error,
  isValid,
}: {
  updateField: <K extends keyof ProductFormState>(
    key: K,
    value: ProductFormState[K]
  ) => void;
  categories?: categoryDTO[];
  error: string;
  isValid: boolean;
}) {
  const [categoryPath, setCategoryPath] = useState([""]);
  const renderedCategories = categories
    ? categoryPath
        .map((route) =>
          categories.filter((category) => (category.parentId || "") === route)
        )
        .filter((rdrdCat) => rdrdCat.length > 0)
    : [];

  return (
    <Card className={!isValid ? "border-destructive bg-red-50" : ""}>
      <CardHeader>
        <CardTitle className="text-sm font-semibold">Organization</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-1.5">
          <label className="text-xs font-medium" htmlFor="category">
            Category
          </label>
          {error ? (
            <p className="text-destructive text-[12px]">{error}</p>
          ) : renderedCategories ? (
            renderedCategories.length > 0 ? (
              renderedCategories.map((rdrdCat, index) => (
                <Select
                  key={index}
                  value={categoryPath[index + 1] || ""}
                  onValueChange={(value) => {
                    setCategoryPath((prev) => {
                      const newPath = prev.slice(0, index + 1);
                      newPath.push(value);
                      return newPath;
                    });
                    updateField("categoryId", value);
                  }}
                >
                  <SelectTrigger id="category">
                    <SelectValue
                      placeholder={
                        index ? "Select a subcategory" : "Select a category"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {rdrdCat.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ))
            ) : (
              <p>
                No categories!{" "}
                <Link href="/admin/categories" className="btn-primary">
                  Add Category
                </Link>
              </p>
            )
          ) : (
            <span className="w-full block h-7 bg-muted rounded-md my-1 animate-pulse"></span>
          )}
          <p className="text-[11px] text-muted-foreground">
            This helps customers discover the product while browsing.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(Organization);
