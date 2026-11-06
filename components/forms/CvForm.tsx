"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { disciplines } from "@/lib/data";
import { Chips, Consent, Field, FileDrop, Select, Stepper, Success, SubmitButton, postForm } from "./fields";

const steps = ["About you", "Your expertise", "Your CV"];
const init = {
  firstName: "", lastName: "", email: "", phone: "", location: "",
  sectors: [] as string[], discipline: "", seniority: "", workplace: [] as string[], salary: "", notice: "",
  linkedin: "", message: "", consent: false,
};

export function CvForm() {
  const [step, setStep] = useState(0);
  const [d, setD] = useState(init);
  const [file, setFile] = useState<File | null>(null);
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState("");
  const set = <K extends keyof typeof init>(k: K) => (v: (typeof init)[K]) => setD((x) => ({ ...x, [k]: v }));

  async function next(e: React.FormEvent) {
    e.preventDefault();
    if (step < steps.length - 1) return setStep((s) => s + 1);
    setState("loading");
    setError("");
    try {
      await postForm({ type: "cv", ...d }, file);
      setState("done");
    } catch (err) {
      setError((err as Error).message);
      setState("idle");
    }
  }

  if (state === "done")
    return (
      <Success
        title={`Thanks, ${d.firstName}! Your CV is with us.`}
        text="A specialist consultant will review your profile and get in touch within two working days. We never share your CV without your consent."
        onReset={() => { setD(init); setFile(null); setStep(0); setState("idle"); }}
      />
    );

  return (
    <form onSubmit={next} className="space-y-8">
      <Stepper steps={steps} current={step} />
      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }} className="space-y-8">
          {step === 0 && (
            <>
              <div className="grid gap-8 sm:grid-cols-2">
                <Field label="First name" name="firstName" required value={d.firstName} onChange={set("firstName")} autoComplete="given-name" />
                <Field label="Last name" name="lastName" required value={d.lastName} onChange={set("lastName")} autoComplete="family-name" />
              </div>
              <div className="grid gap-8 sm:grid-cols-2">
                <Field label="Email" name="email" type="email" required value={d.email} onChange={set("email")} autoComplete="email" />
                <Field label="Phone" name="phone" type="tel" value={d.phone} onChange={set("phone")} autoComplete="tel" />
              </div>
              <Field label="Current location" name="location" placeholder="e.g. Manchester, UK" value={d.location} onChange={set("location")} />
            </>
          )}
          {step === 1 && (
            <>
              <Chips label="Sectors of interest" options={["Solar PV", "BESS", "Wind", "Hydrogen", "Grid & Transmission"]} value={d.sectors} onChange={set("sectors")} />
              <div className="grid gap-8 sm:grid-cols-2">
                <Select label="Primary discipline" value={d.discipline} onChange={set("discipline")} options={[...disciplines.map((x) => x.title), "Other"]} />
                <Select label="Seniority" value={d.seniority} onChange={set("seniority")} options={["Graduate / Junior", "Mid-level", "Senior", "Lead / Manager", "Director", "C-Suite"]} />
              </div>
              <Chips label="Preferred working pattern" options={["On-site", "Hybrid", "Remote"]} value={d.workplace} onChange={set("workplace")} />
              <div className="grid gap-8 sm:grid-cols-2">
                <Field label="Salary expectation" name="salary" placeholder="e.g. £70k–£80k" value={d.salary} onChange={set("salary")} />
                <Select label="Notice period" value={d.notice} onChange={set("notice")} options={["Immediately", "1 month", "2 months", "3 months", "3+ months"]} />
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <FileDrop file={file} onFile={setFile} />
              <Field label="LinkedIn profile" name="linkedin" type="url" placeholder="https://linkedin.com/in/…" value={d.linkedin} onChange={set("linkedin")} />
              <Field label="Anything else we should know?" name="message" textarea value={d.message} onChange={set("message")} placeholder="Your ideal next role, target companies, relocation plans…" />
              <Consent checked={d.consent} onChange={set("consent")} />
            </>
          )}
        </motion.div>
      </AnimatePresence>
      {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      <div className="flex items-center justify-between gap-4">
        {step > 0 ? (
          <button type="button" onClick={() => setStep((s) => s - 1)} className="inline-flex items-center gap-2 text-sm font-semibold text-navy-900/70 hover:text-navy-900">
            <ArrowLeft className="size-4" /> Back
          </button>
        ) : <span />}
        <SubmitButton loading={state === "loading"}>{step < steps.length - 1 ? "Continue" : "Submit my CV"}</SubmitButton>
      </div>
    </form>
  );
}
