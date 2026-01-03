import { Menu, Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";

const links = [
  {
    title: "Home",
    href: "/home",
  },
  {
    title: "Categories",
    href: "/categories",
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

function Navbar() {
  return (
    <nav className="p-3 border-b border-gray-200 sticky top-0 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex justify-between gap-2 items-center">
        <div className="flex gap-2 items-center">
          <button className="md:hidden hover:bg-[#e9ebef] p-1 rounded-md duration-150 cursor-pointer">
            <Menu className="size-5" />
          </button>
          <Link href="/" className="flex gap-1 items-center">
            <span className="w-7 h-7 rounded-lg bg-gray-900 text-white flex justify-center items-center">
              C
            </span>
            <h4>Cartly</h4>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-[#0a0a0a] duration-150 text-[#717182] text-sm"
            >
              {link.title}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <form
            action=""
            className="text-sm hidden sm:flex gap-1 bg-[#ececf0] p-1 rounded-md has-[input#search:focus]:ring-2 ring-[#a1a1a15e] border border-transparent has-[input#search:focus]:border-[#a1a1a1] duration-200"
          >
            <button className="p-px">
              <Search className="size-5" />
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
            <Search className="size-5" />
          </button>
          <button className=" hover:bg-[#e9ebef] p-1 rounded-md duration-150 cursor-pointer">
            <User className="size-5" />
          </button>
          <button className=" hover:bg-[#e9ebef] p-1 rounded-md duration-150 cursor-pointer">
            <ShoppingCart className="size-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
