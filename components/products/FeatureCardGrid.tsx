import type { LucideIcon } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";

export interface FeatureGroup {
  icon: LucideIcon;
  title: string;
  /** Orange icon tile instead of blue */
  accent?: boolean;
  items: string[];
}

/** Grid of product feature cards, each an icon, a title and a bullet list */
export function FeatureCardGrid({ groups }: { groups: FeatureGroup[] }) {
  return (
    <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {groups.map(({ icon: Icon, title, accent, items }) => (
        <StaggerItem key={title}>
          <article className="h-full rounded-2xl border border-[#6db7ff]/20 bg-[#0b2e5b]/70 p-6">
            <div className="mb-5 flex items-center gap-4">
              <span
                className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${
                  accent ? "bg-[#f59d13]" : "bg-[#1478eb]"
                }`}
              >
                <Icon size={20} className="text-white" />
              </span>
              <h3 className="text-base font-bold text-white">{title}</h3>
            </div>
            <ul className="list-disc space-y-1.5 pl-5 text-sm text-white/75 marker:text-white/50">
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
