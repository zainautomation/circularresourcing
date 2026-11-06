import Image from "next/image";
import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-navy-950 pb-20 text-white">
      <Image src="/media/sunset.jpg" alt="" fill priority sizes="100vw" className="object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
      <div className="container-x relative">
        <p className="text-[13px] uppercase tracking-[0.16em] text-white/60">Error 404</p>
        <h1 className="mt-6 text-6xl font-medium leading-[0.95] tracking-[-0.045em] sm:text-8xl">This page is <span className="accent text-lime-400">off-grid.</span></h1>
        <p className="mt-6 max-w-md text-lg text-white/65">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/" variant="lime">Back home</Button>
          <Button href="/jobs" variant="outline-light">Search jobs</Button>
        </div>
      </div>
    </section>
  );
}
