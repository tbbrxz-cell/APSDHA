"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Drawer } from "vaul";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled ? "glass shadow-soft" : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-army text-sm font-bold text-gold transition-colors group-hover:bg-army-light">
            APS
          </span>
          <span className="hidden max-w-[200px] text-sm font-semibold leading-tight text-white sm:block lg:max-w-none lg:text-base">
            {SITE_NAME}
          </span>
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "rounded-lg px-2.5 py-2 text-xs sm:text-sm font-medium transition-colors",
                    isActive
                      ? "bg-army/60 text-gold"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <Drawer.Root open={open} onOpenChange={setOpen}>
          <Drawer.Trigger asChild className="lg:hidden">
            <button
              type="button"
              aria-label="Open menu"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/80 transition-colors hover:border-gold/30 hover:text-gold"
            >
              <Menu className="h-5 w-5" />
            </button>
          </Drawer.Trigger>

          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
            <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 mt-24 flex max-h-[85vh] flex-col rounded-t-2xl border border-white/10 bg-charcoal-light outline-none pb-[env(safe-area-inset-bottom)]">
              <div className="mx-auto mt-3 h-1.5 w-12 shrink-0 rounded-full bg-white/20" />
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                <span className="text-sm font-semibold text-gold">Menu</span>
                <Drawer.Close asChild>
                  <button
                    type="button"
                    aria-label="Close menu"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-white/60 hover:text-gold"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </Drawer.Close>
              </div>
              <ul className="overflow-y-auto px-4 py-4">
                {NAV_LINKS.map((link) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);

                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={cn(
                          "mb-1 flex rounded-xl px-4 py-3 text-base font-medium transition-colors",
                          isActive
                            ? "bg-army/50 text-gold"
                            : "text-white/80 hover:bg-white/5"
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </nav>
    </header>
  );
}
