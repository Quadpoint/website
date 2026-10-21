import { ArrowRight, Rocket } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/Button";

interface ProductCtaBannerProps {
  heading: string;
  /** Two lines, broken at md and up exactly as designed */
  body: [string, string];
  buttonLabel?: string;
  buttonHref?: string;
}

/** Inline call-to-action panel that closes a product page */
export function ProductCtaBanner({
  heading,
  body,
  buttonLabel = "Request a Demo",
  buttonHref = "/contact",
}: ProductCtaBannerProps) {
  return (
    <FadeIn>
      <div className="flex flex-col items-start gap-6 rounded-2xl border border-[#6db7ff]/25 bg-gradient-to-r from-[#0b2e5b] to-[#123f70] p-6 sm:flex-row sm:items-center sm:p-8">
        <span className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#3b9bff] to-[#1257c9] shadow-[0_0_0_8px_rgb(20_120_235/0.18)]">
          <Rocket size={28} className="text-white" />
        </span>
        <div className="flex-1">
          <h2 className="mb-1.5 text-xl font-bold text-white sm:text-2xl">{heading}</h2>
          <p className="text-sm leading-relaxed text-white/65">
            {body[0]}
            <br className="hidden md:inline" /> {body[1]}
          </p>
        </div>
        <Button href={buttonHref} size="lg" className="min-h-12">
          {buttonLabel}
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </FadeIn>
  );
}
