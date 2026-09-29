import type { Metadata } from "next";
import {
  Target,
  Eye,
  Lightbulb,
  Code2,
  Bot,
  Monitor,
  Smartphone,
  User,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CTASection } from "@/components/sections/CTASection";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import { LogoColorwaySwitcher } from "@/components/about/LogoColorwaySwitcher";

export const metadata: Metadata = {
  title: "About",
  description:
    "QuadPoint Technology was founded by four people who wanted to build software for day-to-day business problems.",
  alternates: { canonical: "https://quadpointtechnology.com/about" },
};

const capabilities = [
  { icon: Monitor, label: "Business Software & POS" },
  { icon: Bot, label: "AI Agents & Multi-Agent Systems" },
  { icon: Code2, label: "Custom Web Applications" },
  { icon: Smartphone, label: "Mobile Applications" },
  { icon: Target, label: "Workflow Automation" },
  { icon: Lightbulb, label: "System Integrations" },
];

const principles = [
  {
    title: "We start with the problem.",
    description:
      "We understand the business challenge before choosing a technical solution.",
  },
  {
    title: "Simple software takes careful work.",
    description:
      "The best systems feel simple to use. We choose clarity over adding more features.",
  },
  {
    title: "We plan for growth from the start.",
    description:
      "Systems should be designed to grow from the start. Retrofitting scalability is expensive and fragile.",
  },
  {
    title: "AI and automation need a clear purpose.",
    description:
      "We use AI when it can improve a specific workflow or reduce manual work.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="pt-32 pb-16 bg-[#0f1e3d] relative overflow-hidden"
        aria-label="About hero"
      >
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <SectionLabel variant="white" className="mb-5">About</SectionLabel>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-5">
              Four founders, one direction
            </h1>
            <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
              QuadPoint Technology was founded by four people who wanted to
              build software for day-to-day business problems.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Company story */}
      <section className="py-20 lg:py-24 bg-white" aria-labelledby="story-heading">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <FadeIn direction="left">
              <SectionLabel className="mb-4">Our story</SectionLabel>
              <h2
                id="story-heading"
                className="text-3xl font-bold text-[#1c1c2e] tracking-tight mb-5"
              >
                Why we started QuadPoint
              </h2>
              <p className="text-[#6b7280] leading-relaxed mb-4">
                QuadPoint Technology started because business software often
                feels too generic or too complex. We wanted to build systems
                that fit the way each business operates.
              </p>
              <p className="text-[#6b7280] leading-relaxed mb-4">
                The four founders bring different perspectives to the work. We
                share a commitment to building systems that work in day-to-day
                operations, beyond the product demo.
              </p>
              <p className="text-[#6b7280] leading-relaxed">
                Our long-term direction is to evolve from a technology services
                company into a technology product company. We are building our
                own software alongside the solutions we deliver to clients.
              </p>
            </FadeIn>

            {/* Interactive logo colorways */}
            <FadeIn direction="right">
              <LogoColorwaySwitcher />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-[#f9fafb]" aria-labelledby="mission-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            <FadeIn direction="left">
              <div className="bg-white rounded-2xl border border-[#e5e7eb] p-8 h-full">
                <div className="w-11 h-11 rounded-xl bg-[#dbeafe]/50 flex items-center justify-center mb-5">
                  <Target size={20} className="text-[#1a4fba]" />
                </div>
                <h2
                  id="mission-heading"
                  className="text-xl font-bold text-[#1c1c2e] mb-3"
                >
                  Our mission
                </h2>
                <p className="text-[#6b7280] leading-relaxed">
                  To build useful, maintainable software around the way each
                  business works and the problems it needs to solve.
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <div className="bg-[#0f1e3d] rounded-2xl border border-white/10 p-8 h-full">
                <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center mb-5">
                  <Eye size={20} className="text-white" />
                </div>
                <h2 className="text-xl font-bold text-white mb-3">
                  Our vision
                </h2>
                <p className="text-white/60 leading-relaxed">
                  To become a technology company that develops its own software
                  products while continuing to deliver technology solutions to
                  businesses. Our goal is to build long-term value through
                  software.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Technology Philosophy */}
      <section
        id="philosophy"
        className="py-20 lg:py-24 bg-white"
        aria-labelledby="philosophy-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <SectionLabel className="mb-4">How we think</SectionLabel>
            <h2
              id="philosophy-heading"
              className="text-3xl font-bold text-[#1c1c2e] tracking-tight mb-4"
            >
              How we make technology decisions
            </h2>
            <p className="text-[#6b7280] max-w-xl mx-auto">
              The principles we apply to every project.
            </p>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 gap-5">
            {principles.map((principle) => (
              <StaggerItem key={principle.title}>
                <div className="bg-[#f9fafb] rounded-2xl border border-[#e5e7eb] p-6">
                  <h3 className="text-base font-bold text-[#1c1c2e] mb-2">
                    {principle.title}
                  </h3>
                  <p className="text-sm text-[#6b7280] leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 bg-[#f9fafb]" aria-labelledby="capabilities-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <SectionLabel className="mb-4">What we build</SectionLabel>
            <h2
              id="capabilities-heading"
              className="text-3xl font-bold text-[#1c1c2e] tracking-tight"
            >
              What we build
            </h2>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <StaggerItem key={cap.label}>
                  <div className="bg-white rounded-2xl border border-[#e5e7eb] p-5 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#dbeafe]/50 flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-[#1a4fba]" />
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
      </section>

      {/* Founders placeholder */}
      <section
        className="py-20 lg:py-24 bg-white"
        aria-labelledby="team-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <SectionLabel className="mb-4">The team</SectionLabel>
            <h2
              id="team-heading"
              className="text-3xl font-bold text-[#1c1c2e] tracking-tight mb-4"
            >
              Meet the four founders
            </h2>
            <p className="text-[#6b7280] max-w-xl mx-auto">
              QuadPoint Technology was founded by four people who wanted to
              build software for day-to-day business problems.
            </p>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((n) => (
              <StaggerItem key={n}>
                <div className="bg-[#f9fafb] rounded-2xl border border-[#e5e7eb] p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#dbeafe]/50 flex items-center justify-center mx-auto mb-4">
                    <User size={24} className="text-[#1a4fba]/50" />
                  </div>
                  <div className="h-3 bg-[#e5e7eb] rounded-full w-3/4 mx-auto mb-2" />
                  <div className="h-2.5 bg-[#f3f4f6] rounded-full w-1/2 mx-auto mb-3" />
                  <div className="h-2 bg-[#f3f4f6] rounded-full w-full mb-1.5" />
                  <div className="h-2 bg-[#f3f4f6] rounded-full w-5/6 mx-auto" />
                  <p className="text-[10px] text-[#9ca3af] font-medium mt-4 uppercase tracking-wider">
                    Profile coming soon
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <CTASection
        heading="Want to work with us?"
        subheading="Tell us what you need to build or improve."
        buttonLabel="Get in touch"
      />
    </>
  );
}
