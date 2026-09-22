import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const heroSource = readFileSync(
  new URL("../components/sections/HeroSection.tsx", import.meta.url),
  "utf8"
);
const globalStyles = readFileSync(
  new URL("../app/globals.css", import.meta.url),
  "utf8"
);

test("renders the reference-style decorative grid behind the hero content", () => {
  assert.match(heroSource, /data-hero-grid/);
  assert.match(heroSource, /linear-gradient\(rgba\(255,255,255,0\.8\) 1px, transparent 1px\)/);
  assert.match(heroSource, /backgroundSize: "60px 60px"/);
  assert.match(heroSource, /opacity-\[0\.04\]/);
});

test("continues the hero grid treatment through every homepage section", () => {
  assert.match(
    globalStyles,
    /\.home-reference > section:not\(:first-child\)[\s\S]*linear-gradient\(rgb\(255 255 255 \/ 0\.032\) 1px, transparent 1px\)[\s\S]*linear-gradient\(90deg, rgb\(255 255 255 \/ 0\.032\) 1px, transparent 1px\)[\s\S]*60px 60px/
  );
  assert.match(
    globalStyles,
    /\.cta-panel[\s\S]*linear-gradient\(rgb\(255 255 255 \/ 0\.032\) 1px, transparent 1px\)[\s\S]*linear-gradient\(90deg, rgb\(255 255 255 \/ 0\.032\) 1px, transparent 1px\)[\s\S]*background-size:\s*60px 60px,\s*60px 60px,\s*cover,\s*cover/
  );
});

test("renders the white QuadPoint mark as a low-opacity hero watermark", () => {
  assert.match(heroSource, /import Image from "next\/image"/);
  assert.match(heroSource, /src="\/brand\/quadpoint-white\.png"/);
  assert.match(heroSource, /width=\{650\}/);
  assert.match(heroSource, /height=\{650\}/);
  assert.match(heroSource, /opacity-\[0\.06\]/);
});

test("renders critical hero content without waiting for client hydration", () => {
  assert.doesNotMatch(heroSource, /"use client"/);
  assert.doesNotMatch(heroSource, /from "framer-motion"/);
  assert.doesNotMatch(heroSource, /initial=\{\{ opacity: 0/);
  assert.doesNotMatch(heroSource, /<motion\./);
});

test("loads the above-fold hero watermark eagerly at its rendered size", () => {
  assert.match(heroSource, /loading="eager"/);
  assert.match(heroSource, /fetchPriority="high"/);
  assert.match(
    heroSource,
    /sizes="\(min-width: 1280px\) 780px, 650px"/
  );
});

test("uses a short CSS-only hero entrance with reduced-motion support", () => {
  assert.match(heroSource, /hero-enter/);
  assert.match(heroSource, /hero-enter-delay-1/);
  assert.match(heroSource, /hero-enter-delay-2/);
  assert.match(globalStyles, /@keyframes hero-enter/);
  assert.match(globalStyles, /animation-duration: 420ms/);
  assert.match(
    globalStyles,
    /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.hero-enter/
  );
  assert.doesNotMatch(heroSource, /from "framer-motion"/);
});
