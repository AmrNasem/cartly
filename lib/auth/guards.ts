import { redirect } from "next/navigation";
import { getSession } from "./session";
import { type Role, type Session } from "./types";
import { AuthError, ForbiddenError } from "../api/errors";

export async function requireAuth(error = false): Promise<Session> {
  const session = await getSession();

  if (!session) {
    if (error) throw new AuthError("You must login first!");
    redirect("/");
  }

  return {
    user: {
      email: session.user.email,
      id: session.user.id,
      role: session.user.role as Role,
      name: session.user.name,
      image: session.user.image ?? "",
    },
  };
}

export async function requireRole(
  allowedRoles: Role[],
  error = false,
): Promise<Session> {
  const session = await requireAuth(error);

  if (!allowedRoles.includes(session.user.role)) {
    if (error)
      throw new ForbiddenError("You're not allowed to perform this action!");
    redirect("/");
  }

  return session;
}

export async function requireAdmin(error = false): Promise<Session> {
  return requireRole(["admin", "super_admin"], error);
}

export async function requireSuperAdmin(error = false): Promise<Session> {
  return requireRole(["super_admin"], error);
}
