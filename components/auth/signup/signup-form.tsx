"use client";

import { useActionState } from "react";
import { handleSignup, SignupState } from "@/lib/services/user.service";
import AuthWithGoogle from "@/components/auth/inputs/auth-with-google";
import EmailInput from "@/components/auth/inputs/email-input";
import PasswordInput from "@/components/auth/inputs/password-input";
import SubmitInput from "@/components/auth/inputs/submit-input";
import SwitchAuth from "@/components/auth/inputs/switch-auth";
import UsernameInput from "@/components/auth/inputs/username-input";
import FormAlert from "@/components/auth/inputs/form-alert";

const initialState: SignupState = {
  data: {
    email: "",
    password: "",
    name: "",
  },
  errors: {},
};

export default function SignupForm() {
  const [state, formAction, isPending] = useActionState(
    handleSignup,
    initialState,
  );

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-zinc-200 overflow-hidden">
      <div className="p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-zinc-900 mb-2 tracking-tight">
            Create an account
          </h1>
          <p className="text-zinc-500">
            Join thousands of users shopping smarter today.
          </p>
        </div>
        <AuthWithGoogle label="Sign up with Google" />
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
          <UsernameInput value={state.data.name} error={state.errors.name} />
          <EmailInput value={state.data.email} error={state.errors.email} />
          <PasswordInput
            value={state.data.password}
            error={state.errors.password}
          />
          <SubmitInput isPending={isPending}>Create Account</SubmitInput>
        </form>
      </div>

      <SwitchAuth
        hint="Already have an account? "
        label="Sign in"
        link="/login"
      />
    </div>
  );
}
