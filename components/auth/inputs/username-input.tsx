import { FormField } from "@/components/admin/coupons/form-field";
import { User } from "lucide-react";

function UsernameInput({ error, value }: { error?: string; value: string }) {
  return (
    <FormField id="username" label="Full Name" error={error} required>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-focus-within:text-primary text-zinc-400">
          <User className="h-5 w-5" />
        </div>
        <input
          type="text"
          name="name"
          defaultValue={value}
          placeholder="John Doe"
          className="block w-full pl-10 h-11 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring focus:ring-primary focus:border-primary transition-all text-zinc-900 placeholder:text-zinc-400 outline-none"
          autoComplete="name"
        />
      </div>
    </FormField>
  );
}

export default UsernameInput;
