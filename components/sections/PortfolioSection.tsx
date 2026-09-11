"use client";

import Link from "next/link";
import { ArrowRight, Clock, ShoppingCart } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * Inline POS product card — minimal dark mockup thumbnail.
 */
function POSCardVisual() {
  return (
    <div className="w-full bg-[#0f1e3d] rounded-xl overflow-hidden border border-white/10">
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-white/5 border-b border-white/8">
        <span className="w-2 h-2 rounded-full bg-white/15" />
        <span className="w-2 h-2 rounded-full bg-white/15" />
        <span className="w-2 h-2 rounded-full bg-white/15" />
        <span className="flex-1 text-center text-[9px] text-white/30 font-medium">
          QuadPoint POS
        </span>
      </div>

      <div className="p-3 space-y-2">
        {/* Stat row */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Revenue", val: "$4,820" },
            { label: "Transactions", val: "148" },
          ].map((s) => (
            <div key={s.label} className="bg-white/6 rounded-lg p-2 border border-white/8">
              <p className="text-[8px] text-white/40 mb-0.5">{s.label}</p>
              <p className="text-sm font-bold text-white">{s.val}</p>
            </div>
          ))}
        </div>

        {/* Mini chart */}
        <div className="bg-white/4 rounded-lg p-2.5 border border-white/8">
          <div className="flex items-end gap-1 h-8">
            {[40, 60, 35, 75, 50, 90, 65].map((pct, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm"
                style={{
                  height: `${pct}%`,
                  background: i === 5 ? "#1a4fba" : "rgba(255,255,255,0.12)",
                  borderRadius: "2px 2px 0 0",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const projects = [
  {
    id: "quadpoint-pos",
    status: "live" as const,
    category: "Business Software",
    title: "QuadPoint POS",
    description:
      "A complete point-of-sale and business management system. Sales, inventory, analytics, and restock insights in one system.",
    href: "/products",
    cta: "Explore POS",
    visual: <POSCardVisual />,
  },
  {
    id: "crm",
    status: "soon" as const,
    category: "Business Software",
    title: "QuadPoint CRM",
    description:
      "A customer relationship management system built for businesses that need clear client visibility and follow-up workflows.",
    href: null,
    cta: null,
    visual: null,
  },
  {
    id: "ai-suite",
    status: "soon" as const,
    category: "AI & Automation",
    title: "AI Agent Suite",
    description:
      "A platform for deploying and managing specialized AI agents across business operations.",
    href: null,
    cta: null,
    visual: null,
  },
];

export function PortfolioSection() {
  return (
    <section
      className="py-20 lg:py-28 bg-white"
      aria-labelledby="portfolio-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-12">
          <SectionLabel className="mb-4">What We&apos;re Building</SectionLabel>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2
              id="portfolio-heading"
              className="text-3xl sm:text-4xl font-bold text-[#1c1c2e] tracking-tight"
            >
              Products &amp; Projects
            </h2>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1a4fba] hover:gap-2.5 transition-all"
            >
              View all products
              <ArrowRight size={14} />
            </Link>
          </div>
        </FadeIn>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <StaggerItem key={project.id}>
              {project.status === "live" ? (
                /* Live product card */
                <div className="group bg-[#f9fafb] rounded-2xl border border-[#e5e7eb] overflow-hidden hover:border-[#1a4fba]/30 hover:shadow-[0_8px_30px_-8px_rgba(26,79,186,0.12)] transition-all duration-300 h-full flex flex-col">
                  {/* Visual thumbnail */}
                  <div className="p-5 pb-0">
                    {project.visual}
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    {/* Status + category */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-semibold text-emerald-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Live Product
                      </span>
                      <span className="text-[10px] font-medium text-[#9ca3af]">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#1c1c2e] mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[#6b7280] leading-relaxed mb-5 flex-1">
                      {project.description}
                    </p>

                    {project.href && project.cta && (
                      <Link
                        href={project.href}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a4fba] group-hover:gap-3 transition-all"
                      >
                        <ShoppingCart size={13} />
                        {project.cta}
                        <ArrowRight size={13} />
                      </Link>
                    )}
                  </div>
                </div>
              ) : (
                /* Coming soon card */
                <div className="bg-[#f9fafb] rounded-2xl border border-[#e5e7eb] border-dashed p-6 h-full flex flex-col opacity-70">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f3f4f6] border border-[#e5e7eb] text-[10px] font-semibold text-[#9ca3af] uppercase tracking-wide">
                      <Clock size={9} />
                      Coming Soon
                    </span>
                    <span className="text-[10px] font-medium text-[#9ca3af]">
                      {project.category}
                    </span>
                  </div>

                  {/* Placeholder visual */}
                  <div className="w-full h-24 bg-[#e5e7eb]/50 rounded-xl mb-5 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border-2 border-dashed border-[#9ca3af]/40" />
                  </div>

                  <h3 className="text-base font-bold text-[#374151] mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[#9ca3af] leading-relaxed flex-1">
                    {project.description}
                  </p>
                </div>
              )}
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
