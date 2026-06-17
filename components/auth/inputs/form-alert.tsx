import { AlertCircle } from "lucide-react";

function FormAlert({ error }: { error?: string }) {
  return error ? (
    <div className="p-3 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3">
      <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
      <p className="text-sm text-red-600">{error}</p>
    </div>
  ) : null;
}

export default FormAlert;
