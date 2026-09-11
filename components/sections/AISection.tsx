"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, User, PhoneCall, TrendingUp, Calendar, HeadphonesIcon, Briefcase } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";

const agents = [
  {
    icon: PhoneCall,
    name: "AI Receptionist",
    description: "Handles customer inquiries and basic requests around the clock.",
  },
  {
    icon: TrendingUp,
    name: "AI Sales Agent",
    description: "Engages leads and helps qualify prospects automatically.",
  },
  {
    icon: Calendar,
    name: "AI Scheduling Agent",
    description: "Handles appointment booking and scheduling workflows.",
  },
  {
    icon: HeadphonesIcon,
    name: "AI Support Agent",
    description: "Resolves common customer support requests without human intervention.",
  },
  {
    icon: Briefcase,
    name: "AI Business Assistant",
    description: "Helps teams access business information and interact with workflows.",
  },
];

const workflowSteps = [
  { label: "Customer", icon: User, isHuman: true },
  { label: "Reception Agent", icon: PhoneCall, isHuman: false },
  { label: "Sales Agent", icon: TrendingUp, isHuman: false },
  { label: "Scheduling Agent", icon: Calendar, isHuman: false },
  { label: "CRM Agent", icon: Briefcase, isHuman: false },
  { label: "Human Team", icon: User, isHuman: true },
];

function WorkflowDiagram() {
  return (
    <div className="flex flex-col items-center gap-0">
      {workflowSteps.map((step, i) => {
        const Icon = step.icon;
        const isLast = i === workflowSteps.length - 1;
        return (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 + 0.2 }}
            className="flex flex-col items-center"
          >
            {/* Node */}
            <div
              className={`flex items-center gap-3 px-5 py-3 rounded-xl border text-sm font-medium ${
                step.isHuman
                  ? "bg-[#0f1e3d] border-[#1a4fba]/40 text-white"
                  : "bg-white/10 border-white/20 text-white"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                  step.isHuman ? "bg-[#1a4fba]" : "bg-white/15"
                }`}
              >
                <Icon size={14} />
              </div>
              {step.label}
            </div>

            {/* Connector */}
            {!isLast && (
              <div className="flex flex-col items-center my-1">
                <div className="w-px h-5 bg-white/20" />
                <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-white/30" />
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

export function AISection() {
  return (
    <section
      id="ai"
      className="py-20 lg:py-28 bg-[#0f1e3d] relative overflow-hidden"
      aria-labelledby="ai-heading"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #1a4fba, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn className="text-center mb-16">
          <SectionLabel variant="white" className="mb-4">
            AI & Multi-Agent Systems
          </SectionLabel>
          <h2
            id="ai-heading"
            className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4"
          >
            AI Agents That Work Together.
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Go beyond chatbots. Deploy specialized AI agents that communicate,
            coordinate, and automate real business workflows.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          {/* Workflow diagram */}
          <FadeIn direction="left">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-6 text-center">
                Example Multi-Agent Workflow
              </p>
              <WorkflowDiagram />
              <p className="text-xs text-white/35 text-center mt-6 leading-relaxed">
                Specialized agents handle each stage, then hand off to the human team.
              </p>
            </div>
          </FadeIn>

          {/* Right — agent cards + explanation */}
          <div>
            <FadeIn className="mb-6">
              <p className="text-white/70 leading-relaxed">
                Instead of relying on one general-purpose chatbot, businesses can
                deploy specialized AI agents designed for specific tasks and
                workflows — each one focused on what it does best.
              </p>
            </FadeIn>

            <StaggerContainer className="space-y-3">
              {agents.map((agent) => {
                const Icon = agent.icon;
                return (
                  <StaggerItem key={agent.name}>
                    <div className="flex items-start gap-4 bg-white/6 border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-white/20 transition-colors">
                      <div className="w-9 h-9 rounded-lg bg-[#1a4fba]/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon size={15} className="text-[#2d63d4]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white mb-0.5">
                          {agent.name}
                        </p>
                        <p className="text-xs text-white/50 leading-relaxed">
                          {agent.description}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>

            <FadeIn delay={0.4} className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a4fba] text-white text-sm font-semibold rounded-lg hover:bg-[#2d63d4] transition-colors"
              >
                Build an AI Solution
                <ArrowRight size={14} />
              </Link>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
