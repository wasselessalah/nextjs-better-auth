import Link from "next/link";
import { ChevronRight, Lock, Shield, User } from "lucide-react";

import {
  Card,
  CardContent,
  
} from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="container mx-auto max-w-3xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your account and security settings.
        </p>
      </div>

      <div className="space-y-4">
        <Link href="/settings/profile">
          <Card className="transition-colors hover:border-primary cursor-pointer">
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <User className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <h2 className="font-semibold">Profile</h2>
                  <p className="text-sm text-muted-foreground">
                    Update your name and account information.
                  </p>
                </div>
              </div>

              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>

        <Link href="/settings/password">
          <Card className="transition-colors hover:border-primary cursor-pointer">
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <Lock className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <h2 className="font-semibold">Password</h2>
                  <p className="text-sm text-muted-foreground">
                    Change your account password.
                  </p>
                </div>
              </div>

              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>
        <Link href="/settings/security">
          <Card className="transition-colors hover:border-primary cursor-pointer">
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <Shield className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <h2 className="font-semibold">Security</h2>
                  <p className="text-sm text-muted-foreground">
                    Manage your devices, active sessions, and account security.
                  </p>
                </div>
              </div>

              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
