import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  ChevronDown,
  Globe,
  LayoutDashboard,
  RefreshCcw,
  Search,
  Tags,
  UserPlus,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/animations/FadeIn";
import { ProductMonitor } from "@/components/products/ProductMonitor";
import { ProductHighlights, type ProductHighlight } from "@/components/products/ProductHighlights";
import { FeatureCardGrid, type FeatureGroup } from "@/components/products/FeatureCardGrid";
import { ProductCardGrid } from "@/components/products/ProductCardGrid";
import { ProductCtaBanner } from "@/components/products/ProductCtaBanner";
import { getOtherProducts } from "@/lib/products";

const pageTitle = "Gym Membership Software Philippines – QuadPoint Gym";
const pageDescription =
  "QuadPoint Gym gives gyms in the Philippines a website with online sign-up and a staff dashboard for members, renewals, and always-current status.";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: "https://quadpointtechnology.com/products/gym" },
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: "https://quadpointtechnology.com/products/gym",
    siteName: "QuadPoint Technology",
    title: pageTitle,
    description: pageDescription,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "QuadPoint Gym" }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/og-image.png"],
  },
};

const gymJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "QuadPoint Gym",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Gym Management",
  operatingSystem: "Web",
  url: "https://quadpointtechnology.com/products/gym",
  image: "https://quadpointtechnology.com/products/gym-screen.png",
  description:
    "A gym website and membership system with online sign-up, member self-service, and a staff dashboard for renewals.",
  publisher: {
    "@type": "Organization",
    name: "QuadPoint Technology",
    url: "https://quadpointtechnology.com",
  },
};

const heroHighlights: ProductHighlight[] = [
  {
    icon: UserPlus,
    title: "Online Sign-Up",
    description: ["Members join from", "any device."],
  },
  {
    icon: BadgeCheck,
    title: "Always-Current Status",
    description: ["Worked out from", "expiry dates."],
  },
  {
    icon: RefreshCcw,
    title: "One-Click Renewals",
    description: ["Early renewals stack", "onto the term."],
  },
];

const featureGroups: FeatureGroup[] = [
  {
    icon: Globe,
    title: "Gym Website",
    accent: true,
    items: [
      "Home page with your gym's highlights",
      "Facilities page for every training area",
      "Coach profiles",
      "Member testimonials",
      "Contact page with hours and address",
      "Mobile-friendly navigation",
    ],
  },
  {
    icon: UserPlus,
    title: "Online Sign-Up",
    items: [
      "Self-serve membership form",
      "Members choose a plan and start date",
      "Clear error messages on every field",
      "Automatic member codes (GYM-0001)",
      "Confirmation page with code and expiry",
    ],
  },
  {
    icon: Tags,
    title: "Plans & Pricing",
    items: [
      "Plans set up for your gym's pricing",
      "Length and price per plan",
      "Retire plans without losing members",
      "Pricing cards on your website",
      "Plans ordered the way you choose",
    ],
  },
  {
    icon: Search,
    title: "Member Self-Service",
    items: [
      "Look up status by email or member code",
      "Shows plan, start, and expiry dates",
      "Clear Active, Expiring, or Inactive status",
      "Shows only the first name for privacy",
    ],
  },
  {
    icon: LayoutDashboard,
    title: "Staff Dashboard",
    items: [
      "Total, active, expiring, and inactive counts",
      "Filter by active or inactive members",
      "Search by name, email, or code",
      "Member table with plan and expiry",
      "Status badges at a glance",
    ],
  },
  {
    icon: RefreshCcw,
    title: "Renewals & Access",
    items: [
      "One-click renewal with plan choice",
      "Early renewals stack onto the current term",
      "Lapsed members restart from today",
      "Password-protected staff portal",
      "Staff sessions expire after 8 hours",
    ],
  },
];

