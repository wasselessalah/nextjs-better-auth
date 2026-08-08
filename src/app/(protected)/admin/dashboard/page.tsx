import { getSession } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const session = await getSession();

  if (!session || session.user.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col gap-4 p-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="text-muted-foreground">
        Welcome back, Administrator {session.user.name}.
      </p>
      
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-3xl font-bold mt-2">142</p>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Active Sessions</h2>
          <p className="text-3xl font-bold mt-2">28</p>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold">System Status</h2>
          <p className="text-3xl font-bold mt-2 text-green-500">Online</p>
        </div>
      </div>
    </div>
  );
}
