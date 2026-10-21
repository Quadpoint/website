import type { Metadata } from "next";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/animations/FadeIn";
import { ProductCardGrid } from "@/components/products/ProductCardGrid";
import { ProductCtaBanner } from "@/components/products/ProductCtaBanner";
import { products } from "@/lib/products";

const pageTitle = "Products";
const pageDescription =
  "QuadPoint software for cafés, restaurants, retail, gyms, barbershops, and clinics, from POS to bookings and patient queues.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "https://quadpointtechnology.com/products" },
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: "https://quadpointtechnology.com/products",
    siteName: "QuadPoint Technology",
    title: "Products | QuadPoint Technology",
    description: pageDescription,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "QuadPoint products" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Products | QuadPoint Technology",
    description: pageDescription,
    images: ["/og-image.png"],
  },
};

const productsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "QuadPoint products",
  itemListElement: products
    .filter((product) => product.href)
    .map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.title,
      url: `https://quadpointtechnology.com${product.href}`,
    })),
};

export default function ProductsPage() {
  return (
    <div className="product-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productsJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Header */}
      <section
        className="relative overflow-hidden pt-32 pb-12 lg:pt-36 lg:pb-16"
        aria-labelledby="products-heading"
      >
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionLabel className="mb-5">Products</SectionLabel>
            <h1
              id="products-heading"
              className="mb-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Our <span className="text-[#3b9bff]">Products</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
              Software designed around how real businesses operate.
              <br className="hidden lg:inline" /> Choose a product to see what it can do for yours.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Product grid + CTA */}
      <section className="pt-4 pb-20 lg:pb-28" aria-labelledby="all-products-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="all-products-heading" className="sr-only">
            All products
          </h2>
          <div className="mb-16">
            <ProductCardGrid items={products} variant="large" />
          </div>

          <ProductCtaBanner
            heading="Not sure which product fits?"
            body={[
              "Tell us how your business runs and we'll recommend the right system,",
              "or build one around your needs.",
            ]}
            buttonLabel="Talk to QuadPoint"
          />
        </div>
      </section>
    </div>
  );
}
