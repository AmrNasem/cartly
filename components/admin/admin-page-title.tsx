"use client";

import { usePathname } from "next/navigation";
import { adminNavItems } from "./nav-items";

function getPageTitle(pathname: string) {
  const item = adminNavItems.find((item) =>
    item.href === "/admin"
      ? pathname === "/admin"
      : pathname.startsWith(item.href)
  );
  return item?.label ?? "Dashboard";
}

function AdminPageTitle() {
  const pathname = usePathname();
  const title = getPageTitle(pathname);
  return <h1 className="text-lg font-semibold">{title}</h1>;
}

export default AdminPageTitle;
