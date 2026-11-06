import type { Metadata } from "next";
import Image from "next/image";
import { faqs, services } from "@/lib/data";
import { heroImages } from "@/lib/images";
import { PageHero } from "@/components/PageHero";
import { Button, H2, Label } from "@/components/ui";
import { MaskLines, Reveal } from "@/components/Reveal";
import { HiringCalculator } from "@/components/HiringCalculator";
import { Faq } from "@/components/Faq";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Our Services",
  description: "Contingent recruitment, executive search and Circular Embedded: specialist hiring solutions for renewable energy businesses.",
};

const images: Record<string, string> = { contingent: "/media/meeting.jpg", executive: "/media/interview.jpg", embedded: "/media/blueprint.jpg" };

const engagement = [
  { name: "Retained", text: "A dedicated, fully committed search with staged fees. Best for business-critical, confidential or C-suite roles." },
  { name: "Engaged", text: "A smaller upfront commitment fee that secures priority resourcing, with the balance paid on placement." },
  { name: "Exclusive", text: "Sole agency for an agreed period, giving you focused effort and a consistent market message with no retainer." },
];

const compare = [
  { feature: "Pay only on success", c: "Yes", e: "Partly", m: "No" },
  { feature: "Dedicated consultant", c: "No", e: "Yes", m: "Yes" },
  { feature: "Market mapping", c: "No", e: "Yes", m: "Yes" },
  { feature: "Multiple hires covered", c: "No", e: "No", m: "Yes" },
  { feature: "Predictable monthly cost", c: "No", e: "No", m: "Yes" },
  { feature: "Best for", c: "1–2 specialist hires", e: "Senior & C-suite", m: "Scaling teams & new markets" },
];

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        image={heroImages.services}
        title={["Hiring built around", <span key="g" className="accent text-lime-400">how you grow.</span>]}
        text="Three permanent hiring services for Renewables & Clean Energy businesses. Choose the one that fits today, and switch as your needs change."
        crumbs={[{ label: "Services" }]}
      >
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-[15px]">
          {services.map((s) => <a key={s.id} href={`#${s.id}`} className="link-u text-white/80 hover:text-white">{s.name}</a>)}
          <a href="#calculator" className="link-u text-lime-400">Cost calculator</a>
        </div>
      </PageHero>

      {services.map((s, i) => (
        <section key={s.id} id={s.id} className={cn("scroll-mt-16 py-20 sm:py-24", i % 2 === 1 && "bg-paper")}>
          <div className="container-x">
            <Label n={`0${i + 1}`}>{s.label}</Label>
            <div className="mt-10 grid gap-16 lg:grid-cols-2">
              <div className={cn(i % 2 === 1 && "lg:order-2")}>
                <H2><MaskLines lines={[s.name]} /></H2>
                <p className="mt-8 text-2xl leading-snug tracking-tight text-navy-950">{s.lead}</p>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/60">{s.body}</p>

                <dl className="mt-12 border-t border-line">
                  <div className="flex justify-between gap-6 border-b border-line py-5">
                    <dt className="text-ink/50">Commercial model</dt>
                    <dd className="text-right font-medium text-navy-950">{s.model}</dd>
                  </div>
                  <div className="border-b border-line py-5">
                    <dt className="text-ink/50">What&apos;s included</dt>
                    <dd className="mt-3 text-lg text-navy-950">{s.points.join(" / ")}</dd>
                  </div>
                  <div className="border-b border-line py-5">
                    <dt className="text-ink/50">{s.id === "embedded" ? "Who can benefit" : "Ideal for"}</dt>
                    <dd className="mt-3 space-y-1 text-lg text-navy-950">{s.bestFor.map((b) => <p key={b}>{b}</p>)}</dd>
                  </div>
                </dl>
                <div className="mt-10"><Button href="/employers">Discuss {s.name}</Button></div>
              </div>
              <Reveal className={cn("lg:sticky lg:top-24 lg:self-start", i % 2 === 1 && "lg:order-1")}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[4px]">
                  <Image src={images[s.id]} alt="" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
                </div>
              </Reveal>
            </div>

            {s.id === "executive" && (
              <div className="mt-12 grid border-t border-line md:grid-cols-3">
                {engagement.map((e, k) => (
                  <div key={e.name} className={cn("border-b border-line py-8 pr-8 md:border-b-0", k > 0 && "md:border-l md:pl-8")}>
                    <h3 className="text-2xl font-medium tracking-tight text-navy-950"><span className="accent">{e.name}</span></h3>
                    <p className="mt-3 leading-relaxed text-ink/60">{e.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}

      <section className="py-20 sm:py-24">
        <div className="container-x">
          <Label n="04">Side by side</Label>
          <H2 className="mb-12 mt-10"><MaskLines lines={["Which model is", <span key="r" className="accent">right for you?</span>]} /></H2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left">
              <thead>
                <tr className="border-b border-navy-950 text-[13px] uppercase tracking-[0.12em] text-ink/50">
                  <th className="py-4 font-normal">Feature</th>
                  {services.map((s) => <th key={s.id} className="py-4 font-normal">{s.name}</th>)}
                </tr>
              </thead>
              <tbody>
                {compare.map((r) => (
                  <tr key={r.feature} className="border-b border-line">
                    <td className="py-5 text-ink/60">{r.feature}</td>
                    {[r.c, r.e, r.m].map((v, k) => (
                      <td key={k} className={cn("py-5 text-lg", v === "Yes" ? "text-navy-950" : v === "No" ? "text-ink/30" : "text-navy-950")}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="calculator" className="scroll-mt-16 bg-paper py-20 sm:py-24">
        <div className="container-x">
          <Label n="05">Cost calculator</Label>
          <div className="mb-12 mt-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <H2><MaskLines lines={["Contingent or", <span key="e" className="accent">Embedded?</span>]} /></H2>
            <p className="max-w-sm text-ink/60">Model your next 12 months of hiring and see which approach gives you better value.</p>
          </div>
          <HiringCalculator />
        </div>
      </section>


      <section className="py-20 sm:py-24">
        <div className="container-x grid gap-16 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <Label n="06">FAQs</Label>
            <H2 className="mt-10 text-4xl sm:text-5xl lg:text-6xl"><MaskLines lines={["Questions from", <span key="e" className="accent">employers.</span>]} /></H2>
          </div>
          <Faq items={faqs.employers} />
        </div>
      </section>

    </>
  );
}
