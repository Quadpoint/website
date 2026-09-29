import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

function read(relativePath: string) {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");
}

const source = read("components/sections/WhyQuadPointSection.tsx");
const styles = read("app/globals.css");
const about = read("app/about/page.tsx");

test("renders the approved Why QuadPoint reference content", () => {
  assert.match(source, /Technology[\s\S]*With a[\s\S]*Purpose\./);
  assert.match(source, /Business-Focused/);
  assert.match(source, /Intelligent/);
  assert.match(source, /Scalable/);
  assert.match(source, /Human-Centered/);
  assert.match(source, /Better technology builds[\s\S]*brighter tomorrows\./);
});

test("links every learn-more action to the About philosophy section", () => {
  assert.match(source, /values\.map[\s\S]*href="\/about#philosophy"/);
  assert.equal(source.match(/href="\/about#philosophy"/g)?.length, 2);
  assert.equal(source.match(/title: "/g)?.length, 4);
  assert.match(about, /id="philosophy"/);
});

test("uses distinct responsive backgrounds for both visual regions", () => {
  for (const asset of [
    "mobile-bg-why-quadpoint.png",
    "tablet-bg-why-quadpoint.png",
    "desktop-bg-why-quadpoint.png",
    "mobile-bg-learn-approach.png",
    "tablet-bg-learn-approach.png",
    "desktop-bg-learn-approach.png",
    "wide-desktop-bg-learn-approach.png",
    "dotted-pattern.png",
  ]) {
    assert.ok(
      existsSync(new URL(`../public/brand/why-quadpoint/${asset}`, import.meta.url)),
      `${asset} should be copied into the public brand directory`
    );
    assert.match(styles, new RegExp(asset.replace(".", "\\.")));
  }

  assert.match(styles, /@media \(min-width: 48rem\)/);
  assert.match(styles, /@media \(min-width: 64rem\)/);
  assert.match(styles, /@media \(min-width: 100rem\)/);
});

test("preserves responsive card layout, accessible icons, and restrained reveals", () => {
  assert.match(source, /grid-cols-1[\s\S]*md:grid-cols-2[\s\S]*lg:grid-cols-4/);
  assert.match(source, /aria-hidden="true"/);
  assert.match(source, /StaggerContainer/);
  assert.match(source, /StaggerItem/);
  assert.match(source, /py-20 xl:py-24/);
});

test("blends seamlessly from Our Process and anchors the supplied dot pattern", () => {
  assert.match(styles, /--why-section-edge: #0b2443/);
  assert.match(
    styles,
    /linear-gradient\(180deg, var\(--why-section-edge\) 0%, rgb\(11 36 67 \/ 0\.98\) 18%, rgb\(11 36 67 \/ 0\.72\) 58%, transparent 100%\)/
  );
  assert.match(styles, /linear-gradient\(180deg, rgb\(4 31 65 \/ 0\.68\), rgb\(4 31 65 \/ 0\.82\)\)/);
  assert.match(styles, /\.why-quadpoint-dots-left\s*\{[\s\S]*top: 0;[\s\S]*left: 0;/);
  assert.match(styles, /\.why-quadpoint-dots-right\s*\{[\s\S]*right: 0;[\s\S]*bottom: 0;/);
  assert.match(styles, /opacity: 0\.32/);
});

test("crossfades the process grid over the office image at the section boundary", () => {
  assert.match(styles, /\.home-reference > section\.why-quadpoint::before/);
  assert.match(styles, /height: clamp\(10rem, 18vw, 14rem\)/);
  assert.match(styles, /background-size: 60px 60px/);
  assert.match(styles, /mask-image: linear-gradient\(to bottom, black 0%, black 12%, transparent 100%\)/);
  assert.match(styles, /-webkit-mask-image: linear-gradient\(to bottom, black 0%, black 12%, transparent 100%\)/);
  assert.match(styles, /padding-top: clamp\(9rem, 12vw, 12rem\) !important/);
});

test("caps the office artwork at its native wide-screen canvas", () => {
  assert.match(styles, /\.home-reference > section\.why-quadpoint::after/);
  assert.match(styles, /width: min\(100%, 115\.625rem\)/);
  assert.match(styles, /margin-inline: auto/);
  assert.match(styles, /var\(--why-background\)/);
  assert.match(
    styles,
    /\.home-reference > section\.why-quadpoint\s*\{[\s\S]*background-image:\s*linear-gradient\(180deg, var\(--why-section-edge\) 0%, #041f41 15rem\) !important/
  );
});
