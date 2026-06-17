import { AuthUser } from "@/lib/auth/types";
import { Menu, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Guard from "./guard";
import LogoutButton from "../auth/logout-button";
import CartPageNavigator from "../cart/cart-page-navigator";
import Image from "next/image";

const links = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Shop",
    href: "/shop",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

function Navbar({ user }: { user: AuthUser | null }) {
  console.log(user);

  return (
    <header className="py-3 border-b z-100 border-gray-200 sticky top-0 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <nav className="mycontainer mx-auto flex justify-between gap-2 items-center">
        <div className="flex gap-2 items-center">
          <button className="md:hidden hover:bg-[#e9ebef] p-1 rounded-md duration-150 cursor-pointer">
            <Menu className="size-4" />
          </button>
          <Link href="/" className="flex gap-1 items-center">
            <Image src="/logo.png" alt="Cartly" width={32} height={32} />
            <h4 className="font-semibold">Cartly</h4>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-foreground duration-150 text-muted-foreground text-sm"
            >
              {link.title}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <form
            action="/shop"
            method="GET"
            className="text-sm hidden text-muted-foreground sm:flex gap-1 bg-[#ececf0] p-1 rounded-md has-[input#search:focus]:ring-2 ring-[#a1a1a15e] border border-transparent has-[input#search:focus]:border-[#a1a1a1] duration-200"
          >
            <button className="p-px">
              <Search className="size-4" />
            </button>
            <input
              type="text"
              name="search"
              id="search"
              className="p-1 outline-none"
              placeholder="Search products..."
            />
          </form>
          <button className="sm:hidden hover:bg-[#e9ebef] p-1 rounded-md duration-150 cursor-pointer">
            <Search className="size-4 text-foreground" />
          </button>

          <CartPageNavigator />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full border border-black/5 p-0 flex items-center justify-center"
                >
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .slice(0, 2)
                        .map((name) => name[0].toUpperCase())}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="z-100">
                <DropdownMenuLabel className="flex flex-col">
                  <span className="text-xs font-medium">{user.name}</span>
                  <span className="text-[11px] text-muted-foreground">
                    {user.email}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Guard roles={["admin", "super_admin"]}>
                  <Link href="/admin" className="font-semibold">
                    <DropdownMenuItem className="text-xs">
                      Admin View
                    </DropdownMenuItem>
                  </Link>
                </Guard>
                <DropdownMenuItem className="text-xs">
                  Account settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <LogoutButton className="block w-full">
                  <DropdownMenuItem className="text-xs text-destructive focus:bg-destructive/10">
                    Logout
                  </DropdownMenuItem>
                </LogoutButton>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/login"
              className="group font-semibold text-[12px] py-1 px-2 cursor-pointer rounded-md text-white bg-primary duration-150 hover:bg-primary/85"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
