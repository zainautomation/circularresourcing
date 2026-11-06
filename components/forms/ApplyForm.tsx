"use client";
import { useState } from "react";
import { Consent, Field, FileDrop, Success, SubmitButton, postForm } from "./fields";

export function ApplyForm({ job }: { job: string }) {
  const [d, setD] = useState({ name: "", email: "", phone: "", message: "", consent: false });
  const [file, setFile] = useState<File | null>(null);
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return setError("Please attach your CV.");
    setState("loading");
    setError("");
    try {
      await postForm({ type: "apply", job, ...d }, file);
      setState("done");
    } catch (err) {
      setError((err as Error).message);
      setState("idle");
    }
  }

  if (state === "done")
    return <Success title="Application sent!" text={`Thanks ${d.name.split(" ")[0]}. We'll review your application for ${job} and be in touch shortly.`} />;

  return (
    <form onSubmit={submit} className="space-y-7">
      <Field label="Full name" name="name" required value={d.name} onChange={(v) => setD({ ...d, name: v })} autoComplete="name" />
      <Field label="Email" name="email" type="email" required value={d.email} onChange={(v) => setD({ ...d, email: v })} autoComplete="email" />
      <Field label="Phone" name="phone" type="tel" value={d.phone} onChange={(v) => setD({ ...d, phone: v })} autoComplete="tel" />
      <FileDrop file={file} onFile={setFile} />
      <Field label="Cover note (optional)" name="message" textarea value={d.message} onChange={(v) => setD({ ...d, message: v })} />
      <Consent checked={d.consent} onChange={(v) => setD({ ...d, consent: v })} />
      {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      <SubmitButton loading={state === "loading"}>Apply now</SubmitButton>
    </form>
  );
}
