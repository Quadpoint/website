import assert from "node:assert/strict";
import test from "node:test";
import {
  getInitialRevealState,
  getPreparedRevealState,
} from "../lib/reveal-state.js";

test("keeps reveal content visible before client-side preparation", () => {
  assert.equal(getInitialRevealState(), "visible");
});

test("hides only offscreen content when client-side preparation runs", () => {
  assert.equal(getPreparedRevealState(true), "visible");
  assert.equal(getPreparedRevealState(false), "hidden");
});
