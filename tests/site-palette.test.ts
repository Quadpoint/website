import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

function read(relativePath: string) {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");
}

const layout = read("app/layout.tsx");
const styles = read("app/globals.css");
const navbar = read("components/navigation/Navbar.tsx");

test("applies the QuadPoint dark palette to every route", () => {
  assert.match(layout, /<main className="site-theme flex-1">/);
  assert.match(styles, /\.site-theme\s*\{[\s\S]*background: #0b2443/);
  assert.match(styles, /\.site-theme \[class~="bg-white"\]/);
  assert.match(styles, /\.site-theme \[class~="text-\[#1c1c2e\]"\]/);
  assert.match(styles, /\.site-theme \[class~="text-\[#6b7280\]"\]/);
  assert.match(styles, /\.site-theme \[class~="border-\[#e5e7eb\]"\]/);
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
