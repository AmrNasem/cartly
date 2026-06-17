"use client";

import { Card } from "@/components/ui/card";
import EmailInput from "../inputs/email-input";
import PasswordInput from "../inputs/password-input";
import SubmitInput from "../inputs/submit-input";
import AuthWithGoogle from "../inputs/auth-with-google";
import { handleLogin, LoginState } from "@/lib/services/user.service";
import { useActionState } from "react";
import SwitchAuth from "../inputs/switch-auth";
import FormAlert from "../inputs/form-alert";

const initialState: LoginState = {
  data: {
    email: "",
    password: "",
  },
  errors: {},
};

function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    handleLogin,
    initialState,
  );

  return (
    <Card className="bg-white rounded-2xl shadow-xl border border-zinc-200 overflow-hidden">
      <div className="p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-zinc-900 mb-2 tracking-tight">
            Welcome back
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            Enter your credentials to access your account.
          </p>
        </div>
        <AuthWithGoogle label="Sign in with Google" />
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-zinc-400 font-medium">
              Or continue with email
            </span>
          </div>
        </div>
        <form action={formAction} className="space-y-4">
          <FormAlert error={state.errors.form} />

          <EmailInput value={state.data.email} error={state.errors.email} />
          <PasswordInput
            value={state.data.password}
            error={state.errors.password}
          />

          <SubmitInput isPending={isPending}>Sign in</SubmitInput>
        </form>
      </div>
      <SwitchAuth
        hint="Don't have an account? "
        label="Create one now"
        link="/signup"
      />
    </Card>
  );
}

export default LoginForm;
