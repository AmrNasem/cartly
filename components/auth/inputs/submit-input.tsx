import { ArrowRight, Loader2 } from "lucide-react";

function SubmitInput({ isPending, children }: { isPending: boolean; children: React.ReactNode }) {
  return (
    <button
      type="submit"
      disabled={isPending}
      className="cursor-pointer w-full h-11 bg-primary hover:bg-primary text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed mt-6 group"
    >
      {isPending ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <>
          {children}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </>
      )}
    </button>
  );
}

export default SubmitInput;
