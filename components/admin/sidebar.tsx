"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { adminNavItems } from "./nav-items";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full flex-col border-r border-black/5 bg-background/80 px-3 py-4">
      <Link href="/admin" className="mb-4 flex items-center gap-2 px-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-xs font-semibold text-white">
          C
        </span>
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold">Cartly</span>
          <span className="text-[11px] text-muted-foreground">Admin</span>
        </div>
      </Link>

      <nav className="flex-1 space-y-1">
        {adminNavItems.slice(0, -1).map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                isActive && "bg-primary/5 text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-2 space-y-1">
        <Separator className="mb-1" />
        {adminNavItems.slice(-1).map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-destructive/90 transition-colors hover:bg-destructive/5",
                isActive && "bg-destructive/10"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

