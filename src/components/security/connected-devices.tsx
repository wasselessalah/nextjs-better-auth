/* eslint-disable @typescript-eslint/no-explicit-any */

import { UAParser } from "ua-parser-js";
import {
  CircleCheck,
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

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";

import SessionCard from "./session-card";

interface Props {
  sessions: any[];
}

function getBrowserIcon(browser?: string) {
  switch (browser?.toLowerCase()) {
    case "chrome":
      return FaChrome;

    case "firefox":
      return FaFirefox;

    case "safari":
      return FaSafari;

    case "edge":
      return FaEdge;

    case "opera":
      return FaOpera;

    case "brave":
      return SiBrave;

    default:
      return Globe;
  }
}

function getDeviceIcon(type?: string) {
  switch (type) {
    case "mobile":
      return Smartphone;

    case "tablet":
      return Tablet;

    default:
      return Laptop;
  }
}

export default function ConnectedDevices({
  sessions,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Connected Devices</CardTitle>

        <CardDescription>
          Review every device currently signed in to your
          account.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {sessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Laptop className="mb-4 h-10 w-10 text-muted-foreground" />

            <h3 className="font-semibold">
              No active devices
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Connected devices will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {sessions.map((session, index) => {
              const parser = new UAParser(
                session.userAgent ?? ""
              );

              const browser =
                parser.getBrowser().name ??
                "Unknown Browser";

              const browserVersion =
                parser.getBrowser().version ?? "";

              const os =
                parser.getOS().name ??
                "Unknown OS";

              const device =
                parser.getDevice().type ?? "desktop";

              const DeviceIcon =
                getDeviceIcon(device);

              const BrowserIcon =
                getBrowserIcon(browser);

              return (
                <div key={session.id}>
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex gap-4">
                      <div className="rounded-xl bg-primary/10 p-3">
                        <DeviceIcon className="h-6 w-6 text-primary" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">
                            {session.current
                              ? "This Device"
                              : "Connected Device"}
                          </h3>

                          {session.current && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-400">
                              <CircleCheck className="h-3 w-3" />
                              Current
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <BrowserIcon className="h-4 w-4 text-primary" />

                          <span>
                            {browser}{" "}
                            {browserVersion}
                          </span>
                        </div>

                        <p className="text-sm text-muted-foreground">
                          {os}
                        </p>

                        {/* <p className="text-xs text-muted-foreground">
                          IP Address:{" "}
                          {session.ipAddress ??
                            "Unknown"}
                        </p> */}

                        <p className="text-xs text-muted-foreground">
                          Signed in:{" "}
                          {new Date(
                            session.createdAt
                          ).toLocaleString()}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          Last activity:{" "}
                          {new Date(
                            session.updatedAt
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {!session.current && (
                      <SessionCard
                        token={session.token}
                        userAgent={
                          session.userAgent
                        }
                      />
                    )}
                  </div>

                  {index !==
                    sessions.length - 1 && (
                    <Separator className="mt-6" />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}