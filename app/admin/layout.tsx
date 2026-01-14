import { requireAdmin } from "@/lib/auth/guards";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Admin - %s",
};

async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  await requireAdmin();
  return <>{children}</>;
}

export default Layout;
