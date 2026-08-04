import {
  ShieldAlert,
  ArrowLeft,
  LogIn,
  LogOut,
  KeyRound,
  Laptop,
  Smartphone,
  Tablet,
} from "lucide-react";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  getSecurityActivity,
  type SecurityActivityEntry,
  type ActivityType,
} from "@/actions/auth/security/get-security-activity";

// ─── Activity type config ─────────────────────────────────────────────────────

type ActivityConfig = {
  label: string;
  description: string;
  iconBg: string;
  iconColor: string;
  badgeBg: string;
  badgeText: string;
};

const ACTIVITY_CONFIG: Record<ActivityType, ActivityConfig> = {
  sign_in: {
    label: "Sign In",
    description: "Successful sign in to your account",
    iconBg: "bg-green-500/10",
    iconColor: "text-green-600",
    badgeBg: "bg-green-500/10",
    badgeText: "text-green-600",
  },
  sign_out: {
    label: "Sign Out",
    description: "Signed out from your account",
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-600",
    badgeBg: "bg-orange-500/10",
    badgeText: "text-orange-600",
  },
  password_change: {
    label: "Password Changed",
    description: "Account password was updated",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-600",
    badgeBg: "bg-blue-500/10",
    badgeText: "text-blue-600",
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function ActivityIcon({ type }: { type: ActivityType }) {
  const config = ACTIVITY_CONFIG[type];
  const Icon =
    type === "sign_in" ? LogIn : type === "sign_out" ? LogOut : KeyRound;

  return (
    <div className={`rounded-xl max-h-14 ${config.iconBg} p-3`}>
      <Icon className={`h-6 w-6 ${config.iconColor}`} />
    </div>
  );
}

function DeviceIcon({ device }: { device: string }) {
  switch (device) {
    case "mobile":
      return <Smartphone className="hidden h-5 w-5 text-muted-foreground md:block" />;
    case "tablet":
      return <Tablet className="hidden h-5 w-5 text-muted-foreground md:block" />;
    default:
      return <Laptop className="hidden h-5 w-5 text-muted-foreground md:block" />;
  }
}

function ActivityBadge({ type }: { type: ActivityType }) {
  const config = ACTIVITY_CONFIG[type];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${config.badgeBg} ${config.badgeText}`}
    >
      {config.label}
    </span>
  );
}

function ActivityRow({ activity }: { activity: SecurityActivityEntry }) {
  const config = ACTIVITY_CONFIG[activity.type];

  return (
    <div className="rounded-xl border p-5 transition-colors hover:bg-muted/40">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-4">
          <ActivityIcon type={activity.type} />

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{config.label}</h3>
              <ActivityBadge type={activity.type} />
            </div>

            <p className="mt-1 text-sm text-muted-foreground">
              {config.description}
            </p>

            <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
              {activity.type !== "password_change" && (
                <>
                  <span>🖥 {activity.browser}</span>
                  <span>⚙️ {activity.os}</span>
                  <span>IP {activity.ip}</span>
                </>
              )}
              <span>🕒 {activity.createdAt}</span>
            </div>
          </div>
        </div>

        <DeviceIcon device={activity.device} />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function SecurityActivityPage() {
  const result = await getSecurityActivity();
  const activities = result.success ? result.activities : [];

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

      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Total Events</p>
            <h2 className="mt-2 text-3xl font-bold">{result.total}</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Sign Ins</p>
            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {result.signInCount}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Sign Outs</p>
            <h2 className="mt-2 text-3xl font-bold text-orange-600">
              {result.signOutCount}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Password Changes</p>
            <h2 className="mt-2 text-3xl font-bold text-blue-600">
              {result.passwordChangeCount}
            </h2>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            All security events sorted by most recent.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {activities.length === 0 ? (
            <div className="flex flex-col items-center  justify-center py-12 text-center">
              <ShieldAlert className="mb-4 h-10 w-10 text-muted-foreground" />
              <h3 className="font-semibold">No activity yet</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Security events will appear here as they happen.
              </p>
            </div>
          ) : (
            activities.map((activity) => (
              <ActivityRow key={activity.id} activity={activity} />
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
