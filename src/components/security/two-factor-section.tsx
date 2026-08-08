"use client";

import { useState } from "react";
import QRCode from "react-qr-code";
import { Loader2, ShieldCheck, ShieldAlert, KeyRound, Smartphone, Copy, Check, QrCode } from "lucide-react";
import { toast } from "sonner";
import { useSession, twoFactor } from "@/lib/auth/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import PasswordInput from "@/components/password/password-input";

export default function TwoFactorSection() {
  const { data: session, refetch } = useSession();
  const isEnabled = session?.user?.twoFactorEnabled ?? false;

  const [activeView, setActiveView] = useState<"overview" | "enable" | "disable" | "regenerate">("overview");

  // Setup state
  const [setupStep, setSetupStep] = useState<"password" | "qr" | "backup">("password");
  const [password, setPassword] = useState("");
  const [totpUri, setTotpUri] = useState("");
  const [totpSecret, setTotpSecret] = useState("");
  const [otp, setOtp] = useState("");
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedKey, setCopiedKey] = useState(false);

  const handleStartEnable = () => {
    setSetupStep("password");
    setPassword("");
    setTotpUri("");
    setTotpSecret("");
    setOtp("");
    setBackupCodes([]);
    setError("");
    setActiveView("enable");
  };

  const handleVerifyPasswordForEnable = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error } = await twoFactor.enable({ password });

      if (error) {
        setError(error.message || "Failed to verify password.");
        setLoading(false);
        return;
      }

      setTotpUri(data.totpURI);
      setBackupCodes(data.backupCodes);
      
      try {
        const url = new URL(data.totpURI);
        const secret = url.searchParams.get("secret");
        if (secret) setTotpSecret(secret);
      } catch (e) {
        // Ignore parsing errors
      }

      setSetupStep("qr");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyTotp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError("Please enter a 6-digit code.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { error } = await twoFactor.verifyTotp({ code: otp });

      if (error) {
        setError(error.message || "Invalid code. Please try again.");
        setLoading(false);
        return;
      }

      setSetupStep("backup");
      refetch();
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleFinishSetup = () => {
    setActiveView("overview");
    setSetupStep("password");
    toast.success("Two-Factor Authentication enabled successfully.");
  };

  const handleDisable = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error } = await twoFactor.disable({ password });

      if (error) {
        setError(error.message || "Failed to disable 2FA.");
        setLoading(false);
        return;
      }

      setActiveView("overview");
      setPassword("");
      toast.success("Two-Factor Authentication has been disabled.");
      refetch();
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerateBackupCodes = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error } = await twoFactor.generateBackupCodes({ password });

      if (error) {
        setError(error.message || "Failed to regenerate backup codes.");
        setLoading(false);
        return;
      }

      setBackupCodes(data.backupCodes);
      setSetupStep("backup");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleStartBackupRegeneration = () => {
    setSetupStep("password");
    setPassword("");
    setBackupCodes([]);
    setError("");
    setActiveView("regenerate");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const downloadBackupCodes = () => {
    const text = backupCodes.join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "e-learning-backup-codes.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyKey = () => {
    if (totpSecret) {
      navigator.clipboard.writeText(totpSecret);
      setCopiedKey(true);
      toast.success("Setup key copied!");
      setTimeout(() => setCopiedKey(false), 2000);
    }
  };

  // 1. Render Enable View
  if (activeView === "enable") {
    return (
      <Card className="max-w-xl mx-auto shadow-sm">
        <div className="bg-primary/5 p-6 pb-4 border-b rounded-t-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-primary/10 p-2 rounded-full">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Enable Two-Factor Authentication</h2>
          </div>
          <p className="text-base text-muted-foreground">
            {setupStep === "password" && "Step 1 of 3: Verify your identity"}
            {setupStep === "qr" && "Step 2 of 3: Scan the QR code"}
            {setupStep === "backup" && "Step 3 of 3: Save backup codes"}
          </p>
        </div>

        <div className="p-6 pt-6">
          {setupStep === "password" && (
            <form onSubmit={handleVerifyPasswordForEnable} className="space-y-4">
              {error && (
                <div className="rounded-md border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="password-enable">Current Password</Label>
                <PasswordInput
                  id="password-enable"
                  value={password}
                  onChange={setPassword}
                  disabled={loading}
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActiveView("overview")}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading || !password}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Verify Password
                </Button>
              </div>
            </form>
          )}

          {setupStep === "qr" && (
            <form onSubmit={handleVerifyTotp} className="space-y-6">
              {error && (
                <div className="rounded-md border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 shrink-0" />
                  {error}
                </div>
              )}

              <div className="flex flex-col items-center justify-center space-y-5">
                <div className="text-center text-sm text-muted-foreground mb-2">
                  Open your authenticator app (like Google Authenticator or Authy) and scan this QR code:
                </div>

                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/50 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                  <div className="relative rounded-2xl bg-white p-5 shadow-sm border border-slate-200">
                    {totpUri ? (
                      <QRCode value={totpUri} size={160} level="M" />
                    ) : (
                      <div className="w-[160px] h-[160px] bg-muted animate-pulse rounded-lg flex items-center justify-center">
                        <QrCode className="h-8 w-8 text-muted-foreground/50" />
                      </div>
                    )}
                  </div>
                </div>

                {totpSecret && (
                  <div className="w-full mt-2">
                    <div className="flex items-center justify-between mb-1.5">
                      <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Or enter code manually
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 bg-muted/50 border px-3 py-2 rounded-md text-sm font-mono tracking-wider overflow-hidden text-ellipsis text-center select-all">
                        {totpSecret}
                      </code>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={handleCopyKey}
                        className="shrink-0"
                        title="Copy setup key"
                      >
                        {copiedKey ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                )}

                <div className="w-full space-y-3 flex flex-col items-center pt-2 border-t mt-4">
                  <Label htmlFor="otp-setup" className="font-semibold text-foreground">
                    Verify the 6-digit code
                  </Label>
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
                      <InputOTPSlot index={0} className="h-12 w-10 sm:w-12 text-lg" />
                      <InputOTPSlot index={1} className="h-12 w-10 sm:w-12 text-lg" />
                      <InputOTPSlot index={2} className="h-12 w-10 sm:w-12 text-lg" />
                      <InputOTPSlot index={3} className="h-12 w-10 sm:w-12 text-lg" />
                      <InputOTPSlot index={4} className="h-12 w-10 sm:w-12 text-lg" />
                      <InputOTPSlot index={5} className="h-12 w-10 sm:w-12 text-lg" />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActiveView("overview")}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading || otp.length !== 6}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Verify & Enable
                </Button>
              </div>
            </form>
          )}

          {setupStep === "backup" && (
            <div className="space-y-6">
              <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4 text-sm text-yellow-700 dark:text-yellow-400 flex items-start gap-3">
                <ShieldAlert className="h-5 w-5 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Important:</strong> Save these backup codes in a secure place (like a password manager). You will need them to access your account if you lose your device. <strong>They will only be shown once.</strong>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-muted/50 p-5 rounded-xl font-mono text-sm border shadow-inner">
                {backupCodes.map((code, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center tracking-widest bg-background py-2 rounded border shadow-sm text-foreground/80 font-medium"
                  >
                    {code}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <Button
                  variant="outline"
                  className="w-full bg-background"
                  onClick={() => copyToClipboard(backupCodes.join("\n"))}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Codes
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-background"
                  onClick={downloadBackupCodes}
                >
                  Download as TXT
                </Button>
              </div>

              <div className="flex justify-end pt-4 border-t mt-6">
                <Button onClick={handleFinishSetup} className="w-full sm:w-auto text-base px-8">
                  I have saved my backup codes
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    );
  }

  // 2. Render Disable View
  if (activeView === "disable") {
    return (
      <Card className="max-w-xl mx-auto shadow-sm">
        <CardHeader>
          <CardTitle>Disable Two-Factor Authentication</CardTitle>
          <CardDescription>
            Are you sure you want to disable 2FA? This will make your account less secure.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleDisable} className="space-y-4">
            {error && (
              <div className="rounded-md border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="password-disable">Current Password</Label>
              <PasswordInput
                id="password-disable"
                value={password}
                onChange={setPassword}
                disabled={loading}
                placeholder="Enter your password"
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setActiveView("overview")}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" variant="destructive" disabled={loading || !password}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Disable 2FA
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  // 3. Render Regenerate Backup Codes View
  if (activeView === "regenerate") {
    return (
      <Card className="max-w-xl mx-auto shadow-sm">
        <CardHeader>
          <CardTitle>Regenerate Recovery Codes</CardTitle>
          <CardDescription>
            {setupStep === "password" &&
              "Enter your password to regenerate your recovery codes. Old codes will be invalidated."}
            {setupStep === "backup" && "Save your new backup codes securely."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {setupStep === "password" && (
            <form onSubmit={handleRegenerateBackupCodes} className="space-y-4">
              {error && (
                <div className="rounded-md border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="password-backup">Current Password</Label>
                <PasswordInput
                  id="password-backup"
                  value={password}
                  onChange={setPassword}
                  disabled={loading}
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActiveView("overview")}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading || !password}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Regenerate
                </Button>
              </div>
            </form>
          )}

          {setupStep === "backup" && (
            <div className="space-y-6">
              <div className="rounded-md border border-yellow-500/30 bg-yellow-500/10 p-3 text-sm text-yellow-700 dark:text-yellow-400 flex items-start gap-3">
                <ShieldAlert className="inline shrink-0 mt-0.5 h-5 w-5" />
                <p>
                  Save these new backup codes in a secure place. Your old codes will no longer work.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-muted p-4 rounded-lg font-mono text-sm">
                {backupCodes.map((code, index) => (
                  <div key={index} className="tracking-widest flex items-center justify-center bg-background py-2 rounded border shadow-sm">
                    {code}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  variant="outline"
                  className="w-full bg-background"
                  onClick={() => copyToClipboard(backupCodes.join("\n"))}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Codes
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-background"
                  onClick={downloadBackupCodes}
                >
                  Download as TXT
                </Button>
              </div>

              <div className="flex justify-end pt-4 border-t mt-4">
                <Button onClick={() => setActiveView("overview")} className="w-full sm:w-auto px-8">
                  I have saved my codes
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // 4. Default: Render Overview
  return (
    <>
      <Card className="mb-8 max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Two-Factor Authentication (2FA)
            {isEnabled ? (
              <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                Enabled
              </Badge>
            ) : (
              <Badge variant="secondary">Disabled</Badge>
            )}
          </CardTitle>
          <CardDescription>
            Protect your account with an authenticator app.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3 shrink-0">
                <Smartphone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">Authenticator App</p>
                <p className="text-sm text-muted-foreground">
                  Use an app like Google Authenticator or Authy to generate security codes.
                </p>
              </div>
            </div>
            <div className="shrink-0 w-full md:w-auto">
              {isEnabled ? (
                <Button variant="destructive" onClick={() => setActiveView("disable")} className="w-full md:w-auto">
                  Disable 2FA
                </Button>
              ) : (
                <Button onClick={handleStartEnable} className="w-full md:w-auto">
                  Enable 2FA
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recovery Codes Card */}
      {isEnabled && (
        <Card className="mb-8 max-w-2xl">
          <CardHeader>
            <CardTitle>Recovery Codes</CardTitle>
            <CardDescription>
              Recovery codes can be used to access your account if you lose access to your device.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3 shrink-0">
                  <KeyRound className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Backup Codes</p>
                  <p className="text-sm text-muted-foreground">
                    You have unused recovery codes.
                  </p>
                </div>
              </div>
              <div className="shrink-0 w-full md:w-auto">
                <Button variant="outline" onClick={handleStartBackupRegeneration} className="w-full md:w-auto">
                  Regenerate Codes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
