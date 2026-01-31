"use client";

import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";

function LogoutButton({
  children,
  className = "",
  callbackURL,
}: {
  children: React.ReactNode;
  className?: string;
  callbackURL?: string;
}) {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await authClient.signOut();
      if (callbackURL) router.push(callbackURL);
      else router.refresh();
    } catch (err) {
      console.log("Couldn't logout: ", err);
    }
  };
  return (
    <button className={className} onClick={handleLogout}>
      {children}
    </button>
  );
}

export default LogoutButton;
