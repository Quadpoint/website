"use client";

import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/Button";

interface CTASectionProps {
  heading?: string;
  subheading?: string;
  buttonLabel?: string;
  buttonHref?: string;
}

export function CTASection({
  heading = "Want to ease your operations? Let's Build the Solution",
  subheading = "Tell us what you're trying to improve, automate, or build.",
  buttonLabel = "Talk to QuadPoint",
  buttonHref = "/contact",
}: CTASectionProps) {
  return (
    <section
      className="py-20 lg:py-28 bg-[#0f1e3d] relative overflow-hidden"
      aria-label="Call to action"
    >
      {/* Background geometry */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute right-0 top-0 w-[400px] h-[400px] opacity-10 rounded-full"
          style={{
            background: "radial-gradient(circle, #1a4fba, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
        <div
          className="absolute left-0 bottom-0 w-[300px] h-[300px] opacity-8 rounded-full"
          style={{
            background: "radial-gradient(circle, #2d63d4, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
      </div>

      <div className="cta-panel relative z-10 max-w-7xl mx-auto px-6 py-14 sm:px-10 lg:px-16 lg:py-16 text-center">
        <FadeIn className="relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-5">
            {heading}
          </h2>
          <p className="text-lg text-white/60 mb-10">{subheading}</p>
          <Button href={buttonHref} variant="primary" size="lg">
            {buttonLabel}
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
