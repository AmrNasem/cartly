import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LogoutPage() {
  return (
    <div className="mx-auto max-w-md space-y-4 md:space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold">
            Logout from admin
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xs text-muted-foreground">
            You are about to sign out of the admin dashboard. You&apos;ll still be
            able to browse the storefront as a guest.
          </p>
          <div className="flex items-center justify-end gap-2">
            <Button variant="outline" size="sm">
              {/* TODO: Navigate back to previous admin page */}
              Cancel
            </Button>
            <Button variant="destructive" size="sm">
              {/* TODO: Trigger real logout and redirect */}
              Confirm logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

