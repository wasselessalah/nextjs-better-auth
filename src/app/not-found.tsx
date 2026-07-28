import Link from "next/link";
import { SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/auth/auth";

export default async function NotFound() {
  const session = await getSession();

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <SearchX className="h-10 w-10 text-primary" />
        </div>

        <span className="text-sm font-semibold uppercase tracking-widest text-primary">
          Error 404
        </span>

        <h1 className="mt-3 text-4xl font-bold tracking-tight">
          Page Not Found
        </h1>

        <p className="mt-4 text-muted-foreground">
          The page you are looking for could not be found. It may have been
          moved, deleted, or the URL may be incorrect.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <Button >
            <Link href="/">Go Home</Link>
          </Button>

          {session && (
            <Button  variant="outline">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}