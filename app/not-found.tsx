import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-muted/40 via-background to-muted/20 px-4">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 start-1/4 size-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 end-1/4 size-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-md">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-primary/20 leading-none">
            404
          </h1>
        </div>

        {/* Text content */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
            Page Not Found
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Oops! The page you&apos;re looking for doesn&apos;t exist. It might
            have been moved or deleted.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg" className="font-semibold group">
            <Link href="/" className="flex items-center gap-2">
              <Home className="size-4" />
              Back to Home
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="font-semibold group"
          >
            <Link href="/shop" className="flex items-center gap-2">
              <ArrowLeft className="size-4 group-hover:-translate-x-1 duration-150" />
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
