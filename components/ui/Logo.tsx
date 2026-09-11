"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "default" | "white";
  showText?: boolean;
  size?: number;
  className?: string;
}

/**
 * QuadPoint Technology — Q monogram mark.
 *
 * Structure (faithfully recreated from provided logo images):
 *
 *   Three concentric open-arc rings drawn as thick stroked circles
 *   with stroke-dasharray gaps positioned at the bottom-right.
 *   Each inner ring has a progressively wider gap so the diagonal
 *   tail bar can pass cleanly through all three rings.
 *
 *   The tail is a filled tapered shape (wider at base, narrowing to a
 *   point) running from the centre dot diagonally down-right (~45°).
 *
 *   The centre is a small filled circle connected to the tail.
 *
 * Rendering technique:
 *   - strokeDasharray/strokeDashoffset on full circles to create open arcs
 *   - SVG circles start at 3 o'clock; we rotate -90° so 0° = top
 *   - Gap is positioned at ~230°–320° (bottom-right zone, ~7 to ~5 o'clock)
 *
 * Variants:
 *   default — blue gradient (light cornflower → deep navy, top-left → bottom-right)
 *   white   — solid white for dark/navy backgrounds
 */
function QMark({
  size = 40,
  variant = "default",
}: {
  size?: number;
  variant?: "default" | "white";
}) {
  const gradId = `qp-grad-${variant}`;
  const isWhite = variant === "white";
  const stroke = isWhite ? "white" : `url(#${gradId})`;
  const fill   = isWhite ? "white" : `url(#${gradId})`;

  /*
   * Ring parameters — each ring: { r, strokeWidth, dash, gap, offset }
   * offset: dashoffset so the gap sits at the correct rotational position.
   * The circles are rotated -90° so that 0° = top of circle.
   *
   * Gap zone: ~230° to ~320° from top (bottom-right opening, 90° gap for outer,
   * progressively wider for inner rings).
   *
   * All values computed from: C = 2πr, dash = (arcDeg/360)×C, gap = (gapDeg/360)×C
   * dashoffset = ((gapStartDeg + gapDeg) / 360) × C
   */
  const rings = [
    // Outer: r=44.5, strokeWidth=7  → fills r41–r48 zone. Gap 90°, starts at 230°
    { r: 44.5, sw: 7,  dash: "209.70", gap: "69.90",  offset: "248.53" },
    // Mid:   r=30,   strokeWidth=8  → fills r26–r34 zone. Gap 105°, starts at 225°
    { r: 30,   sw: 8,  dash: "133.52", gap: "54.98",  offset: "172.79" },
    // Inner: r=16.5, strokeWidth=7  → fills r13–r20 zone. Gap 120°, starts at 220°
    { r: 16.5, sw: 7,  dash: "69.12",  gap: "34.56",  offset: "97.91"  },
  ] as const;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {!isWhite && (
          <linearGradient
            id={gradId}
            x1="5" y1="5"
            x2="95" y2="95"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%"   stopColor="#60b0ff" />
            <stop offset="35%"  stopColor="#1a6aff" />
            <stop offset="100%" stopColor="#061450" />
          </linearGradient>
        )}
      </defs>

      {/* Three open-arc rings */}
      {rings.map((ring) => (
        <circle
          key={ring.r}
          cx="50"
          cy="50"
          r={ring.r}
          stroke={stroke}
          strokeWidth={ring.sw}
          strokeDasharray={`${ring.dash} ${ring.gap}`}
          strokeDashoffset={ring.offset}
          strokeLinecap="round"
          /* Rotate -90° so dasharray starts at top (12 o'clock) */
          transform="rotate(-90 50 50)"
          fill="none"
        />
      ))}

      {/* Centre dot */}
      <circle cx="50" cy="50" r="5.5" fill={fill} />

      {/*
        Tail — a parallelogram-like diagonal shape from the centre out to
        the bottom-right, passing through all three ring gaps.
        Starts with ~10px width near the dot, stays roughly parallel-sided.
        The path goes from just below the centre dot out past the outer ring.
      */}
      <path
        d="M 46 52  L 56 52  L 92 88  L 82 92  Z"
        fill={fill}
      />

      {/* Re-draw dot on top of tail */}
      <circle cx="50" cy="50" r="5.5" fill={fill} />
    </svg>
  );
}

export function Logo({
  variant = "default",
  showText = true,
  size = 38,
  className,
}: LogoProps) {
  const textColor = variant === "white" ? "text-white" : "text-[#1c1c2e]";
  const subColor  = variant === "white" ? "text-white/60" : "text-[#6b7280]";

  return (
    <Link
      href="/"
      className={cn("flex items-center gap-3 group", className)}
      aria-label="QuadPoint Technology — Home"
    >
      <div className="flex-shrink-0 transition-transform duration-200 group-hover:scale-105">
        <QMark size={size} variant={variant} />
      </div>

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
