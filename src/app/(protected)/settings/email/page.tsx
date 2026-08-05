import { Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import ChangeEmailForm from "@/components/change-email-form";

export default function ChangeEmailPage() {
  return (
    <div className="container mx-auto max-w-5xl py-10">
      {/* Back */}
      <div className="mb-6">
        <Link 
          href="/settings/security" 
          className={cn(buttonVariants({ variant: "ghost" }), "flex w-fit items-center")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Security
        </Link>
      </div>

      {/* Header */}
      <section className="mb-8 flex items-start gap-4">
        <div className="rounded-2xl bg-primary/10 p-4">
          <Mail className="h-8 w-8 text-primary" />
        </div>

        <div>
          <h1 className="text-4xl font-bold">Change Email</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Update your account s email address. We will send a verification code to your new address to confirm ownership.
          </p>
        </div>
      </section>

      {/* Form */}
      <ChangeEmailForm />
    </div>
  );
}
