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
  assert.match(navbar, /pathname === "\/" && "home-navbar-canvas"/);
});

test("scales the hero composition at the xl breakpoint", () => {
  const hero = read("components/sections/HeroSection.tsx");

  assert.match(hero, /xl:max-w-\[720px\]/);
  assert.match(hero, /xl:w-\[720px\]/);
  assert.match(hero, /xl:text-\[3\.75rem\]/);
  assert.doesNotMatch(hero, /xl:text-xl/);
  assert.match(hero, /xl:gap-24/);
  assert.doesNotMatch(hero, /2xl:/);
});

test("uses compact content-driven spacing for non-hero homepage sections", () => {
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
