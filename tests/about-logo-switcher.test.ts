import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

function read(relativePath: string) {
  const url = new URL(`../${relativePath}`, import.meta.url);
  return existsSync(url) ? readFileSync(url, "utf8") : "";
}

const about = read("app/about/page.tsx");
const switcher = read("components/about/LogoColorwaySwitcher.tsx");
const styles = read("app/globals.css");

test("replaces the custom About mark with the interactive logo switcher", () => {
  assert.match(about, /import \{ LogoColorwaySwitcher \}/);
  assert.match(about, /<LogoColorwaySwitcher \/>/);
  assert.doesNotMatch(about, /id="qp-about"/);
});

test("starts white on blue and toggles both official colorways from one button", () => {
  assert.match(switcher, /useState\(false\)/);
  assert.match(switcher, /<button/);
  assert.match(switcher, /aria-pressed=\{showBlueLogo\}/);
  assert.match(switcher, /onClick=\{\(\) => setShowBlueLogo\(\(current\) => !current\)\}/);
  assert.match(switcher, /src="\/brand\/quadpoint-white\.png"/);
  assert.match(switcher, /src="\/brand\/quadpoint-blue\.webp"/);
  assert.match(switcher, /showBlueLogo\s*\? "Switch to white logo on blue"/);
});

test("uses an interruptible wipe with a reduced-motion crossfade", () => {
  assert.match(styles, /\.logo-colorway-reveal[\s\S]*clip-path: inset\(0 100% 0 0\)/);
  assert.match(styles, /clip-path 260ms cubic-bezier\(0\.77, 0, 0\.175, 1\)/);
  assert.match(styles, /\.logo-colorway-switcher\[data-colorway="blue"\][\s\S]*clip-path: inset\(0\)/);
  assert.match(
    styles,
    /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.logo-colorway-reveal[\s\S]*opacity 160ms cubic-bezier\(0\.23, 1, 0\.32, 1\)/
  );
});
