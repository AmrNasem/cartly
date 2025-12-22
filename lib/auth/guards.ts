import { redirect } from "next/navigation";
import { getSession } from "./session";
import type { Role, Session } from "./types";

export async function requireAuth(): Promise<Session> {
  const session = await getSession();

  if (!session) redirect("/login");

  return session;
}

export async function requireRole(allowedRoles: Role[]): Promise<Session> {
  const session = await requireAuth();

  if (!allowedRoles.includes(session.user.role)) redirect("/");

  return session;
}

export async function requireAdmin(): Promise<Session> {
  return requireRole(["admin", "super_admin"]);
}

export async function requireSuperAdmin(): Promise<Session> {
  return requireRole(["super_admin"]);
}
