"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function AuthPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Button
        onClick={() => signIn("google", { callbackUrl: "/notes" })}
        className="gap-2"
      >
        Войти через Google
      </Button>
    </div>
  );
}
