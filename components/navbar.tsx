"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Home", num: "01" },
  { href: "/services", label: "Services", num: "02" },
  { href: "/work", label: "Work", num: "03" },
  { href: "/about", label: "About", num: "04" },
  { href: "/contact", label: "Contact", num: "05" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <span
        className="scroll-progress"
        style={{ ["--progress" as string]: `${progress}%` }}
        aria-hidden
      />
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-border/60 bg-background/80 backdrop-blur-md backdrop-saturate-150"
            : "bg-transparent"
        )}
      >
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center" aria-label="Ingenious Hub home">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {NAV.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <span className="font-mono text-[10px] opacity-50">{item.num}</span>
                  {item.label}
                  {active && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-px bg-teal-500" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/contact"
              className="hidden h-10 items-center gap-2 rounded-full bg-foreground px-4 text-sm font-medium text-background transition-transform hover:-translate-y-0.5 md:inline-flex"
            >
              Book Call
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border md:hidden"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-border bg-background md:hidden">
            <div className="container flex flex-col py-4">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-baseline justify-between border-b border-border py-3 text-2xl font-medium tracking-tight last:border-b-0"
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {item.num}
                  </span>
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-4 inline-flex h-12 items-center justify-between rounded-full bg-foreground px-5 text-sm font-medium text-background"
              >
                Book a Free Strategy Call
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
