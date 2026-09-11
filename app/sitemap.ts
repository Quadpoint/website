import type { MetadataRoute } from "next";

const BASE_URL = "https://quadpointtechnology.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { url: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/solutions", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/products", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/ai-automation", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/about", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/contact", priority: 0.8, changeFrequency: "yearly" as const },
  ];

  return routes.map(({ url, priority, changeFrequency }) => ({
    url: `${BASE_URL}${url}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
