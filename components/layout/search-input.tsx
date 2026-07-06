"use client";

import { buildShopUrl } from "@/lib/utils/shop-url";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

function SearchInput() {
  const router = useRouter();

  const handleSubmit = (formdata: FormData) => {
    router.push(buildShopUrl({ search: String(formdata.get("search") ?? "") }));
  };
  return (
    <form
      action={handleSubmit}
      className="basis-1/2 rounded-full text-sm text-muted-foreground flex gap-1 bg-muted/40 py-1 px-2 border border-muted ring ring-muted has-[input#search:focus]:ring-primary/80 duration-200"
    >
      <button aria-label="Search Products" className="p-px">
        <Search className="size-4" />
      </button>
      <input
        type="text"
        name="search"
        id="search"
        className="w-full p-1 outline-none"
        placeholder="Search products..."
      />
    </form>
  );
}

export default SearchInput;
