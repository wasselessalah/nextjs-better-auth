"use client";

import { ReactNode, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { UAParser } from "ua-parser-js";
import {
  Loader2,
  LogOut,
  Laptop,
  Smartphone,
  Tablet,
  Globe,
} from "lucide-react";

import {
  FaChrome,
  FaFirefox,
  FaSafari,
  FaEdge,
  FaOpera,
} from "react-icons/fa";
import { SiBrave } from "react-icons/si";

import { revokeSession } from "@/actions/auth/security/revoke-session";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface SessionCardProps {
  token: string;
  userAgent?: string;
}

function getBrowserIcon(browser?: string): ReactNode {
  switch (browser?.toLowerCase()) {
    case "chrome":
      return <FaChrome className="h-5 w-5 text-primary" />;

    case "firefox":
      return <FaFirefox className="h-5 w-5 text-primary" />;

    case "safari":
      return <FaSafari className="h-5 w-5 text-primary" />;

    case "edge":
      return <FaEdge className="h-5 w-5 text-primary" />;

    case "opera":
      return <FaOpera className="h-5 w-5 text-primary" />;

    case "brave":
      return <SiBrave className="h-5 w-5 text-primary" />;

    default:
      return <Globe className="h-5 w-5 text-primary" />;
  }
}

function getDeviceIcon(type?: string): ReactNode {
  switch (type) {
    case "mobile":
      return <Smartphone className="h-8 w-8 text-destructive" />;

    case "tablet":
      return <Tablet className="h-8 w-8 text-destructive" />;

    default:
      return <Laptop className="h-8 w-8 text-destructive" />;
  }
}

export default function SessionCard({
  token,
  userAgent,
}: SessionCardProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const parser = new UAParser(userAgent ?? "");

  const browser = parser.getBrowser().name ?? "Unknown Browser";
  const browserVersion = parser.getBrowser().version ?? "";
  const os = parser.getOS().name ?? "Unknown OS";
  const device = parser.getDevice().type ?? "desktop";

  function handleSignOut() {
    startTransition(async () => {
      try {
        const result = await revokeSession(token);

        if (!result.success) {
          console.error("Error ");
          return;
        }

        setOpen(false);
        router.refresh();
      } catch (error) {
        console.error(error);
      }
    });
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={(value) => {
        if (!pending) setOpen(value);
      }}
    >
      <AlertDialogTrigger >
        <Button variant="outline" size="sm">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            {getDeviceIcon(device)}
          </div>

          <AlertDialogTitle className="text-center">
            Sign out this device?
          </AlertDialogTitle>

          <AlertDialogDescription className="text-center">
            This device will immediately lose access to your account.
            You can sign back in later at any time.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="rounded-lg border bg-muted/40 p-4">
          <div className="flex items-center gap-3">
            {getBrowserIcon(browser)}

            <div>
              <p className="font-medium">
                {browser} {browserVersion}
              </p>

              <p className="text-sm text-muted-foreground">
                {os}
              </p>
            </div>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={pending}
            onClick={(e) => {
              e.preventDefault();
              handleSignOut();
            }}
            className="bg-destructive hover:bg-destructive/90"
          >
            {pending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing Out...
              </>
            ) : (
              <>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}