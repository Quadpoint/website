import type { Metadata } from "next";
import {
  ArrowRight,
  BarChart3,
  CalendarCheck,
  CalendarDays,
  ChevronDown,
  Gift,
  LayoutDashboard,
  Scissors,
  ShieldCheck,
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

const pageTitle = "QuadPoint Barbers – Barbershop Booking System";
const pageDescription =
  "QuadPoint Barbers gives barbershops in the Philippines online booking, a bookings calendar, loyalty programs, and reports in one system.";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: "https://quadpointtechnology.com/products/barbers" },
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: "https://quadpointtechnology.com/products/barbers",
    siteName: "QuadPoint Technology",
    title: pageTitle,
    description: pageDescription,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "QuadPoint Barbers" }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/og-image.png"],
  },
};

const barbersJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "QuadPoint Barbers",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Barbershop Booking",
  operatingSystem: "Web",
  url: "https://quadpointtechnology.com/products/barbers",
  image: "https://quadpointtechnology.com/products/barber-screen.png",
  description:
    "Online booking and a back office for barbershops, with a bookings calendar, loyalty programs, and reports.",
  publisher: {
    "@type": "Organization",
    name: "QuadPoint Technology",
    url: "https://quadpointtechnology.com",
  },
};

const heroHighlights: ProductHighlight[] = [
  {
    icon: CalendarCheck,
    title: "Online Booking",
    description: ["Customers book in", "four quick steps."],
  },
  {
    icon: ShieldCheck,
    title: "No Double Bookings",
    description: ["Only open slots", "are ever offered."],
  },
  {
    icon: Gift,
    title: "Loyalty Built In",
    description: ["Tiers, points, and", "stamp cards."],
  },
];

const featureGroups: FeatureGroup[] = [
  {
    icon: CalendarCheck,
    title: "Online Booking",
    accent: true,
    items: [
      "Service menu and barber profiles",
      "Book in four steps: service, barber, day, time",
      "Only open time slots are offered",
      "Double bookings are blocked",
      "Customers view and cancel their bookings",
    ],
  },
  {
    icon: CalendarDays,
    title: "Bookings Calendar",
    items: [
      "Day, week, month, and year views",
      "One column per barber in day view",
      "Filter by status and barber",
      "Cancel or mark no-shows",
      "Add bookings on a customer's behalf",
    ],
  },
  {
    icon: LayoutDashboard,
    title: "Shop Dashboard",
    items: [
      "Today's bookings and revenue",
      "Chair utilization and active barbers",
      "Comparison with the same day last week",
      "Today's schedule and recent bookings",
      "Weekly bookings and revenue charts",
    ],
  },
  {
    icon: Scissors,
    title: "Team & Services",
    items: [
      "Barber profiles with titles and specialties",
      "Mark barbers as on leave",
      "Services with duration, price, and buffer time",
      "Service categories and add-ons",
      "Choose which services are bookable online",
    ],
  },
  {
    icon: Gift,
    title: "Customers & Loyalty",
    items: [
      "Customer list with booking history",
      "Gold, Silver, and Bronze tiers by visits",
      "Loyalty points toward rewards",
      "Stamp-card programs you design",
      "Spot new and loyal customers at a glance",
    ],
  },
  {
    icon: BarChart3,
    title: "Reports",
    items: [
      "Sales and bookings reports",
      "Service and barber performance",
      "Customer and loyalty reports",
      "Any date range you choose",
      "Export to CSV",
    ],
  },
];

export default function BarbersProductPage() {
  return (
    <div className="product-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(barbersJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Hero */}
      <section
        id="barbers"
        className="relative overflow-hidden pt-32 pb-20 lg:pt-36 lg:pb-24"
        aria-labelledby="barbers-hero-heading"
      >
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:px-8">
          <FadeIn>
            <SectionLabel className="mb-5">Barbershop Booking</SectionLabel>
            <h1
              id="barbers-hero-heading"
              className="mb-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              QuadPoint <span className="text-[#3b9bff]">Barbers</span>
              <span className="sr-only"> – </span>
              <span className="mt-3 block text-xl font-semibold tracking-normal text-white/80 sm:text-2xl">
                Barbershop Booking System
              </span>
            </h1>
            <p className="mb-5 text-lg leading-relaxed text-white/90 sm:text-xl">
              Online booking and a back office built for
              <br className="hidden lg:inline" /> Philippine barbershops, from the first
              <br className="hidden lg:inline" /> booking to the loyal regular.
            </p>
            <p className="mb-8 text-sm leading-relaxed text-white/65 sm:text-base">
              Customers pick a barber and a time slot online.
              <br className="hidden lg:inline" /> Your team sees the day&apos;s chairs, revenue,
              <br className="hidden lg:inline" /> and bookings at a glance.
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
              src="/products/barber-screen.png"
              alt="QuadPoint Barbers dashboard with today's bookings, revenue, and schedule"
            />
          </FadeIn>
        </div>
      </section>

      {/* Key features */}
      <section
        id="features"
        className="py-20 lg:py-28 scroll-mt-20"
        aria-labelledby="barbers-features-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-12">
            <SectionLabel className="mb-5">Key Features</SectionLabel>
            <h2
              id="barbers-features-heading"
              className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              Every Chair Booked,
              <br />
              Every Regular Rewarded.
            </h2>
            <p className="max-w-md leading-relaxed text-white/70">
              Online booking, a live calendar, and loyalty rewards:
              <br className="hidden sm:inline" /> QuadPoint Barbers keeps your shop&apos;s
              <br className="hidden sm:inline" /> schedule full and organized.
            </p>
          </FadeIn>

          <FeatureCardGrid groups={featureGroups} />
        </div>
      </section>

      {/* Other products + CTA */}
      <section
        id="other-products"
        className="py-20 lg:py-28 scroll-mt-20"
        aria-labelledby="barbers-other-products-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
            <FadeIn>
              <SectionLabel className="mb-5">Explore More</SectionLabel>
              <h2
                id="barbers-other-products-heading"
                className="mb-5 text-3xl font-bold tracking-tight text-white sm:text-4xl"
              >
                Beyond the
                <br />
                Barber Chair.
              </h2>
              <p className="leading-relaxed text-white/70">
                Selling pomade and grooming products?
                <br className="hidden lg:inline" /> QuadPoint POS handles retail sales,
                <br className="hidden lg:inline" /> and see our other systems below.
              </p>
            </FadeIn>

            <ProductCardGrid items={getOtherProducts("barbers")} />
          </div>

          <ProductCtaBanner
            heading="Ready to fill every chair?"
            body={[
              "Tell us about your shop and we'll show you how QuadPoint Barbers",
              "can handle your bookings and regulars.",
            ]}
          />
        </div>
      </section>
    </div>
  );
}
