"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import {
  getNavbarShadowClassName,
  getNavbarScrollReference,
  getNavbarScrollState,
} from "@/lib/navbar-scroll";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/solutions", label: "Solutions" },
  { href: "/products", label: "Products" },
  { href: "/ai-automation", label: "AI & Automation" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const lastScrollYRef = useRef(0);
  const isVisibleRef = useRef(true);

  // Track scroll direction and switch between the existing navbar styles.
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const nextState = getNavbarScrollState({
        currentY,
        previousY: lastScrollYRef.current,
        wasVisible: isVisibleRef.current,
        mobileOpen,
      });

      setIsScrolled(nextState.isScrolled);
      if (nextState.isVisible !== isVisibleRef.current) {
        isVisibleRef.current = nextState.isVisible;
        setIsVisible(nextState.isVisible);
      }
      lastScrollYRef.current = getNavbarScrollReference(
        currentY,
        lastScrollYRef.current
      );
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileOpen]);

  // Close mobile menu on route change — wrapped in startTransition to avoid cascading renders
  useEffect(() => {
    const timer = setTimeout(() => setMobileOpen(false), 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Close on outside click
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node)
      ) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-[transform,background-color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none",
          isVisible ? "translate-y-0" : "-translate-y-full",
          isScrolled
            ? "bg-white/95 backdrop-blur-md"
            : "bg-transparent",
          getNavbarShadowClassName(isScrolled, isVisible)
        )}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* Logo */}
            <Logo
              variant={isScrolled ? "default" : "white"}
              className="ml-1 flex-shrink-0"
            />

            {/* Desktop Nav */}
            <nav
              className="hidden lg:flex items-center gap-1"
              aria-label="Main navigation"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3.5 py-2 text-sm font-medium rounded-md transition-colors duration-150",
                    isActive(link.href)
                      ? isScrolled
                        ? "text-[#1a4fba] bg-[#dbeafe]/60"
                        : "text-white bg-white/15"
                      : isScrolled
                        ? "text-[#374151] hover:text-[#1a4fba] hover:bg-[#f3f4f6]"
                        : "text-white/85 hover:text-white hover:bg-white/10"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/contact"
                className={cn(
                  "px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-150",
                  "bg-[#f59e0b] text-[#0f1e3d] hover:bg-[#fbb52b] shadow-sm hover:shadow-[0_4px_12px_-2px_rgba(245,158,11,0.45)]"
                )}
              >
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className={cn(
                "lg:hidden min-w-11 min-h-11 p-2 rounded-md transition-colors duration-150",
                isScrolled
                  ? "text-[#374151] hover:bg-[#f3f4f6]"
                  : "text-white hover:bg-white/10"
              )}
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              id="mobile-menu"
              ref={mobileMenuRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-white shadow-2xl lg:hidden flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 h-16 border-b border-[#e5e7eb]">
                <Logo variant="default" />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-md text-[#6b7280] hover:text-[#1c1c2e] hover:bg-[#f3f4f6] transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Nav links */}
              <nav
                className="flex-1 px-4 py-6 space-y-1 overflow-y-auto"
                aria-label="Mobile navigation"
              >
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                        isActive(link.href)
                          ? "bg-[#dbeafe]/60 text-[#1a4fba]"
                          : "text-[#374151] hover:text-[#1a4fba] hover:bg-[#f3f4f6]"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Drawer footer CTA */}
              <div className="p-5 border-t border-[#e5e7eb]">
                <Link
                  href="/contact"
                  className="flex items-center justify-center w-full px-5 py-2.5 text-sm font-semibold rounded-lg bg-[#f59e0b] text-[#0f1e3d] hover:bg-[#fbb52b] transition-colors shadow-sm"
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
