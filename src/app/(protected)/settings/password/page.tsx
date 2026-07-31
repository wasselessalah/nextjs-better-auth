import Link from "next/link";
import { ArrowLeft, KeyRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ChangePasswordForm from "@/components/change-password-form";

export default function PasswordPage() {
  return (
    <div className="container mx-auto max-w-2xl py-10">
      <Button  variant="ghost" className="mb-6">
        <Link href="/settings">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Settings
        </Link>
      </Button>

      <div className="mb-8">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <KeyRound className="h-6 w-6 text-primary" />
        </div>

        <h1 className="text-3xl font-bold">Change Password</h1>

        <p className="mt-2 text-muted-foreground">
          Update your password to keep your account secure. Choose a strong
          password that you don t use anywhere else.
        </p>
      </div>

      <ChangePasswordForm />

      <Separator className="my-8" />

      <div className="flex flex-col items-center gap-2 text-center">
        <p className="text-sm text-muted-foreground">
          Don t remember your current password?
        </p>

        <Button variant="link" className="h-auto p-0">
          <Link href="/forgot-password">
            Forgot your password?
          </Link>
        </Button>
      </div>
    </div>
  );
}