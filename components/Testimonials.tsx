"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Testimonials({ light = false }: { light?: boolean }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = testimonials.length;
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), 7000);
    return () => clearInterval(t);
  }, [paused, n]);
  const t = testimonials[i];

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="min-h-[300px] sm:min-h-[340px]">
        <AnimatePresence mode="wait">
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <blockquote className={cn("font-serif text-[2rem] leading-[1.15] tracking-[-0.01em] sm:text-5xl lg:text-[3.6rem]", light ? "text-white" : "text-navy-950")}>
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className={cn("mt-10 text-[15px]", light ? "text-white/60" : "text-ink/55")}>
              <span className={cn("font-medium", light ? "text-white" : "text-navy-950")}>{t.name}</span>, {t.company}
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
      <div className={cn("mt-12 flex items-center gap-6 border-t pt-6", light ? "border-white/15" : "border-line")}>
        <span className={cn("text-sm tabular-nums", light ? "text-white/50" : "text-ink/45")}>
          {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </span>
        <div className="flex flex-1 gap-2">
          {testimonials.map((_, k) => (
            <button key={k} onClick={() => setI(k)} aria-label={`Show testimonial ${k + 1}`} className={cn("relative h-px flex-1 overflow-hidden", light ? "bg-white/20" : "bg-line")}>
              {k === i && (
                <motion.span
                  key={i}
                  className={cn("absolute inset-y-0 left-0", light ? "bg-white" : "bg-navy-950")}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: paused ? 0.4 : 7, ease: "linear" }}
                />
              )}
              {k < i && <span className={cn("absolute inset-0", light ? "bg-white/60" : "bg-navy-950/40")} />}
            </button>
          ))}
        </div>
        <div className="flex gap-4 text-[15px] font-medium">
          <button onClick={() => setI((x) => (x - 1 + n) % n)} className={cn("link-u", light ? "text-white" : "text-navy-950")}>Prev</button>
          <button onClick={() => setI((x) => (x + 1) % n)} className={cn("link-u", light ? "text-white" : "text-navy-950")}>Next</button>
        </div>
      </div>
    </div>
  );
}
