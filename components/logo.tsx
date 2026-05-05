import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  showTag?: boolean;
};

export function Logo({ className, showTag = true }: LogoProps) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline gap-1.5 text-teal-600 dark:text-teal-300",
        className
      )}
      aria-label="Ingenious Hub — energize your brand"
    >
      <svg
        viewBox="0 0 28 64"
        className="h-[22px] w-auto translate-y-[1px]"
        fill="currentColor"
        aria-hidden="true"
      >
        <circle cx="14" cy="9" r="4.5" />
        <rect x="9.5" y="18" width="9" height="38" rx="1.4" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[20px] italic leading-none tracking-tight">
          ngenious hub
        </span>
        {showTag && (
          <span className="mt-1 text-[9.5px] uppercase tracking-[0.2em] text-muted-foreground">
            energize your brand
          </span>
        )}
      </span>
    </span>
  );
}
