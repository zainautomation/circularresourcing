"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { TextLink } from "./ui";

const gbp = (n: number) => new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(n);

function Slider({ label, value, min, max, step, onChange, format }: { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; format: (v: number) => string }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <label className="block border-b border-line py-6">
      <span className="flex items-baseline justify-between gap-4">
        <span className="text-ink/60">{label}</span>
        <span className="text-2xl font-medium tabular-nums tracking-tight text-navy-950">{format(value)}</span>
      </span>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-5 h-[2px] w-full cursor-pointer appearance-none accent-navy-950"
        style={{ background: `linear-gradient(90deg, #0a1f44 ${pct}%, #e4e1d8 ${pct}%)` }}
      />
    </label>
  );
}

export function HiringCalculator() {
  const [hires, setHires] = useState(6);
  const [salary, setSalary] = useState(75000);
  const [fee, setFee] = useState(20);
  const [months, setMonths] = useState(6);
  const [monthly, setMonthly] = useState(7500);

  const r = useMemo(() => {
    const contingent = hires * salary * (fee / 100);
    const embedded = months * monthly;
    return { contingent, embedded, saving: contingent - embedded };
  }, [hires, salary, fee, months, monthly]);
  const max = Math.max(r.contingent, r.embedded, 1);
  const win = r.saving > 0;

  return (
    <div className="grid gap-16 lg:grid-cols-2">
      <div className="border-t border-line">
        <Slider label="Hires in the next 12 months" value={hires} min={1} max={25} step={1} onChange={setHires} format={(v) => String(v)} />
        <Slider label="Average base salary" value={salary} min={35000} max={200000} step={5000} onChange={setSalary} format={gbp} />
        <Slider label="Typical agency fee" value={fee} min={12} max={30} step={1} onChange={setFee} format={(v) => `${v}%`} />
        <Slider label="Embedded duration (months)" value={months} min={1} max={12} step={1} onChange={setMonths} format={(v) => String(v)} />
        <Slider label="Embedded monthly fee (example)" value={monthly} min={3000} max={15000} step={500} onChange={setMonthly} format={gbp} />
        <p className="mt-5 text-sm text-ink/45">Illustrative only. Circular Embedded fees are agreed per engagement based on scope, geography and seniority.</p>
      </div>

      <div className="flex flex-col">
        {[
          { label: "Contingent recruitment", v: r.contingent, c: "bg-ink/25" },
          { label: "Circular Embedded", v: r.embedded, c: "bg-lime-500" },
        ].map((b) => (
          <div key={b.label} className="border-t border-line py-8">
            <div className="flex items-baseline justify-between">
              <span className="text-ink/60">{b.label}</span>
              <span className="text-4xl font-medium tabular-nums tracking-[-0.03em] text-navy-950 sm:text-5xl">{gbp(b.v)}</span>
            </div>
            <div className="mt-5 h-1.5 bg-paper">
              <motion.div className={`h-full ${b.c}`} animate={{ width: `${(b.v / max) * 100}%` }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} />
            </div>
          </div>
        ))}
        <div className="mt-auto bg-navy-950 p-8 text-white sm:p-10">
          <p className="text-[13px] uppercase tracking-[0.14em] text-white/50">Our recommendation</p>
          <p className="mt-4 text-3xl font-medium leading-tight tracking-tight">
            {win ? <>Embedded could save around <span className="accent text-lime-400">{gbp(r.saving)}</span></> : <>Contingent is likely <span className="accent text-lime-400">the better fit</span></>}
          </p>
          <p className="mt-3 text-white/60">
            {win ? "At this hiring volume, a dedicated embedded recruiter usually costs less per hire." : "For a small number of hires, a success-only fee keeps cost tied to results."}
          </p>
          <div className="mt-8"><TextLink href="/employers" light>Talk through your hiring plan</TextLink></div>
        </div>
      </div>
    </div>
  );
}
