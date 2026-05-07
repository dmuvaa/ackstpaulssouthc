"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  LayoutDashboard, 
  Heart, 
  Target, 
  ShoppingBag, 
  FileText, 
  Calendar,
  LogOut
} from "lucide-react";
import { logout } from "@/app/actions/auth";

export function MobileNav({ userEmail }: { userEmail?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Donations", href: "/admin/donations", icon: Heart },
    { name: "Donation Causes", href: "/admin/donations/causes", icon: Target },
    { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { name: "Magazines", href: "/admin/magazines", icon: FileText },
    { name: "Events", href: "/admin/events", icon: Calendar },
    { name: "Blog Posts", href: "/admin/blog", icon: FileText },
  ];

  return (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        className="md:hidden" 
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <aside className="fixed inset-y-0 left-0 w-64 bg-white flex flex-col shadow-xl">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold text-primary">Admin Panel</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="flex-1 p-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-primary rounded-lg transition-colors"
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="p-4 border-t space-y-4">
              <div className="px-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Logged in as</p>
                <p className="text-sm font-medium text-primary truncate">{userEmail}</p>
              </div>
              <form action={logout}>
                <Button type="submit" variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </form>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
