import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MaskLines, Parallax } from "./Reveal";

export function CtaBand({ image = "/media/shoreline-sunset.jpg" }: { image?: string }) {
  return (
    <section className="relative overflow-hidden bg-navy-950 text-white">
      <Parallax className="absolute inset-0" amount={10}>
        <Image src={image} alt="" fill sizes="100vw" className="object-cover object-[50%_30%] opacity-55" />
      </Parallax>
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-navy-950/30" />
      <div className="container-x relative py-20 sm:py-28">
        <h2 className="max-w-5xl text-5xl font-medium leading-[0.98] tracking-[-0.045em] sm:text-7xl lg:text-[6.5rem]">
          <MaskLines lines={["Let's build the", <span key="a" className="accent text-lime-400">energy transition</span>, "together."]} />
        </h2>
        <div className="mt-12 grid border-t border-white/20 md:grid-cols-2">
          {[
            { k: "Employers", t: "Register a vacancy", d: "Share a brief and get a qualified shortlist, fast.", href: "/employers" },
            { k: "Candidates", t: "Upload your CV", d: "Hear about roles before they're advertised.", href: "/job-seekers" },
          ].map((c, i) => (
            <Link key={c.href} href={c.href} className={`group flex items-end justify-between gap-6 border-b border-white/20 py-8 md:border-b-0 ${i === 0 ? "md:border-r md:pr-10" : "md:pl-10"}`}>
              <span>
                <span className="text-[13px] uppercase tracking-[0.14em] text-white/50">{c.k}</span>
                <span className="mt-2 block text-3xl font-medium tracking-tight sm:text-4xl">{c.t}</span>
                <span className="mt-2 block text-white/60">{c.d}</span>
              </span>
              <span className="grid size-14 shrink-0 place-items-center rounded-full bg-white text-navy-950 transition-all duration-500 group-hover:bg-lime-500">
                <ArrowUpRight className="size-6 transition-transform duration-500 group-hover:rotate-45" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
