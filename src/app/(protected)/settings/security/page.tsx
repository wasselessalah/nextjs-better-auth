import { ShieldCheck } from "lucide-react";

import { getSessions } from "@/actions/auth/security/get-sessions";

import ConnectedDevices from "@/components/security/connected-devices";
import DangerZone from "@/components/security/danger-zone";
import SecurityTips from "@/components/security/security-tips";
import SecurityOverview from "@/components/security/security-overview";

export default async function SecurityPage() {
  const result = await getSessions();

  const sessions = result.success ? result.sessions : [];

  return (
    <div className="container mx-auto max-w-5xl py-10">
      {/* Header */}

      <section className="mb-8 flex items-start gap-4">
        <div className="rounded-2xl bg-primary/10 p-4">
          <ShieldCheck className="h-8 w-8 text-primary" />
        </div>

        <div>
          <h1 className="text-4xl font-bold tracking-tight">Security</h1>

          <p className="mt-2 max-w-2xl text-muted-foreground">
            Protect your account by managing connected devices, reviewing active
            sessions, and signing out from devices you no longer use.
          </p>
        </div>
      </section>

      {/* Overview */}

      <SecurityOverview
        sessionCount={sessions.length}
        emailVerified={true} // or session.user.emailVerified
      />

      {/* Connected Devices */}

      <ConnectedDevices sessions={sessions} />

      {/* Security Tips */}

      <SecurityTips />

      {/* Danger Zone */}

      <DangerZone />
    </div>
  );
}
