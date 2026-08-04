import { ShieldCheck, CircleAlert } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  getStrength,
  STRENGTH_COLORS,
  STRENGTH_TEXT,
  STRENGTH_LABELS,
  PASSWORD_RULES,
} from "./password-strength-bar";

interface Props {
  newPassword: string;
}

export default function PasswordTips({ newPassword }: Props) {
  const strength = getStrength(newPassword);

  return (
    <div className="space-y-4">
      {/* Tips card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Password Tips</CardTitle>
          </div>
        </CardHeader>

        <CardContent className="space-y-3 text-sm text-muted-foreground">
          {[
            "Use a unique password not used on other sites",
            "Mix uppercase, lowercase, numbers and symbols",
            "Avoid personal info like your name or birthday",
            "Use a password manager to generate strong passwords",
            "Longer passwords are always stronger",
          ].map((tip) => (
            <div key={tip} className="flex gap-2">
              <span className="mt-0.5 text-primary">•</span>
              {tip}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Warning card */}
      <Card className="border-orange-200 bg-orange-50 dark:border-orange-900/30 dark:bg-orange-950/20">
        <CardContent className="p-4">
          <div className="flex gap-2 text-sm text-orange-700 dark:text-orange-400">
            <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />
            <p>
              Your current session will remain active. Only your password will
              be updated.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Live strength preview — only visible when typing */}
      {newPassword.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <p className="mb-2 text-sm font-medium">Strength Overview</p>
            <div className="flex gap-1">
              {PASSWORD_RULES.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                    i < strength ? STRENGTH_COLORS[strength] : "bg-muted"
                  }`}
                />
              ))}
            </div>
            <p
              className={`mt-1.5 text-xs font-medium ${STRENGTH_TEXT[strength]}`}
            >
              {STRENGTH_LABELS[strength]}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
