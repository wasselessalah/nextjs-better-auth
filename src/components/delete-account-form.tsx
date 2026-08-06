"use client";

import { useState, useTransition } from "react";
import { Loader2, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import PasswordInput from "@/components/password/password-input";
import { deleteAccount } from "@/actions/auth/delete-account/delete-account";
import { useSession } from "@/lib/auth/auth-client";

export default function DeleteAccountForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  const handleDelete = () => {
    setError(null);

    if (!password) {
      setError("Please enter your password to confirm deletion.");
      return;
    }

    startTransition(async () => {
      const result = await deleteAccount(password);

      if (result.success) {
        // Hard redirect to clear all client-side state and force middleware to run
        window.location.href = "/sign-up";
      } else {
        setError(result.message);
      }
    });
  };

  return (
    <Card className="border-destructive/20 bg-destructive/5">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
            <TriangleAlert className="h-5 w-5 text-destructive" />
          </div>
          <div>
            <CardTitle className="text-xl text-destructive">Delete Account</CardTitle>
            <CardDescription>
              This action is permanent and cannot be undone.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-md border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
          <p className="font-medium">Are you absolutely sure?</p>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>All your personal data and settings will be permanently removed.</li>
            <li>Your active sessions will be terminated immediately.</li>
            <li>Your login history and security audit logs will be wiped.</li>
          </ul>
        </div>

        {error && (
          <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive border border-destructive/30">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="password">Confirm with your password</Label>
          <PasswordInput
            id="password"
            placeholder="Enter your current password"
            value={password}
            onChange={setPassword}
            disabled={isPending}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-destructive/10 pt-6">
        <Button
          variant="outline"
          onClick={() => router.push("/settings/security")}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={isPending || !password}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Deleting Account...
            </>
          ) : (
            "Permanently Delete Account"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
