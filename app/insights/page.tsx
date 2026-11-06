import type { Metadata } from "next";
import { insights } from "@/lib/data";
import { heroImages } from "@/lib/images";
import { PageHero } from "@/components/PageHero";
import { InsightsGrid } from "@/components/InsightsGrid";

export const metadata: Metadata = {
  title: "Insights",
  description: "Market intelligence, salary guides, hiring strategy and career advice for the renewable energy sector.",
};

export default function Insights() {
  return (
    <>
      <PageHero
        compact
        eyebrow="Insights"
        image={heroImages.insights}
        title={["Intelligence for the", <span key="w" className="accent text-lime-400">clean energy workforce.</span>]}
        crumbs={[{ label: "Insights" }]}
      />
      <section className="py-20 sm:py-28">
        <div className="container-x"><InsightsGrid items={insights} /></div>
      </section>
    </>
  );
}
