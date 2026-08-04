import Link from "next/link";
import {
  History,
  ShieldAlert,
  ChevronRight,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SecurityLinks() {
  return (
    <Card className="mt-6 mb-5">

      <CardHeader>
        <CardTitle>Security Center</CardTitle>

        <CardDescription>
          View your security activity and account history.
        </CardDescription>
      </CardHeader>

<CardContent className="flex flex-col gap-4 md:flex-row">
      <div className="flex-1"> 
          <Link
          href="/settings/security/login-history"
          className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
        >
          <div className="flex items-center gap-3">
            <History className="h-5 w-5 text-primary" />

            <div>
              <p className="font-medium">Login History</p>

              <p className="text-sm text-muted-foreground">
                View all successful sign-ins.
              </p>
            </div>
          </div>

          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </Link>
      </div>
      <div className="flex-1"> 

        <Link
          href="/settings/security/security-activity"
          className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
        >
          <div className="flex items-center gap-3">
            <ShieldAlert className="h-5 w-5 text-primary" />

            <div>
              <p className="font-medium">Security Activity</p>

              <p className="text-sm text-muted-foreground">
                Password changes, logins and session activity.
              </p>
            </div>
          </div>

          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </Link>
        </div>
      </CardContent>
    </Card>
  );
}