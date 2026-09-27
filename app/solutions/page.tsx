import type { Metadata } from "next";
import Link from "next/link";
import {
  Monitor,
  Bot,
  Code2,
  ArrowRight,
  CheckCircle2,
  Store,
  UserCheck,
  Package,
  LayoutDashboard,
  Workflow,
  Globe,
  Smartphone,
  Puzzle,
  PhoneCall,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CTASection } from "@/components/sections/CTASection";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Business software, AI agents, and custom development solutions from QuadPoint Technology. Designed around how businesses actually work.",
  alternates: { canonical: "https://quadpointtechnology.com/solutions" },
};

const allSolutions = [
  {
    id: "business-software",
    icon: Monitor,
    label: "Business Software",
    headline: "Systems that simplify daily operations",
    problem:
      "Many businesses still rely on manual processes, disconnected tools, or outdated systems. This creates extra work, errors, and gaps in visibility.",
    solution:
      "QuadPoint builds business software that fits your operations, connects your data, and gives your team clear control over it.",
    capabilities: [
      { icon: Store,           label: "Point of Sale (POS)" },
      { icon: UserCheck,       label: "CRM" },
      { icon: Package,         label: "Inventory Management" },
      { icon: LayoutDashboard, label: "Business Management Systems" },
      { icon: Monitor,         label: "Industry-Specific Software" },
    ],
    useCases: [
      "A retail business replacing manual cash registers with a full POS and inventory system",
      "A service company tracking client interactions through a purpose-built CRM",
      "A business gaining clear visibility into daily operations through a unified dashboard",
    ],
    cta: "Explore our products",
    href: "/products",
  },
  {
    id: "ai-automation",
    icon: Bot,
    label: "AI & Automation",
    headline: "AI and automation for routine work",
    problem:
      "Repetitive tasks, slow response times, and manual workflows limit what a team can actually accomplish.",
    solution:
      "QuadPoint builds AI agents and automated systems that handle routine workflows so your team can focus on higher-value work that needs human judgment.",
    capabilities: [
      { icon: PhoneCall,       label: "AI Receptionists" },
      { icon: TrendingUp,      label: "AI Sales Agents" },
      { icon: Calendar,        label: "AI Scheduling Agents" },
      { icon: Bot,             label: "Multi-Agent AI Systems" },
      { icon: Workflow,        label: "Workflow Automation" },
      { icon: Puzzle,          label: "AI Integrations" },
    ],
    useCases: [
      "A business deploying an AI receptionist to handle after-hours inquiries",
      "A sales team using AI agents to qualify and follow up on leads automatically",
      "A service company automating appointment booking and confirmation workflows",
    ],
    cta: "Explore AI and automation",
    href: "/ai-automation",
  },
  {
    id: "custom-development",
    icon: Code2,
    label: "Custom Development",
    headline: "Custom software for your operations",
    problem:
      "Off-the-shelf software rarely fits perfectly. Gaps in functionality mean manual workarounds, separate tools, and data that never connects.",
    solution:
      "QuadPoint designs and builds custom digital solutions for your requirements, including web apps and system integrations.",
    capabilities: [
      { icon: Globe,           label: "Web Applications" },
      { icon: Smartphone,      label: "Mobile Applications" },
      { icon: Code2,           label: "Custom Software" },
      { icon: Puzzle,          label: "APIs & Integrations" },
      { icon: LayoutDashboard, label: "System Integrations" },
    ],
    useCases: [
      "A business needing a custom web portal their customers can use directly",
      "A company integrating multiple existing systems into one connected workflow",
      "A brand building a mobile app to extend their service offering",
    ],
    cta: "Discuss your project",
    href: "/contact",
  },
];

