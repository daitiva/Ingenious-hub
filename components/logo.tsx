import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  showTag?: boolean;
};

/**
 * Wordmark + tagline lockup. The tagline is rendered inside an SVG with
 * `textLength` set to the SVG's intrinsic viewBox width, so it always stretches
 * to exactly the same edge-to-edge width as the wordmark above it — no pixel
 * math, no media queries.
 */
export function Logo({ className, showTag = true }: LogoProps) {
  return (
    <span
      className={cn("inline-flex flex-col leading-none", className)}
      aria-label="Ingenious Hub — energize your brand"
    >
      <Image
        src="/logo.svg"
        alt="Ingenious Hub"
        width={244}
        height={66}
        className="h-[26px] w-auto md:h-7"
        priority
      />
      {showTag && (
        <svg
          viewBox="0 0 244 14"
          aria-hidden
          className="mt-[5px] block h-[10px] w-full text-muted-foreground md:h-[11px]"
          preserveAspectRatio="xMidYMid meet"
        >
          <text
            x="0"
            y="11"
            fill="currentColor"
            fontFamily="Inter, system-ui, sans-serif"
            fontSize="11"
            fontWeight="400"
            letterSpacing="0"
            textLength="244"
            lengthAdjust="spacingAndGlyphs"
          >
            energize your brand
          </text>
        </svg>
      )}
    </span>
  );
}
