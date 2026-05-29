"use client";

import * as React from "react";
import Script from "next/script";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const SCOPES = [
  { id: "branding", label: "Branding & Identity", hint: "Naming, identity, positioning, brand guides." },
  { id: "web", label: "Website & UI/UX", hint: "Product UI, marketing sites, design systems." },
  { id: "marketing", label: "Performance Marketing", hint: "Paid, SEO, lead generation." },
  { id: "pr", label: "PR & Founder Branding", hint: "Press, thought leadership, founder presence." },
  { id: "not-sure", label: "Not sure yet", hint: "Start with a strategy conversation." },
] as const;

const BUDGETS = [
  { id: "under-1l", label: "Under ₹1L" },
  { id: "1-3l", label: "₹1L – ₹3L" },
  { id: "3-8l", label: "₹3L – ₹8L" },
  { id: "8-20l", label: "₹8L – ₹20L" },
  { id: "20l-plus", label: "₹20L+" },
  { id: "not-sure", label: "Not sure yet" },
] as const;

type ScopeId = (typeof SCOPES)[number]["id"];
type BudgetId = (typeof BUDGETS)[number]["id"];
type Status = "idle" | "submitting" | "success" | "error";

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement | string,
        opts: {
          sitekey: string;
          callback: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
          appearance?: "always" | "execute" | "interaction-only";
          theme?: "light" | "dark" | "auto";
        }
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