export default function SolutionsPage() {
  return (
    <div className="solutions-page">
      {/* Hero */}
      <section
        className="pt-28 pb-12 sm:pt-32 bg-[#0f1e3d] relative overflow-hidden"
        aria-label="Solutions hero"
      >
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <SectionLabel variant="white" className="mb-5">Solutions</SectionLabel>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-5">
              Software built around your operations
            </h1>
            <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
              QuadPoint builds business systems, automated workflows, and custom
              applications for the way your team works.
            </p>
          </FadeIn>

          {/* In-page anchors */}
          <FadeIn delay={0.15} className="flex flex-wrap justify-center gap-3 mt-8">
            {allSolutions.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="solution-nav-chip inline-flex items-center justify-center rounded-full border px-4 text-sm font-semibold transition-colors"
              >
                {s.label}
              </a>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* Solution sections — alternating layout via flex reverse */}
      {allSolutions.map((solution, idx) => {
        const Icon = solution.icon;
        const reversed = idx % 2 !== 0;
        const bg = idx === 1 ? "bg-[#f9fafb]" : "bg-white";

        return (
          <section
            key={solution.id}
            id={solution.id}
            className={`py-12 sm:py-14 lg:py-16 ${bg}`}
            aria-labelledby={`${solution.id}-heading`}
          >
            <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
              <div
                className={`flex flex-col lg:flex-row gap-10 lg:gap-14 2xl:gap-20 items-start ${
                  reversed ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Text column */}
                <div className="w-full lg:w-1/2">
                  <FadeIn>
                    <SectionLabel className="mb-4">{solution.label}</SectionLabel>
                    <h2
                      id={`${solution.id}-heading`}
                      className="text-3xl sm:text-4xl 2xl:text-[2.75rem] font-bold text-[#1c1c2e] tracking-tight mb-5"
                    >
                      {solution.headline}
                    </h2>
                  </FadeIn>

                  <FadeIn delay={0.1} className="solution-narrative mb-6">
                    <div className="solution-narrative-section pb-5">
                      <h3 className="solution-copy-label text-xs font-semibold uppercase tracking-widest mb-2">
                        The challenge
                      </h3>
                      <p className="solution-copy leading-7 2xl:text-lg 2xl:leading-8">{solution.problem}</p>
                    </div>
                    <div className="solution-narrative-divider" aria-hidden="true" />
                    <div className="solution-narrative-section pt-5">
                      <h3 className="solution-copy-label text-xs font-semibold uppercase tracking-widest mb-2">
                        Our approach
                      </h3>
                      <p className="solution-copy leading-7 2xl:text-lg 2xl:leading-8">{solution.solution}</p>
                    </div>
                  </FadeIn>

                  <FadeIn delay={0.15} className="mb-6">
                    <h3 className="solution-copy-label text-xs font-semibold uppercase tracking-widest mb-3">
                      Example use cases
                    </h3>
                    <ul className="space-y-2.5">
                      {solution.useCases.map((uc) => (
                        <li key={uc} className="flex items-start gap-3">
                          <CheckCircle2
                            size={15}
                            className="solution-use-case-icon mt-0.5 flex-shrink-0"
                          />
                          <span className="solution-use-case-copy text-sm leading-relaxed 2xl:text-base">{uc}</span>
                        </li>
                      ))}
                    </ul>
                  </FadeIn>

                  <FadeIn delay={0.2}>
                    <Link
                      href={solution.href}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a4fba] text-white text-sm font-semibold rounded-lg hover:bg-[#1240a0] transition-colors"
                    >
                      {solution.cta}
                      <ArrowRight size={14} />
                    </Link>
                  </FadeIn>
                </div>

                {/* Capabilities card */}
                <div className="w-full lg:w-1/2">
                  <FadeIn direction={reversed ? "right" : "left"}>
                    <div className="solution-capabilities-panel rounded-2xl border p-6 sm:p-8 2xl:p-9 lg:sticky lg:top-28">
                      <div className="solution-icon-tile flex h-11 w-11 2xl:h-12 2xl:w-12 items-center justify-center rounded-lg mb-5">
                        <Icon size={20} />
                      </div>
                      <h3 className="solution-capabilities-heading text-lg font-bold mb-5">
                        Capabilities
                      </h3>
                      <StaggerContainer className="solution-capability-list">
                        {solution.capabilities.map((cap) => {
                          const CapIcon = cap.icon;
                          return (
                            <StaggerItem key={cap.label}>
                              <div className="solution-capability-row flex min-h-12 2xl:min-h-14 items-center gap-3 2xl:gap-4 px-1 py-3">
                                <div className="solution-icon-tile flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md">
                                  <CapIcon size={14} />
                                </div>
                                <span className="solution-capability-label text-sm 2xl:text-base font-semibold">
                                  {cap.label}
                                </span>
                              </div>
                            </StaggerItem>
                          );
                        })}
                      </StaggerContainer>
                    </div>
                  </FadeIn>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <CTASection
        heading="Not sure which solution fits?"
        subheading="Tell us how your business works and where the process breaks down."
        buttonLabel="Talk to QuadPoint"
      />
    </div>
  );
}
