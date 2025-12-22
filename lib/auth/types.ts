export type Role = "user" | "admin" | "super_admin";

export interface AuthUser {
  id: string;
  email: string;
  role: Role;
}

export interface Session {
  user: AuthUser;
}
