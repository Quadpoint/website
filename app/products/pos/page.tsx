import type { Metadata } from "next";
import {
  ArrowRight,
  BarChart3,
  Box,
  Check,
  CircleCheck,
  LayoutGrid,
  Play,
  Settings,
  ShoppingCart,
  Users,
  UtensilsCrossed,
  Zap,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import { ProductMonitor } from "@/components/products/ProductMonitor";
import { ProductHighlights, type ProductHighlight } from "@/components/products/ProductHighlights";
import { FeatureCardGrid, type FeatureGroup } from "@/components/products/FeatureCardGrid";
import { ProductCardGrid } from "@/components/products/ProductCardGrid";
import { ProductCtaBanner } from "@/components/products/ProductCtaBanner";
import { getOtherProducts } from "@/lib/products";

const pageTitle = "QuadPoint POS – POS System for Cafés, Restaurants & Retail";
const pageDescription =
  "Easy POS system for coffee shops, restaurants, and retail in the Philippines. Sales, inventory, and reports from ₱1,499/month with no setup fees.";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: "https://quadpointtechnology.com/products/pos" },
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: "https://quadpointtechnology.com/products/pos",
    siteName: "QuadPoint Technology",
    title: pageTitle,
    description: pageDescription,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "QuadPoint POS" }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/og-image.png"],
  },
};

const posJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "QuadPoint POS",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Point of Sale",
  operatingSystem: "Web",
  url: "https://quadpointtechnology.com/products/pos",
  image: "https://quadpointtechnology.com/products/quadpoint-pos.png",
  description:
    "A modern, fast, and flexible point-of-sale system built for cafés, restaurants, and retail businesses.",
  publisher: {
    "@type": "Organization",
    name: "QuadPoint Technology",
    url: "https://quadpointtechnology.com",
  },
  offers: [
    { name: "Starter", price: "1499" },
    { name: "Business", price: "2999" },
  ].map(({ name, price }) => ({
    "@type": "Offer",
    name,
    price,
    priceCurrency: "PHP",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price,
      priceCurrency: "PHP",
      unitText: "MONTH",
      referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
    },
    availability: "https://schema.org/InStock",
    url: "https://quadpointtechnology.com/products/pos#pricing",
  })),
};

const heroHighlights: ProductHighlight[] = [
  {
    icon: Zap,
    title: "Fast & Reliable",
    description: ["Handle high-volume", "transactions with ease."],
  },
  {
    icon: LayoutGrid,
    title: "All-in-One System",
    description: ["Sales, inventory,", "staff, and reports."],
  },
  {
    icon: Box,
    title: "Recipe-Based Stock",
    description: ["Ingredients auto-deduct", "with every sale."],
  },
];

const featureGroups: FeatureGroup[] = [
  {
    icon: ShoppingCart,
    title: "Sales & Ordering",
    accent: true,
    items: [
      "Fast and intuitive ordering interface",
      "Table management (dine-in, takeout)",
      "Order modifiers and notes",
      "Discounts and promotions",
      "Refunds and void transactions",
      "Multiple payment methods",
    ],
  },
  {
    icon: Box,
    title: "Inventory Management",
    items: [
      "Real-time stock tracking",
      "Low stock alerts",
      "Recipe-based inventory (auto-deduct)",
      "Expiration date tracking",
      "Multiple storage locations",
      "Stock adjustment logs",
    ],
  },
  {
    icon: BarChart3,
    title: "Reports & Analytics",
    items: [
      "Daily, weekly, and monthly reports",
      "Sales summary and trends",
      "Product performance",
      "Inventory usage reports",
      "Employee activity logs",
      "Export to PDF or CSV",
    ],
  },
  {
    icon: Users,
    title: "Employee Management",
    items: [
      "Staff accounts and roles",
      "Employee attendance and shifts",
      "Time in/out tracking",
      "Activity logs",
      "Permission control",
      "Manage schedules",
    ],
  },
  {
    icon: UtensilsCrossed,
    title: "Menu Management",
    items: [
      "Add, edit, and organize menu items",
      "Set categories (food, drinks, dessert)",
      "Product images and descriptions",
      "Set prices and availability",
      "Customize menu display",
      "Manage ingredients and recipes",
    ],
  },
  {
    icon: Settings,
    title: "Customization & Settings",
    items: [
      "Multiple themes (light/dark)",
      "Flexible product display",
      "Custom categories and labels",
      "Receipt and kitchen print settings",
      "System preferences",
      "Business information setup",
    ],
  },
];

