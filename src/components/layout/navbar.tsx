"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { 
    name: "Ministries", 
    href: "#",
    children: [
      { name: "Men's Ministry (KAMA)", href: "/ministries/men" },
      { name: "Women's Group (MU)", href: "/ministries/women" },
      { name: "Youth (SPYCE)", href: "/ministries/youth" },
      { name: "Sunday School", href: "/ministries/sunday-school" },
      { name: "Praise & Worship", href: "/ministries/praise" },
      { name: "Choir", href: "/ministries/choir" },
      { name: "Ushers Ministry", href: "/ministries/ushers" },
      { name: "Missions Dept.", href: "/ministries/missions" },
      { name: "OMBI (Prayer)", href: "/ministries/ombi" },
    ]
  },
  { 
    name: "Resources", 
    href: "#",
    children: [
      { name: "Sermons", href: "/sermons" },
      { name: "Blog & News", href: "/blog" },
      { name: "Gallery", href: "/gallery" },
      { name: "Succession (Inheritance)", href: "/resources/succession" },
    ]
  },
  { name: "Home Fellowships", href: "/fellowships" },
  { name: "Events", href: "/events" },
  { name: "Shop", href: "/shop" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-24 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group shrink-0">
            <div className="relative h-18 w-18 transition-transform group-hover:scale-105 text-primary">
              <Image src="/ackimage.ico" alt="ACK Logo" fill className="object-contain" priority />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-2xl font-black tracking-tighter text-primary sm:text-3xl">
                ACK <span className="text-secondary">St Paul's</span>
              </span>
              <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-muted-foreground">South C Parish</span>
            </div>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex lg:items-center lg:gap-6 xl:gap-10">
          {navItems.map((item) => (
            <div key={item.name} className="relative group">
              {item.children ? (
                <button
                  type="button"
                  className={cn(
                    "flex items-center gap-1 text-base font-bold transition-colors hover:text-primary",
                    item.children.some(child => pathname === child.href)
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {item.name}
                  <ChevronDown className="h-4 w-4" />
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "text-base font-bold transition-colors hover:text-primary pb-1",
                    pathname === item.href
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {item.name}
                </Link>
              )}

              {item.children && (
                <div className="absolute left-0 top-full hidden w-56 pt-2 group-hover:block">
                  <div className="rounded-lg border bg-background p-2 shadow-xl">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-md px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-primary"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <Button asChild variant="gold" size="sm" className="gap-2">
            <Link href="/donate">
              <Heart className="h-4 w-4" />
              Donate
            </Link>
          </Button>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="flex lg:hidden relative z-[70]">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 -mr-2 text-muted-foreground hover:text-primary transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute left-0 right-0 top-24 bg-background border-b lg:hidden z-[60] overflow-hidden"
          >
            <div className="flex flex-col p-4 max-h-[calc(100vh-6rem)] overflow-y-auto">
              {navItems.map((item) => (
                <div key={item.name} className="flex flex-col">
                  {item.children ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setActiveMenu(activeMenu === item.name ? null : item.name)}
                        className="flex items-center justify-between py-3 text-lg font-bold text-muted-foreground hover:text-primary border-b border-border/50"
                      >
                        {item.name}
                        <ChevronDown className={cn("h-5 w-5 transition-transform", activeMenu === item.name && "rotate-180")} />
                      </button>
                      <AnimatePresence>
                        {activeMenu === item.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-muted/30 rounded-lg overflow-hidden my-1"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.name}
                                href={child.href}
                                onClick={() => setIsOpen(false)}
                                className="block py-3 px-4 text-base font-medium text-muted-foreground hover:text-primary hover:bg-muted"
                              >
                                {child.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "py-3 text-lg font-bold transition-colors hover:text-primary border-b border-border/50",
                        pathname === item.href ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-6 pb-2">
                <Button asChild variant="gold" className="w-full h-12 text-lg font-bold gap-2">
                  <Link href="/donate" onClick={() => setIsOpen(false)}>
                    <Heart className="h-5 w-5" />
                    Donate Now
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
