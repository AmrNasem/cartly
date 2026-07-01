import { headers } from "next/headers";
import { auth } from "./auth";

export async function getSession() {
  return await auth.api.getSession({
    headers: await headers(),
  });
}

// export type Session = typeof getSession extends () => Promise<infer U> ? U : never;
export type Session = Awaited<ReturnType<typeof getSession>>
export type AuthUser = NonNullable<Session>["user"];