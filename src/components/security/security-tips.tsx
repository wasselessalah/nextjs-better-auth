import { Shield } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const tips = [
  "Use a strong and unique password.",
  "Verify your email address.",
  "Review connected devices regularly.",
];

export default function SecurityTips() {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Security Tips</CardTitle>

        <CardDescription>
          Recommended practices to keep your account secure.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {tips.map((tip) => (
          <div
            key={tip}
            className="flex items-center gap-3"
          >
            <Shield className="h-5 w-5 text-primary" />

            <span>{tip}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}