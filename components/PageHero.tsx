import Image from "next/image";
import Link from "next/link";
import { MaskLines } from "./Reveal";

export function PageHero({
  eyebrow, title, text, crumbs, children, image = "/media/solar.jpg", compact = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  text?: string;
  crumbs: { label: string; href?: string }[];
  children?: React.ReactNode;
  image?: string;
  compact?: boolean;
}) {
  const lines = Array.isArray(title) ? title : [title];
  return (
    <section className={`relative overflow-hidden bg-navy-950 text-white ${compact ? "pb-16 pt-40" : "flex min-h-[70svh] flex-col justify-end pb-14 pt-36"}`}>
      <Image src={image} alt="" fill priority sizes="100vw" className="object-cover opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/55 to-navy-950/40" />
      <div className="container-x relative w-full">
        <nav aria-label="Breadcrumb" className="mb-10 flex flex-wrap items-center gap-2 text-[13px] text-white/50">
          <Link href="/" className="hover:text-white">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-2">
              <span>/</span>
              {c.href ? <Link href={c.href} className="hover:text-white">{c.label}</Link> : <span className="text-white/80">{c.label}</span>}
            </span>
          ))}
        </nav>
        <p className="mb-6 flex items-center gap-3 text-[13px] uppercase tracking-[0.16em] text-white/65">
          <span className="size-1.5 rounded-full bg-lime-400" /> {eyebrow}
        </p>
        <h1 className="max-w-5xl text-5xl font-medium leading-[0.98] tracking-[-0.045em] sm:text-7xl lg:text-[6rem]">
          <MaskLines animateOnMount delay={0.1} lines={lines} />
        </h1>
        {(text || children) && (
          <div className="mt-10 grid gap-8 border-t border-white/15 pt-8 lg:grid-cols-[1fr_auto] lg:items-end">
            {text && <p className="max-w-2xl text-lg leading-relaxed text-white/70">{text}</p>}
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
