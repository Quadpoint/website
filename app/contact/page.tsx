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
    <div className="contact-page">
      {/* Page header */}
      <section
        className="pt-32 pb-16 bg-[#0f1e3d] relative overflow-hidden"
        aria-label="Contact hero"
      >
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <SectionLabel variant="white" className="mb-5">Contact</SectionLabel>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-5">
              Let&apos;s Build the Solution.
            </h1>
            <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
              Tell us about your business, your challenge, or the technology you
              need. We&apos;ll get back to you within one business day.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Contact section */}
      <section className="contact-content py-16 lg:py-24" aria-label="Contact form">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">
            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              <FadeIn direction="left">
                <div className="contact-card rounded-2xl border p-6">
                  <h2 className="contact-card-heading text-lg font-bold mb-5">
                    Get in Touch
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="contact-icon flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg mt-0.5">
                        <Mail size={15} className="text-[#1a4fba]" />
                      </div>
                      <div>
                        <p className="contact-meta text-xs font-semibold uppercase tracking-wide mb-0.5">
                          Email
                        </p>
                        <a
                          href="mailto:quadpointtechnology@gmail.com"
                          className="contact-card-link text-sm transition-colors"
                        >
                          quadpointtechnology@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="contact-icon flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg mt-0.5">
                        <Clock size={15} className="text-[#1a4fba]" />
                      </div>
                      <div>
                        <p className="contact-meta text-xs font-semibold uppercase tracking-wide mb-0.5">
                          Response Time
                        </p>
                        <p className="contact-card-copy text-sm">
                          Within one business day
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="contact-icon flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg mt-0.5">
                        <MapPin size={15} className="text-[#1a4fba]" />
                      </div>
                      <div>
                        <p className="contact-meta text-xs font-semibold uppercase tracking-wide mb-0.5">
                          Location
                        </p>
                        <p className="contact-card-copy text-sm">
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
              <div className="contact-form-panel rounded-2xl border p-6 sm:p-9 lg:p-10">
                <h2 className="contact-form-heading text-2xl font-bold mb-2">
                  Send an Inquiry
                </h2>
                <p className="contact-form-intro text-sm leading-relaxed mb-8">
                  Fill in the details below and we&apos;ll get back to you promptly.
                </p>
                <ContactForm />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
