import type { Metadata } from "next";
import { company } from "@/lib/data";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "Privacy Notice", description: "How Circular Resourcing Limited collects, uses and protects your personal data." };

// Summary version. Have the full GDPR privacy notice reviewed by your legal or compliance advisor before launch.
const sections = [
  { id: "who", h: "Who we are", p: `${company.legalName} ("we", "us") is a recruitment business based at ${company.address.join(", ")}. We are the data controller for personal data processed through this website and our recruitment services.` },
  { id: "collect", h: "What we collect", p: "Information you give us, such as your name, contact details, CV, employment history, qualifications, salary expectations and preferences, plus technical data such as IP address and browsing behaviour on our site." },
  { id: "use", h: "How we use your data", p: "To provide work-finding services, match you with suitable roles, contact you about opportunities, respond to enquiries, meet our legal obligations and improve our website. We never send your CV to a client without your consent." },
  { id: "basis", h: "Lawful basis", p: "We process data on the basis of legitimate interests, consent, contract performance and legal obligation, as appropriate to each activity." },
  { id: "retention", h: "Retention", p: "We keep personal data only as long as needed for the purposes it was collected for, and review candidate records regularly." },
  { id: "rights", h: "Your rights", p: `You have the right to access, rectify, erase, restrict or object to processing of your data, and to data portability. To exercise these rights, email ${company.email}. You may also complain to the Information Commissioner's Office (ico.org.uk).` },
  { id: "cookies", h: "Cookies", p: "We use essential cookies to make the website work, and may use analytics cookies to understand how visitors use it. Saved jobs are stored locally in your browser and never sent to us." },
];

export default function Privacy() {
  return (
    <>
      <PageHero eyebrow="Legal" compact image="/media/city-aerial.jpg" title="Privacy notice" text="GDPR-compliant summary of how we handle your personal data." crumbs={[{ label: "Privacy" }]} />
      <section className="py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[240px_1fr]">
          <nav className="hidden lg:block">
            <ul className="sticky top-28 space-y-2 text-sm">
              {sections.map((s) => <li key={s.id}><a href={`#${s.id}`} className="text-navy-900/60 hover:text-navy-900">{s.h}</a></li>)}
            </ul>
          </nav>
          <div className="max-w-3xl space-y-10">
            {sections.map((s) => (
              <div key={s.id} id={s.id} className="scroll-mt-28">
                <h2 className="text-2xl font-medium tracking-tight text-navy-950">{s.h}</h2>
                <p className="mt-3 leading-relaxed text-navy-900/70">{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
