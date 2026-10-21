import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { AISection } from "@/components/sections/AISection";
import { HowWeWorkSection } from "@/components/sections/HowWeWorkSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { WhyQuadPointSection } from "@/components/sections/WhyQuadPointSection";
import { CTASection } from "@/components/sections/CTASection";

const pageTitle = "POS, Booking & Clinic Software in the Philippines | QuadPoint";
const pageDescription =
  "POS for cafés and restaurants from ₱1,499/month, plus gym membership, barbershop booking, and clinic queue software for Philippine businesses.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "https://quadpointtechnology.com" },
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: "https://quadpointtechnology.com",
    siteName: "QuadPoint Technology",
    title: pageTitle,
    description: pageDescription,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "QuadPoint Technology" }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/og-image.png"],
  },
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
