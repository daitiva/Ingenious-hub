"use client";

const ITEMS = [
  "Now booking · Q1 2026 · 5 spots open",
  "Studio · Jaipur — Worldwide",
  "Branding · Web · Performance · PR",
  "4.6 ★ on Google",
  "60+ brands shipped since 2016",
  "Replies within 4 working hours",
  "Recognised by DesignRush · Clutch · 50Pros",
];

export function StatusRibbon() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="border-b border-border bg-background/60 backdrop-blur-sm">
      <div className="relative overflow-hidden py-2.5">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent"
        />
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {row.map((t, i) => (
            <span key={i} className="inline-flex items-center gap-10">
              {t}
              <span aria-hidden className="text-teal-500/60">
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
