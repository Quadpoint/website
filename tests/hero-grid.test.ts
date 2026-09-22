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
const sectionSources = [
  "about/page.tsx",
  "contact/page.tsx",
  "solutions/page.tsx",
  "products/page.tsx",
  "ai-automation/page.tsx",
].map((path) =>
  readFileSync(new URL(`../app/${path}`, import.meta.url), "utf8")
).join("\n");
const aiSectionSource = readFileSync(
  new URL("../components/sections/AISection.tsx", import.meta.url),
  "utf8"
);
const processSectionSource = readFileSync(
  new URL("../components/sections/HowWeWorkSection.tsx", import.meta.url),
  "utf8"
);
const ctaSectionSource = readFileSync(
  new URL("../components/sections/CTASection.tsx", import.meta.url),
  "utf8"
);

test("uses the shared low-opacity grid behind the hero content", () => {
  assert.doesNotMatch(heroSource, /data-hero-grid/);
  assert.doesNotMatch(heroSource, /linear-gradient\(rgba\(255,255,255,0\.8\) 1px, transparent 1px\)/);
  assert.match(globalStyles, /--site-grid-line: rgb\(255 255 255 \/ 0\.022\)/);
  assert.doesNotMatch(sectionSources, /backgroundSize: "(?:40|60)px (?:40|60)px"/);
  assert.doesNotMatch(aiSectionSource, /backgroundSize: "40px 40px"/);
  assert.doesNotMatch(processSectionSource, /backgroundSize: "34px 34px"/);
  assert.doesNotMatch(heroSource, /w-\[600px\] h-\[600px\][\s\S]*radial-gradient\(circle, #1a4fba/);
});

test("renders one continuous grid on the site canvas", () => {
  assert.match(
    globalStyles,
    /\.site-theme\s*\{[\s\S]*linear-gradient\(var\(--site-grid-line\) 1px, transparent 1px\)[\s\S]*linear-gradient\(90deg, var\(--site-grid-line\) 1px, transparent 1px\)[\s\S]*background-size: 60px 60px, 60px 60px/
  );
  assert.match(globalStyles, /\.home-reference\s*\{\s*background: transparent;/);
  assert.doesNotMatch(globalStyles, /\.home-reference\s*\{\s*background: var\(--site-canvas\)/);
  assert.doesNotMatch(globalStyles, /\.cta-panel[\s\S]*background-size:\s*60px 60px/);
  assert.doesNotMatch(ctaSectionSource, /radial-gradient/);
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
