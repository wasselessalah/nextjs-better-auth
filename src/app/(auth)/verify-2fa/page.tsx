"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { twoFactor } from "@/lib/auth/auth-client";
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
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";

export default function Verify2FAPage() {
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [backupCode, setBackupCode] = useState("");
  const [useBackup, setUseBackup] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleVerify(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (useBackup) {
        if (!backupCode.trim()) {
          setError("Please enter a backup code.");
          setLoading(false);
          return;
        }
        const { data, error } = await twoFactor.verifyBackupCode({
          code: backupCode,
        });

        if (error) {
          setError(error.message || "Invalid backup code.");
          setLoading(false);
          return;
        }
      } else {
        if (otp.length !== 6) {
          setError("Please enter a 6-digit code.");
          setLoading(false);
          return;
        }
        const { data, error } = await twoFactor.verifyTotp({
          code: otp,
        });

        if (error) {
          setError(error.message || "Invalid authenticator code.");
          setLoading(false);
          return;
        }
      }

      // Successful verification
      router.replace("/dashboard");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <Card className="w-full max-w-md border-border/50 shadow-xl">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">
            Two-Factor Authentication
          </CardTitle>
          <CardDescription>
            {useBackup
              ? "Enter one of your 10-character backup codes."
              : "Enter the 6-digit code from your authenticator app."}
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleVerify}>
          <CardContent className="space-y-5 flex flex-col items-center">
            {error && (
              <div className="w-full rounded-md border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </div>
            )}

            {useBackup ? (
              <div className="space-y-2 w-full">
                <Label htmlFor="backup-code">Backup Code</Label>
                <Input
                  id="backup-code"
                  type="text"
                  placeholder="e.g. abcd-1234"
                  value={backupCode}
                  disabled={loading}
                  onChange={(e) => {
                    setBackupCode(e.target.value);
                    if (error) setError("");
                  }}
                  required
                />
              </div>
            ) : (
              <div className="space-y-2 flex flex-col items-center w-full">
                <Label htmlFor="otp">Authenticator Code</Label>
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => {
                    setOtp(value);
                    if (error) setError("");
                  }}
                  disabled={loading}
                  autoFocus
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              className="w-full"
              disabled={loading || (useBackup ? !backupCode : otp.length !== 6)}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify Code"
              )}
            </Button>

            <Button
              type="button"
              variant="link"
              onClick={() => {
                setUseBackup(!useBackup);
                setError("");
                setOtp("");
                setBackupCode("");
              }}
              className="text-sm text-muted-foreground"
            >
              {useBackup
                ? "Use authenticator app instead"
                : "Use a backup code"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
