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
          <p className="text-sm text-[#9ca3af] mb-10">Last updated: 2026</p>
          <div className="prose prose-slate max-w-none text-[#374151]">
            <p className="text-[#6b7280]">
              This Privacy Policy will be updated with full details. For privacy
              questions, please contact us at{" "}
              <a
                href="mailto:hello@quadpointtechnology.com"
                className="text-[#1a4fba] hover:underline"
              >
                hello@quadpointtechnology.com
              </a>
              .
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
