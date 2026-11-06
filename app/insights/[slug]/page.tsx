import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { insights } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { insightImages } from "@/lib/images";
import { PageHero } from "@/components/PageHero";
import { Label } from "@/components/ui";


type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return insights.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = insights.find((x) => x.slug === slug);
  return a ? { title: a.title, description: a.excerpt } : {};
}

export default async function Article({ params }: Props) {
  const { slug } = await params;
  const idx = insights.findIndex((x) => x.slug === slug);
  const a = insights[idx];
  if (!a) notFound();
  const more = insights.filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <>
      <PageHero compact eyebrow={`${a.category} · ${formatDate(a.date)} · ${a.readTime} read`} image={insightImages[a.slug]} title={[a.title]} crumbs={[{ label: "Insights", href: "/insights" }, { label: a.category }]} />
      <article className="py-20 sm:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_2fr_1fr]">
          <div className="hidden lg:block">
            <p className="text-[13px] uppercase tracking-[0.12em] text-ink/45">Written by</p>
            <p className="mt-2 text-navy-950">Circular Resourcing</p>
          </div>
          <div className="space-y-7 text-lg leading-[1.75] text-ink/75">
            <p className="text-2xl leading-snug tracking-tight text-navy-950">{a.excerpt}</p>
            {a.body.map((p, i) => <p key={i}>{p}</p>)}
            <div className="!mt-16 border-t border-line pt-8">
              <p className="text-2xl font-medium tracking-tight text-navy-950">Want to discuss this with <span className="accent">a specialist?</span></p>
              <Link href="/contact" className="link-u mt-4 inline-block font-medium text-navy-950">Get in touch</Link>
            </div>
          </div>
        </div>
      </article>
      <section className="bg-paper py-20 sm:py-28">
        <div className="container-x">
          <Label n="—">Keep reading</Label>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {more.map((m) => (
              <Link key={m.slug} href={`/insights/${m.slug}`} className="group">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[4px]">
                  <Image src={insightImages[m.slug]} alt="" fill sizes="33vw" className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                </div>
                <p className="mt-5 text-[13px] text-ink/45">{m.category}</p>
                <h3 className="mt-2 text-xl font-medium tracking-tight text-navy-950"><span className="link-u">{m.title}</span></h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
