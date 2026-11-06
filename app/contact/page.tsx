import type { Metadata } from "next";
import { company } from "@/lib/data";
import { heroImages } from "@/lib/images";
import { PageHero } from "@/components/PageHero";
import { Label } from "@/components/ui";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Circular Resourcing. Call +44 161 388 1800 or email hello@circularresourcing.com.",
};

export default function Contact() {
  const rows = [
    { k: "Let's talk", v: company.phone, href: company.phoneHref },
    { k: "Email", v: company.email, href: `mailto:${company.email}` },
    { k: "Speak to Sam", v: company.founderEmail, href: `mailto:${company.founderEmail}` },
  ];
  return (
    <>
      <PageHero
        eyebrow="Contact"
        image={heroImages.contact}
        title={["Let's start a", <span key="c" className="accent text-lime-400">conversation.</span>]}
        text="Whether you're hiring, job hunting or want to talk about the market, we'd love to hear from you. We aim to reply within one working day."
        crumbs={[{ label: "Contact" }]}
      />

      <section className="py-20 sm:py-24">
        <div className="container-x grid gap-20 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <Label n="01">Direct</Label>
            <ul className="mt-10 border-t border-line">
              {rows.map((r) => (
                <li key={r.k} className="border-b border-line">
                  <a href={r.href} className="group block py-6">
                    <span className="text-[13px] uppercase tracking-[0.12em] text-ink/45">{r.k}</span>
                    <span className="mt-2 block break-all text-2xl font-medium tracking-tight text-navy-950 sm:text-3xl"><span className="link-u">{r.v}</span></span>
                  </a>
                </li>
              ))}
              <li className="border-b border-line py-6">
                <span className="text-[13px] uppercase tracking-[0.12em] text-ink/45">Head office</span>
                <address className="mt-2 text-xl not-italic leading-relaxed text-navy-950">{company.address.map((l) => <span key={l} className="block">{l}</span>)}</address>
              </li>
            </ul>
          </div>
          <div>
            <Label n="02">Send a message</Label>
            <div className="mt-10"><ContactForm /></div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-x">
          <div className="overflow-hidden rounded-[4px]">
            <iframe
              title="Circular Resourcing head office map"
              src="https://www.google.com/maps?q=Didsbury+House,+748-754+Wilmslow+Road,+Manchester+M20+2DW&output=embed"
              className="h-[460px] w-full grayscale"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
