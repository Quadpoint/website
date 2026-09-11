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
    headline: "Systems That Make Operations Simple.",
    problem:
      "Many businesses still rely on manual processes, disconnected tools, or outdated systems — creating inefficiencies, errors, and poor visibility.",
    solution:
      "QuadPoint builds purpose-built business software that integrates with your operations and gives you clear control over the data that matters.",
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
    cta: "Explore Our Products",
    href: "/products",
  },
  {
    id: "ai-automation",
    icon: Bot,
    label: "AI & Automation",
    headline: "Intelligence Where It Creates Real Value.",
    problem:
      "Repetitive tasks, slow response times, and manual workflows limit what a team can actually accomplish.",
    solution:
      "QuadPoint builds AI agents and automated systems that handle routine workflows — freeing your team to focus on higher-value work.",
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
    cta: "Explore AI & Automation",
    href: "/ai-automation",
  },
  {
    id: "custom-development",
    icon: Code2,
    label: "Custom Development",
    headline: "Built Specifically for How Your Business Operates.",
    problem:
      "Off-the-shelf software rarely fits perfectly. Gaps in functionality mean manual workarounds, separate tools, and data that never connects.",
    solution:
      "QuadPoint designs and builds custom digital solutions around your exact requirements — from web apps to full system integrations.",
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
    cta: "Discuss Your Project",
    href: "/contact",
  },
];

export default function SolutionsPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="pt-32 pb-16 bg-[#0f1e3d] relative overflow-hidden"
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
              Technology Built Around Your Business
            </h1>
            <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
              Three areas where QuadPoint delivers practical, maintainable technology
              that solves real business problems.
            </p>
          </FadeIn>

          {/* In-page anchors */}
          <FadeIn delay={0.15} className="flex flex-wrap justify-center gap-3 mt-10">
            {allSolutions.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="px-4 py-2 rounded-full text-sm font-medium bg-white/8 text-white/70 border border-white/15 hover:bg-white/15 hover:text-white transition-colors"
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
            className={`py-20 lg:py-28 ${bg}`}
            aria-labelledby={`${solution.id}-heading`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div
                className={`flex flex-col lg:flex-row gap-14 lg:gap-20 items-start ${
                  reversed ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Text column */}
                <div className="w-full lg:w-1/2">
                  <FadeIn>
                    <SectionLabel className="mb-4">{solution.label}</SectionLabel>
                    <h2
                      id={`${solution.id}-heading`}
                      className="text-3xl sm:text-4xl font-bold text-[#1c1c2e] tracking-tight mb-6"
                    >
                      {solution.headline}
                    </h2>
                  </FadeIn>

                  <FadeIn delay={0.1}>
                    <div className="mb-5">
                      <h3 className="text-xs font-semibold text-[#6b7280] uppercase tracking-widest mb-2">
                        The Challenge
                      </h3>
                      <p className="text-[#374151] leading-relaxed">{solution.problem}</p>
                    </div>
                    <div className="mb-8">
                      <h3 className="text-xs font-semibold text-[#6b7280] uppercase tracking-widest mb-2">
                        Our Approach
                      </h3>
                      <p className="text-[#374151] leading-relaxed">{solution.solution}</p>
                    </div>
                  </FadeIn>

                  <FadeIn delay={0.15} className="mb-8">
                    <h3 className="text-xs font-semibold text-[#6b7280] uppercase tracking-widest mb-3">
                      Example Use Cases
                    </h3>
                    <ul className="space-y-2.5">
                      {solution.useCases.map((uc) => (
                        <li key={uc} className="flex items-start gap-3">
                          <CheckCircle2
                            size={15}
                            className="text-[#1a4fba] mt-0.5 flex-shrink-0"
                          />
                          <span className="text-sm text-[#374151] leading-relaxed">{uc}</span>
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
                    <div className="bg-[#f9fafb] rounded-2xl border border-[#e5e7eb] p-8 lg:sticky lg:top-28">
                      <div className="w-12 h-12 rounded-xl bg-[#dbeafe]/60 flex items-center justify-center mb-5">
                        <Icon size={22} className="text-[#1a4fba]" />
                      </div>
                      <h3 className="text-lg font-bold text-[#1c1c2e] mb-5">
                        Capabilities
                      </h3>
                      <StaggerContainer className="space-y-3">
                        {solution.capabilities.map((cap) => {
                          const CapIcon = cap.icon;
                          return (
                            <StaggerItem key={cap.label}>
                              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#e5e7eb]">
                                <div className="w-8 h-8 rounded-lg bg-[#dbeafe]/50 flex items-center justify-center flex-shrink-0">
                                  <CapIcon size={14} className="text-[#1a4fba]" />
                                </div>
                                <span className="text-sm font-medium text-[#374151]">
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
        heading="Not Sure Which Solution Fits?"
        subheading="Tell us about your business and we'll help figure out the right approach."
        buttonLabel="Talk to QuadPoint"
      />
    </>
  );
}
