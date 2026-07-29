"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth/auth-client";

type AuthContextType = {
  session: ReturnType<typeof useSession>["data"];
  loading: boolean;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

const PUBLIC_ROUTES = [
  "/sign-in",
  "/sign-up",
  "/forgot-password",
  "/reset-password",
];

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const {
    data: session,
    isPending,
    refetch,
  } = useSession();

  useEffect(() => {
    if (isPending) return;

    // User is not logged in
    if (!session) {
      if (!PUBLIC_ROUTES.includes(pathname)) {
        router.replace("/sign-in");
      }
      return;
    }

    // Logged in but email not verified
    if (
      !session.user.emailVerified &&
      pathname !== "/verify-email"
    ) {
      router.replace(
        `/verify-email?email=${encodeURIComponent(
          session.user.email
        )}`
      );
      return;
    }

    // Logged in and verified
    if (
      session.user.emailVerified &&
      pathname === "/verify-email"
    ) {
      router.replace("/dashboard");
    }
  }, [session, isPending, pathname, router]);

  const value = useMemo(
    () => ({
      session,
      loading: isPending,
      refresh: refetch,
    }),
    [session, isPending, refetch]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuthContext must be used inside AuthProvider"
    );
  }

  return context;
}