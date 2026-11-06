"use client";
import { motion } from "framer-motion";
import { process } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Process({ light = true }: { light?: boolean }) {
  return (
    <ol className="grid sm:grid-cols-2 lg:grid-cols-3">
      {process.map((p, i) => (
        <motion.li
          key={p.step}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ delay: (i % 3) * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className={cn("relative border-t py-10 pr-10", light ? "border-white/15" : "border-line")}
        >
          <motion.span
            className={cn("absolute left-0 top-[-1px] h-px", light ? "bg-lime-400" : "bg-navy-950")}
            initial={{ width: 0 }}
            whileInView={{ width: "40%" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + (i % 3) * 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
          <span className={cn("font-serif text-6xl italic", light ? "text-white/25" : "text-ink/20")}>{p.step}</span>
          <h3 className={cn("mt-6 text-2xl font-medium tracking-tight", light ? "text-white" : "text-navy-950")}>{p.title}</h3>
          <p className={cn("mt-3 max-w-sm leading-relaxed", light ? "text-white/60" : "text-ink/60")}>{p.text}</p>
        </motion.li>
      ))}
    </ol>
  );
}