const pricingPerks = ["No setup fees", "Free updates", "Local support", "Cancel anytime"];

const plans: {
  name: string;
  tagline: string;
  price: string;
  period?: string;
  features: string[];
  cta: string;
  popular?: boolean;
}[] = [
  {
    name: "Starter",
    tagline: "Perfect for small businesses and startups.",
    price: "₱1,499",
    period: "/month",
    features: [
      "Up to 1 device",
      "Core POS features",
      "Inventory management",
      "Sales reports",
      "Email support",
    ],
    cta: "Get Started",
  },
  {
    name: "Business",
    tagline: "Ideal for growing businesses.",
    price: "₱2,999",
    period: "/month",
    features: [
      "Up to 3 devices",
      "All Starter features",
      "Employee management",
      "Advanced reports",
      "Priority support",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Enterprise",
    tagline: "For large businesses with advanced needs.",
    price: "Custom Pricing",
    features: [
      "Unlimited devices",
      "All Business features",
      "Custom integrations",
      "Dedicated support",
      "Tailored solutions",
    ],
    cta: "Contact Us",
  },
];

export default function POSProductPage() {
  return (
    <div className="product-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(posJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Hero */}
      <section
        id="pos"
        className="relative overflow-hidden pt-32 pb-20 lg:pt-36 lg:pb-24"
        aria-labelledby="pos-hero-heading"
      >
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:px-8">
          <FadeIn>
            <SectionLabel className="mb-5">Point of Sale</SectionLabel>
            <h1
              id="pos-hero-heading"
              className="mb-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              QuadPoint <span className="text-[#3b9bff]">POS</span>
              <span className="sr-only"> – </span>
              <span className="mt-3 block text-xl font-semibold tracking-normal text-white/80 sm:text-2xl">
                POS System for Cafés, Restaurants &amp; Retail
              </span>
            </h1>
            <p className="mb-5 text-lg leading-relaxed text-white/90 sm:text-xl">
              Take orders faster, track every ingredient,
              <br className="hidden lg:inline" /> and see today&apos;s sales before you close,
              <br className="hidden lg:inline" /> for cafés, restaurants, and retail.
            </p>
            <p className="mb-8 text-sm leading-relaxed text-white/65 sm:text-base">
              Manage sales, inventory, staff, and more — all in one place.
              <br className="hidden lg:inline" /> QuadPoint POS is designed to be simple to use, reliable,
              <br className="hidden lg:inline" /> and scalable for growing Philippine businesses.
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
                  <Play size={10} className="ml-px fill-white text-white" />
                </span>
                Watch Overview
              </Button>
            </div>
            <ProductHighlights items={heroHighlights} />
          </FadeIn>

          <FadeIn direction="left" delay={0.1} className="lg:-mr-6 xl:-mr-10">
            <ProductMonitor
              src="/products/quadpoint-pos.png"
              alt="QuadPoint POS menu order screen with an order in progress"
            />
          </FadeIn>
        </div>
      </section>

      {/* Key features */}
      <section
        id="features"
        className="py-20 lg:py-28 scroll-mt-20"
        aria-labelledby="pos-features-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-12">
            <SectionLabel className="mb-5">Key Features</SectionLabel>
            <h2
              id="pos-features-heading"
              className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              From the First Order
              <br />
              to the Closing Report.
            </h2>
            <p className="max-w-md leading-relaxed text-white/70">
              Ordering, inventory, staff, and reports.
              <br className="hidden sm:inline" /> QuadPoint POS gives you the tools to run
              <br className="hidden sm:inline" /> your business efficiently.
            </p>
          </FadeIn>

          <FeatureCardGrid groups={featureGroups} />
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="py-20 lg:py-28 scroll-mt-20"
        aria-labelledby="pos-pricing-heading"
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:px-8">
          <FadeIn>
            <SectionLabel className="mb-5">Pricing</SectionLabel>
            <h2
              id="pos-pricing-heading"
              className="mb-5 text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              Simple and
              <br />
              Transparent Pricing.
            </h2>
            <p className="mb-7 leading-relaxed text-white/70">
              Choose the plan that fits your business needs.
              <br className="hidden lg:inline" /> All plans include core POS features with no
              <br className="hidden lg:inline" /> hidden fees.
            </p>
            <ul className="space-y-2.5">
              {pricingPerks.map((perk) => (
                <li key={perk} className="flex items-center gap-3 text-sm text-white/85">
                  <CircleCheck size={18} className="text-[#3b9bff]" />
                  {perk}
                </li>
              ))}
            </ul>
          </FadeIn>

          <StaggerContainer className="grid gap-5 md:grid-cols-3">
            {plans.map((plan) => (
              <StaggerItem key={plan.name}>
                <article
                  className={`relative flex h-full flex-col rounded-2xl border p-6 ${
                    plan.popular
                      ? "border-2 border-[#f59d13] bg-[#0b2e5b] shadow-[0_24px_50px_-28px_rgba(245,157,19,0.55)]"
                      : "border-[#6db7ff]/20 bg-[#0b2e5b]/70"
                  }`}
                  aria-labelledby={`plan-${plan.name.toLowerCase()}`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-md bg-[#f59d13] px-3 py-1 text-[11px] font-bold text-[#0f1e3d]">
                      Most Popular
                    </span>
                  )}
                  <h3
                    id={`plan-${plan.name.toLowerCase()}`}
                    className="mb-1 text-lg font-bold text-white"
                  >
                    {plan.name}
                  </h3>
                  <p className="mb-5 text-xs leading-relaxed text-white/60">{plan.tagline}</p>
                  <p className="mb-6 flex items-baseline gap-2 text-white">
                    <span
                      className={
                        plan.period ? "text-4xl font-bold tracking-tight" : "text-2xl font-bold"
                      }
                    >
                      {plan.price}
                    </span>
                    {plan.period && <span className="text-sm text-white/60">{plan.period}</span>}
                  </p>
                  <ul className="mb-8 space-y-2.5">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5 text-sm text-white/80">
                        <Check size={15} className="flex-shrink-0 text-[#f59d13]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    href="/contact"
                    variant={plan.period ? "primary" : "inverse"}
                    className={`mt-auto min-h-11 w-full ${
                      plan.period ? "" : "border-[#3b9bff]/70 hover:border-[#3b9bff]"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight size={14} className="ml-2" />
                  </Button>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Other solutions + CTA */}
      <section
        id="other-products"
        className="py-20 lg:py-28 scroll-mt-20"
        aria-labelledby="pos-other-products-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
            <FadeIn>
              <SectionLabel className="mb-5">Explore More</SectionLabel>
              <h2
                id="pos-other-products-heading"
                className="mb-5 text-3xl font-bold tracking-tight text-white sm:text-4xl"
              >
                More Systems for
                <br />
                Growing Businesses.
              </h2>
              <p className="leading-relaxed text-white/70">
                Run a gym, barbershop, or clinic too?
                <br className="hidden lg:inline" /> Our other systems share the same simple
                <br className="hidden lg:inline" /> design as QuadPoint POS.
              </p>
            </FadeIn>

            <ProductCardGrid items={getOtherProducts("pos")} />
          </div>

          <ProductCtaBanner
            heading="Ready for a faster counter?"
            body={[
              "Book a demo and see how QuadPoint POS handles your menu,",
              "stock, and daily reports.",
            ]}
          />
        </div>
      </section>
    </div>
  );
}
