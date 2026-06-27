import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  description?: string;
  className?: string;
  align?: "center" | "left";
};

function SectionHeading({
  title,
  description,
  className,
  align = "center",
}: SectionHeadingProps) {
  return (
    <header
      className={cn(
        "mb-8",
        align === "center" ? "text-center" : "text-start",
        className,
      )}
    >
      <h2 className="text-foreground text-2xl md:text-3xl font-semibold mb-2">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-muted-foreground text-sm md:text-base max-w-2xl",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </header>
  );
}

export default SectionHeading;
