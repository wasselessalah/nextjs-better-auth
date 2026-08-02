"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";


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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import {
  ArrowRight,
  Loader2,
  MailCheck,
  CircleCheck,
  CircleAlert,
} from "lucide-react";
import { verifyEmail } from "@/actions/auth/verify-email/verify-email";
import { resendVerification } from "@/actions/auth/verify-email/resend-verification";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") ?? "";

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isPending, startTransition] = useTransition();
  const [isResending, startResendTransition] = useTransition();

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    startTransition(async () => {
      const result = await verifyEmail(email, otp);

      if (!result.success) {
        setError(result.message);
        return;
      }

      setSuccess(result.message);

      setTimeout(() => {
        router.push("/dashboard");
      }, 1200);
    });
  };

  const handleResend = () => {
    setError("");
    setSuccess("");

    startResendTransition(async () => {
      const result = await resendVerification(email);

      if (!result.success) {
        setError(result.message);
        return;
      }

      setSuccess(result.message);
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <MailCheck className="h-8 w-8 text-primary" />
          </div>

          <div>
            <CardTitle className="text-2xl">
              Verify your email
            </CardTitle>

            <CardDescription className="mt-2">
              Enter the 6-digit verification code sent to
            </CardDescription>

            <p className="mt-2 font-medium break-all">{email}</p>
          </div>
        </CardHeader>

        <form onSubmit={handleVerify}>
          <CardContent className="space-y-6">
            {error && (
              <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                <CircleAlert className="h-4 w-4" />
                {error}
              </div>
            )}

            {success && (
              <div className="flex items-center gap-2 rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-600">
                <CircleCheck className="h-4 w-4" />
                {success}
              </div>
            )}

            <div className="space-y-3">
              <Label>Verification Code</Label>

              <div className="flex justify-center">
                <InputOTP
                  value={otp}
                  onChange={setOtp}
                  maxLength={6}
                >
                  <InputOTPGroup>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <InputOTPSlot
                        key={index}
                        index={index}
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <Button
              className="w-full"
              disabled={isPending || otp.length !== 6}
              type="submit"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  Verify Email
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              disabled={isResending}
              onClick={handleResend}
            >
              {isResending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Resend Code"
              )}
            </Button>

            <Link
              href="/sign-in"
              className="text-center text-sm text-muted-foreground hover:text-primary"
            >
              Back to Sign In
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}