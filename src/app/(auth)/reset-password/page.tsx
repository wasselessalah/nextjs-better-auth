"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Loader2,
  LockKeyhole,
  Eye,
  EyeOff,
  CircleAlert,
  CircleCheck,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPassword } from "@/actions/auth/forgot-password/reset-password";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const passwordStrength =
    password.length >= 12
      ? {
          label: "Strong",
          width: "100%",
          color: "bg-green-500",
        }
      : password.length >= 8
      ? {
          label: "Medium",
          width: "70%",
          color: "bg-yellow-500",
        }
      : password.length > 0
      ? {
          label: "Weak",
          width: "35%",
          color: "bg-red-500",
        }
      : {
          label: "",
          width: "0%",
          color: "bg-muted",
        };

  const isValid =
    token &&
    password.length >= 8 &&
    password === confirmPassword;

async function handleSubmit(
  e: React.FormEvent<HTMLFormElement>
) {
  e.preventDefault();

  setError("");
  setSuccess("");

  if (!token) {
    setError("This password reset link is invalid or has expired.");
    return;
  }

  if (password.length < 8) {
    setError("Password must be at least 8 characters.");
    return;
  }

  if (password !== confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  setLoading(true);

  try {
    const message = await resetPassword({
      token,
      newPassword: password,
    });

    setSuccess(message);

    setTimeout(() => {
      router.replace("/sign-in");
    }, 2000);
  } catch (error) {
    setError(
      error instanceof Error
        ? error.message
        : "Something went wrong. Please try again."
    );
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md border-border/60 shadow-xl">
        <CardHeader className="space-y-5 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <LockKeyhole className="h-8 w-8 text-primary" />
          </div>

          <div>
            <CardTitle className="text-3xl font-bold">
              Reset Password
            </CardTitle>

            <CardDescription className="mt-2">
              Create a strong password to keep your account
              secure.
            </CardDescription>
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {error && (
              <div className="flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-600">
                <CircleAlert className="mt-0.5 h-5 w-5 shrink-0" />

                <p>{error}</p>
              </div>
            )}

            {success && (
              <div className="flex items-start gap-3 rounded-lg border border-green-500/20 bg-green-500/10 p-3 text-sm text-green-700">
                <CircleCheck className="mt-0.5 h-5 w-5 shrink-0" />

                <p>{success}</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="password">
                New Password
              </Label>

              <div className="relative">
                <Input
                  id="password"
                  type={
                    showPassword ? "text" : "password"
                  }
                  placeholder="Enter your new password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  className="pr-11"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              <div className="space-y-2">
                <div className="h-2 rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${passwordStrength.color}`}
                    style={{
                      width: passwordStrength.width,
                    }}
                  />
                </div>

                {password && (
                  <p className="text-xs text-muted-foreground">
                    Password strength:{" "}
                    <span className="font-medium">
                      {passwordStrength.label}
                    </span>
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                Confirm Password
              </Label>

              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  className="pr-11"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              {confirmPassword && (
                <p
                  className={`text-xs ${
                    password === confirmPassword
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {password === confirmPassword
                    ? "✓ Passwords match"
                    : "✗ Passwords do not match"}
                </p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <Button
              type="submit"
              className="h-11 w-full"
              disabled={loading || !isValid}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating Password...
                </>
              ) : (
                <>
                  <LockKeyhole className="mr-2 h-4 w-4" />
                  Update Password
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="w-full"
              disabled={loading}
              onClick={() => router.push("/sign-in")}
            >
              Back to Sign In
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}