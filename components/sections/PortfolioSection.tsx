"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Sparkles } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { products } from "@/lib/products";

/** "Explore POS", "Explore Gym", ... from the product title */
function exploreLabel(title: string) {
  return `Explore ${title.replace(/^QuadPoint\s+/, "")}`;
}

export function PortfolioSection() {
  return (
    <section
      className="py-20 xl:py-24 bg-white"
      aria-labelledby="portfolio-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <FadeIn className="mb-12">
          <SectionLabel className="mb-4">Our Products</SectionLabel>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2
              id="portfolio-heading"
              className="text-3xl sm:text-4xl font-bold text-[#1c1c2e] tracking-tight"
            >
              Products &amp; Projects
            </h2>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#f59e0b] hover:gap-2.5 transition-all"
            >
              View all products
              <ArrowRight size={14} />
            </Link>
          </div>
        </FadeIn>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {products.map((project) => (
            <StaggerItem key={project.slug}>
              {project.href ? (
                /* Live product card */
                <div className="interactive-card gloss-card group rounded-2xl border border-[#e5e7eb] overflow-hidden transition-all duration-300 h-full flex flex-col">
                  {/* Product screenshot */}
                  <div className="p-5 pb-0 xl:p-7 xl:pb-0">
                    {project.image && (
                      <div className="aspect-[16/10] overflow-hidden rounded-xl border border-white/10">
                        <Image
                          src={project.image}
                          alt={`${project.title} screenshot`}
                          width={2400}
                          height={1500}
                          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                          className="h-full w-full object-cover object-left-top"
                        />
                      </div>
                    )}
                  </div>

                  <div className="p-5 xl:p-7 flex flex-col flex-1">
                    {/* Status + category */}
                    <div className="flex items-center gap-2 mb-3">
                      {project.earlyAccess ? (
                        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-[10px] font-semibold text-amber-700">
                          <Sparkles size={9} />
                          Early Access
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-semibold text-emerald-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Live Product
                        </span>
                      )}
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

                    <Link
                      href={project.href}
                      className="interactive-card-link inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#8ed0ff] transition-colors duration-300"
                    >
                      {exploreLabel(project.title)}
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              ) : (
                /* Coming soon card */
                <div className="gloss-card rounded-2xl border border-[#e5e7eb] border-dashed p-6 xl:p-8 h-full flex flex-col opacity-70">
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
