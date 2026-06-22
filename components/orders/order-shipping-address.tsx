import { OrderDetailDTO } from "@/lib/types/order.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type OrderShippingAddressProps = {
  address: OrderDetailDTO["shippingAddress"];
};

export function OrderShippingAddress({ address }: OrderShippingAddressProps) {
  return (
    <Card className="border-muted shadow-md">
      <CardHeader>
        <CardTitle className="text-primary">Shipping Address</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1 text-sm">
        <p className="font-medium text-foreground">{address.fullName}</p>
        <p className="text-muted-foreground">{address.phone}</p>
        <p className="text-muted-foreground">{address.street}</p>
        <p className="text-muted-foreground">
          {address.city}
          {address.postalCode ? `, ${address.postalCode}` : ""}
        </p>
      </CardContent>
    </Card>
  );
}
