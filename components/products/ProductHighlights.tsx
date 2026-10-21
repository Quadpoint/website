import type { LucideIcon } from "lucide-react";

export interface ProductHighlight {
  icon: LucideIcon;
  title: string;
  /** Two lines, broken exactly as designed */
  description: [string, string];
}

/** Row of small icon + copy highlights under a product hero */
export function ProductHighlights({ items }: { items: ProductHighlight[] }) {
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-5">
      {items.map(({ icon: Icon, title, description }) => (
        <li key={title} className="flex flex-shrink-0 items-start gap-3">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-[#6db7ff]/35">
            <Icon size={18} className="text-[#8ed0ff]" />
          </span>
          <span>
            <span className="block whitespace-nowrap text-sm font-semibold text-white">
              {title}
            </span>
            <span className="block text-xs leading-relaxed text-white/55">
              {description[0]}
              <br />
              {description[1]}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}
