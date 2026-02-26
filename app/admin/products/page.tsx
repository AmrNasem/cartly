import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";
import Link from "next/link";
import { fetchProducts } from "@/actions/product.action";
import { Edit } from "lucide-react";
import DeleteProduct from "@/components/admin/products/delete-product";
import { getProductStatusVariant } from "@/lib/product/product.utils";

export const metadata: Metadata = {
  title: "Manage Products",
};

export default async function ProductsPage() {
  const { products, meta } = await fetchProducts();

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold">Products</h2>
          <p className="text-xs text-muted-foreground">
            Manage your catalog, pricing, and availability.
          </p>
        </div>
        <Link
          className="group font-semibold self-center text-[12px] py-1 px-2 cursor-pointer rounded-md text-white bg-primary duration-150 hover:bg-primary/90"
          href="/admin/products/new"
        >
          Add product
        </Link>
      </div>

      {
        products?.length > 0 ?
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-semibold">Product list</CardTitle>
          <span className="text-xs text-muted-foreground">
            {meta.total} products
          </span>
        </CardHeader>
        <CardContent className="pt-3 max-h-dvh">
          <Table className="">
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-center">Stock</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => {
                const stock = getProductStatusVariant(product.stock, product.lowStockThreshold)
                return (
                  <TableRow key={product._id.toString()}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 min-w-10 overflow-hidden rounded-md bg-muted">
                          <Image
                            src={product.images[0]?.url || ""}
                            alt={product.title}
                            fill
                            sizes="40px"
                            className="object-cover w-full block"
                          />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-sm font-medium line-clamp-2">{product.title}</p>
                          <p className="text-[11px] text-muted-foreground line-clamp-1 max-w-3/4" title={product.description}>
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{product.price}$</span>
                        {
                          product.compareAtPrice && product.compareAtPrice > product.price &&
                          <span className="text-[12px] line-through text-muted-foreground">{product.compareAtPrice}$</span>
                        }
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={stock.variant} className="block mx-auto w-fit text-nowrap">
                        {stock.text}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className={`font-semibold text-center block ${product.isPublished ? "text-emerald-600" : "text-muted-foreground"}`}>{product.isPublished ? "Published" : "Draft"}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 items-center">
                        <Link href="/admin/product/edit" className="px-2 py-1 text-emerald-700 cursor-pointer duration-150 hover:bg-emerald-50"><Edit className="size-4" /></Link>
                        <DeleteProduct productId={product._id.toString()} />
                      </div>
                    </TableCell>
                  </TableRow>
                )
              }
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
:
<p className="rounded md p-2 border border-primary bg-primary/5 my-8 text-primary mx-auto text-center text-[13px] font-semibold">No Products!</p>
}
</div>
  );
}
