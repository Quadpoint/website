import type { Metadata } from "next";
import Link from "next/link";
import {
  PhoneCall,
  TrendingUp,
  Calendar,
  HeadphonesIcon,
  Briefcase,
  Workflow,
  Puzzle,
  ArrowRight,
  Network,
  Zap,
  GitMerge,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CTASection } from "@/components/sections/CTASection";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";

export const metadata: Metadata = {
  title: "AI & Automation",
  description:
    "AI agents, multi-agent systems, and workflow automation from QuadPoint Technology. Deploy intelligent agents that work together to automate real business workflows.",
  alternates: { canonical: "https://quadpointtechnology.com/ai-automation" },
};

const agents = [
  {
    icon: PhoneCall,
    title: "AI Receptionist",
    description:
      "Handles incoming customer inquiries, provides information, and routes requests to the right team or agent — 24 hours a day.",
    capability: "Customer-Facing",
  },
  {
    icon: TrendingUp,
    title: "AI Sales Agent",
    description:
      "Engages website visitors or inbound leads, qualifies prospects, and helps move them along the sales process.",
    capability: "Lead Handling",
  },
  {
    icon: Calendar,
    title: "AI Scheduling Agent",
    description:
      "Manages appointment booking, confirms schedules, and handles rescheduling without manual back-and-forth.",
    capability: "Scheduling",
  },
  {
    icon: HeadphonesIcon,
    title: "AI Support Agent",
    description:
      "Handles common customer support requests, answers FAQs, and escalates complex issues to the right person.",
    capability: "Support",
  },
  {
    icon: Briefcase,
    title: "AI Business Assistant",
    description:
      "Helps internal teams access business data, answer operational questions, and interact with business workflows.",
    capability: "Internal",
  },
];

const automationCapabilities = [
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "Automate repetitive multi-step processes that currently require manual effort. Connect triggers, conditions, and actions across your systems.",
  },
  {
    icon: Puzzle,
    title: "AI Integrations",
    description:
      "Connect AI capabilities directly into the tools and systems your business already uses.",
  },
  {
    icon: Network,
    title: "Multi-Agent Systems",
    description:
      "Coordinate multiple specialized agents that hand work off to each other — creating automated pipelines across business functions.",
  },
  {
    icon: GitMerge,
    title: "System Connections",
    description:
      "Bridge gaps between business systems by building automated data flows and integration logic.",
  },
];

const exampleWorkflow = [
  {
    step: "01",
    label: "Customer Inquiry",
    description: "Customer contacts the business via website, phone, or messaging.",
    agent: null,
  },
  {
    step: "02",
    label: "Reception Agent",
    description: "Greets the customer, understands their need, and routes them appropriately.",
    agent: "AI Receptionist",
  },
  {
    step: "03",
    label: "Qualification",
    description: "Sales agent collects key information and qualifies the inquiry.",
    agent: "AI Sales Agent",
  },
  {
    step: "04",
    label: "Appointment Booked",
    description: "Scheduling agent confirms availability and books the appointment.",
    agent: "AI Scheduling Agent",
  },
  {
    step: "05",
    label: "CRM Updated",
    description: "Customer record created or updated automatically in the CRM.",
    agent: "AI Business Agent",
  },
  {
    step: "06",
    label: "Human Follow-Up",
    description: "Team member receives a brief, context-rich summary and takes over.",
    agent: null,
  },
];

