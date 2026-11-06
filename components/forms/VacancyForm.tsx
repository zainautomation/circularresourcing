"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { disciplines, services } from "@/lib/data";
import { Chips, Consent, Field, Select, Stepper, Success, SubmitButton, postForm } from "./fields";

const steps = ["Your company", "The role", "How we can help"];
const init = {
  company: "", name: "", jobTitleContact: "", email: "", phone: "",
  jobTitle: "", discipline: "", sector: [] as string[], location: "", contract: "", salary: "", headcount: "1",
  service: "", urgency: "", message: "", consent: false,
};

export function VacancyForm() {
  const [step, setStep] = useState(0);
  const [d, setD] = useState(init);
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState("");
  const set = <K extends keyof typeof init>(k: K) => (v: (typeof init)[K]) => setD((x) => ({ ...x, [k]: v }));

  async function next(e: React.FormEvent) {
    e.preventDefault();
    if (step < steps.length - 1) return setStep((s) => s + 1);
    setState("loading");
    setError("");
    try {
      await postForm({ type: "vacancy", ...d });
      setState("done");
    } catch (err) {
      setError((err as Error).message);
      setState("idle");
    }
  }

  if (state === "done")
    return (
      <Success
        title="Brief received. We're on it."
        text={`Thanks ${d.name.split(" ")[0]}. A consultant will call you within one working day to talk through the ${d.jobTitle || "role"} and agree next steps.`}
        onReset={() => { setD(init); setStep(0); setState("idle"); }}
      />
    );

  return (
    <form onSubmit={next} className="space-y-8">
      <Stepper steps={steps} current={step} />
      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }} className="space-y-8">
          {step === 0 && (
            <>
              <Field label="Company name" name="company" required value={d.company} onChange={set("company")} autoComplete="organization" />
              <div className="grid gap-8 sm:grid-cols-2">
                <Field label="Your name" name="name" required value={d.name} onChange={set("name")} autoComplete="name" />
                <Field label="Your job title" name="jobTitleContact" value={d.jobTitleContact} onChange={set("jobTitleContact")} />
              </div>
              <div className="grid gap-8 sm:grid-cols-2">
                <Field label="Work email" name="email" type="email" required value={d.email} onChange={set("email")} autoComplete="email" />
                <Field label="Phone" name="phone" type="tel" value={d.phone} onChange={set("phone")} autoComplete="tel" />
              </div>
            </>
          )}
          {step === 1 && (
            <>
              <div className="grid gap-8 sm:grid-cols-2">
                <Field label="Role title" name="jobTitle" required placeholder="e.g. Senior Grid Engineer" value={d.jobTitle} onChange={set("jobTitle")} />
                <Select label="Discipline" value={d.discipline} onChange={set("discipline")} options={[...disciplines.map((x) => x.title), "Other"]} />
              </div>
              <Chips label="Technology" options={["Solar PV", "BESS", "Wind", "Hydrogen", "Grid & Transmission", "Multi-technology"]} value={d.sector} onChange={set("sector")} />
              <div className="grid gap-8 sm:grid-cols-3">
                <Field label="Location" name="location" placeholder="City / remote" value={d.location} onChange={set("location")} />
                <Select label="Contract" value={d.contract} onChange={set("contract")} options={["Permanent", "Contract", "Interim"]} />
                <Field label="Number of hires" name="headcount" type="number" value={d.headcount} onChange={set("headcount")} />
              </div>
              <Field label="Salary / rate budget" name="salary" placeholder="e.g. £80k–£95k + bonus" value={d.salary} onChange={set("salary")} />
            </>
          )}
          {step === 2 && (
            <>
              <Chips label="Preferred service" multi={false} options={[...services.map((s) => s.name), "Not sure yet"]} value={d.service ? [d.service] : []} onChange={(v) => set("service")(v[0] ?? "")} />
              <Chips label="How urgent is this hire?" multi={false} options={["ASAP", "Within 1 month", "1–3 months", "Planning ahead"]} value={d.urgency ? [d.urgency] : []} onChange={(v) => set("urgency")(v[0] ?? "")} />
              <Field label="Brief / additional details" name="message" textarea value={d.message} onChange={set("message")} placeholder="Key responsibilities, must-have experience, team structure…" />
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
        <SubmitButton loading={state === "loading"}>{step < steps.length - 1 ? "Continue" : "Send brief"}</SubmitButton>
      </div>
    </form>
  );
}
