import type { Metadata } from "next";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us what you're working on. We reply within four working hours — from a human, not a bot.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container">
        <div className="grid gap-14 md:grid-cols-12 md:gap-16">
          {/* LEFT — calm intro + alt channels */}
          <aside className="md:col-span-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Contact — Send a brief
            </p>
            <h1 className="mt-4 text-balance font-display text-d-2 font-light leading-[1.05]">
              Tell us what you&rsquo;re{" "}
              <span className="text-gradient-brand font-serif italic">
                working on.
              </span>
            </h1>
            <p className="mt-7 max-w-md text-body-lg text-muted-foreground">
              A short brief is enough. We&rsquo;ll reply within four working hours
              with a clear next step — even if it&rsquo;s to politely tell you we&rsquo;re
              not the right fit.
            </p>

            <ul className="mt-10 space-y-3 border-t border-border pt-7">
              <ContactChannel
                href="https://wa.me/919587015816?text=Hi%20Ingenious%20Hub%2C%20I%27d%20like%20to%20discuss%20a%20project."
                icon={MessageCircle}
                primary="WhatsApp the studio"
                secondary="Fastest path to a real reply"
                external
              />
              <ContactChannel
                href="mailto:hello@ingenioushub.com"
                icon={Mail}
                primary="hello@ingenioushub.com"
                secondary="Email if you have a deck attached"
              />
              <ContactChannel
                href="tel:+919587015816"
                icon={Phone}
                primary="+91 95870 15816"
                secondary="Mon–Sat, 10am – 7pm IST"
              />
            </ul>

            <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-6 text-sm">
              <Meta label="Reply window" value="< 4 working hrs" />
              <Meta label="Engagements" value="3–4 per quarter" />
              <Meta label="Typical size" value="₹3L – ₹20L" />
              <Meta label="What we won't take" value="Logo-only briefs" />
            </div>

            <p className="mt-10 max-w-md text-xs text-muted-foreground">
              Privacy: details submitted here go to{" "}
              <span className="font-mono">hello@ingenioushub.com</span> and a
              confirmation copy to you. We don&rsquo;t store, sell, or share them.
            </p>
          </aside>

          {/* RIGHT — form */}
          <div className="md:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactChannel({
  href,
  icon: Icon,
  primary,
  secondary,
  external,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  primary: string;
  secondary: string;
  external?: boolean;
}) {
  return (
    <li>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className="focus-ring group flex items-center gap-4 rounded-2xl border border-border p-4 transition-colors hover:border-foreground hover:bg-muted/30"
      >
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-foreground">
          <Icon className="h-4 w-4" />
        </span>
        <span className="flex-1">
          <span className="block font-medium tracking-tight">{primary}</span>
          <span className="block text-xs text-muted-foreground">
            {secondary}
          </span>
        </span>
      </a>
    </li>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 font-medium tracking-tight">{value}</div>
    </div>
  );
}
