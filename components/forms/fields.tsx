"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Paperclip, X } from "lucide-react";
import { cn } from "@/lib/utils";

const labelCls = "block text-[13px] uppercase tracking-[0.12em] text-ink/50";

export function Field({
  label, name, type = "text", required, placeholder, value, onChange, textarea, className, autoComplete,
}: {
  label: string; name: string; type?: string; required?: boolean; placeholder?: string;
  value: string; onChange: (v: string) => void; textarea?: boolean; className?: string; autoComplete?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className={labelCls}>{label}{required && <span className="text-lime-600"> *</span>}</span>
      {textarea ? (
        <textarea name={name} required={required} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} rows={4} className="input resize-y" />
      ) : (
        <input name={name} type={type} required={required} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} autoComplete={autoComplete} className="input" />
      )}
    </label>
  );
}

export function Select({ label, value, onChange, options, required }: { label: string; value: string; onChange: (v: string) => void; options: string[]; required?: boolean }) {
  return (
    <label className="block">
      <span className={labelCls}>{label}{required && <span className="text-lime-600"> *</span>}</span>
      <select value={value} required={required} onChange={(e) => onChange(e.target.value)} className="input pr-8">
        <option value="">Select</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
}

export function Chips({ label, options, value, onChange, multi = true }: { label: string; options: string[]; value: string[]; onChange: (v: string[]) => void; multi?: boolean }) {
  return (
    <fieldset>
      <legend className={cn(labelCls, "mb-4")}>{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = value.includes(o);
          return (
            <button
              type="button" key={o} aria-pressed={on}
              onClick={() => onChange(multi ? (on ? value.filter((x) => x !== o) : [...value, o]) : [o])}
              className={cn("rounded-full px-4 py-2 text-sm ring-1 ring-inset transition", on ? "bg-navy-950 text-white ring-navy-950" : "text-ink/70 ring-line hover:ring-navy-950")}
            >
              {o}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function FileDrop({ file, onFile }: { file: File | null; onFile: (f: File | null) => void }) {
  const [over, setOver] = useState(false);
  const [err, setErr] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  const accept = (f?: File) => {
    if (!f) return;
    if (!/\.(pdf|docx?|rtf|txt)$/i.test(f.name)) return setErr("Please upload a PDF, Word, RTF or TXT file.");
    if (f.size > 8 * 1024 * 1024) return setErr("Max file size is 8 MB.");
    setErr("");
    onFile(f);
  };
  return (
    <div>
      <span className={cn(labelCls, "mb-3")}>CV</span>
      {file ? (
        <div className="flex items-center gap-4 border-b border-navy-950 py-4">
          <Paperclip className="size-5 text-lime-600" strokeWidth={1.5} />
          <span className="min-w-0 flex-1 truncate text-navy-950">{file.name}</span>
          <span className="text-sm text-ink/45">{Math.round(file.size / 1024)} KB</span>
          <button type="button" onClick={() => onFile(null)} aria-label="Remove file"><X className="size-4" /></button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => ref.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setOver(true); }}
          onDragLeave={() => setOver(false)}
          onDrop={(e) => { e.preventDefault(); setOver(false); accept(e.dataTransfer.files[0]); }}
          className={cn("flex w-full items-center gap-4 border border-dashed px-5 py-6 text-left transition", over ? "border-navy-950 bg-paper" : "border-[#cfcabd] hover:border-navy-950")}
        >
          <Paperclip className="size-5 text-ink/50" strokeWidth={1.5} />
          <span className="flex-1 text-navy-950">Drop your CV here, or <span className="link-u [background-size:100%_1px]">browse</span></span>
          <span className="hidden text-sm text-ink/40 sm:block">PDF, DOC, DOCX · 8 MB</span>
        </button>
      )}
      <input ref={ref} type="file" accept=".pdf,.doc,.docx,.rtf,.txt" className="hidden" onChange={(e) => accept(e.target.files?.[0])} />
      {err && <p className="mt-2 text-sm text-red-600">{err}</p>}
    </div>
  );
}

export function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div>
      <ol className="flex gap-6 text-sm">
        {steps.map((s, i) => (
          <li key={s} className={cn("transition-colors", i === current ? "text-navy-950" : i < current ? "text-ink/50" : "text-ink/30")}>
            <span className="tabular-nums">0{i + 1}</span> <span className="hidden sm:inline">{s}</span>
          </li>
        ))}
      </ol>
      <div className="mt-4 h-px bg-line">
        <motion.div className="h-px bg-navy-950" animate={{ width: `${((current + 1) / steps.length) * 100}%` }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} />
      </div>
    </div>
  );
}

export function Consent({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-start gap-3 text-sm text-ink/60">
      <input type="checkbox" required checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-0.5 size-4 accent-navy-950" />
      <span>
        I agree to Circular Resourcing processing my data in line with the{" "}
        <Link href="/privacy" className="text-navy-950 underline underline-offset-4">privacy notice</Link>.
      </span>
    </label>
  );
}

export function Success({ title, text, onReset }: { title: string; text: string; onReset?: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="py-10">
      <p className="text-[13px] uppercase tracking-[0.14em] text-lime-600">Received</p>
      <h3 className="mt-4 text-4xl font-medium leading-tight tracking-[-0.03em] text-navy-950">{title}</h3>
      <p className="mt-4 max-w-md text-ink/60">{text}</p>
      {onReset && <button onClick={onReset} className="link-u mt-8 font-medium text-navy-950">Submit another</button>}
    </motion.div>
  );
}

export function SubmitButton({ loading, children }: { loading: boolean; children: React.ReactNode }) {
  return (
    <button disabled={loading} className="group inline-flex items-center gap-6 rounded-full bg-navy-950 py-2 pl-6 pr-2 text-[15px] font-medium text-white transition hover:bg-navy-800 disabled:opacity-60">
      {children}
      <span className="grid size-10 place-items-center rounded-full bg-lime-500 text-navy-950 transition-transform duration-500 group-hover:translate-x-1">
        {loading ? <span className="size-4 animate-spin rounded-full border-2 border-navy-950 border-t-transparent" /> : "→"}
      </span>
    </button>
  );
}

export async function postForm(data: Record<string, string | string[] | boolean>, file?: File | null) {
  const fd = new FormData();
  Object.entries(data).forEach(([k, v]) => fd.append(k, Array.isArray(v) ? v.join(", ") : String(v)));
  if (file) fd.append("cv", file);
  const res = await fetch("/api/submit", { method: "POST", body: fd });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error || "Submission failed");
}
