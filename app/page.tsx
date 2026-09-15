import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { AISection } from "@/components/sections/AISection";
import { HowWeWorkSection } from "@/components/sections/HowWeWorkSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { WhyQuadPointSection } from "@/components/sections/WhyQuadPointSection";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "QuadPoint Technology | Business Software & Automation Solutions",
  description:
    "QuadPoint Technology builds business software, AI agents, and automation solutions that help businesses operate smarter and grow faster.",
  alternates: { canonical: "https://quadpointtechnology.com" },
};

export default function HomePage() {
  return (
    <div className="home-reference">
      <HeroSection />
      <SolutionsSection />
      <PortfolioSection />
      <AISection />
      <HowWeWorkSection />
      <WhyQuadPointSection />
      <CTASection />
    </div>
  );
}
