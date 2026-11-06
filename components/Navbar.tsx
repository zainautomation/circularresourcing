"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { company } from "@/lib/data";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

const links = [
  { label: "Jobs", href: "/jobs" },
  { label: "Services", href: "/services" },
  { label: "Employers", href: "/employers" },
  { label: "Job Seekers", href: "/job-seekers" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 400 && y > last);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const solid = scrolled && !open;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          hidden && !open ? "-translate-y-full" : "translate-y-0",
          solid ? "bg-white/85 backdrop-blur-xl border-b border-black/5" : "bg-transparent",
        )}
      >
        <div className={cn("container-x flex items-center justify-between transition-all duration-500", solid ? "h-16" : "h-24")}>
          <Logo light={!solid} className={cn("w-auto transition-all duration-500", solid ? "h-9" : "h-11")} />

          <nav className="hidden items-center gap-9 lg:flex">
            {links.map((l) => {
              const active = pathname.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "link-u text-[15px] transition-colors",
                    solid ? "text-ink/70 hover:text-ink" : "text-white/75 hover:text-white",
                    active && (solid ? "text-ink" : "text-white"),
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-6">
            <Link
              href="/contact"
              className={cn(
                "hidden items-center gap-3 text-[15px] font-medium sm:flex",
                solid ? "text-ink" : "text-white",
              )}
            >
              <span className={cn("size-2 rounded-full", solid ? "bg-lime-600" : "bg-lime-400")} />
              Get in touch
            </Link>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              className={cn("relative z-[60] flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden", open || !solid ? "text-white" : "text-ink")}
            >
              <span className={cn("h-px w-6 bg-current transition-transform duration-500", open && "translate-y-[3.5px] rotate-45")} />
              <span className={cn("h-px w-6 bg-current transition-transform duration-500", open && "-translate-y-[3.5px] -rotate-45")} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[55] flex flex-col bg-navy-950 px-5 pb-10 pt-28 text-white sm:px-8 lg:hidden"
          >
            <nav className="flex flex-col">
              {[...links, { label: "Contact", href: "/contact" }].map((l, i) => (
                <motion.div key={l.href} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                  <Link href={l.href} className="flex items-baseline gap-4 border-b border-white/10 py-4 text-4xl tracking-tight">
                    <span className="text-xs text-white/40">0{i + 1}</span>
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto space-y-1 text-white/60">
              <a href={company.phoneHref} className="block">{company.phone}</a>
              <a href={`mailto:${company.email}`} className="block">{company.email}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
