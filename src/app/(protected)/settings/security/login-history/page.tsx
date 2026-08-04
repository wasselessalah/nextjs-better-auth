import { History, ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { getLoginHistory } from "@/actions/auth/security/get-login-history";

import LoginHistoryStats from "@/components/security/login-history/login-history-stats";
import LoginHistorySearch from "@/components/security/login-history/login-history-search";

export default async function LoginHistoryPage() {
  const result = await getLoginHistory();
  const history = result.success ? result.history : [];

  return (
    <div className="container mx-auto max-w-5xl py-10">
      <Button variant="ghost" className="mb-6">
        <Link href="/settings/security" className="flex">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Security
        </Link>
      </Button>

      <section className="mb-8 flex items-start gap-4">
        <div className="rounded-2xl bg-primary/10 p-4">
          <History className="h-8 w-8 text-primary" />
        </div>

        <div>
          <h1 className="text-4xl font-bold">Login History</h1>

          <p className="mt-2 max-w-2xl text-muted-foreground">
            Review every successful login to your account and monitor where your
            account has been accessed.
          </p>
        </div>
      </section>

      <LoginHistoryStats total={result.total} history={history} />

      {/* Search is a client component — wraps the list with live filtering */}
      <LoginHistorySearch history={history} />
    </div>
  );
}