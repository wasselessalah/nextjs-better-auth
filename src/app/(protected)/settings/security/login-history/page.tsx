import {
  History,
  Search,
  CircleCheck,
  Laptop,
  Smartphone,
  Tablet,
  Globe,
  ArrowLeft,
} from "lucide-react";

import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  getLoginHistory,
  type LoginHistoryEntry,
} from "@/actions/auth/security/get-login-history";

function DeviceIcon({
  device,
}: {
  device: string;
}) {
  switch (device) {
    case "mobile":
      return (
        <Smartphone className="h-6 w-6 text-primary" />
      );

    case "tablet":
      return (
        <Tablet className="h-6 w-6 text-primary" />
      );

    default:
      return (
        <Laptop className="h-6 w-6 text-primary" />
      );
  }
}

function getLastLoginLabel(
  history: LoginHistoryEntry[]
): string {
  if (history.length === 0) return "N/A";
  return history[0].createdAt.split(" • ")[0];
}

export default async function LoginHistoryPage() {
  const result = await getLoginHistory();
  const history = result.success ? result.history : [];

  return (
    <div className="container mx-auto max-w-5xl py-10">
      <Button
        variant="ghost"
        
        className="mb-6"
      >
        <Link href="/settings/security" className="flex ">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Security
        </Link>
      </Button>

      <section className="mb-8 flex items-start gap-4">
        <div className="rounded-2xl bg-primary/10 p-4">
          <History className="h-8 w-8 text-primary" />
        </div>

        <div>
          <h1 className="text-4xl font-bold">
            Login History
          </h1>

          <p className="mt-2 max-w-2xl text-muted-foreground">
            Review every successful login to your
            account and monitor where your account
            has been accessed.
          </p>
        </div>
      </section>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              Total Logins
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {result.total}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              Last Login
            </p>

            <h2 className="mt-2 font-semibold">
              {getLastLoginLabel(history)}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              Status
            </p>

            <h2 className="mt-2 text-green-600 font-semibold">
              Secure
            </h2>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

            <Input
              placeholder="Search browser, OS or location..."
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Recent Login History
          </CardTitle>

          <CardDescription>
            Every successful sign in to your account.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <History className="mb-4 h-10 w-10 text-muted-foreground" />

              <h3 className="font-semibold">
                No login history
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Your login history will appear here.
              </p>
            </div>
          ) : (
            history.map((login) => (
            <div
              key={login.id}
              className="rounded-xl border p-5 transition-colors hover:bg-muted/40"
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="flex gap-4">
                  <div className="rounded-xl bg-primary/10 max-h-14 p-3">
                    <DeviceIcon
                      device={login.device}
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">
                        {login.browser}
                      </h3>

                      <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-600">
                        <CircleCheck className="h-3 w-3" />
                        {login.isCurrent
                          ? "Current"
                          : "Successful"}
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {login.os}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
                      {login.location && (
                        <span>
                          🌍 {login.location}
                        </span>
                      )}

                      <span>
                        IP {login.ip}
                      </span>

                      <span>
                        🕒 {login.createdAt}
                      </span>
                    </div>
                  </div>
                </div>

                <Globe className="hidden h-5 w-5 text-muted-foreground md:block" />
              </div>
            </div>
          )))}
        </CardContent>
      </Card>
    </div>
  );
}