"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  calculateProcessTimeline,
  getPersistentProcessTimelineTarget,
  getProcessTimelineProgress,
  getProcessTimelineReachedStep,
  getProcessTimelineThresholds,
  interpolateProcessTimelineProgress,
} from "@/lib/process-timeline";
import { BarChart3, Pencil, Search, Settings } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "We learn how the business operates and where the current process causes problems before writing code.",
    icon: Search,
  },
  {
    number: "02",
    title: "Design",
    description:
      "We design the solution around the actual workflow. Architecture and user experience come before development.",
    icon: Pencil,
  },
  {
    number: "03",
    title: "Build",
    description:
      "We develop, integrate, test, and deploy the solution using maintainable code and production standards.",
    icon: Settings,
  },
  {
    number: "04",
    title: "Grow",
    description:
      "We improve and expand the system as the business changes so the technology can grow with it.",
    icon: BarChart3,
  },
];

const stairStages = [
  {
    name: "Ideas",
    asset: "ideas",
    unlighted: "/brand/ideas-unlighted.png",
    lighted: "/brand/ideas-lighted.png",
    position: "left-[29.8%] bottom-[8%]",
    width: "w-[35%]",
    layer: 4,
  },
  {
    name: "Solution",
    asset: "solution",
    unlighted: "/brand/solution-unlighted.png",
    lighted: "/brand/solution-lighted.png",
    position: "left-[40%] bottom-[20%]",
    width: "w-[35%]",
    layer: 3,
  },
  {
    name: "Product",
    asset: "product",
    unlighted: "/brand/product-unlighted.png",
    lighted: "/brand/product-lighted.png",
    position: "left-[56.5%] bottom-[35%]",
    width: "w-[35%]",
    layer: 2,
  },
  {
    name: "Impact",
    asset: "impact",
    unlighted: "/brand/impact-unlighted.png",
    lighted: "/brand/impact-lighted.png",
    position: "left-[73.5%] bottom-[50%]",
    width: "w-[35%]",
    layer: 1,
  },
];

const troughPoints = [
  { x: 197, y: 313 },
  { x: 304, y: 250 },
  { x: 422, y: 185 },
  { x: 529, y: 120 },
];

const processPath = `
  M 20 427
  C 90 410, 130 303, 165 303
  C 180 303, 185 313, 197 313
  C 220 313, 250 244, 280 244
  C 292 244, 298 250, 304 250
  C 330 250, 356 171, 388 171
  C 400 171, 410 185, 422 185
  C 447 185, 478 114, 506 114
  C 516 114, 520 120, 529 120
  C 560 90, 610 42, 654 23
`;

function getClosestPathDistance(
  path: SVGPathElement,
  totalLength: number,
  target: { x: number; y: number }
) {
  const samples = 96;
  let closestDistance = 0;
  let smallestError = Number.POSITIVE_INFINITY;

  for (let index = 0; index <= samples; index += 1) {
    const distance = (totalLength * index) / samples;
    const point = path.getPointAtLength(distance);
    const error = Math.hypot(point.x - target.x, point.y - target.y);

    if (error < smallestError) {
      smallestError = error;
      closestDistance = distance;
    }
  }

  return closestDistance;
}

function getArrowTransform(
  path: SVGPathElement,
  distance: number,
  totalLength: number
) {
  const arrowDistance = Math.max(distance - 2, 0);
  const current = path.getPointAtLength(arrowDistance);
  const before = path.getPointAtLength(Math.max(arrowDistance - 4, 0));
  const after = path.getPointAtLength(
    Math.min(arrowDistance + 4, totalLength)
  );
  const angle =
    (Math.atan2(after.y - before.y, after.x - before.x) * 180) / Math.PI;

  return `translate(${current.x}px, ${current.y}px) rotate(${angle}deg)`;
}

type StairStage = (typeof stairStages)[number];

