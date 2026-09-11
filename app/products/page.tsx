import type { Metadata } from "next";
import Link from "next/link";
import {
  ShoppingCart,
  Package,
  BarChart3,
  FileText,
  RefreshCcw,
  TrendingUp,
  ArrowRight,
  Clock,
  UserCheck,
  Bot,
  Workflow,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CTASection } from "@/components/sections/CTASection";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";

export const metadata: Metadata = {
  title: "Products",
  description:
    "QuadPoint POS — a complete point-of-sale and business management system. Explore our current and upcoming software products.",
  alternates: { canonical: "https://quadpointtechnology.com/products" },
};

const posFeatures = [
  {
    icon: ShoppingCart,
    title: "Sales Management",
    description:
      "Process transactions quickly and accurately. Track sales by product, category, and time period.",
  },
  {
    icon: Package,
    title: "Inventory Management",
    description:
      "Keep stock levels accurate. Add products, set quantities, and track every unit in and out.",
  },
  {
    icon: BarChart3,
    title: "Business Analytics",
    description:
      "Understand how your business is performing at a glance with clear, visual dashboards.",
  },
  {
    icon: FileText,
    title: "Sales Reports",
    description:
      "Detailed reports that show exactly where revenue is coming from across your business.",
  },
  {
    icon: RefreshCcw,
    title: "Restock Insights",
    description:
      "Know what to reorder and when. Get alerts before stock becomes a problem.",
  },
  {
    icon: TrendingUp,
    title: "Peak Sales Insights",
    description:
      "Identify your busiest periods and understand demand patterns to plan better.",
  },
];

const comingSoon = [
  {
    icon: UserCheck,
    title: "QuadPoint CRM",
    description:
      "A customer relationship management system designed for businesses that need clear client visibility and follow-up workflows.",
    category: "Business Software",
  },
  {
    icon: Bot,
    title: "QuadPoint AI Suite",
    description:
      "A platform for deploying and managing AI agents across business operations — receptionists, sales agents, and support agents.",
    category: "AI & Automation",
  },
  {
    icon: Workflow,
    title: "QuadPoint Automate",
    description:
      "A workflow automation tool that connects your business systems and removes manual, repetitive tasks.",
    category: "Automation",
  },
];

function POSBenefits() {
  const benefits = [
    "Replace manual or fragmented sales processes",
    "Keep inventory accurate without manual counting",
    "Understand business performance with real data",
    "Identify restocking needs before stock runs out",
    "Spot peak sales periods and plan accordingly",
  ];
  return (
    <ul className="space-y-3">
      {benefits.map((b) => (
        <li key={b} className="flex items-start gap-3">
          <span className="w-5 h-5 rounded-full bg-[#dbeafe] flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-[#1a4fba]" />
          </span>
          <span className="text-sm text-[#374151] leading-relaxed">{b}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ProductsPage() {
  return (
    <>
      {/* Page header */}
      <section
        className="pt-32 pb-16 bg-[#0f1e3d] relative overflow-hidden"
        aria-label="Products hero"
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
            <SectionLabel variant="white" className="mb-5">Products</SectionLabel>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-5">
              What We&apos;re Building
            </h1>
            <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
              Software products designed around how real businesses operate.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* QuadPoint POS — featured */}
      <section
        id="pos"
        className="py-20 lg:py-28 bg-white"
        aria-labelledby="pos-product-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <FadeIn className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <SectionLabel>Featured Product</SectionLabel>
            </div>
            <h2
              id="pos-product-heading"
              className="text-3xl sm:text-4xl font-bold text-[#1c1c2e] tracking-tight mb-4"
            >
              QuadPoint POS
            </h2>
            <p className="text-lg text-[#6b7280] max-w-2xl leading-relaxed">
              A complete point-of-sale and business management system designed
              to simplify sales, inventory, and business analytics.
            </p>
          </FadeIn>

          {/* Features grid */}
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
            {posFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <StaggerItem key={feature.title}>
                  <div className="bg-[#f9fafb] rounded-2xl border border-[#e5e7eb] p-6 h-full hover:border-[#1a4fba]/30 hover:bg-white hover:shadow-[0_4px_20px_-6px_rgba(26,79,186,0.08)] transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-[#dbeafe]/60 flex items-center justify-center mb-4">
                      <Icon size={18} className="text-[#1a4fba]" />
                    </div>
                    <h3 className="text-base font-bold text-[#1c1c2e] mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-[#6b7280] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* Benefits + CTA */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <FadeIn>
              <h3 className="text-xl font-bold text-[#1c1c2e] mb-5">
                Built to Solve Real Problems
              </h3>
              <POSBenefits />
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="bg-[#0f1e3d] rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-3">Ready to See It in Action?</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  Reach out and we&apos;ll walk you through how QuadPoint POS can work
                  for your business.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a4fba] text-white text-sm font-semibold rounded-lg hover:bg-[#2d63d4] transition-colors"
                >
                  Get in Touch
                  <ArrowRight size={14} />
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section
        className="py-20 lg:py-24 bg-[#f9fafb]"
        aria-labelledby="coming-soon-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <SectionLabel variant="gray" className="mb-4">Coming Soon</SectionLabel>
            <h2
              id="coming-soon-heading"
              className="text-3xl font-bold text-[#1c1c2e] tracking-tight mb-4"
            >
              More Products in Development
            </h2>
            <p className="text-[#6b7280] max-w-xl mx-auto">
              QuadPoint&apos;s long-term direction is to develop software products
              alongside our client solutions. Here&apos;s what&apos;s on the horizon.
            </p>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {comingSoon.map((product) => {
              const Icon = product.icon;
              return (
                <StaggerItem key={product.title}>
                  <div className="relative bg-white rounded-2xl border border-[#e5e7eb] p-6 h-full opacity-80">
                    {/* Coming soon badge */}
                    <span className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f3f4f6] border border-[#e5e7eb] text-[10px] font-semibold text-[#6b7280] uppercase tracking-wide">
                      <Clock size={10} />
                      Coming Soon
                    </span>

                    <div className="w-10 h-10 rounded-xl bg-[#f3f4f6] flex items-center justify-center mb-4">
                      <Icon size={18} className="text-[#9ca3af]" />
                    </div>
                    <span className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-widest block mb-2">
                      {product.category}
                    </span>
                    <h3 className="text-base font-bold text-[#374151] mb-2">
                      {product.title}
                    </h3>
                    <p className="text-sm text-[#9ca3af] leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      <CTASection
        heading="Have a Business Problem? Let's Build the Solution."
        subheading="Tell us what you're trying to improve, automate, or build."
      />
    </>
  );
}
