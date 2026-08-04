"use client";

import { useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

import type { LoginHistoryEntry } from "@/actions/auth/security/get-login-history";

import LoginHistoryList from "./login-history-list";

interface Props {
  history: LoginHistoryEntry[];
}

export default function LoginHistorySearch({ history }: Props) {
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? history.filter(
        (l) =>
          l.browser.toLowerCase().includes(query.toLowerCase()) ||
          l.os.toLowerCase().includes(query.toLowerCase()) ||
          l.ip.toLowerCase().includes(query.toLowerCase()) ||
          l.location.toLowerCase().includes(query.toLowerCase())
      )
    : history;

  return (
    <>
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search browser, OS or location..."
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <LoginHistoryList history={filtered} />
    </>
  );
}
