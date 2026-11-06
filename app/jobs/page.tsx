import type { Metadata } from "next";
import { Suspense } from "react";
import { jobs } from "@/lib/data";
import { heroImages } from "@/lib/images";
import { PageHero } from "@/components/PageHero";
import { JobBoard } from "@/components/JobBoard";

export const metadata: Metadata = {
  title: "Renewable Energy Jobs",
  description: "Search jobs in Utility-Scale Solar, BESS and Wind across the UK, Europe and North America.",
};

export default function Jobs() {
  return (
    <>
      <PageHero
        compact
        eyebrow={`${jobs.length} live roles`}
        image={heroImages.jobs}
        title={["Your next role in", <span key="c" className="accent text-lime-400">clean energy.</span>]}
        crumbs={[{ label: "Jobs" }]}
      />
      <section className="py-20 sm:py-28">
        <div className="container-x">
          <Suspense fallback={<div className="h-96" />}>
            <JobBoard />
          </Suspense>
        </div>
      </section>
    </>
  );
}
