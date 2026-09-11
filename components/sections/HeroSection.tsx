"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

/**
 * Hero visual: Abstract geometric dashboard mockup with Q-inspired geometry.
 * Communicates: Business + Software + AI + Automation
 */
function HeroVisual() {
  return (
    <div className="relative w-full max-w-[580px] mx-auto lg:mx-0">
      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-[0_24px_60px_-12px_rgba(0,0,0,0.4)]"
      >
        {/* Mock dashboard header */}
        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/10 bg-white/5">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
          </div>
          <div className="flex-1 flex justify-center">
            <span className="text-[11px] text-white/50 font-medium">
              QuadPoint POS — Dashboard
            </span>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="p-5 space-y-4">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Today's Sales", value: "$4,820", change: "+12%" },
              { label: "Transactions", value: "148", change: "+8%" },
              { label: "Active Stock", value: "2,341", change: "+3%" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/8 rounded-xl p-3 border border-white/10"
              >
                <p className="text-[10px] text-white/50 mb-1">{stat.label}</p>
                <p className="text-base font-bold text-white">{stat.value}</p>
                <span className="text-[10px] text-emerald-400 font-medium">
                  {stat.change}
                </span>
              </div>
            ))}
          </div>

          {/* Chart placeholder */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] text-white/60 font-medium">
                Revenue — Last 7 Days
              </span>
              <span className="text-[10px] text-[#2d63d4] bg-[#1a4fba]/20 px-2 py-0.5 rounded-full">
                Weekly
              </span>
            </div>
            {/* Minimal bar chart */}
            <div className="flex items-end gap-1.5 h-14">
              {[45, 62, 38, 80, 55, 91, 72].map((pct, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.06 }}
                  className="flex-1 rounded-sm"
                  style={{
                    height: `${pct}%`,
                    transformOrigin: "bottom",
                    background: i === 5 ? "#1a4fba" : "rgba(255,255,255,0.18)",
                    borderRadius: "3px 3px 0 0",
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-1.5">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <span key={i} className="flex-1 text-center text-[9px] text-white/30">
                  {d}
                </span>
              ))}
            </div>
          </div>

          {/* AI agent row */}
          <div className="flex items-center gap-3 bg-[#1a4fba]/20 border border-[#1a4fba]/30 rounded-xl p-3">
            <div className="w-8 h-8 rounded-lg bg-[#1a4fba] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[11px] font-bold">AI</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] text-white/80 font-medium">
                AI Receptionist — Active
              </p>
              <p className="text-[10px] text-white/45">3 conversations in progress</p>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
          </div>
        </div>
      </motion.div>

      {/* Floating badge — bottom left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg px-4 py-3 border border-[#e5e7eb] hidden sm:block"
      >
        <p className="text-[10px] text-[#6b7280] font-medium">Automation</p>
        <p className="text-sm font-bold text-[#1c1c2e]">4 workflows running</p>
      </motion.div>

      {/* Floating badge — top right */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
        className="absolute -top-4 -right-4 bg-[#1a4fba] rounded-xl shadow-lg px-4 py-3 hidden sm:block"
      >
        <p className="text-[10px] text-white/70 font-medium">QuadPoint POS</p>
        <p className="text-sm font-bold text-white">Live &amp; Running</p>
      </motion.div>

      {/* Subtle glow */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(26,79,186,0.3) 0%, transparent 70%)",
          filter: "blur(20px)",
          transform: "translateY(-20px)",
          zIndex: -1,
        }}
        aria-hidden="true"
      />
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      className="relative min-h-dvh flex items-center overflow-hidden bg-[#0f1e3d]"
      aria-label="Hero"
    >
      {/* Background geometric pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Large Q geometry — brand logo silhouette */}
        <svg
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[580px] h-[580px] opacity-[0.06]"
          viewBox="0 0 100 100"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="50" cy="50" r="44.5" stroke="white" strokeWidth="7"
            strokeDasharray="209.70 69.90" strokeDashoffset="248.53"
            strokeLinecap="round" transform="rotate(-90 50 50)" fill="none"/>
          <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="8"
            strokeDasharray="133.52 54.98" strokeDashoffset="172.79"
            strokeLinecap="round" transform="rotate(-90 50 50)" fill="none"/>
          <circle cx="50" cy="50" r="16.5" stroke="white" strokeWidth="7"
            strokeDasharray="69.12 34.56" strokeDashoffset="97.91"
            strokeLinecap="round" transform="rotate(-90 50 50)" fill="none"/>
          <circle cx="50" cy="50" r="5.5" fill="white"/>
          <path d="M 46 52 L 56 52 L 92 88 L 82 92 Z" fill="white"/>
          <circle cx="50" cy="50" r="5.5" fill="white"/>
        </svg>
        {/* Blue glow */}
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #1a4fba 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/80 border border-white/15 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2d63d4] animate-pulse" />
                Build. Automate. Grow.
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.1] tracking-tight mb-6"
            >
              Technology That{" "}
              <span className="text-[#2d63d4]">Moves Your Business</span>{" "}
              Forward.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-white/65 leading-relaxed mb-10 max-w-[520px]"
            >
              Business software, AI agents, and automation solutions built to
              help businesses operate smarter and grow faster.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button href="/solutions" variant="primary" size="lg">
                Explore Our Solutions
                <ArrowRight size={16} className="ml-2" />
              </Button>
              <Button href="/contact" variant="white" size="lg">
                Talk to Us
                <ChevronRight size={16} className="ml-1" />
              </Button>
            </motion.div>

            {/* Trust bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex items-center gap-6 mt-12 pt-8 border-t border-white/10"
            >
              {[
                "Business Software",
                "AI Agents",
                "Automation",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1a4fba]" />
                  <span className="text-xs text-white/50 font-medium">{item}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — visual */}
          <div className="flex justify-center lg:justify-end">
            <HeroVisual />
          </div>
        </div>
      </div>

      {/* Bottom fade into white */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent 0%, #ffffff 100%)" }}
        aria-hidden="true"
      />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10"
        aria-hidden="true"
      >
        <span className="text-[10px] text-white/30 font-medium tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-px h-6 bg-gradient-to-b from-white/30 to-transparent"
        />
      </motion.div>
    </section>
  );
}
