"use client";

import Link from "next/link";
import { Monitor, Bot, Code2, ArrowRight } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";

const solutions = [
  {
    icon: Monitor,
    title: "Business Software",
    description:
      "Business systems designed to simplify operations, improve visibility, and help teams make better decisions.",
    capabilities: [
      "Point of Sale (POS)",
      "CRM",
      "Inventory Management",
      "Business Management Systems",
      "Industry-Specific Software",
    ],
    cta: "Explore Business Software",
    href: "/solutions#business-software",
    accent: "#1a4fba",
  },
  {
    icon: Bot,
    title: "AI & Automation",
    description:
      "Intelligent AI agents and automated workflows that reduce repetitive work and help businesses operate more efficiently.",
    capabilities: [
      "AI Agents",
      "Multi-Agent AI",
      "AI Receptionists",
      "AI Sales Agents",
      "Workflow Automation",
      "AI Integrations",
    ],
    cta: "Explore AI & Automation",
    href: "/ai-automation",
    accent: "#1a4fba",
  },
  {
    icon: Code2,
    title: "Custom Development",
    description:
      "Custom digital solutions designed around your unique business requirements.",
    capabilities: [
      "Web Applications",
      "Mobile Applications",
      "Custom Software",
      "APIs",
      "System Integrations",
    ],
    cta: "Discuss Your Project",
    href: "/contact",
    accent: "#1a4fba",
  },
];

const capabilities = [
  "Business Software",
  "Point of Sale",
  "AI Agents",
  "Multi-Agent AI",
  "Workflow Automation",
  "Custom Web Apps",
  "Mobile Applications",
  "System Integrations",
];

export function SolutionsSection() {
  return (
    <section
      id="solutions"
      className="section-light-solutions py-20 xl:py-24 bg-[#f9fafb]"
      aria-labelledby="solutions-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <FadeIn className="text-center mb-12">
          <SectionLabel className="mb-4">Solutions</SectionLabel>
          <h2
            id="solutions-heading"
            className="text-3xl sm:text-4xl font-bold text-[#1c1c2e] tracking-tight mb-4"
          >
            Technology Built Around Your Business
          </h2>
          <p className="text-base sm:text-lg text-[#6b7280] leading-relaxed max-w-3xl mx-auto">
            From business management systems to intelligent automation, we
            design technology around the way businesses actually work.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            {capabilities.map((capability) => (
              <span
                key={capability}
                className="rounded-full border border-[#e5e7eb] bg-[#f3f4f6] px-4 py-2 text-sm font-medium text-[#374151]"
              >
                {capability}
              </span>
            ))}
          </div>
        </FadeIn>

        {/* Cards */}
        <StaggerContainer className="grid md:grid-cols-3 gap-6 lg:gap-8 xl:gap-10">
          {solutions.map((solution) => {
            const Icon = solution.icon;
            return (
              <StaggerItem key={solution.title}>
                <div
                  className="solution-card interactive-card gloss-card group rounded-2xl border border-[#e5e7eb] p-7 xl:p-9 h-full flex flex-col transition-all duration-300"
                >
                  {/* Icon */}
                  <div className="interactive-card-icon w-14 h-14 rounded-xl flex items-center justify-center mb-5 bg-[#f59d13] transition-colors duration-300">
                    <Icon size={25} className="text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-[#1c1c2e] mb-3">
                    {solution.title}
                  </h3>
                  <p className="text-[#6b7280] text-sm leading-relaxed mb-5">
                    {solution.description}
                  </p>

                  {/* Capability list */}
                  <ul className="space-y-1.5 mb-7 flex-1">
                    {solution.capabilities.map((cap) => (
                      <li
                        key={cap}
                        className="flex items-center gap-2 text-sm text-[#374151]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[#8ed0ff]" />
                        {cap}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={solution.href}
                    className="interactive-card-link inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#f59d13] transition-colors duration-300"
                  >
                    {solution.cta}
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
