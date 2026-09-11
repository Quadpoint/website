import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { ArrowRight } from "lucide-react";

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const footerNav = [
  {
    label: "Solutions",
    links: [
      { href: "/solutions#business-software", label: "Business Software" },
      { href: "/solutions#ai-automation",     label: "AI & Automation" },
      { href: "/solutions#custom-development", label: "Custom Development" },
    ],
  },
  {
    label: "Products",
    links: [
      { href: "/products",      label: "QuadPoint POS" },
      { href: "/products#coming-soon", label: "Coming Soon" },
    ],
  },
  {
    label: "Company",
    links: [
      { href: "/about",         label: "About" },
      { href: "/ai-automation", label: "AI & Automation" },
      { href: "/contact",       label: "Contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer
      className="bg-[#080f1e] text-white"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10 lg:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12">

          {/* Brand column — spans 2 */}
          <div className="lg:col-span-2">
            <Logo variant="white" className="mb-5" />
            <p className="text-sm text-white/45 leading-relaxed max-w-xs mb-6">
              Business Software &amp; Automation Solutions. We build practical
              technology that solves real business problems.
            </p>

            {/* Social */}
            <div className="flex items-center gap-2.5 mb-8">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="QuadPoint Technology on Facebook"
                className="w-8 h-8 rounded-lg bg-white/8 text-white/50 hover:bg-white/15 hover:text-white flex items-center justify-center transition-colors"
              >
                <FacebookIcon size={14} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="QuadPoint Technology on LinkedIn"
                className="w-8 h-8 rounded-lg bg-white/8 text-white/50 hover:bg-white/15 hover:text-white flex items-center justify-center transition-colors"
              >
                <LinkedinIcon size={14} />
              </a>
            </div>

            {/* CTA */}
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg bg-[#1a4fba] text-white hover:bg-[#2d63d4] transition-colors group"
            >
              Get in Touch
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Nav columns — span 3 */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerNav.map((group) => (
              <div key={group.label}>
                <h3 className="text-[10px] font-semibold text-white/35 uppercase tracking-widest mb-4">
                  {group.label}
                </h3>
                <ul className="space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/55 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/30">
            © 2026 QuadPoint Technology. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