export default function AIAutomationPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="pt-32 pb-16 bg-[#0f1e3d] relative overflow-hidden"
        aria-label="AI & Automation hero"
      >
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #1a4fba, transparent 70%)",
            filter: "blur(60px)",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <SectionLabel variant="white" className="mb-5">
              AI & Automation
            </SectionLabel>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-5">
              AI Agents That Work Together.
            </h1>
            <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
              Go beyond chatbots. Deploy specialized AI agents that communicate,
              coordinate, and automate real business workflows.
            </p>
          </FadeIn>
          <FadeIn delay={0.15} className="flex flex-wrap justify-center gap-4 mt-10">
            <Link
              href="/contact"
              className="px-6 py-3 bg-[#1a4fba] text-white text-sm font-semibold rounded-lg hover:bg-[#2d63d4] transition-colors"
            >
              Build an AI Solution
            </Link>
            <a
              href="#workflow"
              className="px-6 py-3 bg-white/8 text-white text-sm font-semibold rounded-lg border border-white/15 hover:bg-white/15 transition-colors"
            >
              See How It Works
            </a>
          </FadeIn>
        </div>
      </section>

      {/* AI Agents */}
      <section
        className="py-20 lg:py-28 bg-white"
        aria-labelledby="agents-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <SectionLabel className="mb-4">AI Agents</SectionLabel>
            <h2
              id="agents-heading"
              className="text-3xl sm:text-4xl font-bold text-[#1c1c2e] tracking-tight mb-4"
            >
              Specialized Agents for Specific Roles
            </h2>
            <p className="text-lg text-[#6b7280] max-w-2xl mx-auto">
              Rather than one general chatbot, QuadPoint builds agents designed
              for specific business functions — each one doing its job well.
            </p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => {
              const Icon = agent.icon;
              return (
                <StaggerItem key={agent.title}>
                  <div className="bg-[#f9fafb] rounded-2xl border border-[#e5e7eb] p-6 h-full hover:border-[#1a4fba]/30 hover:bg-white hover:shadow-[0_4px_20px_-6px_rgba(26,79,186,0.08)] transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#dbeafe]/60 flex items-center justify-center">
                        <Icon size={18} className="text-[#1a4fba]" />
                      </div>
                      <span className="text-[10px] font-semibold text-[#1a4fba] bg-[#dbeafe]/60 px-2.5 py-1 rounded-full">
                        {agent.capability}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#1c1c2e] mb-2">
                      {agent.title}
                    </h3>
                    <p className="text-sm text-[#6b7280] leading-relaxed">
                      {agent.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Multi-agent explanation */}
      <section
        className="py-20 lg:py-24 bg-[#f9fafb]"
        aria-labelledby="multiagent-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <FadeIn direction="left">
              <SectionLabel className="mb-4">Multi-Agent AI</SectionLabel>
              <h2
                id="multiagent-heading"
                className="text-3xl font-bold text-[#1c1c2e] tracking-tight mb-5"
              >
                Agents That Coordinate, Not Just Chat.
              </h2>
              <p className="text-[#6b7280] leading-relaxed mb-5">
                Multi-agent systems go beyond single assistants. Multiple
                specialized AI agents are connected so they can hand work off to
                each other, share context, and complete multi-step business
                processes end-to-end.
              </p>
              <p className="text-[#6b7280] leading-relaxed">
                This means a customer can move from first contact to booked
                appointment to CRM record — all without manual intervention,
                across multiple AI agents working together.
              </p>
            </FadeIn>

            <StaggerContainer className="grid sm:grid-cols-2 gap-4">
              {automationCapabilities.map((cap) => {
                const Icon = cap.icon;
                return (
                  <StaggerItem key={cap.title}>
                    <div className="bg-white rounded-2xl border border-[#e5e7eb] p-5">
                      <div className="w-9 h-9 rounded-lg bg-[#dbeafe]/50 flex items-center justify-center mb-3">
                        <Icon size={16} className="text-[#1a4fba]" />
                      </div>
                      <h3 className="text-sm font-bold text-[#1c1c2e] mb-1.5">
                        {cap.title}
                      </h3>
                      <p className="text-xs text-[#6b7280] leading-relaxed">
                        {cap.description}
                      </p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Example workflow */}
      <section
        id="workflow"
        className="py-20 lg:py-28 bg-[#0f1e3d] relative overflow-hidden"
        aria-labelledby="workflow-heading"
      >
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <SectionLabel variant="white" className="mb-4">Example Workflow</SectionLabel>
            <h2
              id="workflow-heading"
              className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4"
            >
              From First Contact to Booked Appointment
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Here&apos;s how a multi-agent system might handle an incoming customer
              inquiry — without human involvement at each step.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {exampleWorkflow.map((step, i) => (
              <FadeIn key={step.step} delay={i * 0.08}>
                <div className="bg-white/6 border border-white/10 rounded-2xl p-5 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl font-bold text-[#1a4fba]/50">
                      {step.step}
                    </span>
                    {step.agent && (
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1a4fba]/20 border border-[#1a4fba]/30 text-[10px] font-semibold text-[#2d63d4]">
                        <Zap size={8} />
                        {step.agent}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2">
                    {step.label}
                  </h3>
                  <p className="text-xs text-white/50 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* AI Integrations */}
      <section className="py-20 bg-white" aria-labelledby="integrations-heading">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <SectionLabel className="mb-4">Integrations</SectionLabel>
            <h2
              id="integrations-heading"
              className="text-3xl font-bold text-[#1c1c2e] tracking-tight mb-5"
            >
              AI That Works With Your Existing Systems
            </h2>
            <p className="text-[#6b7280] leading-relaxed max-w-2xl mx-auto mb-10">
              QuadPoint builds AI solutions that connect to the tools and
              platforms your business already uses — rather than forcing you to
              replace everything.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a4fba] text-white text-sm font-semibold rounded-lg hover:bg-[#1240a0] transition-colors"
            >
              Discuss Your Integration
              <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>

      <CTASection
        heading="Ready to Build an AI Solution?"
        subheading="Tell us about your workflow and we'll design an AI system around it."
        buttonLabel="Build an AI Solution"
      />
    </>
  );
}
