"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "default" | "white";
  showText?: boolean;
  size?: number;
  className?: string;
}

const logoSources = {
  default: "/brand/quadpoint-blue.webp",
  white: "/brand/quadpoint-white.png",
} as const;

export function Logo({
  variant = "default",
  showText = true,
  size = 38,
  className,
}: LogoProps) {
  const textColor = variant === "white" ? "text-white" : "text-[#1c1c2e]";
  const subColor = variant === "white" ? "text-white/60" : "text-[#6b7280]";

  return (
    <Link
      href="/"
      className={cn("flex items-center gap-1.5", className)}
      aria-label="QuadPoint Technology — Home"
    >
      <Image
        src={logoSources[variant]}
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        priority
        className="flex-shrink-0"
      />

      {showText && (
        <div className="leading-none">
          <span className={cn("text-[15px] font-bold tracking-tight block", textColor)}>
            QuadPoint
          </span>
          <span
            className={cn(
              "text-[10px] font-medium tracking-widest uppercase block mt-0.5",
              subColor
            )}
          >
            Technology
          </span>
        </div>
      )}
    </Link>
  );
}
