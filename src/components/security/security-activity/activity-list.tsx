"use client";

import { useState } from "react";
import { ShieldAlert } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Pagination from "@/components/ui/pagination";

import type { SecurityActivityEntry } from "@/actions/auth/security/get-security-activity";

import ActivityRow from "./activity-row";

const PAGE_SIZE = 5;

interface Props {
  activities: SecurityActivityEntry[];
}

export default function ActivityList({ activities }: Props) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(activities.length / PAGE_SIZE);
  const paginated = activities.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

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
          <>
            {paginated.map((activity) => (
              <ActivityRow key={activity.id} activity={activity} />
            ))}
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              totalItems={activities.length}
              pageSize={PAGE_SIZE}
              onPageChange={setPage}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
}
