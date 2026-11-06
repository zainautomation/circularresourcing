"use client";
import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { disciplines } from "@/lib/data";
import { cn } from "@/lib/utils";

export function DisciplineExplorer({ light = false }: { light?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ul className={cn("border-t", light ? "border-white/15" : "border-line")}>
      {disciplines.map((d, i) => {
        const on = open === i;
        return (
          <li key={d.id} className={cn("border-b", light ? "border-white/15" : "border-line")}>
            <button
              onClick={() => setOpen(on ? null : i)}
              aria-expanded={on}
              className="group flex w-full items-center gap-6 py-6 text-left sm:py-7"
            >
              <span className={cn("w-8 text-sm", light ? "text-white/40" : "text-ink/40")}>0{i + 1}</span>
              <span className={cn("flex-1 text-2xl font-medium tracking-[-0.02em] transition-colors sm:text-4xl", light ? "text-white" : "text-navy-950", !on && (light ? "group-hover:text-lime-400" : "group-hover:text-sky-600"))}>
                {d.title}
              </span>
              <span className={cn("hidden text-sm md:block", light ? "text-white/40" : "text-ink/40")}>{d.roles.length} specialisms</span>
              <Plus className={cn("size-6 shrink-0 transition-transform duration-500", on && "rotate-45", light ? "text-white" : "text-navy-950")} strokeWidth={1.25} />
            </button>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-8 pb-10 pl-14 md:grid-cols-[1fr_1.2fr]">
                    <p className={cn("max-w-md text-lg leading-relaxed", light ? "text-white/65" : "text-ink/60")}>{d.summary}</p>
                    <div>
                      <p className={cn("text-xl leading-relaxed", light ? "text-white/90" : "text-navy-950")}>
                        {d.roles.map((r, k) => (
                          <span key={r}>
                            {r}
                            {k < d.roles.length - 1 && <span className={light ? "text-lime-400" : "text-lime-600"}> / </span>}
                          </span>
                        ))}
                      </p>
                      <Link href={`/jobs?discipline=${encodeURIComponent(d.title)}`} className={cn("group mt-6 inline-flex items-center gap-2 text-[15px] font-medium", light ? "text-lime-400" : "text-navy-950")}>
                        <span className="link-u">View {d.title.toLowerCase()} roles</span>
                        <ArrowUpRight className="size-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
