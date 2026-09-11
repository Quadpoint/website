"use client";

import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";

const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "Understand the business, its challenges, and opportunities. We ask the right questions before writing a single line of code.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Design a technology solution around the actual workflow. Architecture, UX, and system design come before development.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Develop, integrate, test, and deploy the solution. Clean, maintainable code built to production standards.",
  },
  {
    number: "04",
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
          {steps.map((step, i) => (
            <StaggerItem key={step.number}>
              <div className="relative group h-full">
                {/* Connector line (desktop) */}
                {i < steps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-6 left-full w-full h-px bg-[#e5e7eb] z-0"
                    style={{ width: "calc(100% - 2rem)" }}
                    aria-hidden="true"
                  />
                )}

                {/* Card */}
                <div className="relative z-10 bg-[#f9fafb] rounded-2xl border border-[#e5e7eb] p-6 h-full hover:border-[#1a4fba]/30 hover:bg-white hover:shadow-[0_4px_20px_-6px_rgba(26,79,186,0.1)] transition-all duration-300">
                  <span className="text-4xl font-bold text-[#1a4fba]/15 block mb-4 leading-none">
                    {step.number}
                  </span>
                  <h3 className="text-lg font-bold text-[#1c1c2e] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#6b7280] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
