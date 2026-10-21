"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import {
  getNavbarCanvasClassName,
  getNavbarDesktopLinkClassName,
  getNavbarShadowClassName,
  getNavbarSurfaceClassName,
  getNavbarTransitionClassName,
  getNavbarVisibilityClassName,
  getNavbarScrollReference,
  getNavbarScrollState,
} from "@/lib/navbar-scroll";

interface NavLink {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
}

const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/solutions", label: "Solutions" },
  {
    href: "/products",
    label: "Products",
    children: [
      { href: "/products", label: "All Products" },
      { href: "/products/pos", label: "QuadPoint POS" },
      { href: "/products/gym", label: "QuadPoint Gym" },
      { href: "/products/barbers", label: "QuadPoint Barbers" },
      { href: "/products/clinic", label: "QuadPoint Clinic" },
    ],
  },
  { href: "/ai-automation", label: "AI & Automation" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasMeasuredScroll, setHasMeasuredScroll] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const lastScrollYRef = useRef(0);
  const isVisibleRef = useRef(true);

  // Track scroll direction and switch between the existing navbar styles.
  useLayoutEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const nextState = getNavbarScrollState({
        currentY,
        previousY: lastScrollYRef.current,
        wasVisible: isVisibleRef.current,
        mobileOpen,
      });

      setIsScrolled(nextState.isScrolled);
      setHasMeasuredScroll(true);
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
          "fixed top-0 left-0 right-0 z-50 duration-[380ms] ease-[cubic-bezier(0.77,0,0.175,1)] motion-reduce:transition-[background-color,box-shadow,backdrop-filter] motion-reduce:duration-150",
          getNavbarTransitionClassName(),
          getNavbarVisibilityClassName(isVisible),
          getNavbarSurfaceClassName(
            isScrolled,
            pathname === "/",
            hasMeasuredScroll
          ),
          getNavbarShadowClassName()
        )}
        role="banner"
      >
        <div
          className={cn(
            "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12",
            getNavbarCanvasClassName()
          )}
        >
          <div className="flex items-center justify-between h-18 lg:h-20">
            {/* Logo */}
            <Logo
              variant="white"
              className="ml-1 flex-shrink-0"
            />

            {/* Desktop Nav */}
            <nav
              className="hidden lg:flex items-center gap-1"
              aria-label="Main navigation"
            >
              {navLinks.map((link) =>
                link.children ? (
                  <DropdownMenu.Root key={link.href} modal={false}>
                    <DropdownMenu.Trigger
                      className={cn(
                        "group inline-flex items-center gap-1 px-3.5 py-2 text-sm font-medium transition-colors duration-150 outline-none",
                        getNavbarDesktopLinkClassName(isActive(link.href))
                      )}
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className="transition-transform duration-150 group-data-[state=open]:rotate-180"
                        aria-hidden="true"
                      />
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Portal>
                      <DropdownMenu.Content
                        align="start"
                        sideOffset={8}
                        className="z-[60] min-w-48 rounded-xl border border-white/15 bg-[#0b2443] p-1.5 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.6)]"
                      >
                        {link.children.map((child) => (
                          <DropdownMenu.Item key={child.href} asChild>
                            <Link
                              href={child.href}
                              className={cn(
                                "flex rounded-lg px-3 py-2 text-sm font-medium outline-none transition-colors",
                                pathname === child.href
                                  ? "bg-[#1a4fba]/35 text-white"
                                  : "text-white/75 data-[highlighted]:bg-white/10 data-[highlighted]:text-white"
                              )}
                            >
                              {child.label}
                            </Link>
                          </DropdownMenu.Item>
                        ))}
                      </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Root>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-3.5 py-2 text-sm font-medium transition-colors duration-150",
                      getNavbarDesktopLinkClassName(isActive(link.href))
                    )}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/contact"
                className={cn(
                  "px-5 py-2 text-sm font-semibold rounded-lg transition-[background-color,box-shadow] duration-150",
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
                "text-white hover:bg-white/10"
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
              className="site-mobile-menu fixed top-0 right-0 bottom-0 z-50 w-72 bg-[#080f1e] shadow-2xl lg:hidden flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 h-18 border-b border-white/10">
                <Logo variant="white" />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-md text-white/60 hover:text-white hover:bg-white/10 transition-colors"
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
                          ? "bg-[#1a4fba]/35 text-white"
                          : "text-white/70 hover:text-white hover:bg-white/10"
                      )}
                    >
                      {link.label}
                    </Link>
                    {link.children && (
                      <div className="mt-1 space-y-1 pl-3">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "flex items-center px-3 py-2 rounded-lg text-sm transition-colors",
                              pathname === child.href
                                ? "text-white"
                                : "text-white/55 hover:text-white hover:bg-white/10"
                            )}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </nav>

              {/* Drawer footer CTA */}
              <div className="p-5 border-t border-white/10">
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
