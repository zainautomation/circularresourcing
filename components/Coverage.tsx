"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { regions } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Coverage() {
  const [active, setActive] = useState(0);
  const hq = regions.find((x) => x.hq)!;

  return (
    <div className="grid gap-14 lg:grid-cols-[1.6fr_1fr] lg:items-center">
      <svg viewBox="0 0 100 60" className="block w-full" role="img" aria-label="Map of regions covered">
        <defs>
          <pattern id="dots" width="1.4" height="1.4" patternUnits="userSpaceOnUse">
            <circle cx="0.7" cy="0.7" r="0.25" fill="rgba(255,255,255,0.22)" />
          </pattern>
        </defs>
        <g fill="url(#dots)">
          <path d="M8 18 Q14 10 26 12 Q34 14 34 22 Q32 30 28 34 Q26 40 22 44 Q18 40 16 34 Q10 30 8 24Z" />
          <path d="M26 44 Q30 44 32 50 Q30 58 27 58 Q24 52 26 44Z" />
          <path d="M44 20 Q48 14 56 16 Q62 18 60 24 Q56 28 50 30 Q45 28 44 20Z" />
          <path d="M46 32 Q54 30 58 36 Q58 46 52 52 Q48 46 46 32Z" />
          <path d="M58 14 Q72 10 86 16 Q92 22 86 30 Q78 34 70 32 Q62 28 58 22Z" />
          <path d="M80 42 Q88 40 90 46 Q86 50 80 48Z" />
        </g>
        {regions.filter((x) => !x.hq).map((x) => (
          <motion.path
            key={x.name}
            d={`M${hq.x} ${hq.y} Q${(hq.x + x.x) / 2} ${Math.min(hq.y, x.y) - 14} ${x.x} ${x.y}`}
            fill="none" stroke="#9bcb5b" strokeWidth="0.25"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
            transition={{ duration: 1.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
        {regions.map((x, i) => (
          <g key={x.name} onClick={() => setActive(i)} className="cursor-pointer">
            <circle cx={x.x} cy={x.y} r="2" fill="rgba(155,203,91,0.18)">
              <animate attributeName="r" values="1.2;3;1.2" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx={x.x} cy={x.y} r={i === active ? 0.9 : 0.6} fill={i === active ? "#b4dc7a" : "#ffffff"} />
          </g>
        ))}
      </svg>

      <ul className="border-t border-white/15">
        {regions.map((x, i) => (
          <li key={x.name} className="border-b border-white/15">
            <button onClick={() => setActive(i)} aria-expanded={i === active} className="flex w-full items-baseline justify-between gap-4 py-6 text-left">
              <span className={cn("text-2xl font-medium tracking-tight transition-colors sm:text-3xl", i === active ? "text-white" : "text-white/45 hover:text-white")}>{x.name}</span>
              {x.hq && <span className="text-[13px] uppercase tracking-[0.14em] text-lime-400">HQ</span>}
            </button>
            <AnimatePresence initial={false}>
              {i === active && (
                <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pb-6 text-white/60">
                  {x.markets.join(" / ")}
                </motion.p>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
    </div>
  );
}
