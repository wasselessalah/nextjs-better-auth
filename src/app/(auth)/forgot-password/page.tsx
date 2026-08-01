"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, MailCheck, AlertCircle } from "lucide-react";

import { forgotPassword } from "@/actions/auth/forgot-password/forgot-password";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

async function handleSubmit(
  e: React.FormEvent<HTMLFormElement>
) {
  e.preventDefault();

  setLoading(true);
  setError("");
  setSuccess("");

  try {
    const result = await forgotPassword(email);

    if (!result.success) {
      setError(result.message);
      return;
    }

    setSuccess(result.message);

    setTimeout(() => {
      router.push(
        `/verify-reset-password?email=${encodeURIComponent(email)}`
      );
    }, 2000);
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <MailCheck className="h-7 w-7 text-primary" />
          </div>

          <div>
            <CardTitle className="text-3xl font-bold">
              Forgot Password
            </CardTitle>

            <CardDescription className="mt-2">
              Enter your email address and we ll send you a
              verification code to reset your password.
            </CardDescription>
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5">
            {error && (
              <div className="flex items-start gap-2 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="rounded-lg border border-green-500/20 bg-green-500/10 p-4">
                <div className="flex items-center gap-2">
                  <MailCheck className="h-5 w-5 text-green-600" />
                  <p className="font-medium text-green-700">
                    Verification Code Sent
                  </p>
                </div>

                <p className="mt-2 text-sm text-green-700">
                  {success}
                </p>

                <p className="mt-2 text-xs text-green-600">
                  Redirecting to the verification page...
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">
                Email Address
              </Label>

              <Input
                id="email"
                type="email"
                placeholder="wassel@gmail.com"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);

                  if (error) {
                    setError("");
                  }
                }}
                disabled={loading}
                required
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <Button
              type="submit"
              className="w-full"
              disabled={loading || !email.trim()}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending Verification Code...
                </>
              ) : (
                "Send Verification Code"
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