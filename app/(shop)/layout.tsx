import HydrateCart from "@/components/cart/hydrate-cart";
import Navbar from "@/components/layout/Navbar";
import { getSession } from "@/lib/auth/session";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: {
    default: "Homepage",
    template: "%s | Cartly"
  },
};

async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession();
  return (
    <>
      <HydrateCart />
      <Navbar user={session?.user ?? null} />
      {children}
    </>
  );
}

export default Layout;
