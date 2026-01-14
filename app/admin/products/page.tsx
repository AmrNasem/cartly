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

export const metadata: Metadata = {
  title: "Manage Products",
};

const products = [
  {
    id: "P-1001",
    name: "Minimal Chair",
    price: "$129.00",
    stock: 34,
    status: "Active",
    image: "/images/collection.jpeg",
  },
  {
    id: "P-1002",
    name: "Soft Cotton Hoodie",
    price: "$89.00",
    stock: 12,
    status: "Low stock",
    image: "/images/collection.jpeg",
  },
  {
    id: "P-1003",
    name: "Wireless Earbuds",
    price: "$149.00",
    stock: 0,
    status: "Out of stock",
    image: "/images/collection.jpeg",
  },
];

function getProductStatusVariant(status: string) {
  switch (status) {
    case "Active":
      return "success" as const;
    case "Low stock":
      return "warning" as const;
    case "Out of stock":
      return "destructive" as const;
    default:
      return "default" as const;
  }
}

export default function ProductsPage() {
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

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-semibold">Product list</CardTitle>
          <span className="text-xs text-muted-foreground">
            {/* TODO: Replace with real product count */}
            {products.length} products
          </span>
        </CardHeader>
        <CardContent className="pt-3">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 overflow-hidden rounded-md bg-muted">
                        {/* TODO: Replace with real product thumbnails */}
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">{product.name}</p>
                        <p className="text-[11px] text-muted-foreground">
                          {product.id}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    <span className="text-xs text-muted-foreground">
                      {product.stock} in stock
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getProductStatusVariant(product.status)}>
                      {product.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
