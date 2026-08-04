import { Laptop, Smartphone, Tablet } from "lucide-react";

export default function DeviceIcon({ device }: { device: string }) {
  switch (device) {
    case "mobile":
      return <Smartphone className="h-6 w-6 text-primary" />;
    case "tablet":
      return <Tablet className="h-6 w-6 text-primary" />;
    default:
      return <Laptop className="h-6 w-6 text-primary" />;
  }
}
