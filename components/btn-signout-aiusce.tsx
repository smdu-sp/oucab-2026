"use client";

import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { signOutAiusce } from "@/app/aiusce/actions/auth";

export default function BtnSignOutAiusce() {
  return (
    <form action={signOutAiusce} className="w-full">
      <Button
        type="submit"
        variant="ghost"
        className="w-full dark:bg-destructive hover:bg-destructive/10 dark:text-foreground dark:hover:bg-destructive/80 hover:text-destructive text-destructive flex items-center justify-center">
        <LogOut className="text-destructive dark:text-foreground" /> Sair
      </Button>
    </form>
  );
}
