"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogOut } from "lucide-react";

import { signOut } from "@/lib/auth/auth-client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function LogoutMenuItem() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    if (loading) return;

    setLoading(true);

    try {
      const { error } = await signOut();

      if (error) {
        console.error(error);
        return;
      }

      router.replace("/sign-in");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <DropdownMenuItem
      disabled={loading}
      onClick={(e) => {
        e.preventDefault();
        handleLogout();
      }}
      className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Signing out...
        </>
      ) : (
        <>
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </>
      )}
    </DropdownMenuItem>
  );
}