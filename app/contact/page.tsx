import type { Metadata } from "next";
import { Mail, MessageCircle, Phone, MapPin, Timer } from "lucide-react";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us about your brand, your goals, and where you're stuck. We'll take it from there.",
};

export default function ContactPage() {
  return (
    <section className="border-b border-border py-16 md:py-24">
      <div className="container grid gap-10 md:grid-cols-12 md:gap-14">
        <div className="md:col-span-5">
          <p className="text-xs uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
            Contact
          </p>
          <h1 className="mt-3 text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            Let&rsquo;s build something{" "}
            <span className="font-serif italic">that works.</span>
          </h1>
          <p className="mt-4 max-w-md text-pretty text-base text-muted-foreground md:text-lg">
            Tell us about your brand, your goals, and where you&rsquo;re stuck.
            We&rsquo;ll take it from there.
          </p>

          <div className="mt-7 space-y-2.5">
            <a
              href="https://wa.me/919999999999?text=Hi%20Ingenious%20Hub%2C%20I%27d%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-xl border border-teal-500/30 bg-teal-500/5 p-4 transition-colors hover:bg-teal-500/10"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500 text-white">
                <MessageCircle className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">WhatsApp us</p>
                <p className="text-xs text-muted-foreground">Quickest path to the studio</p>
              </div>
            </a>

            <a
              href="mailto:hello@ingenioushub.com"
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-teal-500/40"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-foreground">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">hello@ingenioushub.com</p>
                <p className="text-xs text-muted-foreground">Brief, deck, or just a hello</p>
              </div>
            </a>

            <a
              href="tel:+919999999999"
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-teal-500/40"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-foreground">
                <Phone className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">+91 99999 99999</p>
                <p className="text-xs text-muted-foreground">Mon–Sat, 10am – 7pm IST</p>
              </div>
            </a>
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-xl border border-dashed border-border p-4 text-sm">
            <Timer className="mt-0.5 h-4 w-4 text-teal-500" />
            <p className="text-muted-foreground">
              <span className="font-medium text-foreground">Replies within 4 working hours.</span>{" "}
              From a human, never a bot.
            </p>
          </div>

          <div className="mt-5 flex items-start gap-3 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 h-4 w-4 text-teal-500" />
            2-TA-8, Sector 2, Jawahar Nagar, Jaipur 302004
          </div>
        </div>

        <div className="md:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
