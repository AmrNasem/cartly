import Link from "next/link";

function SwitchAuth({
  hint,
  label,
  link,
}: {
  hint: string;
  label: string;
  link: string;
}) {
  return (
    <div className="bg-zinc-50 p-6 border-t border-zinc-200 text-center">
      <p className="text-sm text-zinc-600">
        {hint}
        <Link
          href={link}
          className="text-primary font-medium hover:underline hover:text-primary transition-colors"
        >
          {label}
        </Link>
      </p>
    </div>
  );
}

export default SwitchAuth;
