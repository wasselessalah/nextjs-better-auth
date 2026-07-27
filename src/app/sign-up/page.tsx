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
  const [name, setName] = useState("");
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
            Sign Up
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Create your account and get started.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                onChange={(e) => setName(e.target.value)}
                className="h-11"
                id="name"
                value={name}
                type="text"
                placeholder="Your name (ex: Wassel)"
                required
              />
            </div>

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
      Signing up...
    </>
  ) : (
    "Sign In"
  )}
</Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-medium text-primary transition-colors hover:underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
