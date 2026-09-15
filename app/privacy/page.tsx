import type { Metadata } from "next";
import { FadeIn } from "@/components/animations/FadeIn";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "QuadPoint Technology Privacy Policy.",
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <section className="pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h1 className="text-3xl font-bold text-[#1c1c2e] mb-3">
            Privacy Policy
          </h1>
          <p className="text-sm text-[#9ca3af] mb-10">
            Last updated: September 15, 2026
          </p>
          <div className="space-y-8 text-[#374151]">
            <div>
              <h2 className="text-xl font-bold text-[#1c1c2e] mb-3">
                Information You Provide
              </h2>
              <p className="text-[#6b7280] leading-relaxed">
                When you prepare an inquiry through our contact form, you may
                provide your name, business name, email address, phone number,
                service interest, and message.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1c1c2e] mb-3">
                How We Use It
              </h2>
              <p className="text-[#6b7280] leading-relaxed">
                We use the information you send to review your inquiry, contact
                you about your request, and discuss services that may address
                your stated needs. The form opens a draft in your email app, and
                no inquiry is delivered until you choose to send that email.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1c1c2e] mb-3">
                Your Choices
              </h2>
              <p className="text-[#6b7280] leading-relaxed">
                You can choose not to submit the form. To ask about, correct, or
                request deletion of information you previously sent, contact us
                at{" "}
              <a
                href="mailto:quadpointtechnology@gmail.com"
                className="text-[#1a4fba] hover:underline"
              >
                quadpointtechnology@gmail.com
              </a>
              .
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
