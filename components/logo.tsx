import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** rendered height in px on desktop (mobile auto-scales) */
  size?: "sm" | "md" | "lg";
};

const SIZE: Record<NonNullable<LogoProps["size"]>, string> = {
  sm: "h-[20px] md:h-[22px]",
  md: "h-[24px] md:h-[28px]",
  lg: "h-[36px] md:h-[44px]",
};

export function Logo({ className, size = "md" }: LogoProps) {
  return (
    <Image
      src="/logo.svg"
      alt="Ingenious Hub — energize your brand"
      width={435}
      height={84}
      priority
      className={cn("w-auto", SIZE[size], className)}
    />
  );
}
