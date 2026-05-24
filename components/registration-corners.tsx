import { cn } from "@/lib/utils";

type Props = {
  /** Tailwind inset class — `inset-3` (12px) or `inset-4` (16px) */
  inset?: "inset-3" | "inset-4";
  className?: string;
};

/**
 * Four hairline registration marks — the editorial "art-board" trim corners
 * we use on every cover surface (hero, featured work, case-study covers).
 *
 * Pure presentational, aria-hidden. Use as a sibling to the cover content,
 * not a wrapper.
 *
 * Position-by-CSS-vars rather than dynamic class names so Tailwind JIT can
 * resolve every class at build time.
 */
export function RegistrationCorners({
  inset = "inset-4",
  className,
}: Props) {
  // Resolve once so we only pay the conditional in one place.
  const offsetClasses =
    inset === "inset-3"
      ? {
          tl: "left-3 top-3",
          tr: "right-3 top-3",
          bl: "left-3 bottom-3",
          br: "right-3 bottom-3",
        }
      : {
          tl: "left-4 top-4",
          tr: "right-4 top-4",
          bl: "left-4 bottom-4",
          br: "right-4 bottom-4",
        };

  const base = "absolute h-3 w-3 border-foreground/30";

  return (
    <>
      <span aria-hidden className={cn(base, "border-l border-t", offsetClasses.tl, className)} />
      <span aria-hidden className={cn(base, "border-r border-t", offsetClasses.tr, className)} />
      <span aria-hidden className={cn(base, "border-l border-b", offsetClasses.bl, className)} />
      <span aria-hidden className={cn(base, "border-r border-b", offsetClasses.br, className)} />
    </>
  );
}
