import assert from "node:assert/strict";
import test from "node:test";

import { addHighlightedSolution } from "../lib/solution-highlight.ts";

test("keeps every solution highlighted once it has been visited", () => {
  const first = addHighlightedSolution(new Set<string>(), "Business Software");
  const second = addHighlightedSolution(first, "AI & Automation");
  const repeated = addHighlightedSolution(second, "Business Software");

  assert.deepEqual([...repeated], ["Business Software", "AI & Automation"]);
  assert.equal(repeated, second);
});
