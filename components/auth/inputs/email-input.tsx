import { Mail } from "lucide-react";
import { FormField } from "../../admin/coupons/form-field";

function EmailInput({ error, value }: { error?: string; value: string }) {
  return (
    <FormField label="Email Address" id="email" error={error} required>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-focus-within:text-primary text-zinc-400">
          <Mail className="h-5 w-5" />
        </div>
        <input
          type="email"
          name="email"
          defaultValue={value}
          placeholder="you@example.com"
          className="block w-full pl-10 h-11 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring focus:ring-primary focus:border-primary transition-all text-zinc-900 placeholder:text-zinc-400 outline-none"
          autoComplete="email"
        />
      </div>
    </FormField>
  );
}

export default EmailInput;
