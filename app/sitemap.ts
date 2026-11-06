import type { MetadataRoute } from "next";
import { insights, jobs } from "@/lib/data";

const base = "https://circularresourcing.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/jobs", "/services", "/employers", "/job-seekers", "/about", "/insights", "/contact", "/privacy"];
  return [
    ...pages.map((p) => ({ url: `${base}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.8 })),
    ...jobs.map((j) => ({ url: `${base}/jobs/${j.slug}`, lastModified: j.posted, priority: 0.6 })),
    ...insights.map((a) => ({ url: `${base}/insights/${a.slug}`, lastModified: a.date, priority: 0.5 })),
  ];
}
