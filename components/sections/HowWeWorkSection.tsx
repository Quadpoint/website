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
      "Understand the business, its challenges, and opportunities. We ask the right questions before writing a single line of code.",
    icon: Search,
  },
  {
    number: "02",
    title: "Design",
    description:
      "Design a technology solution around the actual workflow. Architecture, UX, and system design come before development.",
    icon: Pencil,
  },
  {
    number: "03",
    title: "Build",
    description:
      "Develop, integrate, test, and deploy the solution. Clean, maintainable code built to production standards.",
    icon: Settings,
  },
  {
    number: "04",
    title: "Grow",
    description:
      "Improve and expand the system as the business evolves. Technology should scale with your ambitions.",
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
  { x: 260, y: 384 },
  { x: 350, y: 338 },
  { x: 440, y: 280 },
  { x: 532, y: 214 },
];

const processPath = `
  M 100 430
  C 190 390, 200 350, 220 348
  C 238 346, 242 384, 260 384
  C 278 384, 290 310, 310 305
  C 328 300, 333 338, 350 338
  C 368 338, 380 255, 400 250
  C 418 245, 423 280, 440 280
  C 458 280, 470 190, 490 185
  C 508 180, 515 214, 532 214
  C 555 214, 600 80, 680 35
`;

function getClosestPathDistance(
  path: SVGPathElement,
  totalLength: number,
  target: { x: number; y: number }
) {
  const samples = 500;
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

function setArrowPosition(
  path: SVGPathElement,
  arrow: SVGGElement,
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

  arrow.setAttribute(
    "transform",
    `translate(${current.x} ${current.y}) rotate(${angle})`
  );
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
  const pointRefs = useRef<Array<SVGCircleElement | null>>([]);
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineTrackRef = useRef<HTMLDivElement>(null);
  const timelineFillRef = useRef<HTMLDivElement>(null);
  const timelineDotRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const timelineStepRefs = useRef<Array<HTMLLIElement | null>>([]);
  const timelineHighestTargetRef = useRef(-1);
  const timelineProgressRef = useRef(0);
  const [isVisible, setIsVisible] = useState(false);
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

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // useEffect(() => {
  //   const path = pathRef.current;
  //   const arrow = arrowRef.current;
  //   if (!path || !arrow) return;

  //   const totalLength = path.getTotalLength();
  //   const milestoneDistances = troughPoints.map((point) =>
  //     getClosestPathDistance(path, totalLength, point)
  //   );
  //   path.style.strokeDasharray = `${totalLength}`;
  //   path.style.strokeDashoffset = `${totalLength}`;
  //   pointRefs.current.forEach((point) => {
  //     if (point) point.style.opacity = "0";
  //   });
  //   setArrowPosition(path, arrow, 0, totalLength);
  //   let lastStage = -1;

  //   const showCompletedState = () => {
  //     path.style.strokeDashoffset = "0";
  //     setArrowPosition(path, arrow, totalLength, totalLength);
  //     pointRefs.current.forEach((point) => {
  //       if (point) point.style.opacity = "1";
  //     });
  //     if (lastStage !== 3) {
  //       lastStage = 3;
  //       setActiveStage(3);
  //     }
  //   };

  //   if (reducedMotion) {
  //     showCompletedState();
  //     return;
  //   }

  //   if (!isVisible) return;

  //   const drawDuration = 3600;
  //   const holdDuration = 1500;
  //   let frameId = 0;
  //   let startTime = performance.now();

  //   const reset = () => {
  //     path.style.strokeDashoffset = `${totalLength}`;
  //     pointRefs.current.forEach((point) => {
  //       if (point) point.style.opacity = "0";
  //     });
  //     setArrowPosition(path, arrow, 0, totalLength);
  //     lastStage = -1;
  //     setActiveStage(-1);
  //   };

  //   const animate = (now: number) => {
  //     const elapsed = now - startTime;

  //     if (elapsed <= drawDuration) {
  //       const progress = elapsed / drawDuration;
  //       const distance = totalLength * progress;
  //       path.style.strokeDashoffset = `${totalLength - distance}`;
  //       setArrowPosition(path, arrow, distance, totalLength);

  //       const nextStage = milestoneDistances.reduce(
  //         (latest, milestoneDistance, index) =>
  //           distance >= milestoneDistance ? index : latest,
  //         -1
  //       );
  //       if (nextStage !== lastStage) {
  //         lastStage = nextStage;
  //         setActiveStage(nextStage);
  //       }

  //       pointRefs.current.forEach((point, index) => {
  //         if (point) {
  //           point.style.opacity =
  //             distance >= milestoneDistances[index] ? "1" : "0";
  //         }
  //       });
  //     } else if (elapsed < drawDuration + holdDuration) {
  //       showCompletedState();
  //     } else {
  //       reset();
  //       startTime = now;
  //     }

  //     frameId = requestAnimationFrame(animate);
  //   };

  //   reset();
  //   frameId = requestAnimationFrame(animate);

  //   return () => cancelAnimationFrame(frameId);
  // }, [isVisible, reducedMotion]);

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
            Our Process
          </SectionLabel>
          <h2
            id="process-heading"
            className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            From Ideas to Impact
          </h2>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
            A deliberate process that turns business problems into working
            technology.
          </p>
        </FadeIn>

        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-10 xl:gap-16">
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
            className={`relative mx-auto aspect-[7/5] w-full max-w-[760px] ${
              reducedMotion ? "process-stage-complete" : ""
            }`}
            role="img"
            aria-label="Ideas progressing through solution and product into business impact"
          >
            {stairStages.map((stage, index) => {
  const isLighted = index <= activeStage;
  return (
    <ProcessStairAsset
      key={stage.asset}
      stage={stage}
      isLighted={isLighted}
    />
  );
})}
{/*
            <svg
              viewBox="0 0 700 500"
              preserveAspectRatio="xMidYMid meet"
              className="pointer-events-none absolute inset-0 z-20 size-full overflow-visible"
              aria-hidden="true"
            > */}
              <defs>
                <filter id="process-line-glow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="process-point-glow" x="-200%" y="-200%" width="500%" height="500%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <g>
                <path
                  ref={pathRef}
                  data-process-path
                  d={processPath}
                  fill="none"
                  stroke="#67c8ff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#process-line-glow)"
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
                    r="7"
                    fill="white"
                    stroke="#67c8ff"
                    strokeWidth="3"
                    filter="url(#process-point-glow)"
                    className="opacity-0 transition-opacity duration-300"
                  />
                ))}
                <g ref={arrowRef}>
                  <path
                    d="M 8 0 L -8 -7 M 8 0 L -8 7"
                    fill="none"
                    stroke="#67c8ff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#process-line-glow)"
                  />
                </g>
              </g>
            {/* </svg> */}
          </div>
        </div>
      </div>
    </section>
  );
}
