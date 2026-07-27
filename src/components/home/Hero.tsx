import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <>
      {/* Background */}

      <div className="max-w-3xl space-y-8 text-center">
        {/* Badge */}
        <span className="inline-flex items-center rounded-full border bg-muted px-4 py-1 text-sm font-medium text-muted-foreground">
          Powered by Better Auth
        </span>

        {/* Heading */}
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          A Complete Authentication System Built with{" "}
          <span className="text-primary">Better Auth</span>
        </h1>

        {/* Description */}
        <p className="mx-auto max-w-2xl text-lg leading-8 text-muted-foreground">
          A modern, secure authentication solution featuring email and social
          sign-in, session management, account security, and seamless
          integration with Next.js.
        </p>

        {/* Actions */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" variant="ghost">
            <Link href="/sign-in">Access Account</Link>
          </Button>

          <Button size="lg">
            <Link
              href="/sign-up"
              className="group inline-flex items-center gap-2">
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
