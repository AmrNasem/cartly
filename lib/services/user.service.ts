import { signIn, signUp } from "@/lib/auth/auth-client";
import { redirect } from "next/navigation";

export type LoginState = {
  data: {
    email: string;
    password: string;
  };
  errors: {
    email?: string;
    password?: string;
    form?: string;
  };
};

export const handleLogin = async (state: LoginState, formData: FormData) => {
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";

  const errors: LoginState["errors"] = {};
  if (!email.trim()) errors.email = "Email is required";
  if (!password) errors.password = "Password is required";
  else if (password.length < 8)
    errors.password = "Password must be at least 8 characters long";

  if (Object.keys(errors).length > 0) {
    return { errors, data: { email, password } };
  }

  try {
    const res = await signIn.email({
      email,
      password,
    });
    console.log(res);
    if (res.error) throw Error(res.error.message);
  } catch (err) {
    errors.form = err instanceof Error ? err.message : "Unable to login!";
    return { errors, data: { email, password } };
  }
  redirect("/");
};

export type SignupState = LoginState & {
  data: LoginState["data"] & { name: string };
  errors: LoginState["errors"] & { name?: string };
};

export const handleSignup = async (state: SignupState, formData: FormData) => {
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";
  const name = formData.get("name")?.toString() || "";

  const errors: SignupState["errors"] = {};
  if (!name.trim()) errors.name = "Full name is required";
  else if (name.trim().length < 3)
    errors.name = "Full name must be at least 3 characters long";
  if (!email.trim()) errors.email = "Email is required";
  if (!password) errors.password = "Password is required";
  else if (password.length < 8)
    errors.password = "Password must be at least 8 characters long";

  if (Object.keys(errors).length > 0) {
    return { errors, data: { email, password, name } };
  }

  try {
    const res = await signUp.email({
      email,
      password,
      name,
      callbackURL: "/",
    });
    if (res.error) throw Error(res.error.message);
  } catch (err) {
    errors.form = err instanceof Error ? err.message : "Unable to signup!";
    return { errors, data: { email, password, name } };
  }
  redirect("/");
};
