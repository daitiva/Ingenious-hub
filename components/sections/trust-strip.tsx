const CLIENTS = [
  "Allegiance Education",
  "A2Z Smart Spaces",
  "Tax2Win",
  "Yug Vaastra",
  "Unlock Career",
  "DNS Pointers",
  "CRM Pointers",
  "Basta",
  "Jaipur Health Festival",
  "WooCom Pro",
];

export function TrustStrip() {
  const row = [...CLIENTS, ...CLIENTS];
  return (
    <section className="border-y border-border bg-muted/30 py-8">
      <div className="container mb-5 flex items-center justify-center text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Trusted by founders &amp; teams across India
        </p>
      </div>
      <div className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent"
        />
        <div className="flex w-max animate-marquee gap-10 px-6">
          {row.map((c, i) => (
            <span
              key={i}
              className="whitespace-nowrap text-sm font-medium tracking-tight text-muted-foreground/80 md:text-base"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
