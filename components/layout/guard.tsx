import { getSession } from "@/lib/auth/session";
import React from "react";

type Role = "user" | "admin" | "super_admin";

async function Guard({
  children,
  roles = ["user"],
  fallback = null,
}: {
  children: React.ReactNode;
  roles: Role[];
  fallback?: React.ReactNode;
}) {
  const session = await getSession();
  if (!session || !roles.includes(session?.user.role)) return fallback;

  return <>{children}</>;
}

export default Guard;
