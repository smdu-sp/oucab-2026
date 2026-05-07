"use client";

import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { signOutAiusce } from "@/app/aiusce/actions/auth";
import { useTransition } from "react";

export default function BtnSignOutAiusce() {
  const [pending, startTransition] = useTransition();
  return (
    <Button
      type="button"
      variant="ghost"
      disabled={pending}
      onClick={() => startTransition(async () => {
        try {
          await signOutAiusce();
        } catch (e) {
          if (e instanceof Error && 'digest' in e && String((e as any).digest).startsWith('NEXT_REDIRECT')) return;
        }
      })}
      className="w-full dark:bg-destructive hover:bg-destructive/10 dark:text-foreground dark:hover:bg-destructive/80 hover:text-destructive text-destructive flex items-center justify-center">
      <LogOut className="text-destructive dark:text-foreground" /> Sair
    </Button>
  );
}
