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

export type ActionResponse<T = void> =
  | {
      success: true;
      message?: string;
      payload?: T;
    }
  | {
      success: false;
      message: string;
      errors?: Record<string, string[]>;
    };

export const unAuthorizedError = "You must login first!";

export function getUnAuthorizedActionResponse<T>(): ActionResponse<T> {
  return { success: false, message: unAuthorizedError };
}
