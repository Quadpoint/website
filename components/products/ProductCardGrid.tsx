import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Sparkles } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/products";

/** Small abstract screen previews for products without a screenshot */
function ProductPreview({ variant }: { variant: NonNullable<Product["preview"]> }) {
  const light = variant === "custom";
  return (
    <div
      className={cn(
        "flex h-full gap-1.5 p-2",
        light ? "bg-[#eef3f8]" : "bg-[#07172f]"
      )}
      aria-hidden="true"
    >
      <div className={cn("w-[12%] space-y-1 rounded p-1", light ? "bg-[#d9e3ef]" : "bg-white/5")}>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={cn("block h-1 rounded-full", light ? "bg-[#9fb3cc]" : "bg-white/25")} />
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-1.5">
        <div className="grid h-[38%] grid-cols-3 gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={cn(
                "block rounded",
                light ? "bg-white" : i === 1 && variant === "ai" ? "bg-[#1478eb]/60" : "bg-white/8"
              )}
            />
          ))}
        </div>
        <span className={cn("block flex-1 rounded", light ? "bg-white" : "bg-white/5")} />
      </div>
    </div>
  );
}

interface ProductCardGridProps {
  items: Product[];
  /** Larger two-column cards for the products index */
  variant?: "compact" | "large";
}

/** Product cards; live products link to their page, the rest show as coming soon */
export function ProductCardGrid({ items, variant = "compact" }: ProductCardGridProps) {
  const large = variant === "large";

  return (
    <StaggerContainer className={cn("grid gap-5", large ? "md:grid-cols-2 lg:gap-6" : "md:grid-cols-3")}>
      {items.map((product) => {
        const body = (
          <>
            {product.comingSoon && (
              <span className="absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-full border border-[#6db7ff]/30 bg-[#07172f] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#b8cce3]">
                <Clock size={10} />
                Coming Soon
              </span>
            )}
            {product.earlyAccess && (
              <span className="absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-full border border-[#f59d13]/50 bg-[#07172f] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#fbb52b]">
                <Sparkles size={10} />
                Early Access
              </span>
            )}
            <div
              className={cn(
                "overflow-hidden rounded-lg border border-white/10",
                large ? "mb-6 aspect-[16/9]" : "mb-5 aspect-[5/2]"
              )}
            >
              {product.image ? (
                <Image
                  src={product.image}
                  alt=""
                  width={2400}
                  height={1500}
                  sizes={large ? "(min-width: 768px) 600px, 100vw" : "(min-width: 768px) 280px, 100vw"}
                  className="block h-full w-full object-cover object-left-top transition-transform duration-300 group-hover:scale-[1.02]"
                />
              ) : (
                product.preview && <ProductPreview variant={product.preview} />
              )}
            </div>
            {large && (
              <span className="mb-2 block text-[11px] font-semibold uppercase tracking-widest text-[#8ed0ff]">
                {product.category}
              </span>
            )}
            <h3 className={cn("mb-2 font-bold text-white", large ? "text-xl" : "text-base")}>
              {product.title}
            </h3>
            <p className={cn("mb-5 leading-relaxed text-white/65", large ? "text-base" : "text-sm")}>
              {product.description}
            </p>
            {product.href && (
              <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-[#3b9bff] transition-colors group-hover:text-[#8ed0ff]">
                {large ? "View Product" : "Learn More"}
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            )}
          </>
        );

        const cardClass = cn(
          "relative flex h-full flex-col rounded-2xl border border-[#6db7ff]/20 bg-[#0b2e5b]/70",
          large ? "p-6" : "p-5"
        );

        return (
          <StaggerItem key={product.slug}>
            {product.href ? (
              <Link
                href={product.href}
                className={cn(
                  cardClass,
                  "group transition-colors hover:border-[#3b9bff]/60 hover:bg-[#0b2e5b]"
                )}
              >
                {body}
              </Link>
            ) : (
              <article className={cardClass}>{body}</article>
            )}
          </StaggerItem>
        );
      })}
    </StaggerContainer>
  );
}
