import { requireAdmin } from "@/lib/auth/guards";
import React from "react";
import { AdminShell } from "@/components/admin/admin-shell";

async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await requireAdmin();
  console.log(session);
  return <AdminShell user={session.user}>{children}</AdminShell>;
}

export default Layout;
