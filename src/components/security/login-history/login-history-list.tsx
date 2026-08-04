import { History } from "lucide-react";
import type { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { LoginHistoryEntry } from "@/actions/auth/security/get-login-history";

import LoginHistoryRow from "./login-history-row";

interface Props {
  history: LoginHistoryEntry[];
  /** Optional slot — used to inject the Pagination component */
  children?: ReactNode;
}

export default function LoginHistoryList({ history, children }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Login History</CardTitle>
        <CardDescription>
          Every successful sign in to your account.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <History className="mb-4 h-10 w-10 text-muted-foreground" />
            <h3 className="font-semibold">No login history</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Your login history will appear here.
            </p>
          </div>
        ) : (
          <>
            {history.map((login) => (
              <LoginHistoryRow key={login.id} login={login} />
            ))}
            {children}
          </>
        )}
      </CardContent>
    </Card>
  );
}
