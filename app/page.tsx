import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { FeaturedProductSection } from "@/components/sections/FeaturedProductSection";
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
    <>
      <HeroSection />
      <TrustSection />
      <SolutionsSection />
      <FeaturedProductSection />
      <AISection />
      <HowWeWorkSection />
      <PortfolioSection />
      <WhyQuadPointSection />
      <CTASection />
    </>
  );
}
