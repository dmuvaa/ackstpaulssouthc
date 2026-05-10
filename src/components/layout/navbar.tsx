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
  { 
    name: "About", 
    href: "#",
    children: [
      { name: "Our Profile", href: "/about" },
      { name: "Leadership", href: "/about#leadership" },
    ]
  },
  { name: "Church Services", href: "/services" },
  { 
    name: "Ministries", 
    href: "#",
    children: [
      { name: "Kenya Anglican Men Association - KAMA", href: "/ministries/men" },
      { name: "Mothers Union – MU", href: "/ministries/women" },
      { name: "Youth", href: "/ministries/youth" },
      { name: "Teens", href: "#" },
      { name: "Sunday School", href: "/ministries/sunday-school" },
      { name: "TEE", href: "#" },
      { name: "OMBI", href: "/ministries/ombi" },
      { name: "Fellowship Groups", href: "/fellowships" },
      { name: "Choir", href: "/ministries/choir" },
      { name: "Praise and Worship (Melodies of Christ Band)", href: "/ministries/praise" },
      { name: "Media & Communication", href: "#" },
    ]
  },
  { name: "Events", href: "/events" },
  { name: "Shop", href: "/shop" },
  { name: "Contact", href: "/contact" },
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
                ACK <span className="text-secondary">St Paul&apos;s</span>
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
                        key={child.name}
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
          <div className="flex items-center gap-3 ml-2">
            <Link href="https://www.instagram.com/ack_st_pauls_parish_southc" target="_blank" rel="noopener noreferrer" className="text-[#E1306C] hover:opacity-80 transition-opacity" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="18" height="18" fill="currentColor">
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.8 9.9 67.6 36.1 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.9 0-184.9zm-41.7 246.5c-7.7 19.5-22.6 34.4-42.1 42.1-29.4 11.6-99.2 8.9-132.7 8.9s-103.3 2.6-132.7-8.9c-19.5-7.7-34.4-22.6-42.1-42.1-11.6-29.4-8.9-99.2-8.9-132.7s-2.6-103.3 8.9-132.7c7.7-19.5 22.6-34.4 42.1-42.1 29.4-11.6 99.2-8.9 132.7-8.9s103.3-2.6 132.7 8.9c19.5 7.7 34.4 22.6 42.1 42.1 11.6 29.4 8.9 99.2 8.9 132.7s2.7 103.3-8.9 132.7z"/>
              </svg>
            </Link>
            <Link href="https://www.tiktok.com/@ackstpaulsparishsouthc" target="_blank" rel="noopener noreferrer" className="text-[#000000] hover:opacity-80 transition-opacity" aria-label="TikTok">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="18" height="18" fill="currentColor">
                <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
              </svg>
            </Link>
          </div>
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
