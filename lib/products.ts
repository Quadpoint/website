/**
 * The QuadPoint product lineup. Drives the /products grid and the
 * "other products" section on each product page.
 */
export interface Product {
  slug: string;
  title: string;
  category: string;
  description: string;
  /** Product page; absent while the product is still in development */
  href?: string;
  /** Real screenshot of the product, 16:10 */
  image?: string;
  /** Abstract preview used until a product has a screenshot */
  preview?: "crm" | "ai" | "custom";
  comingSoon?: boolean;
  /** Live as a preview while the full product is built */
  earlyAccess?: boolean;
}

export const products: Product[] = [
  {
    slug: "pos",
    title: "QuadPoint POS",
    category: "Point of Sale",
    description: "Point of sale, inventory, and reports for cafés, restaurants, and retail.",
    href: "/products/pos",
    image: "/products/quadpoint-pos.png",
  },
  {
    slug: "gym",
    title: "QuadPoint Gym",
    category: "Gym Management",
    description: "Gym website, online sign-up, and membership renewals.",
    href: "/products/gym",
    image: "/products/gym-screen.png",
  },
  {
    slug: "barbers",
    title: "QuadPoint Barbers",
    category: "Barbershop Booking",
    description: "Online booking, a bookings calendar, and loyalty for barbershops.",
    href: "/products/barbers",
    image: "/products/barber-screen.png",
  },
  {
    slug: "clinic",
    title: "QuadPoint Clinic",
    category: "Clinic Queue & Appointments",
    description: "A digital waiting list and appointment manager for doctors and clinics.",
    href: "/products/clinic",
    image: "/products/clinic-screen.png",
    earlyAccess: true,
  },
  {
    slug: "crm",
    title: "QuadPoint CRM",
    category: "Business Software",
    description: "Manage customer relationships and track interactions.",
    preview: "crm",
    comingSoon: true,
  },
  {
    slug: "ai-agent-suite",
    title: "AI Agent Suite",
    category: "AI & Automation",
    description: "Automate tasks and streamline your business operations.",
    preview: "ai",
    comingSoon: true,
  },
];

export function getOtherProducts(slug: string) {
  return products.filter((product) => product.slug !== slug);
}
