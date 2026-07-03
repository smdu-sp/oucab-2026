"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export interface PortalNavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface PortalNavProps {
  items: PortalNavItem[];
  signOutSlot: React.ReactNode;
}

export function PortalNav({ items, signOutSlot }: PortalNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white border-b">
      <div className="max-w-5xl mx-auto px-4 py-1">
        {/* Desktop */}
        <div className="hidden sm:flex gap-1">
          {items.map(({ href, label, icon }) => (
            <Link key={href} href={href}>
              <Button variant={pathname === href ? "secondary" : "ghost"} size="sm" className="gap-1.5">
                {icon} {label}
              </Button>
            </Link>
          ))}
        </div>

        {/* Mobile */}
        <div className="sm:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1.5 -ml-2">
                <Menu className="w-5 h-5" /> Menu
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 px-4">
                {items.map(({ href, label, icon }) => (
                  <Link key={href} href={href} onClick={() => setOpen(false)}>
                    <Button
                      variant={pathname === href ? "secondary" : "ghost"}
                      size="sm"
                      className="w-full justify-start gap-1.5"
                    >
                      {icon} {label}
                    </Button>
                  </Link>
                ))}
                <div className="border-t mt-2 pt-2" onClick={() => setOpen(false)}>
                  {signOutSlot}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
