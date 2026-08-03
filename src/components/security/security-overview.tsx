import {
  CheckCircle2,
  Laptop,
  ShieldCheck,
} from "lucide-react";

import SecurityStatCard from "./security-stat-card";

interface SecurityOverviewProps {
  sessionCount: number;
  emailVerified: boolean;
}

export default function SecurityOverview({
  sessionCount,
  emailVerified,
}: SecurityOverviewProps) {
  return (
    <div className="mb-8 grid gap-4 md:grid-cols-3">
      <SecurityStatCard
        title="Active Devices"
        value={sessionCount}
        icon={Laptop}
      />

      <SecurityStatCard
        title="Account Status"
        value="Protected"
        icon={ShieldCheck}
        iconClassName="text-green-600"
        iconContainerClassName="bg-green-500/10"
      />

      <SecurityStatCard
        title="Email"
        value={emailVerified ? "Verified" : "Unverified"}
        icon={CheckCircle2}
        iconClassName={
          emailVerified
            ? "text-green-600"
            : "text-yellow-600"
        }
        iconContainerClassName={
          emailVerified
            ? "bg-green-500/10"
            : "bg-yellow-500/10"
        }
      />
    </div>
  );
}