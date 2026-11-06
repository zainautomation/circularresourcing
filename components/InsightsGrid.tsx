"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { Insight } from "@/lib/data";
import { cn, formatDate } from "@/lib/utils";
import { insightImages } from "@/lib/images";


export function InsightsGrid({ items }: { items: Insight[] }) {
  const cats = ["All", ...Array.from(new Set(items.map((i) => i.category)))];
  const [cat, setCat] = useState("All");
  const list = items.filter((i) => cat === "All" || i.category === cat);
  const [lead, ...rest] = list;
  const img = (a: Insight) => insightImages[a.slug] ?? "/media/solar.jpg";

  return (
    <div>
      <div className="flex flex-wrap gap-x-8 gap-y-3 border-b border-line pb-6">
        {cats.map((c) => (
          <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={cn("text-[15px] transition-colors", cat === c ? "text-navy-950 link-u [background-size:100%_1px]" : "text-ink/45 hover:text-navy-950")}>
            {c}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={cat} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="mt-14">
          {lead && (
            <Link href={`/insights/${lead.slug}`} className="group grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[4px]">
                <Image src={img(lead)} alt="" fill sizes="(min-width:1024px) 60vw, 100vw" className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" />
              </div>
              <div>
                <p className="text-[13px] text-ink/45">{lead.category} · {formatDate(lead.date)} · {lead.readTime} read</p>
                <h2 className="mt-4 text-4xl font-medium leading-[1.05] tracking-[-0.03em] text-navy-950 sm:text-5xl">{lead.title}</h2>
                <p className="mt-5 text-lg text-ink/60">{lead.excerpt}</p>
                <span className="link-u mt-8 inline-block font-medium text-navy-950">Read article</span>
              </div>
            </Link>
          )}
          <ul className="mt-20 border-t border-line">
            {rest.map((a) => (
              <li key={a.slug} className="border-b border-line">
                <Link href={`/insights/${a.slug}`} className="group grid items-center gap-6 py-8 md:grid-cols-[160px_1fr_auto]">
                  <div className="relative hidden aspect-[4/3] overflow-hidden rounded-[4px] md:block">
                    <Image src={img(a)} alt="" fill sizes="160px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div>
                    <p className="text-[13px] text-ink/45">{a.category} · {formatDate(a.date)}</p>
                    <h3 className="mt-2 text-2xl font-medium tracking-tight text-navy-950 transition-transform duration-700 group-hover:translate-x-2 sm:text-3xl">{a.title}</h3>
                  </div>
                  <span className="text-ink/45">{a.readTime}</span>
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
