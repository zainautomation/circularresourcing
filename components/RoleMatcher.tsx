"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { disciplines, jobs } from "@/lib/data";
import { cn } from "@/lib/utils";

function Group({ n, label, options, value, onChange }: { n: string; label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="border-t border-line py-7">
      <p className="text-[13px] uppercase tracking-[0.14em] text-ink/45"><span className="text-lime-600">({n})</span> {label}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {options.map((o) => (
          <button key={o} onClick={() => onChange(o)} aria-pressed={value === o} className={cn("rounded-full px-4 py-2 text-sm ring-1 ring-inset transition", value === o ? "bg-navy-950 text-white ring-navy-950" : "text-ink/70 ring-line hover:ring-navy-950")}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

export function RoleMatcher() {
  const [sector, setSector] = useState("Any");
  const [disc, setDisc] = useState("Any");
  const [work, setWork] = useState("Any");
  const matches = useMemo(
    () => jobs.filter((j) => (sector === "Any" || j.sector === sector) && (disc === "Any" || j.discipline === disc) && (work === "Any" || j.workplace === work)),
    [sector, disc, work],
  );
  const qs = new URLSearchParams({ ...(sector !== "Any" && { sector }), ...(disc !== "Any" && { discipline: disc }) }).toString();

  return (
    <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr]">
      <div>
        <Group n="1" label="Sector" options={["Any", "Solar PV", "BESS", "Wind", "Multi-technology"]} value={sector} onChange={setSector} />
        <Group n="2" label="Discipline" options={["Any", ...disciplines.map((d) => d.title)]} value={disc} onChange={setDisc} />
        <Group n="3" label="Working style" options={["Any", "On-site", "Hybrid", "Remote"]} value={work} onChange={setWork} />
      </div>
      <div className="border-t border-navy-950 pt-7">
        <p className="text-[13px] uppercase tracking-[0.14em] text-ink/45">Matching roles</p>
        <AnimatePresence mode="wait">
          <motion.p key={matches.length} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="text-[7rem] font-medium leading-none tracking-[-0.05em] text-navy-950">
            {matches.length}
          </motion.p>
        </AnimatePresence>
        <ul className="mt-6 border-t border-line">
          {matches.slice(0, 4).map((j) => (
            <li key={j.slug} className="border-b border-line">
              <Link href={`/jobs/${j.slug}`} className="group flex items-center justify-between gap-4 py-4">
                <span className="link-u truncate text-navy-950">{j.title}</span>
                <span className="shrink-0 text-sm text-ink/45">{j.location}</span>
              </Link>
            </li>
          ))}
        </ul>
        {matches.length === 0 && <p className="py-4 text-ink/60">No live roles match right now. Register your CV and we&apos;ll call you first when one does.</p>}
        <Link href={matches.length ? `/jobs${qs ? `?${qs}` : ""}` : "/job-seekers"} className="group mt-6 inline-flex items-center gap-2 font-medium text-navy-950">
          <span className="link-u">{matches.length ? "See all matches" : "Register your CV"}</span> <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
