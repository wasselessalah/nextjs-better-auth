"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import SignOutButton from "../shared/sign-out-btn";
import { useSession } from "@/lib/auth/auth-client";

function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight transition-colors hover:text-primary">
          Auth
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-3">
          {session?.user ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" className="font-medium">
                  Dashboard
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button
                    variant="ghost"
                    className="h-10 w-10 rounded-full p-0 transition-all hover:bg-accent hover:scale-105">
                    <Avatar className="h-9 w-9 border border-border shadow-sm">
                      <AvatarFallback className="bg-primary font-semibold text-primary-foreground">
                        {session.user.name[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-64 rounded-xl border border-border/60 p-2 shadow-xl">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="p-0">
                      <div className="flex items-center gap-3 rounded-lg bg-muted/40 p-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary font-semibold text-primary-foreground">
                            {session.user.name[0].toUpperCase()}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex min-w-0 flex-col">
                          <p className="truncate text-sm font-semibold">
                            {session.user.name}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {session.user.email}
                          </p>
                        </div>
                      </div>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator className="my-2" />

                    <SignOutButton />
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/sign-in">
                <Button variant="ghost" className="font-medium">
                  Log in
                </Button>
              </Link>

              <Link href="/sign-up">
                <Button className="rounded-lg px-6 font-medium shadow-sm transition-all hover:shadow-md">
                  Sign up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
