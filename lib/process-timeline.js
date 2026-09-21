/**
 * @param {{ top: number; bottom: number }[]} cardViewportBounds
 * @param {number} viewportHeight
 * @param {boolean} sectionVisible
 * @returns {{ targetStep: number }}
 */
export function calculateProcessTimeline(
  cardViewportBounds,
  viewportHeight,
  sectionVisible = false
) {
  if (!sectionVisible) return { targetStep: -1 };

  const furthestVisibleStep = cardViewportBounds.reduce(
    (latestStep, bounds, index) =>
      bounds.bottom > 0 && bounds.top < viewportHeight ? index : latestStep,
    -1
  );

  return { targetStep: Math.max(furthestVisibleStep, 0) };
}

/**
 * @param {number[]} dotViewportPositions
 * @param {number} activeStep
 */
export function getProcessTimelineProgress(
  dotViewportPositions,
  activeStep
) {
  if (activeStep <= 0) return 0;

  const thresholds = getProcessTimelineThresholds(dotViewportPositions);
  const safeStep = Math.min(activeStep, thresholds.length - 1);
  return thresholds[safeStep] ?? 0;
}

/**
 * @param {number[]} dotViewportPositions
 */
export function getProcessTimelineThresholds(dotViewportPositions) {
  if (dotViewportPositions.length === 0) return [];
  if (dotViewportPositions.length === 1) return [0];

  const firstPosition = dotViewportPositions[0];
  const lastPosition = dotViewportPositions.at(-1) ?? firstPosition;
  const timelineLength = lastPosition - firstPosition;
  if (timelineLength <= 0) return dotViewportPositions.map(() => 0);

  return dotViewportPositions.map(
    (position) => (position - firstPosition) / timelineLength
  );
}

/**
 * @param {number[]} thresholds
 * @param {number} progress
 * @param {boolean} started
 */
export function getProcessTimelineReachedStep(
  thresholds,
  progress,
  started
) {
  if (!started) return -1;

  return thresholds.reduce(
    (reachedStep, threshold, index) =>
      progress >= threshold ? index : reachedStep,
    -1
  );
}

function getProcessTimelineEase(progress) {
  const clampedProgress = Math.min(Math.max(progress, 0), 1);
  const x1 = 0.77;
  const y1 = 0;
  const x2 = 0.175;
  const y2 = 1;
  const sample = (time, firstControl, secondControl) => {
    const inverse = 1 - time;
    return (
      3 * inverse * inverse * time * firstControl +
      3 * inverse * time * time * secondControl +
      time * time * time
    );
  };
  const sampleDerivative = (time) => {
    const inverse = 1 - time;
    return (
      3 * inverse * inverse * x1 +
      6 * inverse * time * (x2 - x1) +
      3 * time * time * (1 - x2)
    );
  };

  let time = clampedProgress;
  for (let iteration = 0; iteration < 8; iteration += 1) {
    const error = sample(time, x1, x2) - clampedProgress;
    const derivative = sampleDerivative(time);
    if (Math.abs(error) < 0.000001 || Math.abs(derivative) < 0.000001) break;
    time -= error / derivative;
  }

  return sample(Math.min(Math.max(time, 0), 1), y1, y2);
}

/**
 * @param {number} startProgress
 * @param {number} targetProgress
 * @param {number} elapsed
 * @param {number} duration
 */
export function interpolateProcessTimelineProgress(
  startProgress,
  targetProgress,
  elapsed,
  duration
) {
  if (duration <= 0 || elapsed >= duration) return targetProgress;
  if (elapsed <= 0) return startProgress;

  const easedProgress = getProcessTimelineEase(elapsed / duration);
  return startProgress + (targetProgress - startProgress) * easedProgress;
}

/**
 * @param {number} highestTarget
 * @param {number} visibleTarget
 */
export function getPersistentProcessTimelineTarget(
  highestTarget,
  visibleTarget
) {
  return Math.max(highestTarget, visibleTarget);
}
