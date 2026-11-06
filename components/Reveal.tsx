"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform, type HTMLMotionProps, type MotionValue } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children, delay = 0, y = 40, className, ...rest
}: { children: React.ReactNode; delay?: number; y?: number; className?: string } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.1, delay, ease }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Headline where each line slides up from behind a mask. Pass lines as array. */
export function MaskLines({ lines, className, delay = 0, animateOnMount = false }: { lines: React.ReactNode[]; className?: string; delay?: number; animateOnMount?: boolean }) {
  // Observe the wrapper (not the masked child, which starts clipped and never intersects)
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const show = animateOnMount || inView;
  return (
    <span ref={ref} className={className}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className="block"
            initial={{ y: "110%" }}
            animate={{ y: show ? "0%" : "110%" }}
            transition={{ duration: 1.2, delay: delay + i * 0.09, ease }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return <motion.span style={{ opacity }} className="inline">{children} </motion.span>;
}

/** Paragraph whose words light up as you scroll through it */
export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}

/** Image with subtle parallax inside an overflow-hidden frame */
export function Parallax({ children, className, amount = 12 }: { children: React.ReactNode; className?: string; amount?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);
  return (
    <div ref={ref} className={`overflow-hidden ${className?.includes("absolute") ? "" : "relative"} ${className ?? ""}`}>
      <motion.div style={{ y }} className="absolute inset-[-14%_0]">
        {children}
      </motion.div>
    </div>
  );
}
