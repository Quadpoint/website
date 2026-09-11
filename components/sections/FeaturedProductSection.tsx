"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Package,
  BarChart3,
  FileText,
  RefreshCcw,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";

const features = [
  {
    icon: ShoppingCart,
    title: "Sales Management",
    description: "Process transactions efficiently and track sales in real time.",
  },
  {
    icon: Package,
    title: "Inventory Management",
    description: "Keep stock levels accurate and get alerts before you run out.",
  },
  {
    icon: BarChart3,
    title: "Business Analytics",
    description: "Understand how your business is performing at a glance.",
  },
  {
    icon: FileText,
    title: "Sales Reports",
    description: "Detailed reports that show exactly where revenue is coming from.",
  },
  {
    icon: RefreshCcw,
    title: "Restock Insights",
    description: "Know what to reorder and when before stock becomes a problem.",
  },
  {
    icon: TrendingUp,
    title: "Peak Sales Insights",
    description: "Identify your busiest periods and plan staffing accordingly.",
  },
];

/** Inline POS dashboard mockup */
function POSMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative bg-[#0f1e3d] rounded-2xl overflow-hidden border border-white/10 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.35)]"
    >
      {/* Header bar */}
      <div className="flex items-center gap-3 px-5 py-3.5 bg-white/5 border-b border-white/10">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        </div>
        <span className="text-[11px] text-white/40 font-medium mx-auto">
          QuadPoint POS
        </span>
      </div>

      <div className="p-5 space-y-4">
        {/* KPI row */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Today's Revenue", val: "$6,240", up: true },
            { label: "Units Sold", val: "314", up: true },
          ].map((kpi) => (
            <div
              key={kpi.label}
              className="bg-white/6 rounded-xl p-3.5 border border-white/8"
            >
              <p className="text-[10px] text-white/45 mb-1">{kpi.label}</p>
              <p className="text-xl font-bold text-white">{kpi.val}</p>
              <span className="text-[10px] text-emerald-400">▲ Today</span>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/8">
          <p className="text-[11px] text-white/50 mb-3 font-medium">
            Weekly Sales Overview
          </p>
          <div className="flex items-end gap-2 h-16">
            {[30, 55, 42, 70, 50, 88, 65].map((pct, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.4 + i * 0.06 }}
                className="flex-1 rounded-sm"
                style={{
                  height: `${pct}%`,
                  transformOrigin: "bottom",
                  background: i === 5 ? "#1a4fba" : "rgba(255,255,255,0.14)",
                  borderRadius: "3px 3px 0 0",
                }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1.5">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <span
                key={i}
                className="flex-1 text-center text-[9px] text-white/25"
              >
                {d}
              </span>
            ))}
          </div>
        </div>

        {/* Stock alerts */}
        <div className="space-y-2">
          <p className="text-[11px] text-white/40 font-medium uppercase tracking-wide">
            Restock Alerts
          </p>
          {[
            { item: "Coffee Beans — Dark Roast", qty: "12 units" },
            { item: "Paper Cups — Large", qty: "8 units" },
          ].map((alert) => (
            <div
              key={alert.item}
              className="flex items-center justify-between bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2"
            >
              <span className="text-[11px] text-white/70">{alert.item}</span>
              <span className="text-[10px] text-amber-400 font-medium">
                {alert.qty} left
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function FeaturedProductSection() {
  return (
    <section
      id="pos"
      className="py-20 lg:py-28 bg-white"
      aria-labelledby="pos-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Left — mockup */}
          <div>
            <POSMockup />
          </div>

          {/* Right — content */}
          <div>
            <FadeIn>
              <SectionLabel className="mb-4">Featured Product</SectionLabel>
              <h2
                id="pos-heading"
                className="text-3xl sm:text-4xl font-bold text-[#1c1c2e] tracking-tight mb-4"
              >
                Meet QuadPoint POS
              </h2>
              <p className="text-lg text-[#6b7280] leading-relaxed mb-8">
                A complete point-of-sale and business management system designed
                to simplify sales, inventory, and business analytics.
              </p>
            </FadeIn>

            <StaggerContainer className="grid sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <StaggerItem key={feature.title}>
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#dbeafe]/60 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon size={16} className="text-[#1a4fba]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#1c1c2e] mb-0.5">
                          {feature.title}
                        </p>
                        <p className="text-xs text-[#6b7280] leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>

            <FadeIn delay={0.3}>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a4fba] text-white text-sm font-semibold rounded-lg hover:bg-[#1240a0] transition-colors shadow-sm hover:shadow-[0_4px_16px_-4px_rgba(26,79,186,0.5)]"
              >
                Explore QuadPoint POS
                <ArrowRight size={14} />
              </Link>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
