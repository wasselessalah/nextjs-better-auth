"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { emailSignIn } from "@/actions/auth/sign-in/email-sign-in";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SocialAuthButtons } from "@/components/auth/social-auth-buttons";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [error, setError] = useState("");

  const [loadingProvider, setLoadingProvider] = useState<
    "email" | "google" | "github" | null
  >(null);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");
    setLoadingProvider("email");

    try {
      const { redirectTo } = await emailSignIn({
        email,
        password,
        rememberMe,
      });

      router.replace(redirectTo);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unexpected error occurred."
      );
    } finally {
      setLoadingProvider(null);
    }
  }



  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <Card className="w-full max-w-md border-border/50 shadow-xl">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">
            Sign In
          </CardTitle>

          <CardDescription>
            Sign in to access your account and continue where you left off.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5">
            {error && (
              <div className="rounded-md border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                type="email"
                className="h-11"
                placeholder="wassel@gmail.com"
                autoComplete="email"
                value={email}
                disabled={loadingProvider !== null}
                onChange={(e) => {
                  setEmail(e.target.value);

                  if (error) setError("");
                }}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>

              <Input
                id="password"
                type="password"
                className="h-11"
                placeholder="••••••••"
                autoComplete="current-password"
                value={password}
                disabled={loadingProvider !== null}
                onChange={(e) => {
                  setPassword(e.target.value);

                  if (error) setError("");
                }}
                minLength={8}
                required
              />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="remember-me"
                checked={rememberMe}
                onCheckedChange={(checked) =>
                  setRememberMe(checked === true)
                }
                disabled={loadingProvider !== null}
              />
              <Label
                htmlFor="remember-me"
                className="cursor-pointer select-none text-sm font-normal text-muted-foreground"
              >
                Remember me on this device
              </Label>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              className="h-11 w-full"
              disabled={
                loadingProvider !== null || !email.trim() || !password.trim()
              }>
              {loadingProvider === "email" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>

            <div className="flex w-full justify-end">
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            <SocialAuthButtons mode="sign-in" onError={setError} />

            <p className="text-center text-sm text-muted-foreground">
              Don t have an account?{" "}
              <Link
                href="/sign-up"
                className="font-medium text-primary hover:underline">
                Create one
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}