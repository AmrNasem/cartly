import { Menu, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AdminSidebar } from "./sidebar";
import { AuthUser } from "@/lib/auth/types";
import Link from "next/link";
import LogoutButton from "../auth/logout-button";
import AdminPageTitle from "./admin-page-title";

export function AdminHeader({ user }: { user: AuthUser }) {
  return (
    <header className="sticky top-0 z-30 border-b border-black/5 bg-background/80 backdrop-blur">
      <div className="mycontainer flex items-center gap-3 py-3">
        <div className="flex flex-1 items-center gap-2">
          <div className="flex items-center gap-2 lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 border border-black/5 bg-muted/60"
                >
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Toggle navigation</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0">
                <SheetHeader className="px-3 py-3">
                  <SheetTitle className="text-sm text-muted-foreground">
                    Admin navigation
                  </SheetTitle>
                </SheetHeader>
                <AdminSidebar />
              </SheetContent>
            </Sheet>
          </div>
          <div>
            <AdminPageTitle />
            <p className="text-xs text-muted-foreground">
              Manage your store and keep everything in sync.
            </p>
          </div>
        </div>

        <div className="hidden flex-1 items-center justify-center md:flex">
          <div className="w-full max-w-sm">
            <div className="flex items-center gap-2 rounded-md border border-black/5 bg-muted/60 px-2 py-1.5 text-sm text-muted-foreground">
              <Search className="h-4 w-4" />
              <Input
                placeholder="Search orders, products, customers..."
                className="h-7 border-none bg-transparent px-0 text-xs shadow-none focus-visible:ring-0"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 rounded-full border border-black/5 px-1.5"
              >
                <Avatar className="h-7 w-7">
                  {/* TODO: Replace fallback with real admin avatar initials or image */}
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .slice(0, 2)
                      .map((name) => name[0].toUpperCase())}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden text-xs font-medium md:inline">
                  {user.name}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="flex flex-col">
                <span className="text-xs font-medium">{user.name}</span>
                <span className="text-[11px] text-muted-foreground">
                  {user.email}
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/">
                <DropdownMenuItem className="text-xs font-semibold">
                  View storefront
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem className="text-xs">
                Account settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <LogoutButton callbackURL="/" className="block w-full">
                <DropdownMenuItem className="text-xs text-destructive focus:bg-destructive/10">
                  Logout
                </DropdownMenuItem>
              </LogoutButton>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
