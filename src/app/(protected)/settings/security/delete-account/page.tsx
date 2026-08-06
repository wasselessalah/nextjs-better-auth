import { ArrowLeft, UserX } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

import DeleteAccountForm from "@/components/delete-account-form";

export default function DeleteAccountPage() {
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
        <div className="rounded-2xl bg-destructive/10 p-4">
          <UserX className="h-8 w-8 text-destructive" />
        </div>

        <div>
          <h1 className="text-4xl font-bold">Delete Account</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Permanently remove your account and all associated data from the platform.
          </p>
        </div>
      </section>

      {/* Form */}
      <div className="max-w-2xl">
        <DeleteAccountForm />
      </div>
    </div>
  );
}
