import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you were looking for doesn't exist.",
  robots: { index: false },
};

const quickLinks = [
  { href: "/solutions",      label: "Solutions" },
  { href: "/products",       label: "Products" },
  { href: "/ai-automation",  label: "AI & Automation" },
  { href: "/about",          label: "About" },
  { href: "/contact",        label: "Contact" },
];

export default function NotFound() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-[#f9fafb] px-4 py-24">
      {/* Q mark */}
      <div className="mb-10 relative inline-flex items-center justify-center" aria-hidden="true">
        <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="qp404" x1="5" y1="5" x2="95" y2="95" gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor="#60b0ff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#061450" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="44.5" stroke="url(#qp404)" strokeWidth="7"
            strokeDasharray="209.70 69.90" strokeDashoffset="248.53"
            strokeLinecap="round" transform="rotate(-90 50 50)" fill="none"/>
          <circle cx="50" cy="50" r="30" stroke="url(#qp404)" strokeWidth="8"
            strokeDasharray="133.52 54.98" strokeDashoffset="172.79"
            strokeLinecap="round" transform="rotate(-90 50 50)" fill="none"/>
          <circle cx="50" cy="50" r="16.5" stroke="url(#qp404)" strokeWidth="7"
            strokeDasharray="69.12 34.56" strokeDashoffset="97.91"
            strokeLinecap="round" transform="rotate(-90 50 50)" fill="none"/>
          <circle cx="50" cy="50" r="5.5" fill="url(#qp404)"/>
          <path d="M 46 52 L 56 52 L 92 88 L 82 92 Z" fill="url(#qp404)"/>
          <circle cx="50" cy="50" r="5.5" fill="url(#qp404)"/>
        </svg>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-[#1c1c2e] tracking-tight text-center mb-3">
        Page Not Found
      </h1>
      <p className="text-[#6b7280] text-center max-w-sm leading-relaxed mb-10">
        The page you were looking for doesn&apos;t exist or may have been moved.
      </p>

      {/* Primary action */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a4fba] text-white text-sm font-semibold rounded-lg hover:bg-[#1240a0] transition-colors shadow-sm mb-10"
      >
        <ArrowLeft size={14} />
        Back to Home
      </Link>

      {/* Quick links */}
      <div className="w-full max-w-sm">
        <p className="text-xs font-semibold text-[#9ca3af] uppercase tracking-widest text-center mb-4">
          Or go to
        </p>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center justify-between px-3.5 py-2.5 bg-white border border-[#e5e7eb] rounded-lg text-sm font-medium text-[#374151] hover:border-[#1a4fba]/40 hover:text-[#1a4fba] transition-colors group"
            >
              {link.label}
              <ArrowRight
                size={12}
                className="text-[#9ca3af] group-hover:text-[#1a4fba] transition-colors"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
