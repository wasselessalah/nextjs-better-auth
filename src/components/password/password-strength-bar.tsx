import { CircleCheck } from "lucide-react";

interface StrengthRule {
  label: string;
  test: (pw: string) => boolean;
}

export const PASSWORD_RULES: StrengthRule[] = [
  { label: "At least 8 characters", test: (pw) => pw.length >= 8 },
  { label: "Uppercase letter (A–Z)", test: (pw) => /[A-Z]/.test(pw) },
  { label: "Lowercase letter (a–z)", test: (pw) => /[a-z]/.test(pw) },
  { label: "Number (0–9)", test: (pw) => /\d/.test(pw) },
  {
    label: "Special character (!@#…)",
    test: (pw) => /[^A-Za-z0-9]/.test(pw),
  },
];

export function getStrength(pw: string): number {
  return PASSWORD_RULES.filter((r) => r.test(pw)).length;
}

export const STRENGTH_LABELS = [
  "",
  "Very Weak",
  "Weak",
  "Fair",
  "Strong",
  "Very Strong",
];

export const STRENGTH_COLORS = [
  "",
  "bg-red-500",
  "bg-orange-500",
  "bg-yellow-500",
  "bg-blue-500",
  "bg-green-500",
];

export const STRENGTH_TEXT = [
  "",
  "text-red-500",
  "text-orange-500",
  "text-yellow-500",
  "text-blue-500",
  "text-green-500",
];

// ─── Strength bar + checklist ─────────────────────────────────────────────────

export default function PasswordStrengthBar({
  password,
}: {
  password: string;
}) {
  if (!password) return null;

  const strength = getStrength(password);

  return (
    <div className="mt-2 space-y-2">
      {/* Segments */}
      <div className="flex gap-1">
        {PASSWORD_RULES.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              i < strength ? STRENGTH_COLORS[strength] : "bg-muted"
            }`}
          />
        ))}
      </div>

      {/* Label */}
      <p className={`text-xs font-medium ${STRENGTH_TEXT[strength]}`}>
        {STRENGTH_LABELS[strength]}
      </p>

      {/* Rules checklist */}
      <ul className="space-y-1">
        {PASSWORD_RULES.map((rule) => {
          const passed = rule.test(password);
          return (
            <li
              key={rule.label}
              className={`flex items-center gap-2 text-xs transition-colors ${
                passed ? "text-green-600" : "text-muted-foreground"
              }`}
            >
              <CircleCheck
                className={`h-3.5 w-3.5 shrink-0 transition-colors ${
                  passed ? "text-green-600" : "text-muted-foreground/40"
                }`}
              />
              {rule.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
