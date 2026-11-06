import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { company, jobs } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { sectorJobImages } from "@/lib/images";
import { PageHero } from "@/components/PageHero";
import { ApplyForm } from "@/components/forms/ApplyForm";
import { JobCard } from "@/components/JobCard";
import { ShareButton } from "@/components/ShareButton";
import { Label } from "@/components/ui";

type Props = { params: Promise<{ slug: string }> };


export function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = jobs.find((j) => j.slug === slug);
  return job ? { title: `${job.title}, ${job.location}`, description: job.summary } : {};
}

export default async function JobPage({ params }: Props) {
  const { slug } = await params;
  const job = jobs.find((j) => j.slug === slug);
  if (!job) notFound();
  const related = jobs.filter((j) => j.slug !== job.slug && (j.sector === job.sector || j.discipline === job.discipline)).slice(0, 4);

  const facts = [
    ["Location", `${job.location}, ${job.country}`],
    ["Salary", job.salary],
    ["Contract", `${job.type} · ${job.workplace}`],
    ["Discipline", job.discipline],
    ["Sector", job.sector],
    ["Posted", formatDate(job.posted)],
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.summary,
    datePosted: job.posted,
    employmentType: job.type === "Permanent" ? "FULL_TIME" : "CONTRACTOR",
    hiringOrganization: { "@type": "Organization", name: company.name, sameAs: "https://circularresourcing.com" },
    jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: job.location, addressCountry: job.country } },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero compact eyebrow={`${job.sector} · ${job.discipline}`} image={sectorJobImages[job.sector] ?? "/media/city-aerial.jpg"} title={[job.title]} text={job.summary} crumbs={[{ label: "Jobs", href: "/jobs" }, { label: job.title }]}>
        <ShareButton title={job.title} />
      </PageHero>

      <section className="py-20 sm:py-28">
        <div className="container-x grid gap-20 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <dl className="grid grid-cols-2 border-t border-line sm:grid-cols-3">
              {facts.map(([k, v]) => (
                <div key={k} className="border-b border-line py-5 pr-4">
                  <dt className="text-[13px] uppercase tracking-[0.12em] text-ink/45">{k}</dt>
                  <dd className="mt-2 text-lg text-navy-950">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-16 space-y-16">
              <div>
                <Label n="01">The opportunity</Label>
                <p className="mt-8 text-2xl leading-snug tracking-tight text-navy-950">
                  {job.summary} A chance to join a business at the forefront of the energy transition, with real scope to shape strategy and grow your career.
                </p>
              </div>
              {[
                { t: "Responsibilities", items: job.responsibilities },
                { t: "What you'll bring", items: job.requirements },
                { t: "What's on offer", items: ["Competitive base salary and performance bonus", "Pension and private healthcare", "Flexible working and generous holiday", "Clear progression in a high-growth business"] },
              ].map((b, i) => (
                <div key={b.t}>
                  <Label n={`0${i + 2}`}>{b.t}</Label>
                  <ul className="mt-8 border-t border-line">
                    {b.items.map((it) => <li key={it} className="border-b border-line py-4 text-lg text-navy-950">{it}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <aside>
            <div className="lg:sticky lg:top-24">
              <p className="text-[13px] uppercase tracking-[0.14em] text-ink/45">Apply</p>
              <h2 className="mt-4 text-4xl font-medium tracking-[-0.03em] text-navy-950">Interested? <span className="accent">Let&apos;s talk.</span></h2>
              <p className="mb-10 mt-3 text-ink/60">Takes under two minutes. We reply to every application.</p>
              <ApplyForm job={job.title} />
              <p className="mt-10 border-t border-line pt-6 text-ink/60">
                Questions? Call <a href={company.phoneHref} className="text-navy-950 underline underline-offset-4">{company.phone}</a>
              </p>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-paper py-20 sm:py-28">
          <div className="container-x">
            <Label n="—">Similar roles</Label>
            <ul className="mt-10 border-t border-line">
              {related.map((j) => <JobCard key={j.slug} job={j} />)}
            </ul>
            <Link href="/jobs" className="link-u mt-10 inline-block font-medium text-navy-950">All roles</Link>
          </div>
        </section>
      )}
    </>
  );
}
