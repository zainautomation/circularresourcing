"use client";
import { useState } from "react";
import { Chips, Consent, Field, Success, SubmitButton, postForm } from "./fields";

const init = { name: "", email: "", phone: "", company: "", topic: ["Hiring"], message: "", consent: false };

export function ContactForm() {
  const [d, setD] = useState(init);
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState("");
  const set = <K extends keyof typeof init>(k: K) => (v: (typeof init)[K]) => setD((x) => ({ ...x, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setError("");
    try {
      await postForm({ type: "contact", ...d });
      setState("done");
    } catch (err) {
      setError((err as Error).message);
      setState("idle");
    }
  }

  if (state === "done")
    return <Success title="Message sent!" text="Thanks for getting in touch. We aim to reply within one working day." onReset={() => { setD(init); setState("idle"); }} />;

  return (
    <form onSubmit={submit} className="space-y-8">
      <Chips label="I'm getting in touch about" multi={false} options={["Hiring", "Finding a job", "Circular Embedded", "Joining our team", "Something else"]} value={d.topic} onChange={set("topic")} />
      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="Full name" name="name" required value={d.name} onChange={set("name")} autoComplete="name" />
        <Field label="Email" name="email" type="email" required value={d.email} onChange={set("email")} autoComplete="email" />
      </div>
      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="Phone" name="phone" type="tel" value={d.phone} onChange={set("phone")} autoComplete="tel" />
        <Field label="Company" name="company" value={d.company} onChange={set("company")} autoComplete="organization" />
      </div>
      <Field label="Message" name="message" required textarea value={d.message} onChange={set("message")} placeholder="How can we help?" />
      <Consent checked={d.consent} onChange={set("consent")} />
      {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      <SubmitButton loading={state === "loading"}>Send message</SubmitButton>
    </form>
  );
}
