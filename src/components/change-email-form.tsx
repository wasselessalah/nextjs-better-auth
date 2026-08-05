"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  CircleAlert,
  CircleCheck,
  Loader2,
  Mail,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import PasswordInput from "@/components/password/password-input";

import { requestChangeEmail } from "@/actions/auth/change-email/request-change-email";
import { verifyChangeEmail } from "@/actions/auth/change-email/verify-change-email";

export default function ChangeEmailForm() {
  const router = useRouter();

  const [step, setStep] = useState<"request" | "verify">("request");

  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [otp, setOtp] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const [isPending, startTransition] = useTransition();

  function handleRequest(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!newEmail || !currentPassword) {
      setError("Please fill in all fields.");
      return;
    }

    startTransition(async () => {
      const result = await requestChangeEmail(newEmail, currentPassword);

      if (!result.success) {
        setError(result.message);
        return;
      }

      setSuccess(result.message);
      setStep("verify");
    });
  }

  function handleVerify(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit code.");
      return;
    }

    startTransition(async () => {
      const result = await verifyChangeEmail(otp);

      if (!result.success) {
        setError(result.message);
        return;
      }

      setSuccess(result.message);
      
      setTimeout(() => {
        router.push("/settings/security");
      }, 1500);
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Change Email Address</CardTitle>
            <CardDescription>
              {step === "request"
                ? "Enter your new email and current password to start the process."
                : "Enter the verification code sent to your new email."}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* Error Message */}
            {error && (
              <div className="mb-6 flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                <CircleAlert className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="mb-6 flex items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-600">
                <CircleCheck className="h-4 w-4 shrink-0" />
                {success}
              </div>
            )}

            {step === "request" ? (
              <form onSubmit={handleRequest} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="newEmail">New Email Address</Label>
                  <Input
                    id="newEmail"
                    type="email"
                    placeholder="name@example.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    disabled={isPending}
                    required
                  />
                </div>

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

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isPending || !newEmail || !currentPassword}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Requesting Change...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Send Verification Code
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerify} className="space-y-5 text-center">
                <div className="space-y-3">
                  <Label>Verification Code</Label>
                  <div className="flex justify-center">
                    <InputOTP
                      value={otp}
                      onChange={setOtp}
                      maxLength={6}
                      disabled={isPending}
                    >
                      <InputOTPGroup>
                        {Array.from({ length: 6 }).map((_, index) => (
                          <InputOTPSlot key={index} index={index} />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Sent to <span className="font-medium text-foreground">{newEmail}</span>
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isPending || otp.length !== 6}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify & Change Email
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="link"
                  className="w-full text-sm text-muted-foreground hover:text-primary mt-2"
                  onClick={() => {
                    setStep("request");
                    setOtp("");
                    setError("");
                    setSuccess("");
                  }}
                  disabled={isPending}
                >
                  Back to request
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="bg-muted/50 border-none shadow-none">
          <CardHeader>
            <div className="flex items-center gap-2 text-primary font-medium">
              <ShieldAlert className="h-5 w-5" />
              Important Notes
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <ul className="list-disc pl-4 space-y-2">
              <li>You must have access to both your current account and the new email address.</li>
              <li>A confirmation code will be sent to the <strong>new</strong> email address to verify you own it.</li>
              <li>Once changed, you must use the new email address to sign in.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
