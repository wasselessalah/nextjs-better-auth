import { getSession } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getSession();

  if (session?.user.role === "admin") {
    redirect("/admin/dashboard");
  }

  return (
    <div className="flex flex-col gap-4 p-8">
      <h1 className="text-3xl font-bold">User Dashboard</h1>
      <p className="text-muted-foreground">
        Welcome back, {session?.user.name}.
      </p>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold">My Courses</h2>
          <p className="text-3xl font-bold mt-2">4</p>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Completed</h2>
          <p className="text-3xl font-bold mt-2">12</p>
        </div>
      </div>
    </div>
  );
}