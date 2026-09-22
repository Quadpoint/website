import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

function read(relativePath: string) {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");
}

const page = read("app/solutions/page.tsx");
const styles = read("app/globals.css");

test("uses an editorial narrative hierarchy on the blue solutions canvas", () => {
  assert.match(page, /solutions-page/);
  assert.match(page, /solution-narrative/);
  assert.match(page, /solution-narrative-section/);
  assert.match(page, /solution-narrative-divider/);
  assert.doesNotMatch(page, /solution-copy-block/);
  assert.match(styles, /\.solutions-page\s*\{[\s\S]*--solutions-copy:/);
  assert.match(styles, /\.solutions-page \.solution-narrative-divider/);
});

test("keeps one defined capability panel with divider-based rows", () => {
  assert.match(page, /solution-capabilities-panel/);
  assert.match(page, /solution-capability-list/);
  assert.match(page, /solution-capability-row/);
  assert.match(styles, /\.solutions-page \.solution-capabilities-panel/);
  assert.match(styles, /\.solutions-page \.solution-capability-list > \* \+ \*/);
  assert.doesNotMatch(styles, /\.solutions-page \.solution-capability-row\s*\{[^}]*background-color:/);
  assert.match(styles, /\.solutions-page \.solution-icon-tile svg\s*\{[^}]*color: #ffffff !important/);
});

test("gives navigation chips accessible target sizing and clear states", () => {
  assert.match(page, /solution-nav-chip/);
  assert.match(styles, /\.solutions-page \.solution-nav-chip/);
  assert.match(styles, /min-height: 44px/);
  assert.match(styles, /\.solutions-page \.solution-nav-chip:hover/);
  assert.match(styles, /\.solutions-page \.solution-nav-chip:focus-visible/);
  assert.match(styles, /outline: 3px solid var\(--solutions-orange\)/);
});
