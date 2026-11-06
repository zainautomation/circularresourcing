"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MaskLines } from "../Reveal";
import { Button } from "../ui";

export function HeroVideo() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-navy-950 text-white">
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/media/hero-poster.jpg"
          aria-hidden
        >
          <source src="/media/hero-540.mp4" type="video/mp4" media="(max-width: 767px)" />
          <source src="/media/hero-1080.mp4" type="video/mp4" />
        </video>
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
