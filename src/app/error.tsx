"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="mx-auto max-w-lg text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-12 w-12 text-destructive" />
        </div>

        <h1 className="mt-8 text-4xl font-bold tracking-tight">
          Oops! Something went wrong
        </h1>

        <p className="mt-4 text-muted-foreground">
          We couldn t complete your request. This may be a temporary issue.
          Please try again, or return to the homepage.
        </p>

        {process.env.NODE_ENV === "development" && (
          <div className="mt-6 rounded-lg border bg-muted p-4 text-left text-sm text-muted-foreground">
            <p className="font-semibold text-foreground">
              Development Error
            </p>

            <p className="mt-2 break-all">
              {error.message}
            </p>

            {error.digest && (
              <p className="mt-2 text-xs">
                Digest: {error.digest}
              </p>
            )}
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={reset}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>

          <Button
            variant="outline"
            onClick={() => router.push("/")}
          >
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          If this problem continues, please contact support or try again later.
        </p>
      </div>
    </main>
  );
}