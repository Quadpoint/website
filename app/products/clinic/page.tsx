import type { Metadata } from "next";
import {
  ArrowRight,
  Bot,
  CalendarDays,
  ChevronDown,
  ClipboardList,
  FileText,
  MapPin,
  MessageSquare,
  Smartphone,
  Sparkles,
  Stethoscope,
  UserRound,
  Users,
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

const pageTitle = "QuadPoint Clinic – Clinic Queue & Appointment System";
const pageDescription =
  "Clinic queueing system and appointment booking requests for doctors and clinics in the Philippines. Call the next patient in one click.";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: "https://quadpointtechnology.com/products/clinic" },
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: "https://quadpointtechnology.com/products/clinic",
    siteName: "QuadPoint Technology",
    title: pageTitle,
    description: pageDescription,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "QuadPoint Clinic" }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/og-image.png"],
  },
};

const clinicJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "QuadPoint Clinic",
  applicationCategory: "HealthApplication",
  applicationSubCategory: "Clinic Queue & Appointments",
  operatingSystem: "Web",
  url: "https://quadpointtechnology.com/products/clinic",
  image: "https://quadpointtechnology.com/products/clinic-screen.png",
  description:
    "A digital waiting list and appointment manager for doctors and clinics, with multi-location hours and patient booking requests.",
  publisher: {
    "@type": "Organization",
    name: "QuadPoint Technology",
    url: "https://quadpointtechnology.com",
  },
};

const heroHighlights: ProductHighlight[] = [
  {
    icon: Users,
    title: "Live Queue",
    description: ["Call the next patient", "with one click."],
  },
  {
    icon: MapPin,
    title: "Multi-Location",
    description: ["Hours and capacity", "for every clinic."],
  },
  {
    icon: CalendarDays,
    title: "Booking Requests",
    description: ["Patients pick an", "arrival window."],
  },
];

const featureGroups: FeatureGroup[] = [
  {
    icon: Users,
    title: "Live Patient Queue",
    accent: true,
    items: [
      "Waiting, in-room, and completed counts",
      "Call the next patient with one click",
      "Consultation timer for the current patient",
      "Search by name, queue number, or reason",
      "Walk-ins flagged with queue codes",
    ],
  },
  {
    icon: UserRound,
    title: "Patient Details",
    items: [
      "Current patient at a glance",
      "Contact, reason for visit, and department",
      "Next patients in line",
      "Start, finish, or mark not present",
      "Works on desktop and mobile",
    ],
  },
  {
    icon: CalendarDays,
    title: "Doctor's Schedule",
    items: [
      "Day, week, month, and year views",
      "Appointments, availability, and personal time",
      "Filter by category and status",
      "Mini calendar for quick jumps",
    ],
  },
  {
    icon: MapPin,
    title: "Clinic Hours & Locations",
    items: [
      "Weekly hours for each clinic location",
      "Patient capacity per time window",
      "Clash detection across locations",
    ],
  },
  {
    icon: Stethoscope,
    title: "Doctor Status",
    items: [
      "With a patient, on break, in a meeting, or in transit",
      "Add a status note for your team",
      "Today's appointments and reminders",
      "Message templates for running late or breaks",
    ],
  },
  {
    icon: ClipboardList,
    title: "Patient Booking Requests",
    items: [
      "Patients choose an arrival window",
      "Remaining slots shown per window",
      "Request with name, phone, and reason",
    ],
  },
];

const roadmapGroups: FeatureGroup[] = [
  {
    icon: Bot,
    title: "AI Front Desk",
    accent: true,
    items: [
      "Answers patient calls",
      "Books appointments by phone",
      "Recognizes returning patients by number",
      "Logs every phone booking in your queue",
    ],
  },
  {
    icon: FileText,
    title: "Medical Records",
    items: ["Patient medical notes", "Visit history in one place"],
  },
  {
    icon: MessageSquare,
    title: "Patient Updates",
    items: ["SMS updates for waiting patients", "Doctor arrival estimates", "Native mobile apps"],
  },
];

