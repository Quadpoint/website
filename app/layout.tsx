import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://quadpointtechnology.com"),
  title: {
    default: "QuadPoint Technology | Business Software & Automation Solutions",
    template: "%s | QuadPoint Technology",
  },
  description:
    "QuadPoint Technology builds business software, AI agents, and automation solutions that help businesses operate smarter and grow faster.",
  keywords: [
    "QuadPoint Technology",
    "business software",
    "business automation",
    "AI agents",
    "AI automation",
    "POS software",
    "CRM software",
    "custom software development",
    "business technology solutions",
    "AI receptionist",
    "multi-agent AI",
  ],
  authors: [{ name: "QuadPoint Technology" }],
  creator: "QuadPoint Technology",
  publisher: "QuadPoint Technology",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://quadpointtechnology.com",
    siteName: "QuadPoint Technology",
    title: "QuadPoint Technology | Business Software & Automation Solutions",
    description:
      "Business software, AI agents, and automation solutions built to help businesses operate smarter and grow faster.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "QuadPoint Technology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QuadPoint Technology | Business Software & Automation Solutions",
    description:
      "Business software, AI agents, and automation solutions built to help businesses operate smarter and grow faster.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-dvh flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
