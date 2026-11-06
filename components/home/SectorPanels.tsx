"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const panels = [
  {
    key: "solar",
    name: "Utility-Scale Solar",
    img: "/media/solar.jpg",
    text: "Development, EPC, grid and asset teams for gigawatt-scale PV portfolios.",
    q: "Solar PV",
  },
  {
    key: "bess",
    name: "Battery Storage",
    img: "/media/bess.jpg",
    text: "Grid connection, optimisation and trading talent for standalone and co-located BESS.",
    q: "BESS",
  },
  {
    key: "wind",
    name: "Onshore & Offshore Wind",
    img: "/media/offshore-sunset.jpg",
    text: "Leaders, engineers and site teams who deliver and operate wind farms.",
    q: "Wind",
  },
];

export function SectorPanels() {
  const [active, setActive] = useState(0);
  return (
    <div className="flex flex-col gap-3 lg:h-[620px] lg:flex-row">
      {panels.map((p, i) => {
        const on = i === active;
        return (
          <Link
            key={p.key}
            href={`/jobs?sector=${encodeURIComponent(p.q)}`}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            className={cn(
              "group relative h-[420px] overflow-hidden rounded-[4px] bg-navy-950 transition-[flex-grow] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] lg:h-auto",
              on ? "lg:flex-[2.6]" : "lg:flex-1",
            )}
          >
            <Image
              src={p.img}
              alt={p.name}
              fill
              sizes="(min-width:1024px) 60vw, 100vw"
              className={cn("object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]", on ? "scale-100" : "scale-110")}
            />
            <div className={cn("absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent transition-opacity duration-700", on ? "opacity-100" : "opacity-80")} />
            <div className="absolute inset-x-0 top-0 flex items-center justify-between p-6 text-[13px] text-white/70">
              <span>0{i + 1}</span>
              <span className={cn("grid size-11 place-items-center rounded-full bg-white text-navy-950 transition-all duration-500", on ? "scale-100 opacity-100" : "scale-75 opacity-0")}>
                <ArrowUpRight className="size-5" />
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <h3 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">{p.name}</h3>
              <motion.p
                initial={false}
                animate={{ opacity: on ? 1 : 0, y: on ? 0 : 12 }}
                transition={{ duration: 0.6, delay: on ? 0.25 : 0 }}
                className="mt-3 max-w-md text-white/75 lg:min-w-[360px]"
              >
                {p.text}
              </motion.p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
