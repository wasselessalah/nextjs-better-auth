"use client";

import { useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Pagination from "@/components/ui/pagination";

import type { LoginHistoryEntry } from "@/actions/auth/security/get-login-history";

import LoginHistoryList from "./login-history-list";

const PAGE_SIZE = 5;

interface Props {
  history: LoginHistoryEntry[];
}

export default function LoginHistorySearch({ history }: Props) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = query.trim()
    ? history.filter(
        (l) =>
          l.browser.toLowerCase().includes(query.toLowerCase()) ||
          l.os.toLowerCase().includes(query.toLowerCase()) ||
          l.ip.toLowerCase().includes(query.toLowerCase()) ||
          l.location.toLowerCase().includes(query.toLowerCase())
      )
    : history;

  // Reset to page 1 on every new search
  function handleSearch(value: string) {
    setQuery(value);
    setPage(1);
  }

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search browser, OS or location..."
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <LoginHistoryList history={paginated}>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          totalItems={filtered.length}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
        />
      </LoginHistoryList>
    </>
  );
}
