"use client";
import { Button } from "@/components/ui/button";
import {
  CardDescription,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoding] = useState(false);
  const [error, setError] = useState("");
  


  async function handleSubmit(e:React.FormEvent){
    e.preventDefault();

    setError("")
    setLoding(true)

    try {
      
    } catch  {
      setError("Unexpected error occurred ")
    }finally{
      setLoding(false)
    }
  }
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <Card className="w-full max-w-md border-border/50 shadow-xl">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">
            Sign In
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Sign in to access your account and continue where you left off.{" "}
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="h-11"
                id="email"
                type="email"
                placeholder="wassel@gmail.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                className="h-11"
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                minLength={8}
                placeholder="••••••••"
                required
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button
  className="h-11 w-full"
  type="submit"
  disabled={loading}
>
  {loading ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Signing in...
    </>
  ) : (
    "Sign In"
  )}
</Button>

            <p className="text-center text-sm text-muted-foreground">
              Dont have an account? Create one.
              <Link
                href="/sign-up"
                className="font-medium text-primary transition-colors hover:underline">
                Create an account.
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