export default function ClinicProductPage() {
  return (
    <div className="product-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(clinicJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Hero */}
      <section
        id="clinic"
        className="relative overflow-hidden pt-32 pb-20 lg:pt-36 lg:pb-24"
        aria-labelledby="clinic-hero-heading"
      >
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:px-8">
          <FadeIn>
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <SectionLabel>Clinic Queue &amp; Appointments</SectionLabel>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#f59d13]/50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#fbb52b]">
                <Sparkles size={12} />
                Early Access
              </span>
            </div>
            <h1
              id="clinic-hero-heading"
              className="mb-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              QuadPoint <span className="text-[#3b9bff]">Clinic</span>
              <span className="sr-only"> – </span>
              <span className="mt-3 block text-xl font-semibold tracking-normal text-white/80 sm:text-2xl">
                Clinic Queue &amp; Appointment System
              </span>
            </h1>
            <p className="mb-5 text-lg leading-relaxed text-white/90 sm:text-xl">
              A digital waiting list and appointment
              <br className="hidden lg:inline" /> manager for doctors and clinics in the
              <br className="hidden lg:inline" /> Philippines, from walk-ins to scheduled visits.
            </p>
            <p className="mb-8 text-sm leading-relaxed text-white/65 sm:text-base">
              Replace the paper list by the door. Call the next
              <br className="hidden lg:inline" /> patient, see who is waiting, and keep every
              <br className="hidden lg:inline" /> clinic location&apos;s hours in one place.
            </p>
            <div className="mb-10 flex flex-wrap gap-3">
              <Button href="/contact" size="lg" className="min-h-12">
                Join Early Access
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
              src="/products/clinic-screen.png"
              alt="QuadPoint Clinic appointment queue with waiting patients and the current consultation"
            />
          </FadeIn>
        </div>
      </section>

      {/* Key features */}
      <section
        id="features"
        className="py-20 lg:py-28 scroll-mt-20"
        aria-labelledby="clinic-features-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-12">
            <SectionLabel className="mb-5">Key Features</SectionLabel>
            <h2
              id="clinic-features-heading"
              className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              A Calmer Waiting Room,
              <br />
              A Clearer Day.
            </h2>
            <p className="max-w-md leading-relaxed text-white/70">
              From the first patient in line to the last appointment,
              <br className="hidden sm:inline" /> QuadPoint Clinic keeps your queue and
              <br className="hidden sm:inline" /> schedule organized.
            </p>
          </FadeIn>

          <FeatureCardGrid groups={featureGroups} />
        </div>
      </section>

      {/* Roadmap */}
      <section
        id="roadmap"
        className="py-20 lg:py-28 scroll-mt-20"
        aria-labelledby="clinic-roadmap-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-12">
            <SectionLabel className="mb-5">Coming Next</SectionLabel>
            <h2
              id="clinic-roadmap-heading"
              className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              An AI Assistant
              <br />
              for Your Front Desk.
            </h2>
            <p className="max-w-md leading-relaxed text-white/70">
              Future releases add an AI assistant that handles
              <br className="hidden sm:inline" /> patient calls and appointments,
              <br className="hidden sm:inline" /> so your staff can focus on patients.
            </p>
          </FadeIn>

          <FeatureCardGrid groups={roadmapGroups} />
          <p className="mt-6 flex items-center gap-2 text-sm text-white/55">
            <Smartphone size={14} aria-hidden="true" />
            Roadmap features are in development and not yet available.
          </p>
        </div>
      </section>

      {/* Other products + CTA */}
      <section
        id="other-products"
        className="py-20 lg:py-28 scroll-mt-20"
        aria-labelledby="clinic-other-products-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
            <FadeIn>
              <SectionLabel className="mb-5">Explore More</SectionLabel>
              <h2
                id="clinic-other-products-heading"
                className="mb-5 text-3xl font-bold tracking-tight text-white sm:text-4xl"
              >
                More From
                <br />
                QuadPoint.
              </h2>
              <p className="leading-relaxed text-white/70">
                Explore the other systems we build
                <br className="hidden lg:inline" /> for cafés, gyms, barbershops, and
                <br className="hidden lg:inline" /> growing Philippine businesses.
              </p>
            </FadeIn>

            <ProductCardGrid items={getOtherProducts("clinic")} />
          </div>

          <ProductCtaBanner
            heading="Bring your clinic's queue online."
            body={[
              "Join early access and help shape QuadPoint Clinic",
              "around how your clinic actually runs.",
            ]}
            buttonLabel="Join Early Access"
          />
        </div>
      </section>
    </div>
  );
}
