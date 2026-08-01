"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { Button } from "@/components/ui/button";

import { googleSignIn } from "@/actions/auth/sign-in/google-sign-in";
import { githubSignIn } from "@/actions/auth/sign-in/github-sign-in";



interface SocialAuthButtonsProps {
  mode: "sign-in" | "sign-up";
  onError?: (message: string) => void;
}

export function SocialAuthButtons({
  mode,
  onError,
}: SocialAuthButtonsProps) {
  const [loadingProvider, setLoadingProvider] = useState<
    "google" | "github" | null
  >(null);

  async function handleGoogle() {
    setLoadingProvider("google");

    try {
      if (mode === "sign-in") {
        await googleSignIn();
      } else {
        await googleSignIn();
      }
    } catch (error) {
      onError?.(
        error instanceof Error
          ? error.message
          : "Failed to continue with Google."
      );

      setLoadingProvider(null);
    }
  }

  async function handleGithub() {
    setLoadingProvider("github");

    try {
      if (mode === "sign-in") {
        await githubSignIn();
      } else {
        await githubSignIn();
      }
    } catch (error) {
      onError?.(
        error instanceof Error
          ? error.message
          : "Failed to continue with GitHub."
      );

      setLoadingProvider(null);
    }
  }

  return (
    <>
      <div className="relative w-full">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>

        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="h-11 w-full"
        disabled={loadingProvider !== null}
        onClick={handleGoogle}
      >
        {loadingProvider === "google" ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Connecting...
          </>
        ) : (
          <>
            <FcGoogle className="mr-2 h-5 w-5" />
            Continue with Google
          </>
        )}
      </Button>

      <Button
        type="button"
        variant="outline"
        className="h-11 w-full"
        disabled={loadingProvider !== null}
        onClick={handleGithub}
      >
        {loadingProvider === "github" ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Connecting...
          </>
        ) : (
          <>
            <FaGithub className="mr-2 h-5 w-5" />
            Continue with GitHub
          </>
        )}
      </Button>
    </>
  );
}