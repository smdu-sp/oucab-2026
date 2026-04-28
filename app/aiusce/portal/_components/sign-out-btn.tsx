"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOutAiusce } from "@/app/aiusce/actions/auth";
import { useTransition } from "react";

export function SignOutBtn() {
  const [pending, startTransition] = useTransition();
  return (
    <Button
      variant="ghost"
      size="sm"
      disabled={pending}
      onClick={() => startTransition(async () => {
        await signOutAiusce();
        window.location.href = "/aiusce/login";
      })}
    >
      <LogOut className="w-4 h-4 mr-1" />
      Sair
    </Button>
  );
}
