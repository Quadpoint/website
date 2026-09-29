"use client";

import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  ArrowRight,
  Layers3,
  Lightbulb,
  Target,
  UsersRound,
} from "lucide-react";
import Link from "next/link";

const values = [
  {
    icon: Target,
    title: "Business-Focused",
    description:
      "We build around real business problems, not technology’s sake.",
  },
  {
    icon: Lightbulb,
    title: "Intelligent",
    description:
      "We use AI and automation where they create meaningful value, not just as buzzwords.",
  },
  {
    icon: Layers3,
    title: "Scalable",
    description:
      "Solutions are designed to evolve as your business grows and needs change.",
  },
  {
    icon: UsersRound,
    title: "Human-Centered",
    description:
      "Technology should empower people, not simply replace them.",
  },
];

export function WhyQuadPointSection() {
  return (
    <section
      className="why-quadpoint relative overflow-hidden py-20 xl:py-24"
      aria-labelledby="why-heading"
    >
      <span className="why-quadpoint-dots why-quadpoint-dots-left" aria-hidden="true" />
      <span className="why-quadpoint-dots why-quadpoint-dots-right" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="mb-12 grid items-end gap-9 lg:grid-cols-[minmax(0,1.1fr)_minmax(15rem,0.65fr)] xl:mb-14">
          <FadeIn direction="left">
            <SectionLabel className="mb-5">Why QuadPoint</SectionLabel>
            <h2
              id="why-heading"
              className="max-w-2xl text-4xl font-bold leading-[1.04] tracking-[-0.035em] text-white sm:text-5xl lg:text-[3.5rem] xl:text-6xl"
            >
              Technology
              <br />
              With a <span className="text-[#2997ff]">Purpose.</span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[#c5d8ee] sm:text-lg">
              Principles that guide how we think about
              <br className="hidden sm:block" /> and build technology.
            </p>
          </FadeIn>

          <FadeIn direction="right" delay={0.1} className="lg:pb-3">
            <div className="why-quadpoint-manifesto max-w-xs border-l-2 border-[#238fff] pl-6 text-lg italic leading-relaxed text-white/80">
              <p>People.</p>
              <p>Ideas.</p>
              <p>Technology.</p>
              <p>A better tomorrow.</p>
              <span aria-hidden="true" />
            </div>
          </FadeIn>
        </div>

        <StaggerContainer className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:gap-5">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <StaggerItem key={value.title} className="h-full">
                <article className="why-quadpoint-card flex h-full min-h-64 flex-col rounded-lg border p-5 sm:p-6">
                  <div className="mb-5 flex size-12 items-center justify-center rounded-full bg-[#ff9f1c] shadow-[0_0_20px_rgba(255,159,28,0.24)]">
                    <Icon size={25} strokeWidth={2.1} className="text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold tracking-tight text-white">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-[#bed0e6]">
                    {value.description}
                  </p>
                  <Link
                    href="/about#philosophy"
                    className="why-quadpoint-link mt-auto inline-flex w-fit items-center gap-4 pt-6 text-sm font-semibold text-[#c7dbf3] outline-none transition-colors hover:text-white focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-[#61b5ff] focus-visible:ring-offset-4 focus-visible:ring-offset-[#07376b]"
                  >
                    Learn More
                    <ArrowRight size={17} aria-hidden="true" />
                  </Link>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <FadeIn className="mt-8 xl:mt-10">
          <div className="why-quadpoint-belief relative overflow-hidden rounded-xl border border-[#1681e8]/70 px-6 py-9 sm:px-10 lg:px-12 lg:py-8">
            <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="border-l-2 border-[#2196ff] pl-6 sm:pl-8">
                <p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-[#d4e5f8]">
                  Our Belief
                </p>
                <p className="max-w-2xl text-2xl leading-tight tracking-[-0.025em] text-white sm:text-3xl">
                  Better technology builds
                  <br />
                  <span className="font-semibold text-[#2997ff]">brighter tomorrows.</span>
                </p>
              </div>

              <Link
                href="/about#philosophy"
                className="group inline-flex w-fit items-center gap-4 rounded-full text-sm font-medium text-[#d2e3f6] outline-none focus-visible:ring-2 focus-visible:ring-[#61b5ff] focus-visible:ring-offset-4 focus-visible:ring-offset-[#07376b]"
              >
                <span className="flex size-11 items-center justify-center rounded-full border border-[#91caff] transition-colors group-hover:bg-[#1681e8]">
                  <ArrowRight size={19} aria-hidden="true" />
                </span>
                <span className="max-w-28">Learn more about our approach</span>
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
