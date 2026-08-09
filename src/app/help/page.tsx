import { Metadata } from "next";
import { Book, Shield, Key, History, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Help & Documentation | Better Auth",
  description: "Learn how to use the Better Auth authentication system.",
};

export default function HelpPage() {
  return (
    <div className="container mx-auto max-w-4xl px-6 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight">
          Help & Documentation
        </h1>
        <p className="text-lg text-muted-foreground">
          Everything you need to know about using our secure authentication platform.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Getting Started */}
        <section className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <Book className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold">Getting Started</h2>
          </div>
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              <strong>Creating an Account:</strong> Click the "Sign up" button in the top right. You can register using your email address, or via Google/GitHub for faster access.
            </p>
            <p>
              <strong>Email Verification:</strong> If you sign up with an email, you'll receive a 6-digit OTP (One Time Password) to verify your account. Enter it to activate your account.
            </p>
          </div>
        </section>

        {/* Account Security */}
        <section className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <Shield className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold">Account Security (2FA)</h2>
          </div>
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              <strong>Two-Factor Authentication:</strong> Enhance your account's security by navigating to <em>Settings &gt; Security</em>.
            </p>
            <p>
              <strong>Authenticator App:</strong> Scan the provided QR code with apps like Google Authenticator or Authy to generate secure verification codes.
            </p>
            <p>
              <strong>Backup Codes:</strong> Save your generated backup codes in a safe place. You can use these to log in if you lose access to your authenticator app.
            </p>
          </div>
        </section>

        {/* Managing Credentials */}
        <section className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <Key className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold">Managing Credentials</h2>
          </div>
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              <strong>Changing Password:</strong> Go to <em>Settings &gt; Password</em> to update your password. Use our live strength meter to ensure it meets strong security criteria.
            </p>
            <p>
              <strong>Updating Email:</strong> Go to <em>Settings &gt; Email</em>. You'll need to verify your new email address with an OTP. For security, an alert will be sent to your old email address.
            </p>
          </div>
        </section>

        {/* Audit & Logs */}
        <section className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <History className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold">Audit & Logs</h2>
          </div>
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              <strong>Login History:</strong> View all your past logins from <em>Settings &gt; Security &gt; Login History</em>. You can see the browser, OS, and IP address used.
            </p>
            <p>
              <strong>Security Activity:</strong> Track important account changes (e.g., password changes, sign-outs) from the <em>Security Activity</em> page.
            </p>
            <p>
              <strong>Active Sessions:</strong> Remote logout is available if you left your account logged in on another device.
            </p>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="md:col-span-2 rounded-xl border border-destructive/20 bg-destructive/5 p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-lg bg-destructive/10 p-2 text-destructive">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold text-destructive">Danger Zone</h2>
          </div>
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              <strong>Account Deletion:</strong> If you wish to permanently delete your account and all associated data, you can do so in the Danger Zone under <em>Settings &gt; Security</em>.
            </p>
            <p>
              This action requires your current password to verify your identity and is <strong>irreversible</strong>.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
