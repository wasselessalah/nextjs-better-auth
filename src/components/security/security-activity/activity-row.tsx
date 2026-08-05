import { LogIn, LogOut, KeyRound, Laptop, Smartphone, Tablet, Mail } from "lucide-react";

import type {
  SecurityActivityEntry,
  ActivityType,
} from "@/actions/auth/security/get-security-activity";

// ─── Config ───────────────────────────────────────────────────────────────────

type ActivityConfig = {
  label: string;
  description: string;
  iconBg: string;
  iconColor: string;
  badgeBg: string;
  badgeText: string;
};

export const ACTIVITY_CONFIG: Record<ActivityType, ActivityConfig> = {
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
  email_change: {
    label: "Email Changed",
    description: "Account email address was updated",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-600",
    badgeBg: "bg-purple-500/10",
    badgeText: "text-purple-600",
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function ActivityIcon({ type }: { type: ActivityType }) {
  const config = ACTIVITY_CONFIG[type];
  const Icon =
    type === "sign_in"
      ? LogIn
      : type === "sign_out"
      ? LogOut
      : type === "password_change"
      ? KeyRound
      : Mail;

  return (
    <div className={`rounded-xl max-h-14 ${config.iconBg} p-3`}>
      <Icon className={`h-6 w-6 ${config.iconColor}`} />
    </div>
  );
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

// ─── Main row ─────────────────────────────────────────────────────────────────

interface Props {
  activity: SecurityActivityEntry;
}

export default function ActivityRow({ activity }: Props) {
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
              {activity.type !== "password_change" && activity.type !== "email_change" && (
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
