"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

/**
 * Navbar — Ogilvy-shape: nav links left, wordmark centered, theme right.
 *
 * Structure matches the live ingenioushub.com primary nav:
 *   Explore ▾ (About Us · Services · Process · Contact Us)
 *   Work
 *   Clients
 *   Blogs
 *
 * Explore opens on hover (desktop) or tap (touch). The dropdown sits
 * absolutely beneath the link with a quiet entrance.
 *
 * Mobile collapses to a hamburger that opens a full-screen sheet. The
 * Explore items inline as a sub-list inside the sheet rather than as
 * a nested dropdown — sheets are easier to thumb.
 *
 * Scroll-progress hairline mutates the DOM via ref (no React re-renders
 * on every scroll event).
 */

type NavItem =
  | { type: "link"; href: string; label: string }
  | { type: "group"; label: string; items: { href: string; label: string }[] };

const NAV: NavItem[] = [
  {
    type: "group",
    label: "Explore",
    items: [
      { href: "/about", label: "About Us" },
      { href: "/services", label: "Services" },
      { href: "/process", label: "Process" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
  { type: "link", href: "/work", label: "Work" },
  { type: "link", href: "/clients", label: "Clients" },
  { type: "link", href: "/blogs", label: "Blogs" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [exploreOpen, setExploreOpen] = React.useState(false);
  const progressRef = React.useRef<HTMLDivElement>(null);
  const headerRef = React.useRef<HTMLElement>(null);
  const exploreRef = React.useRef<HTMLDivElement>(null);

  // Scroll-progress hairline + scrolled flag
  React.useEffect(() => {
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

  // Close mobile menu + Explore on route change
  React.useEffect(() => {
    setOpen(false);
    setExploreOpen(false);
  }, [pathname]);

  // Lock body scroll while mobile menu open
  React.useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Outside-tap + Escape close
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setExploreOpen(false);
      }
    };
    const onPointer = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      // Close Explore if click is outside it
      if (exploreOpen && exploreRef.current && !exploreRef.current.contains(target)) {
        setExploreOpen(false);
      }
      // Close mobile sheet if click is outside the header
      if (open && headerRef.current && !headerRef.current.contains(target)) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open, exploreOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <>
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
        <div className="container grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-4">
          {/* LEFT — primary nav (desktop) */}
          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Primary navigation"
          >
            {NAV.map((item) => {
              if (item.type === "group") {
                return (
                  <div
                    key={item.label}
                    ref={exploreRef}
                    className="relative"
                    onMouseEnter={() => setExploreOpen(true)}
                    onMouseLeave={() => setExploreOpen(false)}
                  >
                    <button
                      type="button"
                      onClick={() => setExploreOpen((v) => !v)}
                      aria-expanded={exploreOpen}
                      aria-haspopup="menu"
                      className={cn(
                        "focus-ring inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                        item.items.some((i) => isActive(i.href))
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-300",
                          exploreOpen && "rotate-180"
                        )}
                        aria-hidden
                      />
                    </button>

                    {/* Dropdown panel */}
                    <div
                      role="menu"
                      aria-label="Explore"
                      className={cn(
                        "absolute left-0 top-full pt-3 transition-all duration-200",
                        exploreOpen
                          ? "pointer-events-auto opacity-100"
                          : "pointer-events-none -translate-y-1 opacity-0"
                      )}
                    >
                      <div className="min-w-[200px] overflow-hidden rounded-2xl border border-border bg-background/95 py-2 shadow-[0_30px_80px_-40px_rgba(14,13,10,0.35)] backdrop-blur-md dark:shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)]">
                        {item.items.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            role="menuitem"
                            className={cn(
                              "focus-ring block px-5 py-2.5 text-sm transition-colors",
                              isActive(sub.href)
                                ? "text-foreground"
                                : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                            )}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              const active = isActive(item.href);
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

          {/* CENTER — wordmark */}
          <Link
            href="/"
            className="focus-ring flex items-center justify-center px-2"
            aria-label="Ingenious Hub home"
          >
            <Logo />
          </Link>

          {/* RIGHT — theme toggle (desktop) + mobile menu trigger */}
          <div className="flex items-center justify-end gap-2">
            <ThemeToggle />
            <button
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

        {/* MOBILE SHEET */}
        {open && (
          <div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="border-t border-border bg-background md:hidden"
          >
            <div className="container flex flex-col py-6">
              {NAV.map((item) => {
                if (item.type === "group") {
                  return (
                    <div
                      key={item.label}
                      className="border-b border-border last:border-b-0"
                    >
                      <p className="-mx-2 px-2 pb-2 pt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                        {item.label}
                      </p>
                      <ul>
                        {item.items.map((sub) => (
                          <li key={sub.href}>
                            <Link
                              href={sub.href}
                              className="focus-ring -mx-2 block px-2 py-3 font-display text-h-3 font-light tracking-tight"
                            >
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="focus-ring -mx-2 border-b border-border py-4 px-2 font-display text-h-3 font-light tracking-tight last:border-b-0"
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Mobile backdrop — taps close the sheet */}
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
