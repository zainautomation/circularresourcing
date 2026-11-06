import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type BtnProps = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "light" | "outline" | "outline-light" | "lime";
  className?: string;
};

export function Button({ href, children, variant = "solid", className }: BtnProps) {
  const styles = {
    solid: "bg-navy-950 text-white hover:bg-navy-800",
    light: "bg-white text-navy-950 hover:bg-paper",
    lime: "bg-lime-500 text-navy-950 hover:bg-lime-400",
    outline: "text-navy-950 ring-1 ring-inset ring-navy-950/20 hover:ring-navy-950",
    "outline-light": "text-white ring-1 ring-inset ring-white/30 hover:ring-white",
  }[variant];
  const external = href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("http");
  const Cmp = external ? "a" : Link;
  return (
    <Cmp
      href={href}
      className={cn(
        "group inline-flex items-center justify-between gap-6 rounded-full py-2 pl-6 pr-2 text-[15px] font-medium transition-colors duration-300",
        styles,
        className,
      )}
    >
      {children}
      <span
        className={cn(
          "grid size-10 place-items-center overflow-hidden rounded-full transition-transform duration-500 group-hover:rotate-45",
          variant === "solid" ? "bg-lime-500 text-navy-950" : variant === "lime" ? "bg-navy-950 text-white" : variant === "outline-light" ? "bg-white text-navy-950" : "bg-navy-950 text-white",
        )}
      >
        <ArrowUpRight className="size-4" />
      </span>
    </Cmp>
  );
}

export function TextLink({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) {
  return (
    <Link href={href} className={cn("group inline-flex items-center gap-2 text-[15px] font-medium", light ? "text-white" : "text-navy-950")}>
      <span className="link-u">{children}</span>
      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Link>
  );
}

/** Small section label, e.g. "(02) Services" followed by a hairline */
export function Label({ n, children, light = false, className }: { n?: string; children: React.ReactNode; light?: boolean; className?: string }) {
  return (
    <div className={cn("flex items-center gap-4 text-[13px] uppercase tracking-[0.14em]", light ? "text-white/60" : "text-ink/50", className)}>
      {n && <span className={light ? "text-lime-400" : "text-lime-600"}>({n})</span>}
      <span>{children}</span>
      <span className={cn("h-px flex-1", light ? "bg-white/15" : "bg-line")} />
    </div>
  );
}

export function H2({ children, className, light = false }: { children: React.ReactNode; className?: string; light?: boolean }) {
  return (
    <h2 className={cn("text-[2.4rem] font-medium leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-7xl", light ? "text-white" : "text-navy-950", className)}>
      {children}
    </h2>
  );
}

// Backwards-compatible helpers used by some pages
export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <Label light={light}>{children}</Label>;
}

export function SectionHeading({
  eyebrow, title, text, light = false, center = false,
}: { eyebrow?: string; title: React.ReactNode; text?: string; light?: boolean; center?: boolean }) {
  return (
    <div className={cn(center && "mx-auto max-w-4xl text-center")}>
      {eyebrow && <Label light={light} className={cn("mb-8", center && "justify-center [&>span:last-child]:hidden")}>{eyebrow}</Label>}
      <H2 light={light} className="text-4xl sm:text-5xl lg:text-6xl">{title}</H2>
      {text && <p className={cn("mt-6 max-w-2xl text-lg leading-relaxed", center && "mx-auto", light ? "text-white/65" : "text-ink/60")}>{text}</p>}
    </div>
  );
}
