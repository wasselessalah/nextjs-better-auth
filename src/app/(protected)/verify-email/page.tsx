"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, MailCheck, ArrowRight } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Verification failed.");
        return;
      }

      setSuccess("Email verified successfully.");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setResending(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to resend code.");
        return;
      }

      setSuccess("A new verification code has been sent.");
    } catch {
      setError("Unable to resend code.");
    } finally {
      setResending(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Decorative background element */}
        <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-primary/10 to-primary/20 opacity-40 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr from-primary/5 to-primary/10 opacity-40 blur-3xl" />
        </div>

        <Card className="shadow-md border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="space-y-6 text-center pt-8">
            {/* Icon with enhanced styling */}
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 shadow-lg">
              <MailCheck className="h-10 w-10 text-primary" />
            </div>

            {/* Main heading with improved typography */}
            <div className="space-y-2">
              <CardTitle className="text-4xl font-bold tracking-tight text-gray-900">
                Verify Your Email
              </CardTitle>
              <CardDescription className="text-base text-gray-600">
                We sent a 6-digit code to
              </CardDescription>
            </div>

            {/* Email display with better styling */}
            <div className="inline-block rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 px-4 py-2 border border-primary/20">
              <p className="font-semibold text-gray-900 break-all text-sm">
                {email}
              </p>
            </div>
          </CardHeader>

          <form onSubmit={handleVerify}>
            <CardContent className="space-y-6">
              {/* Error message with better styling */}
              {error && (
                <div className="animate-in fade-in-50 slide-in-from-top-2 space-y-2 rounded-lg border border-red-200 bg-red-50 p-4">
                  <p className="text-sm font-medium text-red-900">{error}</p>
                </div>
              )}

              {/* Success message with better styling */}
              {success && (
                <div className="animate-in fade-in-50 slide-in-from-top-2 space-y-2 rounded-lg border border-green-200 bg-green-50 p-4">
                  <p className="text-sm font-medium text-green-900 flex items-center gap-2">
                    <MailCheck className="h-4 w-4" />
                    {success}
                  </p>
                </div>
              )}

              {/* OTP Input with enhanced styling */}
              <div className="space-y-4">
                <Label htmlFor="otp" className="text-sm font-semibold text-gray-700">
                  Verification Code
                </Label>

                <div className="flex justify-center">
                  <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
                    <InputOTP
                      id="otp"
                      maxLength={6}
                      value={otp}
                      onChange={setOtp}
                      autoFocus
                    >
                      <InputOTPGroup>
                        <InputOTPSlot
                          index={0}
                          className="h-14 w-14 text-xl font-bold border-2 border-primary/30 rounded-xl text-gray-900 transition-all duration-200 hover:border-primary/50 focus:border-primary focus:shadow-lg focus:shadow-primary/30"
                        />
                        <InputOTPSlot
                          index={1}
                          className="h-14 w-14 text-xl font-bold border-2 border-primary/30 rounded-xl text-gray-900 transition-all duration-200 hover:border-primary/50 focus:border-primary focus:shadow-lg focus:shadow-primary/30"
                        />
                        <InputOTPSlot
                          index={2}
                          className="h-14 w-14 text-xl font-bold border-2 border-primary/30 rounded-xl text-gray-900 transition-all duration-200 hover:border-primary/50 focus:border-primary focus:shadow-lg focus:shadow-primary/30"
                        />
                        <InputOTPSlot
                          index={3}
                          className="h-14 w-14 text-xl font-bold border-2 border-primary/30 rounded-xl text-gray-900 transition-all duration-200 hover:border-primary/50 focus:border-primary focus:shadow-lg focus:shadow-primary/30"
                        />
                        <InputOTPSlot
                          index={4}
                          className="h-14 w-14 text-xl font-bold border-2 border-primary/30 rounded-xl text-gray-900 transition-all duration-200 hover:border-primary/50 focus:border-primary focus:shadow-lg focus:shadow-primary/30"
                        />
                        <InputOTPSlot
                          index={5}
                          className="h-14 w-14 text-xl font-bold border-2 border-primary/30 rounded-xl text-gray-900 transition-all duration-200 hover:border-primary/50 focus:border-primary focus:shadow-lg focus:shadow-primary/30"
                        />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>

                <p className="text-center text-sm text-gray-500 mt-4">
                  Check your email (including spam folder) for the verification code.
                </p>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3 pt-2 pb-8">
              {/* Primary action button with improved styling */}
              <Button
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl"
                disabled={loading || otp.length < 6}
                type="submit"
              >
                {loading ? (
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

              {/* Resend button with secondary styling */}
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-medium rounded-xl transition-all duration-200 bg-white"
                disabled={resending}
                onClick={handleResend}
              >
                {resending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Resend Code"
                )}
              </Button>

              {/* Back link with improved styling */}
              <Link
                href="/sign-in"
                className="text-center text-sm font-medium text-gray-600 hover:text-primary transition-colors duration-200 mt-2"
              >
                Back to Sign In
              </Link>
            </CardFooter>
          </form>
        </Card>

        {/* Trust indicator at bottom */}
        <p className="text-center text-xs text-gray-500 mt-8">
          Your data is secure and encrypted. We never share your information.
        </p>
      </div>
    </div>
  );
}