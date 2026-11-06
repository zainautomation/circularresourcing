import Image from "next/image";
import Link from "next/link";
import { insights, jobs, stats } from "@/lib/data";
import { insightImages } from "@/lib/images";
import { formatDate } from "@/lib/utils";
import { H2, Label, TextLink, Button } from "@/components/ui";
import { MaskLines, Reveal, ScrollWords } from "@/components/Reveal";
import { Counter } from "@/components/Counter";
import { HeroVideo } from "@/components/home/HeroVideo";
import { SectorPanels } from "@/components/home/SectorPanels";
import { ServiceList } from "@/components/home/ServiceList";
import { DisciplineExplorer } from "@/components/DisciplineExplorer";
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";
import { JobCard } from "@/components/JobCard";
import { CtaBand } from "@/components/CtaBand";

export default function Home() {
  const featured = [...jobs].sort((a, b) => Number(!!b.featured) - Number(!!a.featured)).slice(0, 5);

  return (
    <>
      <HeroVideo />

      {/* 01 — Intro */}
      <section className="py-20 sm:py-28">
        <div className="container-x">
          <Label n="01">Who we are</Label>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_2.4fr] lg:gap-16">
            <Reveal className="order-2 lg:order-1">
              <figure>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] bg-paper">
                  <Image src="/media/engineer.jpg" alt="Engineer reviewing plans at a solar farm" fill sizes="(min-width:1024px) 28vw, 100vw" className="object-cover object-[55%_30%]" />
                </div>
                <figcaption className="mt-4 flex items-center justify-between text-[13px] text-ink/50">
                  <span>Manchester HQ</span>
                  <span>UK · Europe · North America</span>
                </figcaption>
              </figure>
            </Reveal>
            <div className="order-1 lg:order-2">
              <ScrollWords
                className="text-[1.9rem] font-medium leading-[1.18] tracking-[-0.025em] text-navy-950 sm:text-5xl lg:text-[3.4rem]"
                text="We support the businesses leading the energy transition. For more than a decade we've connected developers, IPPs, funds and EPCs with the corporate, commercial and technical talent that turns pipelines into power."
              />
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <Button href="/about">Our story</Button>
                <TextLink href="/contact">Book a virtual meeting</TextLink>
              </div>
            </div>
          </div>

          <dl className="mt-16 grid grid-cols-2 border-t border-line lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className={`border-line py-8 pr-6 ${i > 0 ? "lg:border-l lg:pl-8" : ""} ${i % 2 === 1 ? "border-l pl-6" : ""} ${i > 1 ? "border-t lg:border-t-0" : ""}`}>
                <dt className="text-5xl font-medium tracking-[-0.04em] text-navy-950 sm:text-7xl">
                  <Counter value={s.value} suffix={s.suffix} decimals={s.decimals} />
                </dt>
                <dd className="mt-3 max-w-[22ch] text-ink/55">{s.label}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* 02 — Sectors */}
      <section className="pb-20 sm:pb-28">
        <div className="container-x">
          <Label n="02">Sectors</Label>
          <div className="mb-10 mt-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <H2><MaskLines lines={["Specialists in the", <span key="t" className="accent">technologies</span>, "powering net zero."]} /></H2>
            <p className="max-w-sm text-ink/60">Deep networks in three of the fastest-growing technologies in clean energy, plus grid, transmission and green hydrogen.</p>
          </div>
          <Reveal><SectorPanels /></Reveal>
        </div>
      </section>

      {/* 03 — Services */}
      <section className="bg-paper py-20 sm:py-28">
        <div className="container-x">
          <Label n="03">Services</Label>
          <div className="mb-12 mt-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <H2><MaskLines lines={["Three ways to", <span key="k1"><span key="k2" className="accent">build</span> your team.</span>]} /></H2>
            <TextLink href="/services">Compare all services</TextLink>
          </div>
          <ServiceList />
        </div>
      </section>

      {/* 04 — Disciplines */}
      <section id="disciplines" className="scroll-mt-16 py-20 sm:py-28">
        <div className="container-x">
          <Label n="04">Core disciplines</Label>
          <div className="mt-10 grid gap-16 lg:grid-cols-[1fr_1.6fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <H2 className="text-4xl sm:text-5xl lg:text-6xl"><MaskLines lines={["Across the", <span key="k3"><span key="k4" className="accent">whole</span> project</span>, "lifecycle."]} /></H2>
              <p className="mt-6 max-w-sm text-ink/60">Around 95% of our recent placements sit within these six disciplines, from origination to commissioning.</p>
            </div>
            <DisciplineExplorer />
          </div>
        </div>
      </section>

      {/* 05 — Process */}
      <section className="relative overflow-hidden bg-navy-950 py-28 text-white sm:py-40">
        <div className="container-x">
          <Label n="05" light>How we work</Label>
          <div className="mb-12 mt-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <H2 light><MaskLines lines={["From brief to", <span key="s" className="accent text-lime-400">start date.</span>]} /></H2>
            <p className="max-w-sm text-white/60">A clear, six-step process with full visibility of progress, pipeline and fees from day one.</p>
          </div>
          <Process />
        </div>
      </section>

      {/* 06 — Jobs */}
      <section className="py-20 sm:py-28">
        <div className="container-x">
          <Label n="06">Latest roles</Label>
          <div className="mb-10 mt-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <H2><MaskLines lines={["Your next move", <span key="k5">in <span key="k6" className="accent">clean energy.</span></span>]} /></H2>
            <Button href="/jobs">View all {jobs.length} roles</Button>
          </div>
          <ul className="border-t border-line">
            {featured.map((j) => <JobCard key={j.slug} job={j} />)}
          </ul>
        </div>
      </section>

      {/* 07 — Testimonials */}
      <section className="bg-paper py-20 sm:py-28">
        <div className="container-x">
          <Label n="07">Testimonials</Label>
          <div className="mt-10 grid gap-14 lg:grid-cols-[1fr_3fr]">
            <div>
              <p className="text-7xl font-medium tracking-[-0.04em] text-navy-950">4.8<span className="text-3xl text-ink/30">/5</span></p>
              <p className="mt-2 text-ink/55">Average client and candidate rating</p>
            </div>
            <Testimonials />
          </div>
        </div>
      </section>

      {/* 08 — Insights */}
      <section className="py-20 sm:py-28">
        <div className="container-x">
          <Label n="08">Insights</Label>
          <div className="mb-10 mt-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <H2><MaskLines lines={["Market intelligence", <span key="k7">& <span key="k8" className="accent">career advice.</span></span>]} /></H2>
            <TextLink href="/insights">All insights</TextLink>
          </div>
          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            {insights.slice(0, 3).map((a, i) => (
              <Reveal key={a.slug} delay={i * 0.1}>
                <Link href={`/insights/${a.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-navy-950">
                    <Image src={insightImages[a.slug]} alt="" fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" />
                  </div>
                  <div className="mt-6 flex items-center gap-3 text-[13px] text-ink/45">
                    <span>{a.category}</span><span className="size-1 rounded-full bg-ink/25" /><span>{formatDate(a.date)}</span>
                  </div>
                  <h3 className="mt-3 text-2xl font-medium leading-snug tracking-[-0.02em] text-navy-950">
                    <span className="link-u">{a.title}</span>
                  </h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand image="/media/offshore-blue.jpg" />
    </>
  );
}