export function ContactForm() {
  // Two-step flow: step 1 = pick scope, step 2 = details
  const [scope, setScope] = React.useState<ScopeId | null>(null);
  const [budget, setBudget] = React.useState<BudgetId | null>(null);

  // Form state
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [honeypot, setHoneypot] = React.useState("");
  const [status, setStatus] = React.useState<Status>("idle");
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  // Turnstile
  const turnstileRef = React.useRef<HTMLDivElement>(null);
  const widgetIdRef = React.useRef<string | null>(null);
  const [turnstileToken, setTurnstileToken] = React.useState<string | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  // Render time — sent as `t` so the server can verify human dwell
  const [renderedAt] = React.useState<number>(() => Date.now());

  // Mount the Turnstile widget on step 2 once the script is ready
  const renderTurnstile = React.useCallback(() => {
    if (!siteKey || !window.turnstile || !turnstileRef.current) return;
    if (widgetIdRef.current) return;
    widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
      sitekey: siteKey,
      callback: (t) => setTurnstileToken(t),
      "expired-callback": () => setTurnstileToken(null),
      "error-callback": () => setTurnstileToken(null),
      theme: "auto",
      appearance: "interaction-only",
    });
  }, [siteKey]);

  React.useEffect(() => {
    if (scope) {
      // Allow the script to settle if Step 1 is reached quickly
      const id = setTimeout(renderTurnstile, 100);
      return () => clearTimeout(id);
    }
  }, [scope, renderTurnstile]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg(null);

    try {
      const payload = {
        name: name.trim(),
        email: email.trim(),
        company: company.trim(),
        scope: scope ?? undefined,
        budget: budget ?? undefined,
        message: message.trim(),
        hp: honeypot,
        t: renderedAt,
        turnstileToken: turnstileToken ?? "",
      };

      // If Turnstile is not configured (dev), send a placeholder; the API
      // fails open in dev so this lets local development continue.
      if (!siteKey) {
        payload.turnstileToken = "DEV-NO-TURNSTILE";
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Submission failed.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please email hello@ingenioushub.com."
      );
      // Reset Turnstile so the user can re-submit
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
        setTurnstileToken(null);
      }
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-teal-600/30 bg-teal-600/[0.06] p-8 text-center md:p-12"
        role="status"
        aria-live="polite"
      >
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal-600 text-background">
          <Check className="h-5 w-5" />
        </span>
        <h3 className="mt-6 font-display text-h-2 font-light">
          Brief received.
        </h3>
        <p className="mt-3 text-pretty text-body text-muted-foreground">
          You&rsquo;ll hear from us within four working hours. If you sent the brief
          outside studio hours, by the next working morning.
        </p>
      </motion.div>
    );
  }

  return (
    <>
      {/* Cloudflare Turnstile loader — only in production-shaped environments */}
      {siteKey && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onLoad={renderTurnstile}
        />
      )}

      <form onSubmit={onSubmit} noValidate className="space-y-10">
        {/* STEP 1 — scope */}
        <fieldset>
          <legend className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            01 — What kind of work?
          </legend>
          <ul className="mt-5 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            {SCOPES.map((s) => {
              const active = scope === s.id;
              return (
                <li key={s.id} className="bg-background">
                  <label
                    className={cn(
                      "focus-within:focus-ring group block cursor-pointer p-5 transition-colors",
                      active
                        ? "bg-foreground text-background"
                        : "hover:bg-muted/40"
                    )}
                  >
                    <input
                      type="radio"
                      name="scope"
                      value={s.id}
                      checked={active}
                      onChange={() => setScope(s.id)}
                      className="sr-only"
                    />
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-display text-h-3 font-light">{s.label}</p>
                        <p
                          className={cn(
                            "mt-1 text-sm",
                            active ? "text-background/70" : "text-muted-foreground"
                          )}
                        >
                          {s.hint}
                        </p>
                      </div>
                      {active && (
                        <Check
                          className="h-5 w-5 shrink-0 translate-y-1"
                          aria-hidden
                        />
                      )}
                    </div>
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>

        {/* STEP 2 — details */}
        <AnimatePresence>
          {scope && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >
              <fieldset>
                <legend className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  02 — A few details
                </legend>
                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field id="name" label="Name" required>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      maxLength={120}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="focus-ring h-12 w-full rounded-xl border border-border bg-background px-4 text-body"
                      placeholder="Your name"
                    />
                  </Field>
                  <Field id="email" label="Work email" required>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      maxLength={254}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="focus-ring h-12 w-full rounded-xl border border-border bg-background px-4 text-body"
                      placeholder="you@company.com"
                    />
                  </Field>
                  <Field id="company" label="Company">
                    <input
                      id="company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      maxLength={160}
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="focus-ring h-12 w-full rounded-xl border border-border bg-background px-4 text-body"
                      placeholder="Optional"
                    />
                  </Field>
                  <Field id="budget" label="Project size">
                    <select
                      id="budget"
                      name="budget"
                      value={budget ?? ""}
                      onChange={(e) => setBudget(e.target.value as BudgetId)}
                      className="focus-ring h-12 w-full rounded-xl border border-border bg-background px-4 text-body"
                    >
                      <option value="">Select a range</option>
                      {BUDGETS.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
              </fieldset>

              <Field id="message" label="Tell us about the project" required>
                <textarea
                  id="message"
                  name="message"
                  required
                  minLength={10}
                  maxLength={4000}
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="focus-ring w-full rounded-xl border border-border bg-background p-4 text-body resize-y"
                  placeholder="What are you working on? What does success look like in three months?"
                />
              </Field>

              {/* Honeypot — hidden from sighted users + screen readers */}
              <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
                <label htmlFor="hp">Don&rsquo;t fill this out</label>
                <input
                  id="hp"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              {/* Turnstile widget mount point */}
              {siteKey && <div ref={turnstileRef} className="min-h-[65px]" />}
              {!siteKey && (
                <p className="text-xs text-muted-foreground">
                  Bot-protection key not configured in this environment; the form
                  still submits in development.
                </p>
              )}

              <div className="flex flex-col items-stretch gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted-foreground">
                  By submitting, you agree to a polite no-spam reply. We never
                  share or sell your details.
                </p>
                <button
                  type="submit"
                  disabled={status === "submitting" || (!!siteKey && !turnstileToken)}
                  className="focus-ring group inline-flex h-12 items-center justify-center gap-3 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                      Sending
                    </>
                  ) : (
                    <>
                      Send brief
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                    </>
                  )}
                </button>
              </div>

              {status === "error" && errorMsg && (
                <p
                  role="alert"
                  aria-live="assertive"
                  className="rounded-xl border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-600 dark:text-red-400"
                >
                  {errorMsg}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </>
  );
}

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
        {required && <span aria-hidden className="text-teal-600 dark:text-teal-300"> *</span>}
      </label>
      {children}
    </div>
  );
}
