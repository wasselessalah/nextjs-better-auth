import Link from "next/link";
import { Button } from "../ui/button";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight transition-colors hover:text-primary"
        >
          Auth
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-3">
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
        </div>
      </div>
    </header>
  );
}

export default Navbar;