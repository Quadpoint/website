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
  heading = "Have a Business Problem? Let's Build the Solution.",
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
        {/* Q geometry hint — brand logo */}
        <svg
          className="absolute left-8 top-1/2 -translate-y-1/2 w-48 h-48 opacity-[0.07]"
          viewBox="0 0 100 100"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="50" cy="50" r="44.5" stroke="white" strokeWidth="7"
            strokeDasharray="209.70 69.90" strokeDashoffset="248.53"
            strokeLinecap="round" transform="rotate(-90 50 50)" fill="none"/>
          <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="8"
            strokeDasharray="133.52 54.98" strokeDashoffset="172.79"
            strokeLinecap="round" transform="rotate(-90 50 50)" fill="none"/>
          <circle cx="50" cy="50" r="16.5" stroke="white" strokeWidth="7"
            strokeDasharray="69.12 34.56" strokeDashoffset="97.91"
            strokeLinecap="round" transform="rotate(-90 50 50)" fill="none"/>
          <circle cx="50" cy="50" r="5.5" fill="white"/>
          <path d="M 46 52 L 56 52 L 92 88 L 82 92 Z" fill="white"/>
          <circle cx="50" cy="50" r="5.5" fill="white"/>
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-5">
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
