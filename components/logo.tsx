import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  showWordmark?: boolean;
};

export function Logo({ className, showWordmark = true }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-teal-500/30 bg-gradient-to-br from-teal-50 to-white shadow-sm dark:from-teal-950/40 dark:to-background">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          className="h-5 w-5 text-teal-600 dark:text-teal-400"
          aria-hidden="true"
        >
          <circle cx="16" cy="6" r="3.2" fill="currentColor" />
          <path
            d="M13 13h6v15h-6z"
            fill="currentColor"
          />
        </svg>
        <span className="absolute -inset-px rounded-lg ring-1 ring-inset ring-teal-500/10" />
      </span>
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span className="font-medium tracking-tight text-foreground">
            ingenious <span className="text-teal-600 dark:text-teal-400">hub</span>
          </span>
          <span className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            energize your brand
          </span>
        </span>
      )}
    </span>
  );
}
