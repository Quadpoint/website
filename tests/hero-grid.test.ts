import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const heroSource = readFileSync(
  new URL("../components/sections/HeroSection.tsx", import.meta.url),
  "utf8"
);

test("renders the reference-style decorative grid behind the hero content", () => {
  assert.match(heroSource, /data-hero-grid/);
  assert.match(heroSource, /linear-gradient\(rgba\(255,255,255,0\.8\) 1px, transparent 1px\)/);
  assert.match(heroSource, /backgroundSize: "60px 60px"/);
  assert.match(heroSource, /opacity-\[0\.04\]/);
});

test("renders the white QuadPoint mark as a low-opacity hero watermark", () => {
  assert.match(heroSource, /import Image from "next\/image"/);
  assert.match(heroSource, /src="\/brand\/quadpoint-white\.png"/);
  assert.match(heroSource, /width=\{580\}/);
  assert.match(heroSource, /height=\{580\}/);
  assert.match(heroSource, /opacity-\[0\.06\]/);
});
