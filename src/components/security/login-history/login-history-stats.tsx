import { Card, CardContent } from "@/components/ui/card";

import type { LoginHistoryEntry } from "@/actions/auth/security/get-login-history";

interface Props {
  total: number;
  history: LoginHistoryEntry[];
}

function getLastLoginLabel(history: LoginHistoryEntry[]): string {
  if (history.length === 0) return "N/A";
  return history[0].createdAt.split(" • ")[0];
}

export default function LoginHistoryStats({ total, history }: Props) {
  return (
    <div className="mb-6 grid gap-4 md:grid-cols-3">
      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">Total Logins</p>
          <h2 className="mt-2 text-3xl font-bold">{total}</h2>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">Last Login</p>
          <h2 className="mt-2 font-semibold">{getLastLoginLabel(history)}</h2>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">Status</p>
          <h2 className="mt-2 font-semibold text-green-600">Secure</h2>
        </CardContent>
      </Card>
    </div>
  );
}
