import { ShieldAlert } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { SecurityActivityEntry } from "@/actions/auth/security/get-security-activity";

import ActivityRow from "./activity-row";

interface Props {
  activities: SecurityActivityEntry[];
}

export default function ActivityList({ activities }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          All security events sorted by most recent.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {activities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
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
  );
}
