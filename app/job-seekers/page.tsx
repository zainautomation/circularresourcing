import type { Metadata } from "next";
import Link from "next/link";
import { faqs, insights } from "@/lib/data";
import { heroImages } from "@/lib/images";
import { formatDate } from "@/lib/utils";
import { PageHero } from "@/components/PageHero";
import { H2, Label } from "@/components/ui";
import { MaskLines } from "@/components/Reveal";
import { CvForm } from "@/components/forms/CvForm";
import { Faq } from "@/components/Faq";
import { RoleMatcher } from "@/components/RoleMatcher";

export const metadata: Metadata = {
  title: "Job Seekers: Upload Your CV",
  description: "Register your CV with specialist renewable energy recruiters and get matched with roles in Solar, BESS and Wind.",
};

const perks = [
  ["Hidden roles", "Access opportunities that are never advertised publicly."],
  ["Honest advice", "Candid feedback on your CV, the market and your options."],
  ["Salary insight", "Benchmark your package and negotiate with confidence."],
  ["Total discretion", "Your details are never shared without your explicit consent."],
];

export default function JobSeekers() {
  return (
    <>
      <PageHero
        eyebrow="Job seekers"
        image={heroImages.jobSeekers}
        title={["Shape the future", <span key="k9">of energy, and <span key="k10" className="accent text-lime-400">your career.</span></span>]}
        text="Register your CV in under three minutes. A specialist consultant will match you with roles across Solar, BESS and Wind that fit your skills and ambitions."
        crumbs={[{ label: "Job seekers" }]}
      />

      <section className="py-20 sm:py-24">
        <div className="container-x grid gap-20 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <Label n="01">Why register</Label>
            <ul className="mt-10 border-t border-line">
              {perks.map(([t, d], i) => (
                <li key={t} className="grid grid-cols-[40px_1fr] border-b border-line py-6">
                  <span className="text-sm text-ink/40">0{i + 1}</span>
                  <span>
                    <span className="block text-xl font-medium tracking-tight text-navy-950">{t}</span>
                    <span className="mt-1 block text-ink/60">{d}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-10 text-ink/60">Free, confidential and no obligation.</p>
          </div>
          <div>
            <Label n="02">Upload your CV</Label>
            <div className="mt-10"><CvForm /></div>
          </div>
        </div>
      </section>

      <section className="bg-paper py-20 sm:py-24">
        <div className="container-x">
          <Label n="03">Quick match</Label>
          <H2 className="mb-12 mt-10"><MaskLines lines={["Find your fit", <span key="k11">in <span key="k12" className="accent">three clicks.</span></span>]} /></H2>
          <RoleMatcher />
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container-x">
          <Label n="04">Career advice</Label>
          <ul className="mt-10 border-t border-line">
            {insights.filter((a) => a.category === "Career Advice" || a.category === "Salary Guide").map((a) => (
              <li key={a.slug} className="border-b border-line">
                <Link href={`/insights/${a.slug}`} className="group grid gap-2 py-8 md:grid-cols-[200px_1fr_auto] md:items-baseline">
                  <span className="text-[13px] text-ink/45">{a.category} · {formatDate(a.date)}</span>
                  <span className="text-2xl font-medium tracking-tight text-navy-950 transition-transform duration-700 group-hover:translate-x-2 sm:text-3xl">{a.title}</span>
                  <span className="text-ink/45">{a.readTime}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="faq" className="scroll-mt-20 bg-paper py-20 sm:py-24">
        <div className="container-x grid gap-16 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <Label n="05">FAQs</Label>
            <H2 className="mt-10 text-4xl sm:text-5xl lg:text-6xl"><MaskLines lines={["Questions from", <span key="c" className="accent">candidates.</span>]} /></H2>
          </div>
          <Faq items={faqs.candidates} />
        </div>
      </section>
    </>
  );
}
