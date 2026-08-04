import { KeyRound, ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import ChangePasswordForm from "@/components/change-password-form";

export default function PasswordPage() {
  return (
    <div className="container mx-auto max-w-5xl py-10">
      {/* Back */}
      <Button variant="ghost" className="mb-6">
        <Link href="/settings" className="flex">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Settings
        </Link>
      </Button>

      {/* Header */}
      <section className="mb-8 flex items-start gap-4">
        <div className="rounded-2xl bg-primary/10 p-4">
          <KeyRound className="h-8 w-8 text-primary" />
        </div>

        <div>
          <h1 className="text-4xl font-bold">Change Password</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Update your password to keep your account secure. Choose a strong
            password that you don&apos;t use anywhere else.
          </p>
        </div>
      </section>

      {/* Form + sidebar — layout handled inside ChangePasswordForm */}
      <ChangePasswordForm />
    </div>
  );
}
