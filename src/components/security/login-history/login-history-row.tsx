import { CircleCheck, Globe } from "lucide-react";

import type { LoginHistoryEntry } from "@/actions/auth/security/get-login-history";

import DeviceIcon from "./device-icon";

interface Props {
  login: LoginHistoryEntry;
}

export default function LoginHistoryRow({ login }: Props) {
  return (
    <div className="rounded-xl border p-5 transition-colors hover:bg-muted/40">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-4">
          <div className="rounded-xl bg-primary/10 max-h-14 p-3">
            <DeviceIcon device={login.device} />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{login.browser}</h3>

              <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-600">
                <CircleCheck className="h-3 w-3" />
                {login.isCurrent ? "Current" : "Successful"}
              </span>
            </div>

            <p className="mt-1 text-sm text-muted-foreground">{login.os}</p>

            <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
              {login.location && <span>🌍 {login.location}</span>}
              <span>IP {login.ip}</span>
              <span>🕒 {login.createdAt}</span>
            </div>
          </div>
        </div>

        <Globe className="hidden h-5 w-5 text-muted-foreground md:block" />
      </div>
    </div>
  );
}
