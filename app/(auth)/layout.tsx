import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-muted/30 to-muted/10 p-4">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
