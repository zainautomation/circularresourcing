import { NextResponse } from "next/server";

// Receives all site form submissions (contact, CV, vacancy, newsletter, job applications).
// TODO: connect to an email provider (e.g. Resend, SendGrid) or ATS/CRM such as Bullhorn or Vincere.
const required: Record<string, string[]> = {
  newsletter: ["email"],
  contact: ["name", "email", "message"],
  cv: ["firstName", "lastName", "email"],
  vacancy: ["company", "name", "email", "jobTitle"],
  apply: ["name", "email", "job"],
};

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  const contentType = req.headers.get("content-type") ?? "";
  try {
    if (contentType.includes("multipart/form-data")) {
      const fd = await req.formData();
      body = {};
      fd.forEach((v, k) => {
        body[k] = typeof v === "string" ? v : `[file] ${v.name} (${Math.round(v.size / 1024)} KB)`;
      });
    } else {
      body = await req.json();
    }
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const type = String(body.type ?? "");
  const fields = required[type];
  if (!fields) return NextResponse.json({ ok: false, error: "Unknown form" }, { status: 400 });

  const missing = fields.filter((f) => !String(body[f] ?? "").trim());
  if (missing.length) return NextResponse.json({ ok: false, error: `Missing: ${missing.join(", ")}` }, { status: 422 });

  const email = String(body.email ?? "");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 422 });
  }

  console.log(`[form:${type}]`, body);
  return NextResponse.json({ ok: true });
}
