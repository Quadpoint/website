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
  assert.match(source, /\/brand\/ideas-unlighted\.png/);
  assert.match(source, /\/brand\/ideas-lighted\.png/);
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

test("uses one responsive SVG coordinate system for a naturally segmented path", () => {
  assert.match(source, /viewBox="0 0 700 500"/);
  assert.match(source, /data-process-path/);
  assert.match(source, /getPointAtLength/);
  assert.match(source, /strokeDashoffset/);
  assert.match(source, /const drawDuration = 3600/);
  assert.match(source, /M 20 427/);
  assert.match(source, /C 90 410, 130 303, 165 303/);
  assert.match(source, /C 180 303, 185 313, 197 313/);
  assert.match(source, /C 220 313, 250 244, 280 244/);
  assert.match(source, /C 447 185, 478 114, 506 114/);
  assert.match(source, /C 560 90, 610 42, 654 23/);
  assert.match(source, /stroke="#dff6ff"/);
  assert.match(source, /strokeWidth="2"/);
});

test("draws one flow beginning below-left of Ideas", () => {
  assert.equal(source.match(/d=\{processPath\}/g)?.length, 1);
  assert.doesNotMatch(source, /stroke="rgb\(103 200 255 \/ 0\.18\)"/);
});

test("keeps every path milestone above its matching stair face", () => {
  assert.match(source, /const troughPoints = \[/);
  assert.match(source, /\{ x: 197, y: 313 \}/);
  assert.match(source, /\{ x: 304, y: 250 \}/);
  assert.match(source, /\{ x: 422, y: 185 \}/);
  assert.match(source, /\{ x: 529, y: 120 \}/);
  assert.match(source, /useState\(-1\)/);
  assert.match(source, /setActiveStage\(index\)/);
  assert.match(source, /troughPoints\.map\(\(point, index\)/);
  assert.match(source, /getClosestPathDistance/);
});

test("rises continuously from Product through Impact to the arrow", () => {
  assert.doesNotMatch(source, /C 463 195, 475 108, 500 100/);
  assert.doesNotMatch(source, /C 520 94, 521 115, 532 115/);
  assert.match(
    source,
    /C 400 171, 410 185, 422 185\s+C 447 185, 478 114, 506 114\s+C 516 114, 520 120, 529 120\s+C 560 90, 610 42, 654 23/
  );
});

test("uses aligned handles for smooth joins throughout the process line", () => {
  assert.match(source, /C 220 313, 250 244, 280 244/);
  assert.match(source, /C 292 244, 298 250, 304 250/);
  assert.match(source, /C 330 250, 356 171, 388 171/);
  assert.match(source, /C 400 171, 410 185, 422 185/);
  assert.doesNotMatch(source, /C 475 180, 500 135, 532 115/);
});

test("keeps the approved stair composition proportional at every dimension", () => {
  assert.match(source, /aspect-\[7\/5\]/);
  assert.match(source, /xl:max-w-\[900px\]/);
  assert.match(source, /lg:w-\[112%\][\s\S]*xl:w-\[118%\]/);
  assert.match(source, /position: "left-\[29\.8%\] bottom-\[8%\]"/);
  assert.match(source, /position: "left-\[40%\] bottom-\[20%\]"/);
  assert.match(source, /position: "left-\[56\.5%\] bottom-\[35%\]"/);
  assert.match(source, /position: "left-\[73\.5%\] bottom-\[50%\]"/);
  assert.match(source, /-translate-x-1\/2 translate-y-1\/2/);
});

test("gives the enlarged process artwork a crisp luminous route", () => {
  assert.match(source, /data-process-visual/);
  assert.match(source, /process-route-glow/);
  assert.match(source, /r="8"/);
  assert.match(source, /strokeWidth="3\.5"/);
  assert.match(source, /d="M 11 0 L -10 -7 M 11 0 L -10 7"/);
  assert.match(styles, /\.process-route-glow\s*\{[\s\S]*drop-shadow\(0 0 2px rgb\(39 183 255 \/ 0\.95\)\)[\s\S]*drop-shadow\(0 0 8px rgb\(0 119 255 \/ 0\.72\)\)/);
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

test("loops the process route only while the section and page are visible", () => {
  assert.match(source, /IntersectionObserver/);
  assert.match(source, /threshold: 0\.25/);
  assert.match(source, /entry\.intersectionRatio >= 0\.25/);
  assert.match(source, /document\.visibilityState === "visible"/);
  assert.match(source, /document\.addEventListener\("visibilitychange"/);
  assert.match(source, /document\.removeEventListener\("visibilitychange"/);
  assert.match(source, /setIsProcessVisible/);
  assert.match(source, /return \(\) => \{[\s\S]*observer\.disconnect\(\)/);
  assert.match(source, /path\.animate\(/);
  assert.match(source, /arrow\.animate\(/);
  assert.match(source, /fill: "forwards"/);
  assert.match(source, /const arrowSamples = 48/);
  assert.doesNotMatch(source, /requestAnimationFrame\(animate\)/);
});

test("holds, fades, and resets each completed route before redrawing", () => {
  assert.match(source, /const holdDuration = 2000/);
  assert.match(source, /const fadeDuration = 250/);
  assert.match(source, /const resetDuration = 150/);
  assert.match(source, /const runCycle = \(\) =>/);
  assert.match(source, /data-process-route/);
  assert.match(source, /data-process-lighted/);
  assert.match(source, /route\.animate\(/);
  assert.match(source, /resetVisuals\(\);\s+cycleTimer = window\.setTimeout\(runCycle, resetDuration\)/);
  assert.match(source, /runCycle\(\)/);
});

test("cancels every process animation and timer during cleanup", () => {
  assert.match(source, /activeAnimations\.forEach\(\(animation\) => animation\.cancel\(\)\)/);
  assert.match(source, /activeAnimations = \[\.\.\.activeAnimations, \.\.\.fadeAnimations\]/);
  assert.match(source, /milestoneTimers\.forEach\(window\.clearTimeout\)/);
  assert.match(source, /window\.clearTimeout\(cycleTimer\)/);
  assert.doesNotMatch(source, /setInterval/);
});

test("lights the blocks in path order without per-frame geometry work", () => {
  assert.match(source, /milestoneDistances\.map/);
  assert.match(source, /const milestoneLeadTime = 75/);
  assert.match(source, /window\.setTimeout/);
  assert.match(source, /Math\.max\([\s\S]*?\(distance \/ totalLength\) \* drawDuration - milestoneLeadTime,[\s\S]*?0[\s\S]*?\)/);
  assert.match(source, /setActiveStage\(index\)/);
  assert.match(source, /milestoneTimers\.forEach\(window\.clearTimeout\)/);
  assert.doesNotMatch(source, /const animate = \(now: number\)/);
});

test("reveals milestone circles quickly as the route reaches them", () => {
  assert.match(source, /transition-opacity duration-150/);
  assert.doesNotMatch(source, /transition-opacity duration-300/);
});

test("hides the arrowhead before the client animation initializes", () => {
  assert.match(source, /<g ref=\{arrowRef\} opacity="0">/);
});

test("keeps the route lightweight and omits the dotted vertical connector", () => {
  assert.doesNotMatch(source, /feGaussianBlur/);
  assert.doesNotMatch(source, /filter="url\(#process-/);
  assert.doesNotMatch(source, /strokeDasharray="[^"]*\s[^"]*"/);
  assert.doesNotMatch(source, /data-process-vertical-connector/);
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
