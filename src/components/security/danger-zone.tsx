import { TriangleAlert } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import SignOutAllDevices from "./sign-out-all-devices";

export default function DangerZone() {
  return (
    <Card className="mt-8 overflow-hidden border-destructive/30 bg-destructive/5">
      <CardHeader className="border-b border-destructive/10">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10">
            <TriangleAlert className="h-6 w-6 text-destructive" />
          </div>

          <div className="space-y-1">
            <CardTitle className="text-xl font-semibold text-destructive">
              Danger Zone
            </CardTitle>

            <CardDescription className="max-w-xl leading-6">
              These actions affect your account security. Signing out from all
              devices will immediately end every active session except your
              current one.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 p-6">
        <div className="rounded-xl border border-destructive/20 bg-background p-5">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="font-semibold">
                Sign out from all other devices
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                End every active session on browsers, phones, tablets, and other
                devices connected to your account. You'll need to sign in again
                on those devices.
              </p>
            </div>

            <div className="shrink-0">
              <SignOutAllDevices />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 p-4">
          <div className="flex items-start gap-3">
            <TriangleAlert className="mt-0.5 h-5 w-5 text-amber-600" />

            <div>
              <h4 className="text-sm font-semibold">
                Before you continue
              </h4>

              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>• Your current device will remain signed in.</li>
                <li>• All other devices will be logged out immediately.</li>
                <li>• You'll need to sign in again on those devices.</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}