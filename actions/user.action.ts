"use server";

import { signIn, signUp } from "@/lib/auth/auth-client";
import { redirect } from "next/navigation";

export const handleLogin = async (error: string, formData: FormData) => {
  try {
    const res = await signIn.email({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });
    if (res.error) throw Error(res.error.message);
  } catch (err) {
    return err instanceof Error ? err.message : "Unable to login!";
  }
  redirect("/");
};

export const handleSignup = async (error: string, formData: FormData) => {
  try {
    const res = await signUp.email({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      name: formData.get("name") as string,
      callbackURL: "/",
    });
    if (res.error) throw Error(res.error.message);
  } catch (err) {
    return err instanceof Error ? err.message : "Unable to signup!";
  }
  redirect("/");
};
  