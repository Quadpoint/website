import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

function read(relativePath: string) {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");
}

test("uses a capped 1440px canvas for the homepage and its navbar from xl", () => {
  const styles = read("app/globals.css");
  const navbar = read("components/navigation/Navbar.tsx");

  assert.match(styles, /@media \(min-width: 80rem\)/);
  assert.match(styles, /\.home-reference \.max-w-7xl[\s\S]*max-width: 90rem/);
  assert.match(styles, /\.home-navbar-canvas[\s\S]*max-width: 90rem/);
  assert.doesNotMatch(styles, /max-width: 100rem/);
  assert.match(navbar, /getNavbarCanvasClassName\(\)/);
});

test("scales the hero composition modestly at the xl breakpoint", () => {
  const hero = read("components/sections/HeroSection.tsx");

  assert.match(hero, /xl:max-w-\[760px\]/);
  assert.match(hero, /xl:w-\[780px\]/);
  assert.match(hero, /xl:text-\[4rem\]/);
  assert.doesNotMatch(hero, /xl:text-xl/);
  assert.match(hero, /xl:gap-24/);
  assert.doesNotMatch(hero, /2xl:/);
});

test("caps the homepage hero on wide landscape screens", () => {
  const hero = read("components/sections/HeroSection.tsx");
  const styles = read("app/globals.css");

  assert.match(hero, /home-hero[\s\S]*min-h-dvh/);
  assert.match(hero, /xl:pt-32 xl:pb-20/);
  assert.match(
    styles,
    /@media \(min-width: 80rem\) and \(min-aspect-ratio: 4 \/ 3\)[\s\S]*?\.home-reference > section\.home-hero[\s\S]*?min-height: min\(100dvh, 52rem\)/
  );
});

test("uses compact content-driven spacing for non-hero homepage sections", () => {
  const sectionFiles = [
    "components/sections/SolutionsSection.tsx",
    "components/sections/PortfolioSection.tsx",
    "components/sections/AISection.tsx",
    "components/sections/HowWeWorkSection.tsx",
    "components/sections/WhyQuadPointSection.tsx",
  ];

  for (const sectionFile of sectionFiles) {
    const source = read(sectionFile);

    assert.match(
      source,
      /py-20 xl:py-24/,
      `${sectionFile} should use 80px padding through lg and 96px from xl`
    );
    assert.doesNotMatch(
      source,
      /lg:py-28|2xl:py-32/,
      `${sectionFile} should not restore oversized desktop section padding`
    );
  }
});

test("makes the CTA full-bleed, substantial at 768px, and flush with the footer", () => {
  const cta = read("components/sections/CTASection.tsx");
  const styles = read("app/globals.css");

  assert.match(cta, /cta-panel[\s\S]*min-h-\[34rem\][\s\S]*md:min-h-\[42rem\]/);
  assert.match(cta, /cta-panel[\s\S]*flex[\s\S]*items-center/);
  assert.doesNotMatch(cta, /max-w-7xl mx-auto/);
  assert.match(styles, /\.home-reference > section\.cta-panel,\s*\.cta-panel/);
  assert.doesNotMatch(styles, /\.cta-panel\s*\{[^}]*border-radius/);
  assert.match(styles, /\.cta-panel[\s\S]*background-color: #075bc7/);
  assert.match(styles, /url\("\/brand\/cta-background-mobile\.png"\)/);
  assert.match(styles, /@media \(min-width: 48rem\)[\s\S]*url\("\/brand\/cta-background-tablet\.png"\)/);
  assert.match(styles, /@media \(min-width: 80rem\)[\s\S]*url\("\/brand\/cta-background-desktop\.png"\)/);
  assert.match(styles, /\.cta-panel[\s\S]*background-size: 60px 60px, 60px 60px, cover, cover !important/);
  assert.match(styles, /\.cta-panel[\s\S]*background-position: center !important/);
  assert.match(styles, /\.cta-panel[\s\S]*background-repeat: repeat, repeat, no-repeat, no-repeat !important/);
  assert.doesNotMatch(styles, /cta-background1\.png|calc\(100% \+ 8rem\)/);
  assert.doesNotMatch(styles, /linear-gradient\(180deg[\s\S]*#080f1e 100%/);
  assert.match(cta, /mx-auto w-full max-w-\[90rem\]/);
  assert.match(cta, /xl:min-h-\[min\(46rem,72dvh\)\]/);
  assert.doesNotMatch(cta, /lg:text-left|lg:ml-auto|lg:mr-0/);
  assert.match(cta, /max-w-4xl text-center/);
  assert.match(cta, /max-w-2xl[\s\S]*lg:mx-auto/);
});

test("moves balanced homepage component scaling from 2xl to xl", () => {
  const sectionFiles = [
    "components/sections/SolutionsSection.tsx",
    "components/sections/PortfolioSection.tsx",
    "components/sections/AISection.tsx",
    "components/sections/HowWeWorkSection.tsx",
    "components/sections/WhyQuadPointSection.tsx",
    "components/sections/CTASection.tsx",
  ];

  for (const sectionFile of sectionFiles) {
    const source = read(sectionFile);
    assert.match(source, /xl:/, `${sectionFile} should scale at xl`);
    assert.doesNotMatch(source, /2xl:/, `${sectionFile} should not wait for 2xl`);
  }
});

test("caps only the hero height on unusually tall portrait viewports", () => {
  const styles = read("app/globals.css");

  assert.doesNotMatch(
    styles,
    /\.home-reference > section:not\(:first-child\):not\(:last-child\)\s*\{/
  );
  assert.match(
    styles,
    /@media \(min-height: 75rem\) and \(max-aspect-ratio: 4 \/ 5\)/
  );
  assert.match(
    styles,
    /\.home-reference > section:first-child[\s\S]*min-height: min\(100dvh, 50rem\)/
  );
});
