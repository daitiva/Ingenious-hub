import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  showTag?: boolean;
};

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
        className="h-6 w-auto md:h-7"
        priority
      />
      {showTag && (
        <span className="mt-1 pl-[1px] text-[9.5px] uppercase tracking-[0.22em] text-muted-foreground">
          energize your brand
        </span>
      )}
    </span>
  );
}
