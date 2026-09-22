import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

/**
 * Hero visual: Abstract geometric dashboard mockup with Q-inspired geometry.
 * Communicates: Business + Software + AI + Automation
 */
function HeroVisual() {
  return (
    <div className="hero-enter hero-enter-delay-2 relative w-full max-w-[580px] xl:max-w-[760px] mx-auto lg:mx-0">
      {/* Main card */}
      <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-[0_24px_60px_-12px_rgba(0,0,0,0.4)]">
        {/* Mock dashboard header */}
        <div className="relative flex items-center gap-2 px-5 py-3.5 border-b border-white/10 bg-white/5">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
          </div>
          <div className="flex-1 flex justify-center">
            <span className="text-[11px] text-white/50 font-medium">
              QuadPoint POS - Dashboard
            </span>
          </div>
          <span className="absolute right-4 inline-flex items-center rounded-md bg-[#2469be] px-2 py-1 text-[9px] font-semibold text-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.8)]">
            Live &amp; Running
          </span>
        </div>

        {/* Dashboard content */}
        <div className="p-5 space-y-4">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Today's Sales", value: "$4,820", change: "+12%" },
              { label: "Transactions", value: "148", change: "+8%" },
              { label: "Active Stock", value: "2,341", change: "-2%" },
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
                Revenue, Last 7 Days
              </span>
              <span className="text-[10px] text-[#2d63d4] bg-[#1a4fba]/20 px-2 py-0.5 rounded-full">
                Weekly
              </span>
            </div>
            {/* Minimal bar chart */}
            <div className="flex items-end gap-1.5 h-14">
              {[45, 62, 38, 80, 55, 91, 72].map((pct, i) => (
                <div
                  key={i}
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
                AI receptionist preview
              </p>
              <p className="text-[10px] text-white/45">Example workflow state</p>
            </div>
          </div>
        </div>
      </div>

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
      className="home-hero relative min-h-dvh flex items-center overflow-hidden bg-[#0f1e3d]"
      aria-label="Hero"
    >
      {/* Background geometric pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          data-hero-grid
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <Image
          src="/brand/quadpoint-white.png"
          alt=""
          width={650}
          height={650}
          loading="eager"
          fetchPriority="high"
          sizes="(min-width: 1280px) 780px, 650px"
          className="absolute right-[-32px] top-[53%] h-auto w-[650px] xl:w-[780px] max-w-none -translate-y-1/2 rotate-[-20deg] opacity-[0.06]"
        />

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
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-24 pb-16 lg:pt-32 lg:pb-24 xl:pt-32 xl:pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center">
          {/* Left — text */}
          <div>
            <div className="hero-enter">
              <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/80 border border-white/15 mb-6">
                Build. Automate. Grow.
              </span>
            </div>

            <h1 className="hero-enter hero-enter-delay-1 text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-bold text-white leading-[1.1] tracking-tight mb-6">
              Technology That{" "}
              <span className="text-[#2d63d4]">Moves Your Business</span>{" "}
              Forward.
            </h1>

            <p className="hero-enter hero-enter-delay-2 text-lg text-white/65 leading-relaxed mb-10 max-w-[520px] xl:max-w-[640px]">
              QuadPoint delivers intelligent software, AI agents, and
              automation solutions built to help businesses operate smarter and
              grow faster.
            </p>

            <div className="hero-enter hero-enter-delay-3 flex flex-col sm:flex-row gap-4">
              <Button href="/solutions" variant="primary" size="lg">
                Explore Our Solutions
                <ArrowRight size={16} className="ml-2" />
              </Button>
              <Button href="/contact" variant="inverse" size="lg">
                Talk to Us
                <ChevronRight size={16} className="ml-1" />
              </Button>
            </div>

            {/* Trust bar */}
            <div className="hero-enter hero-enter-delay-4 flex items-center gap-6 mt-8">
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
            </div>
          </div>

          {/* Right — visual */}
          <div className="flex justify-center lg:justify-end">
            <HeroVisual />
          </div>
        </div>
      </div>

    </section>
  );
}
