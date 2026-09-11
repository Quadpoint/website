"use client";

import { Target, Cpu, Layers, Users } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";

const values = [
  {
    icon: Target,
    title: "Business-Focused",
    description:
      "We build around real business problems rather than technology for technology's sake.",
  },
  {
    icon: Cpu,
    title: "Intelligent",
    description:
      "We use AI and automation where they create meaningful value, not just as buzzwords.",
  },
  {
    icon: Layers,
    title: "Scalable",
    description:
      "Solutions are designed to evolve as your business grows and needs change.",
  },
  {
    icon: Users,
    title: "Human-Centered",
    description:
      "Technology should empower people, not simply replace them.",
  },
];

export function WhyQuadPointSection() {
  return (
    <section
      className="py-20 lg:py-28 bg-[#f9fafb]"
      aria-labelledby="why-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn className="text-center mb-14">
          <SectionLabel className="mb-4">Why QuadPoint</SectionLabel>
          <h2
            id="why-heading"
            className="text-3xl sm:text-4xl font-bold text-[#1c1c2e] tracking-tight mb-4"
          >
            Technology With a Purpose.
          </h2>
          <p className="text-lg text-[#6b7280] max-w-xl mx-auto">
            Principles that guide how we think about and build technology.
          </p>
        </FadeIn>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <StaggerItem key={value.title}>
                <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 h-full hover:border-[#1a4fba]/30 hover:shadow-[0_4px_20px_-6px_rgba(26,79,186,0.08)] transition-all duration-300">
                  <div className="w-11 h-11 rounded-xl bg-[#dbeafe]/50 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-[#1a4fba]" />
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
