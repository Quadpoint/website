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

export function SolutionsSection() {
  return (
    <section
      id="solutions"
      className="py-20 lg:py-28 bg-[#f9fafb]"
      aria-labelledby="solutions-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn className="text-center mb-14">
          <SectionLabel className="mb-4">Solutions</SectionLabel>
          <h2
            id="solutions-heading"
            className="text-3xl sm:text-4xl font-bold text-[#1c1c2e] tracking-tight mb-4"
          >
            Technology Built Around Your Business
          </h2>
          <p className="text-lg text-[#6b7280] max-w-2xl mx-auto">
            Three core areas where QuadPoint delivers real business value.
          </p>
        </FadeIn>

        {/* Cards */}
        <StaggerContainer className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {solutions.map((solution) => {
            const Icon = solution.icon;
            return (
              <StaggerItem key={solution.title}>
                <div className="group bg-white rounded-2xl border border-[#e5e7eb] p-7 h-full flex flex-col hover:border-[#1a4fba]/30 hover:shadow-[0_8px_30px_-8px_rgba(26,79,186,0.12)] transition-all duration-300">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-[#dbeafe]/60 flex items-center justify-center mb-5">
                    <Icon size={22} className="text-[#1a4fba]" />
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
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1a4fba] flex-shrink-0" />
                        {cap}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={solution.href}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a4fba] group-hover:gap-3 transition-all"
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