function StairImageLayers({
  stage,
  isLighted,
}: {
  stage: StairStage;
  isLighted: boolean;
}) {
  return (
    <>
      <Image
        src={stage.unlighted}
        alt=""
        fill
        sizes="(max-width: 1023px) 35vw, 18vw"
        className="object-contain"
      />
      <Image
        src={stage.lighted}
        alt=""
        fill
        data-process-lighted
        sizes="(max-width: 1023px) 35vw, 18vw"
        className={`object-contain transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isLighted ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}

function ProcessStairAsset({
  stage,
  isLighted,
}: {
  stage: StairStage;
  isLighted: boolean;
}) {
  return (
    <div
      className={`absolute aspect-square process-stair -translate-x-1/2 translate-y-1/2 ${stage.width} ${stage.position}`}
      style={{ zIndex: stage.layer }}
    >
      {/* Actual stair artwork */}
      <div
        className="process-stair-art relative z-[2] size-full"
        style={{
          filter: "drop-shadow(0 5px 8px rgba(0,0,0,0.22))",
        }}
      >
        <StairImageLayers stage={stage} isLighted={isLighted} />
      </div>

      <span className="sr-only">{stage.name}</span>
    </div>
  );
}

export function HowWeWorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const arrowRef = useRef<SVGGElement>(null);
  const routeRef = useRef<SVGGElement>(null);
  const pointRefs = useRef<Array<SVGCircleElement | null>>([]);
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineTrackRef = useRef<HTMLDivElement>(null);
  const timelineFillRef = useRef<HTMLDivElement>(null);
  const timelineDotRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const timelineStepRefs = useRef<Array<HTMLLIElement | null>>([]);
  const timelineHighestTargetRef = useRef(-1);
  const timelineProgressRef = useRef(0);
  const [isProcessVisible, setIsProcessVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeStage, setActiveStage] = useState(-1);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const timeline = timelineRef.current;
    const track = timelineTrackRef.current;
    const fill = timelineFillRef.current;
    if (!section || !timeline || !track || !fill) return;

    let frameId: number | null = null;
    let geometryDirty = true;
    let touchActive = false;
    let targetStep = timelineHighestTargetRef.current;
    let currentProgress = timelineProgressRef.current;
    let animationStartProgress = currentProgress;
    let animationTargetProgress = currentProgress;
    let animationStartTime = 0;
    let animationDuration = 0;

    const updateTimeline = (now: number) => {
      frameId = null;
      const dots = timelineDotRefs.current.filter(
        (dot): dot is HTMLSpanElement => dot !== null
      );
      const cards = timelineStepRefs.current.filter(
        (card): card is HTMLLIElement => card !== null
      );
      if (dots.length !== steps.length || cards.length !== steps.length) return;

      const dotPositions = dots.map((dot) => {
        const bounds = dot.getBoundingClientRect();
        return bounds.top + bounds.height / 2;
      });
      const thresholds = getProcessTimelineThresholds(dotPositions);

      if (geometryDirty) {
        const timelineBounds = timeline.getBoundingClientRect();
        const firstCenter = dotPositions[0] - timelineBounds.top;
        const lastCenter = dotPositions.at(-1)! - timelineBounds.top;
        track.style.top = `${firstCenter}px`;
        track.style.height = `${lastCenter - firstCenter}px`;
        geometryDirty = false;
      }

      const sectionBounds = section.getBoundingClientRect();
      const sectionVisible =
        sectionBounds.bottom > 0 && sectionBounds.top < window.innerHeight;
      const cardBounds = cards.map((card) => {
        const bounds = card.getBoundingClientRect();
        return { top: bounds.top, bottom: bounds.bottom };
      });
      const nextTimeline = calculateProcessTimeline(
        cardBounds,
        window.innerHeight,
        sectionVisible
      );
      targetStep = getPersistentProcessTimelineTarget(
        timelineHighestTargetRef.current,
        nextTimeline.targetStep
      );
      timelineHighestTargetRef.current = targetStep;
      const targetProgress = getProcessTimelineProgress(
        dotPositions,
        targetStep
      );

      if (reducedMotion) {
        currentProgress = targetProgress;
        animationStartProgress = targetProgress;
        animationTargetProgress = targetProgress;
        animationDuration = 0;
      } else {
        currentProgress = interpolateProcessTimelineProgress(
          animationStartProgress,
          animationTargetProgress,
          now - animationStartTime,
          animationDuration
        );

        if (targetProgress !== animationTargetProgress) {
          animationStartProgress = currentProgress;
          animationTargetProgress = targetProgress;
          animationStartTime = now;
          animationDuration =
            Math.abs(targetProgress - currentProgress) *
            (steps.length - 1) *
            220;
        }
      }

      timelineProgressRef.current = currentProgress;
      fill.style.transform = `scaleY(${currentProgress})`;
      const reachedStep = getProcessTimelineReachedStep(
        thresholds,
        currentProgress,
        targetStep >= 0
      );
      dots.forEach((dot, index) => {
        dot.dataset.complete = String(index <= reachedStep);
      });

      if (touchActive || currentProgress < targetProgress) scheduleUpdate();
    };

    const scheduleUpdate = () => {
      if (frameId === null) {
        frameId = requestAnimationFrame(updateTimeline);
      }
    };

    const handleResize = () => {
      geometryDirty = true;
      scheduleUpdate();
    };

    const handleTouchStart = () => {
      touchActive = true;
      scheduleUpdate();
    };

    const handleTouchEnd = () => {
      touchActive = false;
      scheduleUpdate();
    };

    scheduleUpdate();
    if (!reducedMotion) {
      window.addEventListener("scroll", scheduleUpdate, { passive: true });
      window.addEventListener("touchstart", handleTouchStart, { passive: true });
      window.addEventListener("touchend", handleTouchEnd, { passive: true });
      window.addEventListener("touchcancel", handleTouchEnd, { passive: true });
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchEnd);
      window.removeEventListener("resize", handleResize);
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, [reducedMotion]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let sectionInView = false;
    const updateVisibility = () => {
      setIsProcessVisible(
        sectionInView && document.visibilityState === "visible"
      );
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        sectionInView = entry.intersectionRatio >= 0.25;
        updateVisibility();
      },
      { threshold: 0.25 }
    );
    observer.observe(section);
    document.addEventListener("visibilitychange", updateVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const path = pathRef.current;
    const arrow = arrowRef.current;
    const route = routeRef.current;
    if (!section || !path || !arrow || !route) return;

    const totalLength = path.getTotalLength();
    const milestoneDistances = troughPoints.map((point) =>
      getClosestPathDistance(path, totalLength, point)
    );
    const completedArrowTransform = getArrowTransform(
      path,
      totalLength,
      totalLength
    );

    const drawDuration = 3600;
    const milestoneLeadTime = 75;
    const holdDuration = 2000;
    const fadeDuration = 250;
    const resetDuration = 150;
    const arrowSamples = 48;
    const arrowStartTransform = getArrowTransform(path, 0, totalLength);
    const lightedLayers = Array.from(
      section.querySelectorAll<HTMLElement>("[data-process-lighted]")
    );
    let activeAnimations: Animation[] = [];
    let milestoneTimers: number[] = [];
    let cycleTimer: number | null = null;
    let cancelled = false;

    const cancelAnimations = () => {
      activeAnimations.forEach((animation) => animation.cancel());
      activeAnimations = [];
    };

    const clearMilestoneTimers = () => {
      milestoneTimers.forEach(window.clearTimeout);
      milestoneTimers = [];
    };

    const resetVisuals = () => {
      path.style.strokeDasharray = `${totalLength}`;
      path.style.strokeDashoffset = `${totalLength}`;
      arrow.style.opacity = "0";
      arrow.style.transform = arrowStartTransform;
      route.style.opacity = "1";
      pointRefs.current.forEach((point) => {
        if (point) point.style.opacity = "0";
      });
      setActiveStage(-1);
    };

    const showCompletedState = () => {
      path.style.strokeDashoffset = "0";
      arrow.style.opacity = "1";
      arrow.style.transform = completedArrowTransform;
      pointRefs.current.forEach((point) => {
        if (point) point.style.opacity = "1";
      });
      setActiveStage(stairStages.length - 1);
    };

    if (reducedMotion) {
      showCompletedState();
      return;
    }

    resetVisuals();
    if (!isProcessVisible) return;

    const arrowKeyframes = Array.from(
      { length: arrowSamples + 1 },
      (_, index) => ({
        opacity: index === 0 ? 0 : 1,
        transform: getArrowTransform(
          path,
          (totalLength * index) / arrowSamples,
          totalLength
        ),
      })
    );
    const timing: KeyframeAnimationOptions = {
      duration: drawDuration,
      easing: "linear",
      fill: "forwards",
    };

    const runCycle = () => {
      if (cancelled) return;
      cancelAnimations();
      clearMilestoneTimers();
      resetVisuals();

      const pathAnimation = path.animate(
        [
          { strokeDashoffset: totalLength },
          { strokeDashoffset: 0 },
        ],
        timing
      );
      const arrowAnimation = arrow.animate(arrowKeyframes, timing);
      activeAnimations = [pathAnimation, arrowAnimation];
      milestoneTimers = milestoneDistances.map((distance, index) =>
        window.setTimeout(() => {
          const point = pointRefs.current[index];
          if (point) point.style.opacity = "1";
          setActiveStage(index);
        }, Math.max((distance / totalLength) * drawDuration - milestoneLeadTime, 0))
      );

      Promise.all([pathAnimation.finished, arrowAnimation.finished])
        .then(() => {
          if (cancelled) return;
          cycleTimer = window.setTimeout(() => {
            if (cancelled) return;
            const fadeTiming: KeyframeAnimationOptions = {
              duration: fadeDuration,
              easing: "cubic-bezier(0.23, 1, 0.32, 1)",
              fill: "forwards",
            };
            const fadeAnimations = [
              route.animate([{ opacity: 1 }, { opacity: 0 }], fadeTiming),
              ...lightedLayers.map((layer) =>
                layer.animate([{ opacity: 1 }, { opacity: 0 }], fadeTiming)
              ),
            ];
            activeAnimations = [...activeAnimations, ...fadeAnimations];

            Promise.all(fadeAnimations.map((animation) => animation.finished))
              .then(() => {
                if (cancelled) return;
                resetVisuals();
                cycleTimer = window.setTimeout(runCycle, resetDuration);
              })
              .catch(() => {});
          }, holdDuration);
        })
        .catch(() => {});
    };

    runCycle();

    return () => {
      cancelled = true;
      cancelAnimations();
      clearMilestoneTimers();
      if (cycleTimer !== null) window.clearTimeout(cycleTimer);
    };
  }, [isProcessVisible, reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#07172f] py-20 xl:py-24"
      aria-labelledby="process-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(103,200,255,0.9) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12">
        <FadeIn className="mb-12 text-center lg:mb-16">
          <SectionLabel variant="white" className="mb-4">
            Our process
          </SectionLabel>
          <h2
            id="process-heading"
            className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            From business problem to working software
          </h2>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
            We learn how the work happens, design the right approach, and build
            a system your team can use.
          </p>
        </FadeIn>

        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-8 xl:gap-10">
          <div ref={timelineRef} className="relative">
            <div
              ref={timelineTrackRef}
              data-process-timeline-track
              className="pointer-events-none absolute left-[7px] w-px bg-white/15 sm:left-[9px]"
              style={{ top: "50%", height: 0 }}
              aria-hidden="true"
            >
              <div
                ref={timelineFillRef}
                data-process-timeline-fill
                className="absolute inset-0 origin-top will-change-transform"
                style={{ transform: "scaleY(0)" }}
              >
                <span className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-white via-[#a8e4ff] to-[#67c8ff] shadow-[0_0_6px_#67c8ff,0_0_16px_rgba(103,200,255,0.72)]" />
              </div>
            </div>
            <ol className="space-y-4 sm:space-y-5">
              {steps.map((step, index) => {
                const StepIcon = step.icon;

                return (
                  <li
                    ref={(element) => {
                      timelineStepRefs.current[index] = element;
                    }}
                    key={step.number}
                    data-process-step
                    tabIndex={0}
                    className="group/process-step relative grid grid-cols-[16px_minmax(0,1fr)] items-center gap-4 rounded-xl outline-none sm:grid-cols-[20px_minmax(0,1fr)] sm:gap-5"
                  >
                    <span
                      ref={(element) => {
                        timelineDotRefs.current[index] = element;
                      }}
                      data-complete="false"
                      className="process-timeline-dot relative z-10 block size-4 rounded-full border-2 border-[#67c8ff]/55 bg-[#07172f] sm:size-5 group-hover/process-step:scale-110 group-hover/process-step:border-white group-hover/process-step:bg-[#a8e4ff] group-hover/process-step:shadow-[0_0_7px_#fff,0_0_20px_rgba(103,200,255,0.95)] group-focus-visible/process-step:scale-110 group-focus-visible/process-step:border-white group-focus-visible/process-step:bg-[#a8e4ff] group-focus-visible/process-step:shadow-[0_0_7px_#fff,0_0_20px_rgba(103,200,255,0.95)]"
                      aria-hidden="true"
                    />
                    <article className="grid grid-cols-[3.25rem_minmax(0,1fr)] items-center gap-4 rounded-xl border border-[#1684cc]/35 bg-[#0a2850]/75 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.025)] transition-[background-color,border-color,transform] duration-300 ease-out group-hover/process-step:translate-x-1 group-hover/process-step:border-[#37a8ee]/65 group-hover/process-step:bg-[#0b2e5b]/85 group-focus-visible/process-step:translate-x-1 group-focus-visible/process-step:border-[#37a8ee]/65 group-focus-visible/process-step:bg-[#0b2e5b]/85 sm:grid-cols-[3.75rem_minmax(0,1fr)] sm:gap-5 sm:px-5 sm:py-5">
                      <span
                        data-process-step-icon
                        className="flex size-[3.25rem] items-center justify-center rounded-full bg-[#ff9f1c] text-white shadow-[0_0_18px_rgba(255,159,28,0.18)] sm:size-[3.75rem]"
                      >
                        <StepIcon
                          className="size-6 stroke-[2.4] sm:size-7"
                          aria-hidden="true"
                        />
                      </span>
                      <div>
                        <div className="mb-1.5 flex items-baseline gap-3">
                          <span className="text-xl font-bold tabular-nums text-[#ffad32] sm:text-2xl">
                            {step.number}
                          </span>
                          <h3 className="text-lg font-semibold text-white">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-sm leading-relaxed text-white/65">
                          {step.description}
                        </p>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ol>
          </div>

          <div
            data-process-visual
            className={`relative mx-auto aspect-[7/5] w-full max-w-[760px] lg:w-[112%] lg:max-w-[840px] xl:w-[118%] xl:max-w-[900px] ${
              reducedMotion ? "process-stage-complete" : ""
            }`}
            role="img"
            aria-label="Ideas progressing through solution and product into business impact"
          >
            {stairStages.map((stage, index) => (
              <ProcessStairAsset
                key={stage.asset}
                stage={stage}
                isLighted={index <= activeStage}
              />
            ))}
            <svg
              viewBox="0 0 700 500"
              preserveAspectRatio="xMidYMid meet"
              className="process-route-glow pointer-events-none absolute inset-0 z-20 size-full overflow-visible"
              aria-hidden="true"
            >
              <g ref={routeRef} data-process-route>
                <path
                  ref={pathRef}
                  data-process-path
                  d={processPath}
                  fill="none"
                  stroke="#dff6ff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ strokeDasharray: 2000, strokeDashoffset: 2000 }}
                />
                {troughPoints.map((point, index) => (
                  <circle
                    key={index}
                    ref={(element) => {
                      pointRefs.current[index] = element;
                    }}
                    cx={point.x}
                    cy={point.y}
                    r="8"
                    fill="white"
                    stroke="#67c8ff"
                    strokeWidth="3.5"
                    className="opacity-0 transition-opacity duration-150"
                  />
                ))}
                <g ref={arrowRef} opacity="0">
                  <path
                    d="M 11 0 L -10 -7 M 11 0 L -10 7"
                    fill="none"
                    stroke="#dff6ff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
