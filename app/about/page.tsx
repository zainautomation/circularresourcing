import type { Metadata } from "next";
import Image from "next/image";
import { clientTypes, company, values } from "@/lib/data";
import { heroImages } from "@/lib/images";
import { PageHero } from "@/components/PageHero";
import { Button, H2, Label } from "@/components/ui";
import { MaskLines, Parallax, Reveal, ScrollWords } from "@/components/Reveal";
import { Coverage } from "@/components/Coverage";

export const metadata: Metadata = {
  title: "About Us",
  description: "Circular Resourcing is a specialist recruitment partner for the energy transition, with 10+ years' experience across Solar, BESS and Wind.",
};

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        image={heroImages.about}
        title={["Powering the", <span key="a" className="accent text-lime-400">energy transition,</span>, "one hire at a time."]}
        text="We support businesses at the forefront of the energy transition, with particular experience in Utility-Scale Solar, BESS and Wind, and a referenceable track record across the UK, Europe and North America."
        crumbs={[{ label: "About" }]}
      />

      <section className="py-20 sm:py-28">
        <div className="container-x">
          <Label n="01">Our story</Label>
          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_2.4fr] lg:gap-16">
            <dl className="order-2 border-t border-line lg:order-1">
              {[
                ["Head office", "Manchester, UK"],
                ["Experience", "10+ years in global energy"],
                ["Technologies", "Solar, BESS, Wind, Grid"],
                ["Regions", "UK, Europe & North America"],
                ["Services", "Contingent, Executive Search, Embedded"],
              ].map(([k, v]) => (
                <div key={k} className="border-b border-line py-4">
                  <dt className="text-[13px] uppercase tracking-[0.12em] text-ink/45">{k}</dt>
                  <dd className="mt-1 text-lg text-navy-950">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="order-1 lg:order-2">
              <ScrollWords
                className="text-[1.9rem] font-medium leading-[1.18] tracking-[-0.025em] text-navy-950 sm:text-5xl"
                text="Circular Resourcing grew out of more than a decade recruiting across global energy. We saw how much the transition to clean power depends on people: the developers, engineers, financiers and site leaders who turn pipelines into operational assets."
              />
              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                <p className="text-lg leading-relaxed text-ink/60">
                  We specialise in Corporate, Commercial and Technical Engineering hiring for developers, independent power producers, investment and infrastructure funds, and EPC contractors.
                </p>
                <p className="text-lg leading-relaxed text-ink/60">
                  Our name reflects how we work: circular, long-term relationships where today&apos;s candidate becomes tomorrow&apos;s client, and every placement strengthens the network behind the next one.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative">
        <Parallax className="h-[80vh] min-h-[480px]" amount={12}>
          <Image src="/media/north-sea.jpg" alt="Offshore wind turbines in the North Sea" fill sizes="100vw" className="object-cover" />
        </Parallax>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-x">

          <div>
            <Label n="02">Values</Label>
            <H2 className="mt-10 max-w-4xl"><MaskLines lines={["Simple. Honest.", <span key="t" className="accent">Transparent.</span>]} /></H2>
            <div className="mt-12 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
              {values.map((v, i) => (
                <Reveal key={v.title} delay={i * 0.08} className={`border-b border-line py-10 pr-8 lg:border-b-0 ${i > 0 ? "lg:border-l lg:pl-8" : ""}`}>
                  <span className="font-serif text-5xl italic text-ink/20">0{i + 1}</span>
                  <h3 className="mt-6 text-2xl font-medium tracking-tight text-navy-950">{v.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink/60">{v.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>


      <section className="bg-navy-950 py-28 text-white sm:py-40">
        <div className="container-x">
          <Label n="03" light>Global reach</Label>
          <H2 light className="mb-12 mt-10 max-w-4xl"><MaskLines lines={["Manchester HQ.", <span key="t" className="accent text-lime-400">Three continents.</span>]} /></H2>
          <Coverage />
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-x grid gap-20 lg:grid-cols-2">
          <div>
            <Label n="04">Who we partner with</Label>
            <ul className="mt-10 border-t border-line">
              {clientTypes.map((c) => (
                <li key={c} className="flex items-baseline justify-between border-b border-line py-5 text-2xl font-medium tracking-tight text-navy-950">{c}</li>
              ))}
            </ul>
          </div>
          <div>
            <Label n="05">Careers</Label>
            <div className="relative mt-14 aspect-[4/3] overflow-hidden rounded-[4px]">
              <Image src="/media/engineer-vest.jpg" alt="" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <h3 className="mt-10 text-4xl font-medium tracking-[-0.03em] text-navy-950">Build a recruitment career <span className="accent">with purpose.</span></h3>
            <p className="mt-4 max-w-lg text-lg text-ink/60">
              Interested in renewable energy recruitment? We&apos;re always keen to hear from ambitious people who want to make an impact on the energy transition.
            </p>
            <div className="mt-8">
              <Button href={`mailto:${company.founderEmail}?subject=Careers%20at%20Circular%20Resourcing`}>Email Sam Elliott</Button>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
