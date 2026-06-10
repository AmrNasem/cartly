type ShopHeaderProps = {
  title: string;
  total: number;
};

function ShopHeader({ title, total }: ShopHeaderProps) {
  return (
    <header className="space-y-1">
      <h1 className="text-foreground text-3xl font-semibold">{title}</h1>
      <p className="text-muted-foreground text-sm">
        {total} {total === 1 ? "product" : "products"}
      </p>
    </header>
  );
}

export default ShopHeader;
