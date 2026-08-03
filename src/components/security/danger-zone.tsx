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
    <Card className="mt-6 border-destructive">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <TriangleAlert className="h-5 w-5" />

          Danger Zone
        </CardTitle>

        <CardDescription>
          Sign out from every other device connected to your account.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <SignOutAllDevices />
      </CardContent>
    </Card>
  );
}