"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOutAiuvl } from "@/app/aiuvl/actions/auth";
import { useTransition } from "react";

export function SignOutBtn() {
  const [pending, startTransition] = useTransition();
  return (
    <Button
      variant="ghost"
      size="sm"
      disabled={pending}
      onClick={() => startTransition(async () => {
        await signOutAiuvl();
        window.location.href = "/aiuvl/login";
      })}
    >
      <LogOut className="w-4 h-4 mr-1" />
      Sair
    </Button>
  );
}
