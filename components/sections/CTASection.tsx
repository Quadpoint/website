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
      className="cta-panel relative flex min-h-[34rem] items-center overflow-hidden px-6 py-24 md:min-h-[42rem] md:px-10 md:py-28 xl:min-h-[min(46rem,72dvh)] xl:px-12 xl:py-32"
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

      <div className="relative z-10 mx-auto w-full max-w-[90rem]">
        <div className="mx-auto w-full max-w-4xl text-center">
          <FadeIn className="relative z-10">
            <h2 className="text-3xl font-bold text-white tracking-tight mb-5 sm:text-4xl md:text-5xl md:leading-tight">
              {heading}
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-white/70 md:text-xl lg:mx-auto">
              {subheading}
            </p>
            <Button
              href={buttonHref}
              variant="primary"
              size="lg"
              className="min-h-12 px-8"
            >
              {buttonLabel}
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
