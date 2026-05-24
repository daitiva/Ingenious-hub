"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const progressRef = React.useRef<HTMLDivElement>(null);
  const headerRef = React.useRef<HTMLElement>(null);
  const menuBtnRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    // rAF-batched. `scrolled` state only toggles on threshold crossings, so
    // React re-renders are rare. Progress hairline mutates DOM via ref and
    // never triggers a re-render at all.
    let raf = 0;
    let lastScrolled = false;

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        const isScrolled = y > 12;
        if (isScrolled !== lastScrolled) {
          lastScrolled = isScrolled;
          setScrolled(isScrolled);
        }
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        const p = max > 0 ? (y / max) * 100 : 0;
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${p / 100})`;
          progressRef.current.style.opacity = p > 1 ? "1" : "0";
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Close menu on route change
  React.useEffect(() => setOpen(false), [pathname]);

  // Lock body scroll while menu open
  React.useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape + outside-tap close. We listen on `pointerdown` so the close
  // fires before any click on the underlying content, and we ignore clicks
  // that originate inside the header (menu, toggle, logo, theme button).
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (headerRef.current?.contains(target)) return;
      setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <>
      {/* Scroll progress hairline — mutated via ref, never via React render */}
      <div
        ref={progressRef}
        aria-hidden
        className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-px origin-left bg-teal-600/70 opacity-0 transition-opacity duration-200 will-change-transform"
      />

      <header
        ref={headerRef}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-border/60 bg-background/85 backdrop-blur-md backdrop-saturate-150"
            : "bg-background/40 backdrop-blur-sm"
        )}
      >
        <div className="container flex h-16 items-center justify-between gap-6">
          <Link
            href="/"
            className="focus-ring -mx-2 flex items-center px-2"
            aria-label="Ingenious Hub home"
          >
            <Logo />
          </Link>

          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Primary navigation"
          >
            {NAV.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "focus-ring relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                  {active && (
                    <span
                      aria-hidden
                      className="absolute inset-x-3 -bottom-0.5 h-px bg-teal-600"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/contact"
              className="focus-ring hidden h-10 items-center gap-2 rounded-full bg-foreground px-4 text-sm font-medium text-background transition-transform hover:-translate-y-0.5 md:inline-flex"
            >
              Start a project
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <button
              ref={menuBtnRef}
              type="button"
              className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-border md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {open && (
          <div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="border-t border-border bg-background md:hidden"
          >
            <div className="container flex flex-col py-6">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="focus-ring -mx-2 border-b border-border py-4 px-2 font-display text-h-3 font-light tracking-tight last:border-b-0"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="focus-ring mt-5 inline-flex h-12 items-center justify-between rounded-full bg-foreground px-5 text-sm font-medium text-background"
              >
                Start a project
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Tap-anywhere-to-close backdrop. Only on mobile. Sits below the
          header (which is z-50) so taps on the menu itself land first. */}
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          tabIndex={-1}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-background/30 backdrop-blur-[2px] md:hidden"
        />
      )}
    </>
  );
}
