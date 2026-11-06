import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { company } from "@/lib/data";
import { Logo } from "./Logo";
import { Newsletter } from "./Newsletter";

const cols = [
  {
    title: "Employers",
    links: [
      { label: "Register a vacancy", href: "/employers" },
      { label: "Our services", href: "/services" },
      { label: "Executive Search", href: "/services#executive" },
      { label: "Circular Embedded", href: "/services#embedded" },
      { label: "Cost calculator", href: "/services#calculator" },
    ],
  },
  {
    title: "Candidates",
    links: [
      { label: "Search jobs", href: "/jobs" },
      { label: "Upload your CV", href: "/job-seekers" },
      { label: "Career advice", href: "/insights" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Core disciplines", href: "/#disciplines" },
      { label: "Insights", href: "/insights" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      <div className="container-x pt-20">
        <div className="grid gap-16 border-b border-white/10 pb-16 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="text-[13px] uppercase tracking-[0.14em] text-white/45">Start a conversation</p>
            <a href={`mailto:${company.email}`} className="group mt-6 inline-flex items-center gap-4 text-4xl font-medium tracking-[-0.035em] sm:text-6xl">
              <span className="link-u">{company.email}</span>
              <ArrowUpRight className="size-8 text-lime-400 transition-transform duration-500 group-hover:rotate-45 sm:size-12" strokeWidth={1.5} />
            </a>
            <a href={company.phoneHref} className="mt-4 block text-2xl text-white/60 transition-colors hover:text-white">{company.phone}</a>
          </div>
          <div>
            <p className="text-[13px] uppercase tracking-[0.14em] text-white/45">Monthly market insights</p>
            <p className="mt-4 max-w-sm text-white/60">Salary trends, market moves and hiring advice for the energy transition.</p>
            <div className="mt-6"><Newsletter /></div>
          </div>
        </div>

        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Logo light className="h-12 w-auto" />
            <address className="mt-6 not-italic leading-relaxed text-white/50">
              {company.address.map((l) => <span key={l} className="block">{l}</span>)}
            </address>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <p className="text-[13px] uppercase tracking-[0.14em] text-white/45">{c.title}</p>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l.href}><Link href={l.href} className="link-u text-white/75 transition-colors hover:text-white">{l.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-between gap-4 border-t border-white/10 py-8 text-sm text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} {company.legalName}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/privacy#cookies" className="hover:text-white">Cookies</Link>
            <a href="https://www.linkedin.com/company/circular-resourcing" target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
