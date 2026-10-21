import Image from "next/image";

interface ProductMonitorProps {
  src: string;
  alt: string;
  /** Intrinsic size of the screenshot (16:10 captures at 2400x1500) */
  width?: number;
  height?: number;
}

/** Display in perspective (no stand), framing a real product screenshot */
export function ProductMonitor({ src, alt, width = 2400, height = 1500 }: ProductMonitorProps) {
  return (
    <div className="relative mx-auto w-full max-w-[880px] [perspective:1800px]">
      <div className="origin-right [transform:rotateY(-18deg)_rotateX(3deg)] [transform-style:preserve-3d]">
        {/* Display: aluminium edge, black glass bezel, screen */}
        <div className="relative rounded-[18px] bg-gradient-to-b from-[#3a4352] via-[#1c222c] to-[#11151b] p-[3px] shadow-[0_60px_90px_-40px_rgba(0,0,0,0.95),0_30px_60px_-30px_rgba(20,120,235,0.35)]">
          <div className="rounded-[15px] bg-[#05070a] p-[1.6%] pb-[2.4%] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
            <div className="relative overflow-hidden rounded-[4px] bg-black">
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                preload
                sizes="(min-width: 1280px) 760px, (min-width: 1024px) 60vw, calc(100vw - 32px)"
                className="block h-auto w-full"
              />
              {/* Glass glare */}
              <div
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.05)_28%,transparent_42%)]"
                aria-hidden="true"
              />
            </div>
            {/* Camera dot and power LED on the chin */}
            <div className="relative mt-[1.2%] flex justify-center" aria-hidden="true">
              <span className="h-1 w-1 rounded-full bg-[#1d2430]" />
              <span className="absolute right-[3%] top-1/2 h-[3px] w-[3px] -translate-y-1/2 rounded-full bg-[#3b9bff] shadow-[0_0_6px_#3b9bff]" />
            </div>
          </div>
        </div>
      </div>
      {/* Screen glow */}
      <div
        className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(circle,rgba(20,120,235,0.3),transparent_65%)] blur-2xl"
        aria-hidden="true"
      />
    </div>
  );
}
