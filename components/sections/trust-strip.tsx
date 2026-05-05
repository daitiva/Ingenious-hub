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
    <section className="border-t border-border py-8">
      <div className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent"
        />
        <div className="flex w-max animate-marquee gap-12 px-6 text-muted-foreground/70">
          {row.map((c, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-12 whitespace-nowrap text-sm font-medium tracking-[-0.01em] md:text-base"
            >
              {c}
              <span aria-hidden className="opacity-40">
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