export default function GymProductPage() {
  return (
    <div className="product-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(gymJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Hero */}
      <section
        id="gym"
        className="relative overflow-hidden pt-32 pb-20 lg:pt-36 lg:pb-24"
        aria-labelledby="gym-hero-heading"
      >
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:px-8">
          <FadeIn>
            <SectionLabel className="mb-5">Gym Management</SectionLabel>
            <h1
              id="gym-hero-heading"
              className="mb-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              QuadPoint <span className="text-[#3b9bff]">Gym</span>
              <span className="sr-only"> – </span>
              <span className="mt-3 block text-xl font-semibold tracking-normal text-white/80 sm:text-2xl">
                Gym Membership Software
              </span>
            </h1>
            <p className="mb-5 text-lg leading-relaxed text-white/90 sm:text-xl">
              A gym website and membership system that
              <br className="hidden lg:inline" /> keeps sign-ups, renewals, and member
              <br className="hidden lg:inline" /> status in one place for Philippine gyms.
            </p>
            <p className="mb-8 text-sm leading-relaxed text-white/65 sm:text-base">
              Members join online and check their own status.
              <br className="hidden lg:inline" /> Staff see who is active, who is expiring,
              <br className="hidden lg:inline" /> and who needs a renewal.
            </p>
            <div className="mb-10 flex flex-wrap gap-3">
              <Button href="/contact" size="lg" className="min-h-12">
                Request a Demo
                <ArrowRight size={16} className="ml-2" />
              </Button>
              <Button
                href="#features"
                variant="inverse"
                size="lg"
                className="min-h-12 border-[#3b9bff]/70 hover:border-[#3b9bff]"
              >
                <span className="mr-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#1478eb]">
                  <ChevronDown size={14} className="text-white" />
                </span>
                See Features
              </Button>
            </div>
            <ProductHighlights items={heroHighlights} />
          </FadeIn>

          <FadeIn direction="left" delay={0.1} className="lg:-mr-6 xl:-mr-10">
            <ProductMonitor
              src="/products/gym-screen.png"
              alt="QuadPoint Gym staff dashboard showing member counts and active memberships"
            />
          </FadeIn>
        </div>
      </section>

      {/* Key features */}
      <section
        id="features"
        className="py-20 lg:py-28 scroll-mt-20"
        aria-labelledby="gym-features-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-12">
            <SectionLabel className="mb-5">Key Features</SectionLabel>
            <h2
              id="gym-features-heading"
              className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              Your Gym Online,
              <br />
              Your Members Organized.
            </h2>
            <p className="max-w-md leading-relaxed text-white/70">
              From the first visit to your website to every renewal,
              <br className="hidden sm:inline" /> QuadPoint Gym keeps your membership
              <br className="hidden sm:inline" /> records accurate and easy to manage.
            </p>
          </FadeIn>

          <FeatureCardGrid groups={featureGroups} />
        </div>
      </section>

      {/* Other solutions + CTA */}
      <section
        id="other-products"
        className="py-20 lg:py-28 scroll-mt-20"
        aria-labelledby="gym-other-products-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
            <FadeIn>
              <SectionLabel className="mb-5">Explore More</SectionLabel>
              <h2
                id="gym-other-products-heading"
                className="mb-5 text-3xl font-bold tracking-tight text-white sm:text-4xl"
              >
                More Than
                <br />
                Memberships.
              </h2>
              <p className="leading-relaxed text-white/70">
                Selling drinks and gear at the front desk?
                <br className="hidden lg:inline" /> QuadPoint POS can handle those sales,
                <br className="hidden lg:inline" /> and see our other systems below.
              </p>
            </FadeIn>

            <ProductCardGrid items={getOtherProducts("gym")} />
          </div>

          <ProductCtaBanner
            heading="Ready to bring your gym online?"
            body={[
              "Tell us about your gym and we'll show you how QuadPoint Gym",
              "can handle your sign-ups and renewals.",
            ]}
          />
        </div>
      </section>
    </div>
  );
}
