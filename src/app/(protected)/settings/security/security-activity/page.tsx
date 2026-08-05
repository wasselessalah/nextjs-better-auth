import { ShieldAlert, ArrowLeft } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

import { getSecurityActivity } from "@/actions/auth/security/get-security-activity";

import ActivityStats from "@/components/security/security-activity/activity-stats";
import ActivityList from "@/components/security/security-activity/activity-list";

export default async function SecurityActivityPage() {
  const result = await getSecurityActivity();
  const activities = result.success ? result.activities : [];

  return (
    <div className="container mx-auto max-w-5xl py-10">
      <div className="mb-6">
        <Link 
          href="/settings/security" 
          className={cn(buttonVariants({ variant: "ghost" }), "flex w-fit items-center")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Security
        </Link>
      </div>

      <section className="mb-8 flex items-start gap-4">
        <div className="rounded-2xl bg-primary/10 p-4">
          <ShieldAlert className="h-8 w-8 text-primary" />
        </div>

        <div>
          <h1 className="text-4xl font-bold">Security Activity</h1>

          <p className="mt-2 max-w-2xl text-muted-foreground">
            A full audit log of security events on your account — sign-ins,
            sign-outs, and password changes.
          </p>
        </div>
      </section>

      <ActivityStats
        total={result.total}
        signInCount={result.signInCount}
        signOutCount={result.signOutCount}
        passwordChangeCount={result.passwordChangeCount}
        emailChangeCount={result.emailChangeCount}
      />

      <ActivityList activities={activities} />
    </div>
  );
}
