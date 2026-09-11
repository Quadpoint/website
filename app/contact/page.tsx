import type { Metadata } from "next";
import { Mail, MapPin, Clock } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ContactForm } from "@/components/forms/ContactForm";
import { FadeIn } from "@/components/animations/FadeIn";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with QuadPoint Technology. Tell us about your business challenge and we'll help you find the right technology solution.",
  alternates: { canonical: "https://quadpointtechnology.com/contact" },
};

export default function ContactPage() {
  return (
    <>
      {/* Page header */}
      <section
        className="pt-32 pb-16 bg-[#0f1e3d] relative overflow-hidden"
        aria-label="Contact hero"
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
            <SectionLabel variant="white" className="mb-5">Contact</SectionLabel>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-5">
              Let&apos;s Build Something.
            </h1>
            <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
              Tell us about your business, your challenge, or the technology you
              need. We&apos;ll get back to you within one business day.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Contact section */}
      <section className="py-16 lg:py-24 bg-[#f9fafb]" aria-label="Contact form">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">
            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              <FadeIn direction="left">
                <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6">
                  <h2 className="text-lg font-bold text-[#1c1c2e] mb-5">
                    Get in Touch
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#dbeafe]/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Mail size={15} className="text-[#1a4fba]" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide mb-0.5">
                          Email
                        </p>
                        <a
                          href="mailto:hello@quadpointtechnology.com"
                          className="text-sm text-[#374151] hover:text-[#1a4fba] transition-colors"
                        >
                          hello@quadpointtechnology.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#dbeafe]/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Clock size={15} className="text-[#1a4fba]" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide mb-0.5">
                          Response Time
                        </p>
                        <p className="text-sm text-[#374151]">
                          Within one business day
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#dbeafe]/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <MapPin size={15} className="text-[#1a4fba]" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide mb-0.5">
                          Location
                        </p>
                        <p className="text-sm text-[#374151]">
                          Available remotely
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* What to expect */}
              <FadeIn direction="left" delay={0.1}>
                <div className="bg-[#0f1e3d] rounded-2xl p-6 text-white">
                  <h3 className="text-base font-bold mb-4">What Happens Next</h3>
                  <ol className="space-y-3">
                    {[
                      "We review your message and understand your needs",
                      "We reach out to schedule a brief conversation",
                      "We discuss the best approach for your situation",
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-[#1a4fba] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <p className="text-sm text-white/60 leading-relaxed">
                          {step}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              </FadeIn>
            </aside>

            {/* Form */}
            <FadeIn className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-[#e5e7eb] p-7 sm:p-9">
                <h2 className="text-xl font-bold text-[#1c1c2e] mb-1.5">
                  Send an Inquiry
                </h2>
                <p className="text-sm text-[#6b7280] mb-7">
                  Fill in the details below and we&apos;ll get back to you promptly.
                </p>
                <ContactForm />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
