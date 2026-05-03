"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const BUDGETS = [
  "Under ₹1L",
  "₹1L – ₹3L",
  "₹3L – ₹8L",
  "₹8L – ₹20L",
  "₹20L+",
];

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = React.useState<Status>("idle");
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    const data = new FormData(e.currentTarget);
    const payload = Object.fromEntries(data.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      e.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      setError("Something went wrong. Please email hello@ingenioushub.com.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-border bg-card p-7 shadow-sm md:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" name="name" required>
          <Input name="name" placeholder="Riya Verma" required />
        </Field>
        <Field label="Work email" name="email" required>
          <Input
            name="email"
            type="email"
            placeholder="riya@brand.co"
            required
          />
        </Field>
        <Field label="Company" name="company">
          <Input name="company" placeholder="Your brand" />
        </Field>
        <Field label="Project budget" name="budget">
          <select
            name="budget"
            defaultValue=""
            className="flex h-11 w-full appearance-none rounded-xl border border-input bg-background px-4 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:border-teal-500 focus-visible:ring-2 focus-visible:ring-teal-500/20"
          >
            <option value="" disabled>
              Select a range
            </option>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field className="mt-5" label="What are you trying to build?" name="message" required>
        <Textarea
          name="message"
          required
          placeholder="A quick paragraph on the business, the brief, and the timeline."
          rows={6}
        />
      </Field>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          By submitting, you agree to our friendly, no-spam reply policy.
        </p>
        <Button type="submit" size="lg" disabled={status === "submitting"}>
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending
            </>
          ) : (
            <>
              Send brief <ArrowUpRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>

      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-5 flex items-start gap-3 rounded-xl border border-teal-500/30 bg-teal-500/10 p-4 text-sm text-teal-800 dark:text-teal-200"
          >
            <Check className="mt-0.5 h-4 w-4" />
            <div>
              <strong className="font-semibold">Brief received.</strong> We&rsquo;ll
              reply within 4 working hours with next steps.
            </div>
          </motion.div>
        )}
        {status === "error" && error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-sm text-red-500"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}

function Field({
  label,
  name,
  required,
  children,
  className,
}: {
  label: string;
  name: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="mb-1.5 block text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground"
      >
        {label}
        {required && <span className="text-teal-500"> *</span>}
      </label>
      {children}
    </div>
  );
}
