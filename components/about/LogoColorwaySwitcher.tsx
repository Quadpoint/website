"use client";

import Image from "next/image";
import { useState } from "react";

export function LogoColorwaySwitcher() {
  const [showBlueLogo, setShowBlueLogo] = useState(false);
  const actionLabel = showBlueLogo
    ? "Switch to white logo on blue"
    : "Switch to blue logo on white";

  return (
    <button
      type="button"
      className="logo-colorway-switcher relative mx-auto block aspect-square w-full max-w-sm overflow-hidden rounded-2xl border"
      data-colorway={showBlueLogo ? "blue" : "white"}
      aria-label={actionLabel}
      aria-pressed={showBlueLogo}
      onClick={() => setShowBlueLogo((current) => !current)}
    >
      <span className="logo-colorway-panel logo-colorway-base" aria-hidden="true">
        <Image
          src="/brand/quadpoint-white.png"
          alt=""
          width={220}
          height={220}
          sizes="(max-width: 640px) 11rem, 13.75rem"
          className="h-auto w-44 sm:w-[13.75rem]"
        />
      </span>

      <span
        className="logo-colorway-panel logo-colorway-reveal"
        aria-hidden="true"
      >
        <Image
          src="/brand/quadpoint-blue.webp"
          alt=""
          width={220}
          height={220}
          sizes="(max-width: 640px) 11rem, 13.75rem"
          className="h-auto w-44 sm:w-[13.75rem]"
        />
      </span>

      <span className="logo-colorway-hint">Click to switch colorway</span>
    </button>
  );
}
