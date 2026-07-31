import { User } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="container mx-auto max-w-4xl py-10">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <User className="h-6 w-6 text-primary" />
        </div>

        <div>
          <h1 className="text-3xl font-bold">
            My Profile
          </h1>

          <p className="text-muted-foreground">
            Manage your personal information and account.
          </p>
        </div>
      </div>

    </div>
  );
}