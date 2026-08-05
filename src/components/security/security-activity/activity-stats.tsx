import { Card, CardContent } from "@/components/ui/card";

interface Props {
  total: number;
  signInCount: number;
  signOutCount: number;
  passwordChangeCount: number;
  emailChangeCount: number;
}

export default function ActivityStats({
  total,
  signInCount,
  signOutCount,
  passwordChangeCount,
  emailChangeCount,
}: Props) {
  return (
    <div className="mb-6 grid gap-4 md:grid-cols-4">
      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">Total Events</p>
          <h2 className="mt-2 text-3xl font-bold">{total}</h2>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">Sign Ins</p>
          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {signInCount}
          </h2>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">Sign Outs</p>
          <h2 className="mt-2 text-3xl font-bold text-orange-600">
            {signOutCount}
          </h2>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">Account Changes</p>
          <h2 className="mt-2 text-3xl font-bold text-blue-600">
            {passwordChangeCount + emailChangeCount}
          </h2>
        </CardContent>
      </Card>
    </div>
  );
}
