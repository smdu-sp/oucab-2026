"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export function SignOutBtn() {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={async () => {
        await signOut({ redirect: false });
        window.location.href = "/oucab/login";
      }}
    >
      <LogOut className="w-4 h-4 mr-1" />
      Sair
    </Button>
  );
}
