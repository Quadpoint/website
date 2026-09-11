"use client";

import { FadeIn } from "@/components/animations/FadeIn";

export function TrustSection() {
  return (
    <section className="py-16 lg:py-20 bg-white border-b border-[#e5e7eb]" aria-label="What we do">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1c1c2e] tracking-tight mb-4">
              Software built around real business needs.
            </h2>
            <p className="text-base sm:text-lg text-[#6b7280] leading-relaxed">
              From business management systems to intelligent automation, we
              design technology around the way businesses actually work.
            </p>
          </FadeIn>
        </div>

        {/* Capability pills */}
        <FadeIn delay={0.15} className="mt-10 flex flex-wrap justify-center gap-3">
          {[
            "Business Software",
            "Point of Sale",
            "AI Agents",
            "Multi-Agent AI",
            "Workflow Automation",
            "Custom Web Apps",
            "Mobile Applications",
            "System Integrations",
          ].map((cap) => (
            <span
              key={cap}
              className="px-4 py-2 rounded-full text-sm font-medium bg-[#f3f4f6] text-[#374151] border border-[#e5e7eb]"
            >
              {cap}
            </span>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
