"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="container mx-auto flex flex-col gap-6 px-6 py-8">
      <Skeleton className="h-10 w-48" />

      <div className="grid gap-6 md:grid-cols-3">
        <Skeleton className="h-40 rounded-xl" />
        <Skeleton className="h-40 rounded-xl" />
        <Skeleton className="h-40 rounded-xl" />
      </div>

      <Skeleton className="h-64 rounded-xl" />
    </main>
  );
}