import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

function read(relativePath: string) {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");
}

const layout = read("app/layout.tsx");
const styles = read("app/globals.css");
const navbar = read("components/navigation/Navbar.tsx");
const notFound = read("app/not-found.tsx");

test("applies the QuadPoint dark palette to every route", () => {
  assert.match(layout, /<main className="site-theme flex-1">/);
  assert.match(styles, /--site-canvas: #081c35/);
  assert.match(styles, /--site-radial-core: rgb\(41 143 226 \/ 0\.35\)/);
  assert.match(styles, /--site-radial-halo: rgb\(30 108 178 \/ 0\.16\)/);
  assert.match(styles, /\.site-theme\s*\{[\s\S]*background-color: var\(--site-canvas\)/);
  assert.match(
    styles,
    /\.site-theme\s*\{[\s\S]*linear-gradient\(var\(--site-grid-line\) 1px, transparent 1px\)[\s\S]*linear-gradient\(90deg, var\(--site-grid-line\) 1px, transparent 1px\)/
  );
  assert.match(
    styles,
    /\.site-theme :is\(section, \.site-radial-surface\):not\(\.cta-panel\)[\s\S]*background-color: transparent !important;[\s\S]*radial-gradient\(ellipse var\(--section-light-size-x\) var\(--section-light-size-y\) at var\(--section-light-x\) var\(--section-light-y\), var\(--section-light-core\) 0%, var\(--section-light-halo\) 38%, transparent var\(--section-light-fade\)\)/
  );
  assert.doesNotMatch(
    styles,
    /linear-gradient\(180deg, #0b2443 0%, #103863 42%, #103863 58%, #0b2443 100%\)/
  );
  assert.match(styles, /\.site-theme \[class~="bg-white"\]/);
  assert.match(styles, /\.site-theme \[class~="text-\[#1c1c2e\]"\]/);
  assert.match(styles, /\.site-theme \[class~="text-\[#6b7280\]"\]/);
  assert.match(styles, /\.site-theme \[class~="border-\[#e5e7eb\]"\]/);
  assert.match(notFound, /className="site-radial-surface /);
});

test("anchors homepage lights to each section focal point", () => {
  const sections = [
    ["components/sections/SolutionsSection.tsx", "section-light-solutions"],
    ["components/sections/PortfolioSection.tsx", "section-light-products"],
    ["components/sections/AISection.tsx", "section-light-ai"],
    ["components/sections/HowWeWorkSection.tsx", "section-light-process"],
    ["components/sections/WhyQuadPointSection.tsx", "section-light-why"],
  ];

  for (const [path, className] of sections) {
    assert.match(read(path), new RegExp(className));
  }

  assert.match(styles, /\.home-reference > section:first-of-type[\s\S]*--section-light-x: 16%/);
  assert.match(styles, /\.section-light-solutions[\s\S]*--section-light-x: 50%[\s\S]*--section-light-y: 18%[\s\S]*--section-light-core: rgb\(41 143 226 \/ 0\.27\)[\s\S]*--section-light-fade: 50%/);
  assert.match(styles, /\.section-light-products[\s\S]*--section-light-x: 82%[\s\S]*--section-light-y: 28%[\s\S]*--section-light-size-x: 24%[\s\S]*--section-light-size-y: 24%[\s\S]*--section-light-core: rgb\(41 143 226 \/ 0\.22\)/);
  assert.match(styles, /\.section-light-ai[\s\S]*--section-light-y: 40%[\s\S]*--section-light-size-x: 40%[\s\S]*--section-light-size-y: 44%[\s\S]*--section-light-core: rgb\(41 143 226 \/ 0\.26\)/);
  assert.match(styles, /\.section-light-process[\s\S]*--section-light-y: 62%[\s\S]*--section-light-size-x: 40%[\s\S]*--section-light-size-y: 68%[\s\S]*--section-light-core: rgb\(41 143 226 \/ 0\.24\)/);
  assert.match(styles, /\.section-light-why[\s\S]*--section-light-y: 34%[\s\S]*--section-light-core: rgb\(41 143 226 \/ 0\.25\)/);
});

test("positions one bounded light within each section without restarting the canvas", () => {
  assert.match(styles, /--section-light-x: 28%/);
  assert.match(styles, /--section-light-x: 72%/);
  assert.match(styles, /--section-light-size-x: 34%/);
  assert.match(styles, /--section-light-size-y: 58%/);
  assert.match(styles, /\.site-theme > section:first-of-type,[\s\S]*--section-light-x: 50%/);
  assert.match(styles, /\.home-reference > section:first-of-type[\s\S]*--section-light-x: 16%[\s\S]*--section-light-y: 45%/);
  assert.match(styles, /\.home-reference > section:first-of-type[\s\S]*--section-light-size-x: 42%[\s\S]*--section-light-size-y: 56%/);
  assert.match(styles, /@media \(max-width: 639px\)[\s\S]*--section-light-x: 50%/);
  assert.match(styles, /@media \(max-width: 639px\)[\s\S]*--section-light-size-x: 62%[\s\S]*--section-light-size-y: 56%/);
});

test("uses orange for primary actions without recoloring blue icon surfaces", () => {
  assert.match(styles, /\.site-theme a\[class~="bg-\[#1a4fba\]"\]/);
  assert.match(styles, /background-color: #f59d13 !important/);
  assert.match(styles, /color: #0f1e3d !important/);
});

test("uses white branded icons on orange tiles while keeping blue text links distinct", () => {
  assert.match(
    styles,
    /\.site-theme :where\(div, span\):has\(> svg\[class~="text-\[#1a4fba\]"\]\)[\s\S]*background-color: #f59d13 !important/
  );
  assert.match(
    styles,
    /\.site-theme svg\[class~="text-\[#1a4fba\]"\][\s\S]*color: #ffffff !important/
  );
});

test("themes form controls and the mobile navigation for dark surfaces", () => {
  assert.match(styles, /\.site-theme input:not\(\[type="checkbox"\]\)/);
  assert.match(styles, /\.site-theme select/);
  assert.match(styles, /\.site-theme textarea/);
  assert.match(navbar, /site-mobile-menu/);
  assert.match(navbar, /<Logo variant="white" \/>/);
});
