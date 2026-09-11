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

export const metadata: Metadata = {
  title: "About",
  description:
    "QuadPoint Technology was founded by four individuals with a shared goal: building technology that solves real-world business problems.",
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
    title: "We build around problems, not possibilities.",
    description:
      "Technology should exist because it solves something real. We start with the business challenge before we consider the technical solution.",
  },
  {
    title: "Simple is harder than complex.",
    description:
      "The best systems feel simple to use. Getting there takes disciplined design — we prefer clarity over feature count.",
  },
  {
    title: "Scalability is planned, not patched.",
    description:
      "Systems should be designed to grow from the start. Retrofitting scalability is expensive and fragile.",
  },
  {
    title: "AI where it adds value. Automation where it saves time.",
    description:
      "We don't apply AI because it's trendy. We apply it when it meaningfully improves how a business operates.",
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
              Four Perspectives. One Direction.
            </h1>
            <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
              QuadPoint Technology was founded by four individuals with a shared
              goal: building technology that solves real-world business problems.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Company story */}
      <section className="py-20 lg:py-24 bg-white" aria-labelledby="story-heading">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <FadeIn direction="left">
              <SectionLabel className="mb-4">Our Story</SectionLabel>
              <h2
                id="story-heading"
                className="text-3xl font-bold text-[#1c1c2e] tracking-tight mb-5"
              >
                Built by People Who Care About the Work
              </h2>
              <p className="text-[#6b7280] leading-relaxed mb-4">
                QuadPoint Technology started with a simple conviction: most
                business software is either too generic to be useful or too
                complex to be practical. There is a better approach — build
                technology that actually fits the way a business operates.
              </p>
              <p className="text-[#6b7280] leading-relaxed mb-4">
                The four of us bring different perspectives to the table, but
                we share the same commitment to building things that work — not
                just things that look impressive in a demo.
              </p>
              <p className="text-[#6b7280] leading-relaxed">
                Our long-term direction is to evolve from a technology services
                company into a technology product company — building our own
                software alongside the solutions we deliver to clients.
              </p>
            </FadeIn>

            {/* Visual — Q geometry */}
            <FadeIn direction="right">
              <div className="bg-[#f9fafb] rounded-2xl border border-[#e5e7eb] p-10 flex items-center justify-center aspect-square max-w-sm mx-auto">
                <svg viewBox="0 0 100 100" fill="none" className="w-48 h-48" aria-hidden="true">
                  <defs>
                    <linearGradient id="qp-about" x1="5" y1="5" x2="95" y2="95" gradientUnits="userSpaceOnUse">
                      <stop offset="0%"   stopColor="#60b0ff" />
                      <stop offset="35%"  stopColor="#1a6aff" />
                      <stop offset="100%" stopColor="#061450" />
                    </linearGradient>
                  </defs>
                  <circle cx="50" cy="50" r="44.5" stroke="url(#qp-about)" strokeWidth="7"
                    strokeDasharray="209.70 69.90" strokeDashoffset="248.53"
                    strokeLinecap="round" transform="rotate(-90 50 50)" fill="none"/>
                  <circle cx="50" cy="50" r="30" stroke="url(#qp-about)" strokeWidth="8"
                    strokeDasharray="133.52 54.98" strokeDashoffset="172.79"
                    strokeLinecap="round" transform="rotate(-90 50 50)" fill="none"/>
                  <circle cx="50" cy="50" r="16.5" stroke="url(#qp-about)" strokeWidth="7"
                    strokeDasharray="69.12 34.56" strokeDashoffset="97.91"
                    strokeLinecap="round" transform="rotate(-90 50 50)" fill="none"/>
                  <circle cx="50" cy="50" r="5.5" fill="url(#qp-about)"/>
                  <path d="M 46 52 L 56 52 L 92 88 L 82 92 Z" fill="url(#qp-about)"/>
                  <circle cx="50" cy="50" r="5.5" fill="url(#qp-about)"/>
                </svg>
              </div>
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
                  Our Mission
                </h2>
                <p className="text-[#6b7280] leading-relaxed">
                  To build practical technology that solves real business
                  problems — software that is useful, maintainable, and designed
                  around the way businesses actually work.
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <div className="bg-[#0f1e3d] rounded-2xl border border-white/10 p-8 h-full">
                <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center mb-5">
                  <Eye size={20} className="text-white" />
                </div>
                <h2 className="text-xl font-bold text-white mb-3">
                  Our Vision
                </h2>
                <p className="text-white/60 leading-relaxed">
                  To become a technology company that develops its own software
                  products while continuing to deliver technology solutions to
                  businesses — building long-term value through great software.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Technology Philosophy */}
      <section
        className="py-20 lg:py-24 bg-white"
        aria-labelledby="philosophy-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <SectionLabel className="mb-4">How We Think</SectionLabel>
            <h2
              id="philosophy-heading"
              className="text-3xl font-bold text-[#1c1c2e] tracking-tight mb-4"
            >
              Technology Philosophy
            </h2>
            <p className="text-[#6b7280] max-w-xl mx-auto">
              Principles that shape the way we approach every project.
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
            <SectionLabel className="mb-4">What We Build</SectionLabel>
            <h2
              id="capabilities-heading"
              className="text-3xl font-bold text-[#1c1c2e] tracking-tight"
            >
              Our Capabilities
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
            <SectionLabel className="mb-4">The Team</SectionLabel>
            <h2
              id="team-heading"
              className="text-3xl font-bold text-[#1c1c2e] tracking-tight mb-4"
            >
              Four Perspectives. One Direction.
            </h2>
            <p className="text-[#6b7280] max-w-xl mx-auto">
              QuadPoint Technology was founded by four individuals with a shared
              goal: building technology that solves real-world business problems.
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
        heading="Want to Work With Us?"
        subheading="Tell us about what you're trying to build or improve."
        buttonLabel="Get in Touch"
      />
    </>
  );
}
