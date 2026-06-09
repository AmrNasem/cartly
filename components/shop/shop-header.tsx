type ShopHeaderProps = {
  title: string;
  total: number;
  search?: string;
  categoryName?: string;
};

function ShopHeader({ title, total, search, categoryName }: ShopHeaderProps) {
  const filterParts: string[] = [];

  if (categoryName) filterParts.push(categoryName);
  if (search) filterParts.push(`"${search}"`);

  return (
    <header className="mb-6 space-y-1">
      <h1 className="text-foreground text-3xl font-semibold">{title}</h1>
      <p className="text-muted-foreground text-sm">
        {filterParts.length > 0 ? (
          <>
            Showing {total} {total === 1 ? "product" : "products"} for{" "}
            {filterParts.join(" · ")}
          </>
        ) : (
          <>
            Browse our full catalog · {total}{" "}
            {total === 1 ? "product" : "products"}
          </>
        )}
      </p>
    </header>
  );
}

export default ShopHeader;
