"use client";

import { useState, useTransition, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  CircleAlert,
  CircleCheck,
  Loader2,
  Lock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { updatePassword } from "@/actions/auth/password-update/password-update";

import PasswordInput from "./password/password-input";
import PasswordStrengthBar from "./password/password-strength-bar";
import PasswordTips from "./password/password-tips";

export default function ChangePasswordForm() {
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  const passwordsMatch =
    confirmPassword.length === 0 || newPassword === confirmPassword;

  const canSubmit = useMemo(
    () =>
      currentPassword.trim().length > 0 &&
      newPassword.length >= 8 &&
      confirmPassword.length > 0 &&
      newPassword === confirmPassword &&
      !isPending,
    [currentPassword, newPassword, confirmPassword, isPending]
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    startTransition(async () => {
      const result = await updatePassword(currentPassword, newPassword);

      if (!result.success) {
        setError(result.message);
        return;
      }

      setSuccess(result.message);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => router.push("/settings/security"), 1500);
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Update Password</CardTitle>
            <CardDescription>
              Your current session will stay active after the change.
            </CardDescription>
          </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              <CircleAlert className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="flex items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-600">
              <CircleCheck className="h-4 w-4 shrink-0" />
              {success}
            </div>
          )}

          {/* Current password */}
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <PasswordInput
              id="currentPassword"
              placeholder="Enter your current password"
              value={currentPassword}
              onChange={setCurrentPassword}
              disabled={isPending}
            />
          </div>

          <Separator />

          {/* New password */}
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <PasswordInput
              id="newPassword"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={setNewPassword}
              disabled={isPending}
            />
            <PasswordStrengthBar password={newPassword} />
          </div>

          {/* Confirm password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <PasswordInput
              id="confirmPassword"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              disabled={isPending}
            />
            {!passwordsMatch && (
              <p className="text-xs text-destructive">
                The passwords do not match.
              </p>
            )}
            {passwordsMatch && confirmPassword.length > 0 && (
              <p className="flex items-center gap-1 text-xs text-green-600">
                <CircleCheck className="h-3.5 w-3.5" />
                Passwords match
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={!canSubmit}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating Password...
              </>
            ) : (
              <>
                <Lock className="mr-2 h-4 w-4" />
                Update Password
              </>
            )}
          </Button>
        </form>

        <Separator className="my-6" />

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Forgot your current password?
          </p>
          <Button variant="link" className="mt-1 h-auto p-0">
            <Link href="/forgot-password">Reset via email instead</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
      </div>

      <PasswordTips newPassword={newPassword} />
    </div>
  );
}