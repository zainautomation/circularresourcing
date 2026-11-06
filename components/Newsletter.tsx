"use client";
import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "newsletter", email }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done")
    return <p className="flex items-center gap-3 border-b border-white/20 py-4 text-lime-400"><Check className="size-5" /> You&apos;re subscribed.</p>;

  return (
    <form onSubmit={submit}>
      <div className="flex items-center border-b border-white/25 transition-colors focus-within:border-white">
        <label htmlFor="nl-email" className="sr-only">Email address</label>
        <input
          id="nl-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className="min-w-0 flex-1 bg-transparent py-4 text-lg text-white placeholder:text-white/35 focus:outline-none"
        />
        <button disabled={state === "loading"} aria-label="Subscribe" className="grid size-11 place-items-center rounded-full bg-white text-navy-950 transition hover:bg-lime-500 disabled:opacity-60">
          {state === "loading" ? <Loader2 className="size-4 animate-spin" /> : <ArrowRight className="size-4" />}
        </button>
      </div>
      {state === "error" && <p className="mt-2 text-sm text-red-300">Something went wrong. Please try again.</p>}
    </form>
  );
}
