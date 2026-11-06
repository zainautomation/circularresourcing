import type { Metadata } from "next";
import { Inter_Tight, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";

const inter = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight", display: "swap" });
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://circularresourcing.com"),
  title: {
    default: "Circular Resourcing | Renewable Energy Recruitment: Solar, BESS & Wind",
    template: "%s | Circular Resourcing",
  },
  description:
    "Specialist recruitment for the energy transition. Permanent, executive search and embedded hiring for Utility-Scale Solar, Battery Storage (BESS) and Wind across the UK, Europe and North America.",
  openGraph: {
    title: "Circular Resourcing | Renewable Energy Recruitment",
    description: "The bridge to top talent in renewable energy.",
    type: "website",
    images: ["/media/solar-field.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${instrument.variable}`}>
      <body className="min-h-screen font-sans">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2">
          Skip to content
        </a>
        <SmoothScroll />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
