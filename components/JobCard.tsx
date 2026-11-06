"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Bookmark } from "lucide-react";
import type { Job } from "@/lib/data";
import { cn, daysAgo } from "@/lib/utils";

/** Editorial job row: hairline separated, no card box */
export function JobCard({ job, saved, onSave }: { job: Job; saved?: boolean; onSave?: (slug: string) => void }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative border-b border-line"
    >
      <div className="grid items-center gap-x-6 gap-y-2 py-7 transition-[padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:pl-3 md:grid-cols-[1.6fr_1fr_1fr_auto]">
        <div>
          <div className="flex items-center gap-3 text-[13px] text-ink/45">
            <span>{job.sector}</span>
            <span className="size-1 rounded-full bg-ink/25" />
            <span>{job.discipline}</span>
            {job.featured && (
              <>
                <span className="size-1 rounded-full bg-ink/25" />
                <span className="text-lime-600">Featured</span>
              </>
            )}
          </div>
          <h3 className="mt-2 text-2xl font-medium tracking-[-0.02em] text-navy-950">
            <Link href={`/jobs/${job.slug}`} className="after:absolute after:inset-0">{job.title}</Link>
          </h3>
        </div>
        <p className="text-ink/65">{job.location}<span className="text-ink/35"> · {job.workplace}</span></p>
        <p className="text-ink/80">{job.salary}</p>
        <div className="flex items-center gap-4">
          <span suppressHydrationWarning className="hidden text-[13px] text-ink/40 lg:block">{daysAgo(job.posted)}</span>
          {onSave && (
            <button
              onClick={() => onSave(job.slug)}
              aria-label={saved ? "Remove from saved jobs" : "Save job"}
              aria-pressed={saved}
              className={cn("relative z-10 grid size-10 place-items-center rounded-full transition", saved ? "text-lime-600" : "text-ink/35 hover:text-ink")}
            >
              <Bookmark className={cn("size-[18px]", saved && "fill-current")} strokeWidth={1.5} />
            </button>
          )}
          <span className="grid size-11 place-items-center rounded-full ring-1 ring-line transition-all duration-500 group-hover:bg-navy-950 group-hover:text-white group-hover:ring-navy-950">
            <ArrowUpRight className="size-[18px] transition-transform duration-500 group-hover:rotate-45" />
          </span>
        </div>
      </div>
    </motion.li>
  );
}
