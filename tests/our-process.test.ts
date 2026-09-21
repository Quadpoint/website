import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import * as processTimeline from "../lib/process-timeline.js";

const {
  calculateProcessTimeline,
  getProcessTimelineProgress,
  getProcessTimelineReachedStep,
  getProcessTimelineThresholds,
  interpolateProcessTimelineProgress,
} = processTimeline;

const source = readFileSync(
  new URL("../components/sections/HowWeWorkSection.tsx", import.meta.url),
  "utf8"
);
const styles = readFileSync(
  new URL("../app/globals.css", import.meta.url),
  "utf8"
);

test("builds the process staircase from matching unlighted and lighted assets", () => {
  for (const stage of ["solution", "product", "impact"]) {
    assert.match(source, new RegExp(`/brand/${stage}-unlighted\\.png`));
    assert.match(source, new RegExp(`/brand/${stage}-lighted\\.png`));
  }
  assert.match(source, /\/brand\/ideas-unlighted2\.png/);
  assert.match(source, /\/brand\/ideas-lighted2\.png/);
  assert.match(source, /name: "Ideas"[\s\S]*?width: "w-\[35%\]"/);
  assert.match(
    source,
    /className=\{`absolute aspect-square[\s\S]*?\$\{stage\.width\}/
  );
});

test("renders a distinct orange icon marker for every process card", () => {
  assert.match(
    source,
    /import \{ BarChart3, Pencil, Search, Settings \} from "lucide-react";/
  );
  assert.match(source, /title: "Discover",[\s\S]*?icon: Search/);
  assert.match(source, /title: "Design",[\s\S]*?icon: Pencil/);
  assert.match(source, /title: "Build",[\s\S]*?icon: Settings/);
  assert.match(source, /title: "Grow",[\s\S]*?icon: BarChart3/);
  assert.match(source, /const StepIcon = step\.icon/);
  assert.match(source, /data-process-step-icon/);
  assert.match(source, /<StepIcon[\s\S]*?aria-hidden="true"/);
});

test("stacks the lower stairs in front while keeping the path above all stairs", () => {
  assert.match(source, /name: "Ideas"[\s\S]*?layer: 4/);
  assert.match(source, /name: "Solution"[\s\S]*?layer: 3/);
  assert.match(source, /name: "Product"[\s\S]*?layer: 2/);
  assert.match(source, /name: "Impact"[\s\S]*?layer: 1/);
  assert.match(source, /style=\{\{ zIndex: stage\.layer \}\}/);
  assert.match(source, /<svg[\s\S]*?z-20/);
});

test("uses one responsive SVG coordinate system for the path, points, and arrow", () => {
  assert.match(source, /viewBox="0 0 700 500"/);
  assert.match(source, /data-process-path/);
  assert.match(source, /getPointAtLength/);
  assert.match(source, /strokeDashoffset/);
  assert.match(source, /const drawDuration = 3600/);
  assert.match(source, /M 180 430/);
  assert.match(source, /C 555 214, 600 80, 680 35/);
  assert.match(source, /strokeWidth="2\.5"/);
});

test("lights each stair only after its matching path point", () => {
  assert.match(source, /const troughPoints = \[/);
  assert.match(source, /\{ x: 260, y: 384 \}/);
  assert.match(source, /\{ x: 350, y: 338 \}/);
  assert.match(source, /\{ x: 440, y: 280 \}/);
  assert.match(source, /\{ x: 532, y: 214 \}/);
  assert.match(source, /useState\(-1\)/);
  assert.match(source, /setActiveStage\(-1\)/);
  assert.match(source, /troughPoints\.map\(\(point, index\)/);
  assert.match(source, /getClosestPathDistance/);
});

test("keeps the approved stair composition proportional at every dimension", () => {
  assert.match(source, /aspect-\[7\/5\]/);
  assert.match(source, /position: "left-\[30%\] bottom-\[9%\]"/);
  assert.match(source, /position: "left-\[39\.5%\] bottom-\[30%\]"/);
  assert.match(source, /position: "left-\[56\.5%\] bottom-\[56%\]"/);
  assert.match(source, /position: "left-\[73\.5%\] bottom-\[82%\]"/);
  assert.match(source, /-translate-x-1\/2 translate-y-1\/2/);
});

test("keeps staircase blocks free of floor reflections and guide drops", () => {
  assert.match(source, /function ProcessStairAsset/);
  assert.doesNotMatch(source, /function StageGuideDrop/);
  assert.doesNotMatch(source, /stageGuideDrops/);
  assert.doesNotMatch(source, /process-stair-reflection/);

  assert.match(
    styles,
    /\.process-stair-art\s*\{[\s\S]*drop-shadow\(0 14px 18px rgba\(0, 0, 0, 0\.32\)\)[\s\S]*drop-shadow\(0 4px 8px rgba\(0, 90, 180, 0\.18\)\)/
  );
  assert.doesNotMatch(styles, /\.process-stair::after\s*\{/);
  assert.doesNotMatch(styles, /\.process-stair-reflection\s*\{/);
  assert.doesNotMatch(styles, /\.process-stair-reflection-image\s*\{/);
});

test("runs the process loop only while the section is visible", () => {
  assert.match(source, /IntersectionObserver/);
  assert.match(source, /requestAnimationFrame/);
  assert.match(source, /cancelAnimationFrame/);
});

test("provides a completed static composition when reduced motion is requested", () => {
  assert.match(source, /prefers-reduced-motion: reduce/);
  assert.match(source, /process-stage-complete/);
});

test("selects the furthest process card with any visible portion", () => {
  const cards = [
    { top: -120, bottom: -20 },
    { top: -10, bottom: 90 },
    { top: 900, bottom: 1010 },
    { top: 1100, bottom: 1210 },
  ];

  assert.deepEqual(calculateProcessTimeline(cards, 1000, true), {
    targetStep: 2,
  });
});

test("uses Discover while only the section is visible and resets outside it", () => {
  const offscreenCards = [
    { top: 1100, bottom: 1200 },
    { top: 1210, bottom: 1310 },
    { top: 1320, bottom: 1420 },
    { top: 1430, bottom: 1530 },
  ];

  assert.deepEqual(calculateProcessTimeline(offscreenCards, 1000, true), {
    targetStep: 0,
  });
  assert.deepEqual(calculateProcessTimeline(offscreenCards, 1000, false), {
    targetStep: -1,
  });
});

test("maps completed steps to their exact uneven dot positions", () => {
  const dots = [570, 660, 780, 870];

  assert.equal(getProcessTimelineProgress(dots, -1), 0);
  assert.equal(getProcessTimelineProgress(dots, 0), 0);
  assert.equal(getProcessTimelineProgress(dots, 1), 0.3);
  assert.equal(getProcessTimelineProgress(dots, 2), 0.7);
  assert.equal(getProcessTimelineProgress(dots, 3), 1);
});

test("normalizes uneven dot centers into progress thresholds", () => {
  assert.deepEqual(getProcessTimelineThresholds([570, 660, 780, 870]), [
    0, 0.3, 0.7, 1,
  ]);
});

test("lights a milestone only when animated progress reaches its center", () => {
  const thresholds = [0, 0.3, 0.7, 1];

  assert.equal(getProcessTimelineReachedStep(thresholds, 0.2999, true), 0);
  assert.equal(getProcessTimelineReachedStep(thresholds, 0.3, true), 1);
  assert.equal(getProcessTimelineReachedStep(thresholds, 0.6999, true), 1);
  assert.equal(getProcessTimelineReachedStep(thresholds, 0.7, true), 2);
  assert.equal(getProcessTimelineReachedStep(thresholds, 1, true), 3);
});

test("keeps every milestone inactive before the guided reveal starts", () => {
  assert.equal(getProcessTimelineReachedStep([0, 0.3, 0.7, 1], 0, false), -1);
});

test("retargets progress from its current position without resetting", () => {
  const inFlightProgress = interpolateProcessTimelineProgress(0, 0.7, 110, 220);
  const retargetedStart = interpolateProcessTimelineProgress(
    inFlightProgress,
    1,
    0,
    220
  );
  const retargetedProgress = interpolateProcessTimelineProgress(
    inFlightProgress,
    1,
    110,
    220
  );

  assert.ok(inFlightProgress > 0 && inFlightProgress < 0.7);
  assert.equal(retargetedStart, inFlightProgress);
  assert.ok(retargetedProgress > inFlightProgress);
  assert.ok(retargetedProgress < 1);
});

test("keeps the highest timeline milestone reached until the page reloads", () => {
  assert.equal(
    typeof processTimeline.getPersistentProcessTimelineTarget,
    "function"
  );

  const keepHighest = processTimeline.getPersistentProcessTimelineTarget!;
  assert.equal(keepHighest(-1, 0), 0);
  assert.equal(keepHighest(0, 2), 2);
  assert.equal(keepHighest(2, 1), 2);
  assert.equal(keepHighest(2, -1), 2);
  assert.equal(keepHighest(2, 3), 3);
});

test("renders and schedules the scroll-driven timeline with cleanup", () => {
  assert.match(source, /data-process-timeline-track/);
  assert.match(source, /data-process-timeline-fill/);
  assert.match(source, /origin-top/);
  assert.match(source, /calculateProcessTimeline/);
  assert.match(source, /getProcessTimelineProgress/);
  assert.match(source, /getProcessTimelineReachedStep/);
  assert.match(source, /getProcessTimelineThresholds/);
  assert.match(source, /interpolateProcessTimelineProgress/);
  assert.match(source, /getPersistentProcessTimelineTarget/);
  assert.match(source, /timelineStepRefs/);
  assert.match(source, /addEventListener\("scroll", scheduleUpdate, \{ passive: true \}\)/);
  assert.match(source, /addEventListener\("touchstart", handleTouchStart, \{ passive: true \}\)/);
  assert.match(source, /addEventListener\("touchend", handleTouchEnd, \{ passive: true \}\)/);
  assert.match(source, /addEventListener\("touchcancel", handleTouchEnd, \{ passive: true \}\)/);
  assert.match(source, /addEventListener\("resize", handleResize\)/);
  assert.match(source, /removeEventListener\("scroll", scheduleUpdate\)/);
  assert.match(source, /removeEventListener\("touchstart", handleTouchStart\)/);
  assert.match(source, /removeEventListener\("touchend", handleTouchEnd\)/);
  assert.match(source, /removeEventListener\("touchcancel", handleTouchEnd\)/);
  assert.match(source, /removeEventListener\("resize", handleResize\)/);
  assert.match(source, /cancelAnimationFrame/);
  assert.match(source, /dot\.dataset\.complete = String\(index <= reachedStep\)/);
  assert.match(source, /if \(touchActive \|\| currentProgress < targetProgress\) scheduleUpdate\(\)/);
  assert.doesNotMatch(source, /activeTimelineStep/);
  assert.doesNotMatch(source, /transitionDuration/);
  assert.match(source, /if \(reducedMotion\) \{[\s\S]*?currentProgress = targetProgress/);
});
