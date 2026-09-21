"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { cn } from "@/lib/utils";
import {
  getInitialRevealState,
  getPreparedRevealState,
} from "@/lib/reveal-state";
import { useEffect, useRef, useState } from "react";

interface FadeInProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const directionVariants: Record<string, Variants> = {
  up:    { hidden: { opacity: 0, y: 24 },  visible: { opacity: 1, y: 0 } },
  down:  { hidden: { opacity: 0, y: -24 }, visible: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: -24 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 24 },  visible: { opacity: 1, x: 0 } },
  none:  { hidden: { opacity: 0 },          visible: { opacity: 1 } },
};

const reducedVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1 },
};

type RevealState = "hidden" | "visible";

function useHydrationSafeReveal(
  once: boolean,
  prefersReduced: boolean | null
) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<RevealState>(getInitialRevealState);

  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReduced) {
      setState("visible");
      return;
    }

    const bounds = element.getBoundingClientRect();
    const isInitiallyVisible =
      bounds.bottom > 60 && bounds.top < window.innerHeight - 60;
    setState(getPreparedRevealState(isInitiallyVisible));

    if (isInitiallyVisible && once) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setState(getPreparedRevealState(entry.isIntersecting));
        if (entry.isIntersecting && once) observer.disconnect();
      },
      { rootMargin: "-60px 0px" }
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, [once, prefersReduced]);

  return [ref, state] as const;
}

export function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  className,
  once = true,
}: FadeInProps) {
  const prefersReduced = useReducedMotion();
  const variants = prefersReduced ? reducedVariants : directionVariants[direction];
  const [revealRef, revealState] = useHydrationSafeReveal(
    once,
    prefersReduced
  );

  return (
    <motion.div
      ref={revealRef}
      variants={variants}
      initial={false}
      animate={revealState}
      transition={{
        duration: prefersReduced ? 0.15 : duration,
        delay: prefersReduced ? 0 : delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

/** Staggered container — children should be StaggerItem */
export function StaggerContainer({
  children,
  staggerDelay = 0.08,
  className,
}: {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}) {
  const prefersReduced = useReducedMotion();
  const [revealRef, revealState] = useHydrationSafeReveal(
    true,
    prefersReduced
  );

  return (
    <motion.div
      ref={revealRef}
      initial={false}
      animate={revealState}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: prefersReduced ? 0 : staggerDelay,
          },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

/** Individual stagger child — use inside StaggerContainer */
export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: prefersReduced ? 0 : 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: prefersReduced ? 0.15 : 0.45,
            ease: [0.21, 0.47, 0.32, 0.98],
          },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
