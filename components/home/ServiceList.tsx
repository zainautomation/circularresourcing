import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/data";

export function ServiceList() {
  return (
    <ul className="border-t border-line">
      {services.map((s, i) => (
        <li key={s.id}>
          <Link href={`/services#${s.id}`} className="group grid items-baseline gap-4 border-b border-line py-7 sm:py-8 lg:grid-cols-[80px_1.3fr_1fr_60px]">
            <span className="text-sm text-ink/40">0{i + 1}</span>
            <span>
              <span className="block text-3xl font-medium tracking-[-0.03em] text-navy-950 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 sm:text-5xl">
                {s.name}
              </span>
              <span className="mt-2 block text-sm uppercase tracking-[0.14em] text-ink/45">{s.label}</span>
            </span>
            <span className="max-w-md text-ink/60">{s.lead}</span>
            <span className="hidden justify-self-end lg:block">
              <span className="grid size-12 place-items-center rounded-full ring-1 ring-line transition-all duration-500 group-hover:bg-navy-950 group-hover:text-white group-hover:ring-navy-950">
                <ArrowUpRight className="size-5 transition-transform duration-500 group-hover:rotate-45" />
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
