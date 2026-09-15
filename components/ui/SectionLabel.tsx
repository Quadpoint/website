import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  variant?: "blue" | "white" | "gray";
  className?: string;
}

export function SectionLabel({
  children,
  variant = "blue",
  className,
}: SectionLabelProps) {
  return (
    <span
      className={cn(
        "section-label inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase",
        variant === "blue" && "bg-[#2469be] text-white",
        variant === "white" && "bg-white/15 text-white",
        variant === "gray" && "bg-[#f3f4f6] text-[#6b7280]",
        className
      )}
    >
      {children}
    </span>
  );
}
