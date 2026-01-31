import { ReactNode } from "react";

import { AdminSidebar } from "./sidebar";
import { AdminHeader } from "./header";
import { AuthUser } from "@/lib/auth/types";

export function AdminShell({ children, user }: { children: ReactNode, user: AuthUser }) {
  return (
    <div className="min-h-screen bg-muted/20">
      <div className="flex min-h-screen flex-col lg:grid lg:grid-cols-[240px_1fr]">
        <div className="hidden border-r border-black/5 bg-background/90 lg:block">
          <div className="sticky top-0 h-screen">
            <AdminSidebar />
          </div>
        </div>

        <div className="flex min-h-screen flex-col">
          <AdminHeader user={user} />
          <main className="mycontainer flex-1 py-4 md:py-6">
            <div className="space-y-4 md:space-y-6">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}

