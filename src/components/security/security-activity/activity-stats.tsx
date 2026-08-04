import { Card, CardContent } from "@/components/ui/card";

interface Props {
  total: number;
  signInCount: number;
  signOutCount: number;
  passwordChangeCount: number;
}

export default function ActivityStats({
  total,
  signInCount,
  signOutCount,
  passwordChangeCount,
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
          <p className="text-sm text-muted-foreground">Password Changes</p>
          <h2 className="mt-2 text-3xl font-bold text-blue-600">
            {passwordChangeCount}
          </h2>
        </CardContent>
      </Card>
    </div>
  );
}
