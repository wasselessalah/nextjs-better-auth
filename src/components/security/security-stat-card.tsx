import { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface SecurityStatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconClassName?: string;
  iconContainerClassName?: string;
}

export default function SecurityStatCard({
  title,
  value,
  icon: Icon,
  iconClassName,
  iconContainerClassName,
}: SecurityStatCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm text-muted-foreground">
            {title}
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            {value}
          </h2>
        </div>

        <div
          className={`rounded-xl p-3 ${
            iconContainerClassName ?? "bg-primary/10"
          }`}
        >
          <Icon
            className={`h-6 w-6 ${
              iconClassName ?? "text-primary"
            }`}
          />
        </div>
      </CardContent>
    </Card>
  );
}