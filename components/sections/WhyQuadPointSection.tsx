"use client";

import { Target, Cpu, Layers, Users } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";

const values = [
  {
    icon: Target,
    title: "Built for the business",
    description:
      "We start with the business problem and choose technology that fits the work.",
  },
  {
    icon: Cpu,
    title: "AI with a defined role",
    description:
      "We use AI and automation when they can improve a specific part of the operation.",
  },
  {
    icon: Layers,
    title: "Ready to grow",
    description:
      "Solutions are designed to evolve as your business grows and needs change.",
  },
  {
    icon: Users,
    title: "Designed for people",
    description:
      "We design technology to help people do their work, not simply replace them.",
  },
];

export function WhyQuadPointSection() {
  return (
    <section
      className="py-20 xl:py-24 bg-[#f9fafb]"
      aria-labelledby="why-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <FadeIn className="text-center mb-14">
          <SectionLabel className="mb-4">Why QuadPoint</SectionLabel>
          <h2
            id="why-heading"
            className="text-3xl sm:text-4xl font-bold text-[#1c1c2e] tracking-tight mb-4"
          >
            How we approach the work
          </h2>
          <p className="text-lg text-[#6b7280] max-w-xl mx-auto">
            The principles we use when deciding what to build and how to build it.
          </p>
        </FadeIn>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <StaggerItem key={value.title}>
                <div className="gloss-card rounded-2xl border border-[#e5e7eb] p-6 xl:p-8 h-full">
                  <div className="w-11 h-11 rounded-xl bg-[#f59e0b] flex items-center justify-center mb-4">
                    <Icon size={20} className="text-white" />
                  </div>
                  <h3 className="text-base font-bold text-[#1c1c2e] mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-[#6b7280] leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
