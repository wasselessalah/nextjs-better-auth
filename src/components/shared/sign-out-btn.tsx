"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogOut } from "lucide-react";

import { signOut } from "@/lib/auth/auth-client";
import { DropdownMenuItem } from "../ui/dropdown-menu";

export default function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    setLoading(true);

    try {
      const result = await signOut();

      if (result.error) {
        alert(result.error.message || "Failed to sign out.");
        return;
      }

      router.push("/sign-in");
      router.refresh();
    } catch {
      alert("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <DropdownMenuItem
      onSelect={(e) => {
        e.preventDefault();
        handleSignOut();
      }}
      disabled={loading}
      className="cursor-pointer text-destructive focus:text-destructive"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Signing out...
        </>
      ) : (
        <>
          <LogOut className="mr-2 h-4 w-4" />
          Log Out
        </>
      )}
    </DropdownMenuItem>
  );
}