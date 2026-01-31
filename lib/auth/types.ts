export type Role = "user" | "admin" | "super_admin";

export interface AuthUser {
  id: string;
  email: string;
  role: Role;
  name: string;
  image: string;
}

export interface Session {
  user: AuthUser;
}
