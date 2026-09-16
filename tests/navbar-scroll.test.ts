import assert from "node:assert/strict";
import test from "node:test";

import {
  getNavbarShadowClassName,
  getNavbarScrollReference,
  getNavbarScrollState,
} from "../lib/navbar-scroll.ts";

test("keeps the transparent navbar visible at the top of the page", () => {
  assert.deepEqual(
    getNavbarScrollState({
      currentY: 12,
      previousY: 0,
      wasVisible: false,
      mobileOpen: false,
    }),
    { isScrolled: false, isVisible: true }
  );
});

test("hides the navbar when scrolling down beyond the top threshold", () => {
  assert.deepEqual(
    getNavbarScrollState({
      currentY: 120,
      previousY: 100,
      wasVisible: true,
      mobileOpen: false,
    }),
    { isScrolled: true, isVisible: false }
  );
});

test("shows the white navbar when scrolling up", () => {
  assert.deepEqual(
    getNavbarScrollState({
      currentY: 100,
      previousY: 120,
      wasVisible: false,
      mobileOpen: false,
    }),
    { isScrolled: true, isVisible: true }
  );
});

test("ignores small scroll changes that would make the navbar jitter", () => {
  assert.deepEqual(
    getNavbarScrollState({
      currentY: 105,
      previousY: 100,
      wasVisible: true,
      mobileOpen: false,
    }),
    { isScrolled: true, isVisible: true }
  );
});

test("keeps the navbar visible while the mobile menu is open", () => {
  assert.deepEqual(
    getNavbarScrollState({
      currentY: 120,
      previousY: 100,
      wasVisible: false,
      mobileOpen: true,
    }),
    { isScrolled: true, isVisible: true }
  );
});

test("accumulates small scroll changes until they pass the direction threshold", () => {
  const initialReference = 100;
  const afterFirstSmallMove = getNavbarScrollReference(105, initialReference);
  const afterSecondSmallMove = getNavbarScrollReference(109, afterFirstSmallMove);

  assert.equal(afterFirstSmallMove, initialReference);
  assert.equal(afterSecondSmallMove, 109);
});

test("removes the scrolled navbar shadow while the header is hidden", () => {
  assert.equal(getNavbarShadowClassName(true, false), "shadow-none");
  assert.equal(
    getNavbarShadowClassName(true, true),
    "shadow-[0_1px_0_0_#e5e7eb]"
  );
});
