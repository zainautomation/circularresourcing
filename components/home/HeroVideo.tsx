"use client";
import { useRef, type CSSProperties } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { MaskLines } from "../Reveal";
import { Button } from "../ui";

/**
 * Light streaks drawn along the panel rows of /media/solar-field.jpg (1920×1080 coordinates).
 * Each runs far → near. CSS-only animation (stroke-dashoffset), no video, no JS per frame.
 */
const streaks: { d: string; dur: number; delay: number; w?: number }[] = [
  { d: "M300 395 L150 985", dur: 4.2, delay: 0.2 },
  { d: "M235 420 L70 1000", dur: 5.1, delay: 2.6, w: 0.8 },
  { d: "M520 395 L725 950", dur: 4.6, delay: 1.1 },
  { d: "M470 420 L640 1000", dur: 5.4, delay: 3.4, w: 0.8 },
  { d: "M705 400 L1270 880", dur: 4.4, delay: 0.6 },
  { d: "M680 425 L1200 935", dur: 5.2, delay: 2.9, w: 0.8 },
  { d: "M880 400 L1440 690", dur: 4.8, delay: 1.7 },
  { d: "M1070 380 L1710 650", dur: 5.0, delay: 0.1 },
  { d: "M1160 350 L1880 615", dur: 5.6, delay: 3.0, w: 0.8 },
  { d: "M1250 318 L1910 515", dur: 6.0, delay: 1.4, w: 0.7 },
  { d: "M1080 296 L1900 465", dur: 6.4, delay: 4.1, w: 0.6 },
];

export function HeroVideo() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-navy-950 text-white">
      <motion.div style={{ scale, y }} className="absolute inset-0 will-change-transform">
        <Image
          src="/media/solar-field.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={80}
          className="object-cover"
        />
        <svg
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full mix-blend-screen"
          aria-hidden
        >
          {streaks.map((s, i) => (
            <g key={i} style={{ "--d": `${s.dur}s`, "--delay": `${s.delay}s` } as CSSProperties}>
              <path d={s.d} pathLength={100} className="flow" stroke="#7cc4ff" strokeOpacity={0.35} strokeWidth={10 * (s.w ?? 1)} />
              <path d={s.d} pathLength={100} className="flow" stroke="#e6f4ff" strokeWidth={2.2 * (s.w ?? 1)} />
            </g>
          ))}
        </svg>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-navy-950/15 to-navy-950/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/60 via-transparent to-transparent" />

      <motion.div style={{ opacity: fade }} className="container-x relative flex h-full flex-col justify-end pb-10 sm:pb-14">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="mb-8 flex items-center gap-3 text-[13px] uppercase tracking-[0.16em] text-white/70"
        >
          <span className="size-1.5 rounded-full bg-lime-400" /> Energy transition recruitment
        </motion.p>

        <h1 className="max-w-[16ch] text-[3.1rem] font-medium leading-[0.98] tracking-[-0.045em] sm:text-7xl lg:text-[7.2rem]">
          <MaskLines
            animateOnMount
            delay={0.25}
            lines={[
              "The bridge to",
              <span key="k13">top talent in</span>,
              <span key="r" className="accent text-lime-400">renewable energy.</span>,
            ]}
          />
        </h1>

        <div className="mt-10 grid items-end gap-8 border-t border-white/15 pt-8 lg:grid-cols-[1fr_auto]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl text-lg leading-relaxed text-white/75"
          >
            Specialist recruiters for Utility-Scale Solar, Battery Storage and Wind, trusted by developers, IPPs, investors and EPCs across the UK, Europe and North America.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-3"
          >
            <Button href="/employers" variant="lime">Register a vacancy</Button>
            <Button href="/job-seekers" variant="outline-light">Upload your CV</Button>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-10 right-6 hidden h-16 w-px overflow-hidden bg-white/20 lg:block xl:right-12">
        <span className="animate-scrollcue absolute inset-x-0 top-0 h-1/2 bg-white" />
      </div>
    </section>
  );
}
