// components/security/sign-out-all-devices.tsx

"use client";

import { useState, useTransition } from "react";
import { LogOut } from "lucide-react";
 import { toast } from "sonner";

import { revokeAllSessions } from "@/actions/auth/security/revoke-all-sessions";

import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function SignOutAllDevices() {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleLogout() {
    startTransition(async () => {
      const result = await revokeAllSessions();

      if (result.success) {
      toast.success(result.message);
        setOpen(false);
      } else {
      toast.error(result.message);
      }
    });
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger >
        <Button variant="destructive">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out From All Devices
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Sign out from all other devices?
          </AlertDialogTitle>

          <AlertDialogDescription>
            This will sign your account out on every other device.
            Your current session will remain active.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleLogout();
            }}
            disabled={pending}
          >
            {pending ? "Signing out..." : "Sign Out"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}