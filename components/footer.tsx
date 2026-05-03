import Link from "next/link";
import { Logo } from "@/components/logo";
import { Mail, MapPin, Phone, Instagram, Linkedin } from "lucide-react";

const COLUMNS = [
  {
    title: "Services",
    links: [
      { href: "/services#branding", label: "Branding & Identity" },
      { href: "/services#web", label: "Website & UI/UX" },
      { href: "/services#performance", label: "Performance Marketing" },
      { href: "/services#creative", label: "Creative & Content" },
      { href: "/services#pr", label: "PR & Growth" },
    ],
  },
  {
    title: "Studio",
    links: [
      { href: "/work", label: "Work" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-muted/30">
      <div className="container grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-5 max-w-sm text-sm text-muted-foreground">
            A creative + growth studio in Jaipur. We package brand, web, and performance
            marketing into one engine that turns attention into revenue.
          </p>
          <div className="mt-6 space-y-2 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-teal-500" />
              2-TA-8, Sector 2, Jawahar Nagar, Jaipur 302004
            </p>
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-teal-500" />
              <a href="mailto:hello@ingenioushub.com" className="hover:text-foreground">
                hello@ingenioushub.com
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-teal-500" />
              <a href="tel:+919999999999" className="hover:text-foreground">
                +91 99999 99999
              </a>
            </p>
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title} className="md:col-span-3">
            <h4 className="text-sm font-semibold text-foreground">{col.title}</h4>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="md:col-span-1 md:justify-self-end">
          <h4 className="text-sm font-semibold text-foreground">Social</h4>
          <div className="mt-4 flex gap-3">
            <a
              href="https://www.linkedin.com/company/ingenious-hub"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-teal-500 hover:text-teal-600"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://instagram.com/ingenioushub"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-teal-500 hover:text-teal-600"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container flex flex-col items-start justify-between gap-3 py-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Ingenious Hub Enterprise (P) Ltd. All rights reserved.</p>
          <p className="font-serif italic text-foreground/80">
            Building brands that perform.
          </p>
        </div>
      </div>
    </footer>
  );
}
