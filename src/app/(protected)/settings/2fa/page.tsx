import { ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

import TwoFactorSection from "@/components/security/two-factor-section";

export default function TwoFactorPage() {
  return (
    <div className="container mx-auto max-w-5xl py-10">
      {/* Back */}
      <div className="mb-6">
        <Link 
          href="/settings" 
          className={cn(buttonVariants({ variant: "ghost" }), "flex w-fit items-center")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Settings
        </Link>
      </div>

      {/* Header */}
      <section className="mb-8 flex items-start gap-4">
        <div className="rounded-2xl bg-primary/10 p-4">
          <ShieldCheck className="h-8 w-8 text-primary" />
        </div>

        <div>
          <h1 className="text-4xl font-bold">Two-Factor Authentication</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Protect your account with an extra layer of security using an authenticator app.
          </p>
        </div>
      </section>

      {/* Form/Section */}
      <div className="max-w-2xl">
        <TwoFactorSection />
      </div>
    </div>
  );
}
