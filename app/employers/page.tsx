import type { Metadata } from "next";
import { company, faqs } from "@/lib/data";
import { heroImages } from "@/lib/images";
import { PageHero } from "@/components/PageHero";
import { H2, Label } from "@/components/ui";
import { MaskLines } from "@/components/Reveal";
import { VacancyForm } from "@/components/forms/VacancyForm";
import { Faq } from "@/components/Faq";

export const metadata: Metadata = {
  title: "Employers: Register a Vacancy",
  description: "Register a vacancy with specialist renewable energy recruiters. Contingent, executive search and embedded hiring solutions.",
};

const why = [
  ["Specialist network", "Over a decade of relationships across Solar, BESS and Wind."],
  ["Fast shortlists", "Qualified candidates, typically within 7–10 working days."],
  ["Market intelligence", "Salary benchmarks and talent maps to guide your decisions."],
  ["True partnership", "Simple, honest and transparent from first call to start date."],
];

export default function Employers() {
  return (
    <>
      <PageHero
        eyebrow="Employers"
        image={heroImages.employers}
        title={["Hire the people", <span key="b" className="accent text-lime-400">building the transition.</span>]}
        text="Tell us about your vacancy and a specialist consultant will be in touch within one working day to agree a plan."
        crumbs={[{ label: "Employers" }]}
      />

      <section className="py-20 sm:py-24">
        <div className="container-x grid gap-20 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <Label n="01">Why Circular</Label>
            <ul className="mt-10 border-t border-line">
              {why.map(([t, d], i) => (
                <li key={t} className="grid grid-cols-[40px_1fr] border-b border-line py-6">
                  <span className="text-sm text-ink/40">0{i + 1}</span>
                  <span>
                    <span className="block text-xl font-medium tracking-tight text-navy-950">{t}</span>
                    <span className="mt-1 block text-ink/60">{d}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-10 text-ink/60">Prefer to talk? <a href={company.phoneHref} className="text-navy-950 underline underline-offset-4">{company.phone}</a></p>
          </div>
          <div>
            <Label n="02">Register a vacancy</Label>
            <div className="mt-10"><VacancyForm /></div>
          </div>
        </div>
      </section>



      <section className="py-20 sm:py-24">
        <div className="container-x grid gap-16 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <Label n="03">FAQs</Label>
            <H2 className="mt-10 text-4xl sm:text-5xl lg:text-6xl"><MaskLines lines={["Employer questions,", <span key="a" className="accent">answered.</span>]} /></H2>
          </div>
          <Faq items={faqs.employers} />
        </div>
      </section>
    </>
  );
}
