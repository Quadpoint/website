"use client";

import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Search, PenTool, Wrench, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discover",
    description:
      "Understand the business, its challenges, and opportunities. We ask the right questions before writing a single line of code.",
  },
  {
    number: "02",
    icon: PenTool,
    title: "Design",
    description:
      "Design a technology solution around the actual workflow. Architecture, UX, and system design come before development.",
  },
  {
    number: "03",
    icon: Wrench,
    title: "Build",
    description:
      "Develop, integrate, test, and deploy the solution. Clean, maintainable code built to production standards.",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Grow",
    description:
      "Improve and expand the system as the business evolves. Technology should scale with your ambitions.",
  },
];

export function HowWeWorkSection() {
  return (
    <section
      className="py-20 lg:py-28 bg-white"
      aria-labelledby="process-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn className="text-center mb-14">
          <SectionLabel className="mb-4">Our Process</SectionLabel>
          <h2
            id="process-heading"
            className="text-3xl sm:text-4xl font-bold text-[#1c1c2e] tracking-tight mb-4"
          >
            From Ideas to Impact
          </h2>
          <p className="text-lg text-[#6b7280] max-w-xl mx-auto">
            A deliberate process that turns business problems into working
            technology.
          </p>
        </FadeIn>

        {/* Steps */}
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
            <StaggerItem key={step.number}>
              <div className="relative h-full">
                {/* Connector line (desktop) */}
                {i < steps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-6 left-full w-full h-px bg-[#e5e7eb] z-0"
                    style={{ width: "calc(100% - 2rem)" }}
                    aria-hidden="true"
                  />
                )}

                {/* Card */}
                <div className="gloss-card relative z-10 rounded-2xl border border-[#e5e7eb] p-6 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl font-bold text-[#f59e0b] leading-none">{step.number}</span>
                    <div className="w-9 h-9 rounded-lg bg-[#f59e0b] flex items-center justify-center">
                      <Icon size={17} className="text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-[#1c1c2e] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#6b7280] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
