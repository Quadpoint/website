/**
 * Case Studies Data
 *
 * CUSTOMIZE THIS FILE with your actual client case studies.
 * Add your images to the `public/Quadpoint/` folder.
 *
 * Images can be: PNG, JPG, WebP
 * Image paths are relative to /public
 */

export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  description: string;
  thumbnail: string;
  images: string[];
  results: Array<{ label: string; value: string }>;
  clientName?: string;
  year?: string;
  challenge?: string;
  solution?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "quadpoint-pos",
    title: "QuadPoint POS - Point of Sale System",
    category: "Business Software",
    description: "Complete point-of-sale and inventory management system for retail and hospitality businesses",
    thumbnail: "/case-studies/POS/IMG_2461.JPG",
    clientName: "Multi-Location Retail & Hospitality",
    year: "2024",
    challenge:
      "Businesses struggling with fragmented systems, slow checkout processes, and inaccurate inventory tracking across multiple locations.",
    solution:
      "Developed a unified POS system with real-time inventory sync, integrated payment processing, and comprehensive analytics dashboard.",
    images: [
      "/case-studies/POS/IMG_2461.JPG",
      "/case-studies/POS/IMG_2462.JPG",
      "/case-studies/POS/IMG_2463.JPG",
      "/case-studies/POS/IMG_2464.JPG",
      "/case-studies/POS/IMG_2465.JPG",
      "/case-studies/POS/IMG_2467.JPG",
      "/case-studies/POS/IMG_2468.JPG",
      "/case-studies/POS/IMG_2471.JPG",
      "/case-studies/POS/IMG_2472.JPG",
      "/case-studies/POS/IMG_2474.JPG",
      "/case-studies/POS/IMG_2476.JPG",
      "/case-studies/POS/IMG_2477.JPG",
      "/case-studies/POS/IMG_2478.JPG",
    ],
    results: [
      { label: "Checkout Speed", value: "+40%" },
      { label: "Inventory Accuracy", value: "99%+" },
      { label: "Staff Efficiency", value: "+35%" },
    ],
  },
  {
    id: "barbershop-booking",
    title: "Barbershop Booking System - Reservation & Management",
    category: "Business Software",
    description: "Modern online booking and appointment management system for barbershops and salons",
    thumbnail: "/case-studies/Barbershop/B0.png",
    clientName: "Multi-Location Barbershop Chain",
    year: "2024",
    challenge:
      "Manual booking process, no customer self-service options, difficulty managing staff schedules, and poor customer communication.",
    solution:
      "Built a complete booking platform with online reservations, automated confirmations, staff scheduling, and customer management.",
    images: [
      "/case-studies/Barbershop/B0.png",
      "/case-studies/Barbershop/B1.png",
      "/case-studies/Barbershop/B2.png",
      "/case-studies/Barbershop/B3.png",
      "/case-studies/Barbershop/B4.png",
      "/case-studies/Barbershop/B5.png",
      "/case-studies/Barbershop/B6.png",
      "/case-studies/Barbershop/B7.png",
      "/case-studies/Barbershop/B8.png",
      "/case-studies/Barbershop/B9.png",
      "/case-studies/Barbershop/B10.png",
      "/case-studies/Barbershop/B11.png",
      "/case-studies/Barbershop/b12.png",
      "/case-studies/Barbershop/Bbooking.png",
      "/case-studies/Barbershop/b-reservation.png",
      "/case-studies/Barbershop/b-reservation2.png",
      "/case-studies/Barbershop/b-confirmation.png",
    ],
    results: [
      { label: "Booking Rate", value: "+85%" },
      { label: "No-Shows", value: "-60%" },
      { label: "Customer Satisfaction", value: "+4.8⭐" },
    ],
  },
];
