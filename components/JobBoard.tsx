"use client";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { jobs, disciplines } from "@/lib/data";
import { JobCard } from "./JobCard";
import { cn } from "@/lib/utils";

const unique = (k: "sector" | "country" | "type" | "workplace") => Array.from(new Set(jobs.map((j) => j[k]))).sort();

const groups = [
  { key: "sector", label: "Sector", options: unique("sector") },
  { key: "discipline", label: "Discipline", options: disciplines.map((d) => d.title) },
  { key: "country", label: "Country", options: unique("country") },
  { key: "type", label: "Contract", options: unique("type") },
  { key: "workplace", label: "Workplace", options: unique("workplace") },
] as const;

type Key = (typeof groups)[number]["key"];
type Filters = Record<Key, string[]>;
const empty: Filters = { sector: [], discipline: [], country: [], type: [], workplace: [] };
const STORAGE = "cr-saved-jobs";

export function JobBoard() {
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [filters, setFilters] = useState<Filters>(() => {
    const f: Filters = { sector: [], discipline: [], country: [], type: [], workplace: [] };
    const d = params.get("discipline");
    const s = params.get("sector");
    if (d) f.discipline = [d];
    if (s) f.sector = [s];
    return f;
  });
  const [saved, setSaved] = useState<string[]>([]);
  const [onlySaved, setOnlySaved] = useState(false);
  const [openGroup, setOpenGroup] = useState<Key | null>(null);

  // Keep filters in sync when the URL changes while already on /jobs (e.g. ?sector=BESS links)
  const qp = params.get("q");
  const dp = params.get("discipline");
  const sp = params.get("sector");
  useEffect(() => {
    if (qp !== null) setQ(qp);
    if (dp || sp) setFilters((f) => ({ ...f, discipline: dp ? [dp] : f.discipline, sector: sp ? [sp] : f.sector }));
  }, [qp, dp, sp]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE);
      if (raw) setSaved(JSON.parse(raw));
    } catch {}
  }, []);

  const toggleSave = (slug: string) =>
    setSaved((s) => {
      const next = s.includes(slug) ? s.filter((x) => x !== slug) : [...s, slug];
      try { localStorage.setItem(STORAGE, JSON.stringify(next)); } catch {}
      return next;
    });

  const toggle = (k: Key, v: string) =>
    setFilters((f) => ({ ...f, [k]: f[k].includes(v) ? f[k].filter((x) => x !== v) : [...f[k], v] }));

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    return jobs
      .filter((j) => {
        if (onlySaved && !saved.includes(j.slug)) return false;
        if (term && ![j.title, j.location, j.country, j.sector, j.discipline, j.summary].join(" ").toLowerCase().includes(term)) return false;
        return (Object.keys(filters) as Key[]).every((k) => filters[k].length === 0 || filters[k].includes(j[k]));
      })
      .sort((a, b) => b.posted.localeCompare(a.posted));
  }, [q, filters, onlySaved, saved]);

  const activeCount = Object.values(filters).flat().length;

  return (
    <div>
      <label className="flex items-center gap-4 border-b border-navy-950 pb-4">
        <span className="sr-only">Search jobs</span>
        <Search className="size-6 shrink-0 text-ink/40" strokeWidth={1.5} />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by title, skill or location"
          className="min-w-0 flex-1 bg-transparent text-2xl tracking-tight text-navy-950 placeholder:text-ink/30 focus:outline-none sm:text-4xl"
        />
        {q && <button onClick={() => setQ("")} aria-label="Clear search"><X className="size-5 text-ink/50" /></button>}
      </label>

      <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
        {groups.map((g) => {
          const n = filters[g.key].length;
          return (
            <button
              key={g.key}
              onClick={() => setOpenGroup(openGroup === g.key ? null : g.key)}
              aria-expanded={openGroup === g.key}
              className={cn("flex items-center gap-2 text-[15px] transition-colors", openGroup === g.key || n ? "text-navy-950" : "text-ink/55 hover:text-navy-950")}
            >
              <span className={cn(openGroup === g.key && "link-u [background-size:100%_1px]")}>{g.label}</span>
              {n > 0 && <span className="grid size-5 place-items-center rounded-full bg-navy-950 text-[11px] text-white">{n}</span>}
              <span className={cn("text-xs transition-transform", openGroup === g.key && "rotate-180")}>▾</span>
            </button>
          );
        })}
        <span className="hidden h-4 w-px bg-line sm:block" />
        <button onClick={() => setOnlySaved((s) => !s)} aria-pressed={onlySaved} className={cn("text-[15px] transition-colors", onlySaved ? "text-lime-600" : "text-ink/55 hover:text-navy-950")}>
          Saved ({saved.length})
        </button>
        {activeCount > 0 && (
          <button onClick={() => setFilters(empty)} className="link-u text-[15px] text-ink/55 hover:text-navy-950">Clear filters</button>
        )}
      </div>

      <AnimatePresence initial={false}>
        {openGroup && (
          <motion.div
            key={openGroup}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-2 pt-6">
              {groups.find((g) => g.key === openGroup)!.options.map((o) => {
                const on = filters[openGroup].includes(o);
                return (
                  <button
                    key={o}
                    onClick={() => toggle(openGroup, o)}
                    aria-pressed={on}
                    className={cn("rounded-full px-4 py-2 text-sm ring-1 ring-inset transition", on ? "bg-navy-950 text-white ring-navy-950" : "text-ink/70 ring-line hover:ring-navy-950")}
                  >
                    {o}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-14 text-[13px] uppercase tracking-[0.14em] text-ink/45">
        {results.length} {results.length === 1 ? "role" : "roles"}
        {activeCount > 0 && ` · ${Object.values(filters).flat().join(", ")}`}
      </p>

      <ul className="mt-4 border-t border-line">
        <AnimatePresence initial={false}>
          {results.map((j) => <JobCard key={j.slug} job={j} saved={saved.includes(j.slug)} onSave={toggleSave} />)}
        </AnimatePresence>
      </ul>

      {results.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-3xl font-medium tracking-tight text-navy-950">No roles match <span className="accent">just yet.</span></p>
          <p className="mx-auto mt-3 max-w-md text-ink/60">Many of our roles are filled before they&apos;re advertised. Register your CV and we&apos;ll contact you first.</p>
          <Link href="/job-seekers" className="link-u mt-6 inline-block font-medium text-navy-950">Register your CV</Link>
        </div>
      )}
    </div>
  );
}
