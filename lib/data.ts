// Central content for the site. Real facts (contact details, disciplines, services,
// 4.8/5 rating, 10+ years, 95% placement stat) come from circularresourcing.com.
// Items marked PLACEHOLDER are illustrative and should be replaced with real data.

export const company = {
  name: "Circular Resourcing",
  legalName: "Circular Resourcing Limited",
  tagline: "The bridge to top talent in renewable energy.",
  email: "hello@circularresourcing.com",
  founderEmail: "sam.elliott@circularresourcing.com",
  phone: "+44 161 388 1800",
  phoneHref: "tel:+441613881800",
  address: [
    "Suite 3, 2nd Floor, Didsbury House",
    "748-754 Wilmslow Road, Withington",
    "Manchester M20 2DW, United Kingdom",
  ],
  rating: 4.8,
  ratingCount: 4754,
};

export const nav = [
  { label: "Jobs", href: "/jobs" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Contingent Recruitment", href: "/services#contingent", desc: "Permanent and direct-hire search" },
      { label: "Executive Search", href: "/services#executive", desc: "Mid-senior and C-suite appointments" },
      { label: "Circular Embedded", href: "/services#embedded", desc: "Monthly, rolling embedded hiring" },
    ],
  },
  { label: "Employers", href: "/employers" },
  { label: "Job Seekers", href: "/job-seekers" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
];

export const sectors = [
  { key: "solar", name: "Utility-Scale Solar", short: "Solar PV", color: "#ffc65c" },
  { key: "bess", name: "Battery Storage (BESS)", short: "BESS", color: "#9bcb5b" },
  { key: "wind", name: "Onshore & Offshore Wind", short: "Wind", color: "#4fb3e0" },
  { key: "hydrogen", name: "Green Hydrogen", short: "Hydrogen", color: "#b4dc7a" },
  { key: "grid", name: "Grid & Transmission", short: "Grid", color: "#2a96c8" },
];

export const clientTypes = [
  "Developers",
  "Independent Power Producers",
  "Investment & Infrastructure Funds",
  "EPC Contractors",
  "Asset Managers",
  "Utilities",
  "O&M Providers",
  "Energy Traders",
];

export type Discipline = {
  id: string;
  title: string;
  icon: string;
  summary: string;
  roles: string[];
};

export const disciplines: Discipline[] = [
  {
    id: "leadership",
    title: "Leadership",
    icon: "Crown",
    summary:
      "C-suite, executive and director-level hires who set strategy, raise capital and scale platforms across new markets.",
    roles: ["CEO / Managing Director", "Country Director", "Development Director", "Technical Director", "General Manager", "Commercial Director"],
  },
  {
    id: "development",
    title: "Development",
    icon: "Map",
    summary:
      "The people who find, secure and permit sites, turning greenfield land into shovel-ready, financeable projects.",
    roles: ["Project Developer", "Project Origination", "Land Acquisition", "Planning & Permitting", "Stakeholder Engagement", "Development Manager"],
  },
  {
    id: "origination",
    title: "Origination & Trading",
    icon: "LineChart",
    summary:
      "Commercial specialists who structure PPAs, trade power and model revenue stacks for merchant and contracted assets.",
    roles: ["Origination (PPA)", "Power Trading", "Energy Trading", "Energy Modelling", "Route-to-Market Manager", "Optimisation Analyst"],
  },
  {
    id: "finance",
    title: "Finance & Investment",
    icon: "Landmark",
    summary:
      "M&A, investment and structured finance professionals who fund the energy transition, from term sheet to financial close.",
    roles: ["M&A", "Investment Management", "Corporate Finance", "Structured Finance", "Project Finance", "Financial Modelling", "Financial Analyst"],
  },
  {
    id: "technical",
    title: "Technical Engineering",
    icon: "Zap",
    summary:
      "Grid, power systems and asset specialists who connect, operate and optimise generation and storage assets.",
    roles: ["Grid Connection", "Power Systems", "Transmission", "Interconnection", "Asset Management", "SCADA & Controls"],
  },
  {
    id: "construction",
    title: "Construction & Site",
    icon: "HardHat",
    summary:
      "Site-based leaders who deliver projects safely, on time and on budget, from mobilisation to commissioning.",
    roles: ["Project Management & Engineering", "Construction Management", "Construction Supervision", "Electrical / Mechanical / Civil Engineering", "HSE", "Quality", "Logistics"],
  },
];

export type Service = {
  id: string;
  name: string;
  label: string;
  icon: string;
  lead: string;
  body: string;
  points: string[];
  bestFor: string[];
  model: string;
};

export const services: Service[] = [
  {
    id: "contingent",
    name: "Contingent Recruitment",
    label: "Permanent / Direct Hire",
    icon: "UserCheck",
    lead: "Specialist permanent hiring across Corporate, Commercial and Technical Engineering.",
    body:
      "We take a proactive approach and match exceptional candidates with the employers they want to work for, and the other way round. You only pay when we place someone.",
    points: [
      "Deep, sector-specific candidate networks",
      "Pre-screened, motivated shortlists",
      "Market salary and benefits benchmarking",
      "Offer management and onboarding support",
    ],
    bestFor: ["Single permanent hires", "Specialist technical roles", "Hard-to-fill vacancies"],
    model: "Success fee on placement",
  },
  {
    id: "executive",
    name: "Executive Search",
    label: "Mid / Senior / C-Suite",
    icon: "Target",
    lead: "Discreet, research-led search for the leaders who shape fast-growing renewables businesses.",
    body:
      "This is where most of our recent success has been: placing executives into scaling renewable energy platforms. We work in partnership on a Retained, Engaged or Exclusive basis, built around your brief.",
    points: [
      "Market mapping and talent intelligence",
      "Confidential, headhunted approaches",
      "Structured competency assessment",
      "Regular progress reporting",
    ],
    bestFor: ["C-suite and director hires", "Confidential replacements", "Market-entry leadership"],
    model: "Retained, Engaged or Exclusive",
  },
  {
    id: "embedded",
    name: "Circular Embedded",
    label: "Simple solution. Great results.",
    icon: "Repeat",
    lead: "Your own embedded talent partner for a predictable monthly fee, on a rolling contract.",
    body:
      "For a monthly fee, we support your key hires on a rolling basis, built around your needs. Hiring gets easier, with no long-term commitment, so you can grow cost-effectively.",
    points: [
      "Dedicated recruiter who knows your business",
      "Unlimited roles within agreed scope",
      "Employer branding and candidate experience",
      "Pause or scale with no long-term lock-in",
    ],
    bestFor: [
      "Fast-growing companies without HR or TA infrastructure",
      "Bursts of multiple hires alongside existing HR or TA teams",
      "Setting up or hiring in new geographies",
    ],
    model: "Monthly fee, rolling contract",
  },
];

export const process = [
  { step: "01", title: "Discovery call", text: "We learn your business, culture, growth plans and what success looks like in the role." },
  { step: "02", title: "Market mapping", text: "We map the talent landscape, benchmark salaries and agree a clear search strategy." },
  { step: "03", title: "Targeted search", text: "We engage active and passive candidates from our specialist renewables network." },
  { step: "04", title: "Curated shortlist", text: "You receive a pre-qualified shortlist with candid notes on every candidate." },
  { step: "05", title: "Interview & offer", text: "We coordinate interviews, manage feedback and negotiate offers so they get accepted." },
  { step: "06", title: "Onboard & aftercare", text: "We stay close after the start date to make sure every placement lasts." },
];

export const stats = [
  { value: 10, suffix: "+", label: "Years recruiting in global energy" },
  { value: 95, suffix: "%", label: "Of placements within our core disciplines" },
  { value: 3, suffix: "", label: "Core regions: UK, Europe & North America" },
  { value: 4.8, suffix: "/5", label: "Average client & candidate rating", decimals: 1 },
];

export const regions = [
  { name: "United Kingdom & Ireland", x: 46, y: 19, hq: true, markets: ["Manchester (HQ)", "London", "Scotland", "Ireland"] },
  { name: "Europe", x: 53, y: 23, markets: ["Germany", "Spain", "Italy", "France", "Nordics", "Poland"] },
  { name: "North America", x: 20, y: 24, markets: ["United States", "Canada"] },
];

export const values = [
  { title: "Simple", text: "Clear processes, plain language and no surprises. Recruitment shouldn't be complicated.", icon: "Sparkles" },
  { title: "Honest", text: "Candid advice on the market, salaries and candidates, even when it isn't what you want to hear.", icon: "ShieldCheck" },
  { title: "Transparent", text: "Full visibility of progress, pipeline and fees from day one.", icon: "Eye" },
  { title: "Long-term", text: "We build partnerships, not transactions. Most of our work comes from repeat clients and referrals.", icon: "Infinity" },
];

// PLACEHOLDER testimonials: replace with real, approved quotes.
export const testimonials = [
  {
    quote:
      "Circular understood our BESS pipeline better than any agency we've used. They filled three grid connection roles in under six weeks.",
    name: "Head of Development",
    company: "Utility-scale storage developer, UK",
  },
  {
    quote:
      "A genuinely consultative partner. The executive search for our Country Director was discreet, well-researched and found someone we'd never have reached.",
    name: "Chief Executive Officer",
    company: "European solar IPP",
  },
  {
    quote:
      "The Embedded model was a game changer while we scaled into North America. It felt like having our own in-house talent team.",
    name: "VP People",
    company: "Renewables platform, US & Canada",
  },
  {
    quote:
      "Honest, responsive and properly knowledgeable about the sector. Sam found me a role that was a real step up and supported me through every stage.",
    name: "Senior Power Systems Engineer",
    company: "Placed candidate",
  },
];

export const faqs = {
  employers: [
    { q: "What sectors do you recruit for?", a: "We focus on the energy transition: utility-scale solar, battery energy storage (BESS) and wind, plus adjacent areas such as grid, transmission and green hydrogen." },
    { q: "Which regions do you cover?", a: "We run searches across the UK, Europe and North America, and we help clients build teams in new geographies." },
    { q: "How are your fees structured?", a: "Contingent recruitment is a success fee on placement. Executive Search runs on a Retained, Engaged or Exclusive basis. Circular Embedded is a predictable monthly fee on a rolling contract with no long-term commitment." },
    { q: "How quickly can you deliver a shortlist?", a: "For most technical and commercial roles we aim to share an initial, qualified shortlist within 7–10 working days of a confirmed brief." },
    { q: "Do you recruit outside your core disciplines?", a: "Yes. Around 95% of our recent placements fall within our core disciplines, but we're happy to discuss roles outside them." },
  ],
  candidates: [
    { q: "Do I pay anything to work with you?", a: "Never. Our service is free for candidates. Our clients pay our fees." },
    { q: "Will you share my CV without permission?", a: "No. We always discuss a role with you and get your explicit consent before your details go to any employer." },
    { q: "I don't see the right role. Should I still register?", a: "Yes. Many of our roles are filled before they're advertised. Register your CV and we'll get in touch when something fits." },
    { q: "Can you help me move into renewables from another industry?", a: "Often, yes. Engineers, project managers and finance professionals from oil & gas, utilities, construction and infrastructure transfer very well. Talk to us about your options." },
  ],
};

// PLACEHOLDER roles: example listings to demonstrate the job board. Replace with a live feed or CMS.
export type Job = {
  slug: string;
  title: string;
  location: string;
  country: string;
  sector: string;
  discipline: string;
  type: "Permanent" | "Contract" | "Interim";
  workplace: "On-site" | "Hybrid" | "Remote";
  salary: string;
  posted: string;
  featured?: boolean;
  summary: string;
  responsibilities: string[];
  requirements: string[];
};

export const jobs: Job[] = [
  {
    slug: "head-of-grid-connections-bess",
    title: "Head of Grid Connections",
    location: "Manchester",
    country: "United Kingdom",
    sector: "BESS",
    discipline: "Technical Engineering",
    type: "Permanent",
    workplace: "Hybrid",
    salary: "£110k – £130k + bonus",
    posted: "2026-10-30",
    featured: true,
    summary: "Lead the grid strategy for a multi-GW battery storage pipeline at a fast-growing UK developer.",
    responsibilities: ["Own grid applications and DNO/TO relationships", "Build and lead a team of grid engineers", "Shape connection strategy under the reformed queue process"],
    requirements: ["10+ years in UK grid connections", "Strong knowledge of NESO and DNO processes", "Experience leading technical teams"],
  },
  {
    slug: "country-director-spain-solar",
    title: "Country Director – Iberia",
    location: "Madrid",
    country: "Spain",
    sector: "Solar PV",
    discipline: "Leadership",
    type: "Permanent",
    workplace: "Hybrid",
    salary: "€180k – €220k + LTIP",
    posted: "2026-10-27",
    featured: true,
    summary: "Build and lead the Iberian platform of an international IPP with a 2 GW solar and storage pipeline.",
    responsibilities: ["Full P&L ownership for Spain and Portugal", "Lead development, construction and asset teams", "Represent the business to investors and government"],
    requirements: ["Proven country or GM leadership in renewables", "Fluent Spanish and English", "Track record of taking projects to COD"],
  },
  {
    slug: "senior-power-systems-engineer",
    title: "Senior Power Systems Engineer",
    location: "Glasgow",
    country: "United Kingdom",
    sector: "Wind",
    discipline: "Technical Engineering",
    type: "Permanent",
    workplace: "Hybrid",
    salary: "£75k – £90k",
    posted: "2026-10-25",
    summary: "Carry out grid compliance studies for onshore and offshore wind portfolios.",
    responsibilities: ["Load flow, short circuit and harmonic studies", "Grid Code compliance packages", "Technical due diligence support"],
    requirements: ["PowerFactory or PSS/E expertise", "Chartered or working towards", "Wind or HV substation experience"],
  },
  {
    slug: "ppa-origination-manager",
    title: "PPA Origination Manager",
    location: "London",
    country: "United Kingdom",
    sector: "Solar PV",
    discipline: "Origination & Trading",
    type: "Permanent",
    workplace: "Hybrid",
    salary: "£95k – £115k + bonus",
    posted: "2026-10-22",
    summary: "Originate and structure corporate PPAs for a leading pan-European renewables platform.",
    responsibilities: ["Build relationships with C&I offtakers", "Structure and negotiate PPAs", "Work with trading on pricing and risk"],
    requirements: ["5+ years in PPA origination or energy sales", "Strong commercial and negotiation skills", "Understanding of power markets"],
  },
  {
    slug: "construction-manager-bess-texas",
    title: "Construction Manager – BESS",
    location: "Houston, TX",
    country: "United States",
    sector: "BESS",
    discipline: "Construction & Site",
    type: "Permanent",
    workplace: "On-site",
    salary: "$150k – $175k + per diem",
    posted: "2026-10-20",
    featured: true,
    summary: "Deliver a 400 MWh battery storage project from NTP through commissioning in ERCOT.",
    responsibilities: ["Manage EPC and subcontractors on site", "Own schedule, safety and quality", "Coordinate commissioning and energisation"],
    requirements: ["Utility-scale BESS or solar construction experience", "OSHA 30", "Strong HSE leadership"],
  },
  {
    slug: "investment-director-infrastructure-fund",
    title: "Investment Director",
    location: "London",
    country: "United Kingdom",
    sector: "Multi-technology",
    discipline: "Finance & Investment",
    type: "Permanent",
    workplace: "Hybrid",
    salary: "£160k – £200k + carry",
    posted: "2026-10-18",
    summary: "Lead energy transition deals for a mid-market infrastructure fund.",
    responsibilities: ["Originate and execute M&A transactions", "Lead financial modelling and IC papers", "Board roles on portfolio companies"],
    requirements: ["Infrastructure PE or corporate finance background", "Renewables transaction track record", "Excellent modelling skills"],
  },
  {
    slug: "land-acquisition-manager-germany",
    title: "Land Acquisition Manager",
    location: "Hamburg",
    country: "Germany",
    sector: "Wind",
    discipline: "Development",
    type: "Permanent",
    workplace: "Hybrid",
    salary: "€85k – €100k",
    posted: "2026-10-15",
    summary: "Secure land for onshore wind and solar parks across northern Germany.",
    responsibilities: ["Negotiate leases with landowners", "Manage land portfolio and rights", "Work with planning on site selection"],
    requirements: ["Experience in land acquisition for renewables", "Native-level German", "Strong negotiation skills"],
  },
  {
    slug: "energy-trader-battery-optimisation",
    title: "Energy Trader – Battery Optimisation",
    location: "Remote (UK)",
    country: "United Kingdom",
    sector: "BESS",
    discipline: "Origination & Trading",
    type: "Permanent",
    workplace: "Remote",
    salary: "£80k – £110k + bonus",
    posted: "2026-10-12",
    summary: "Optimise a growing fleet of grid-scale batteries across wholesale, BM and ancillary markets.",
    responsibilities: ["Day-ahead and intraday trading", "Develop optimisation strategies", "Analyse revenue performance"],
    requirements: ["Short-term power trading experience", "Python or similar a plus", "GB market knowledge"],
  },
  {
    slug: "hse-manager-solar-construction",
    title: "HSE Manager",
    location: "Toronto, ON",
    country: "Canada",
    sector: "Solar PV",
    discipline: "Construction & Site",
    type: "Contract",
    workplace: "On-site",
    salary: "CA$85 – CA$100 / hr",
    posted: "2026-10-10",
    summary: "Lead health and safety across a portfolio of utility-scale solar construction sites.",
    responsibilities: ["Implement HSE management system", "Run site audits and incident investigations", "Coach site teams on safety culture"],
    requirements: ["NEBOSH or CRSP", "Utility-scale construction HSE experience", "Willing to travel between sites"],
  },
  {
    slug: "asset-manager-wind-portfolio",
    title: "Asset Manager – Wind",
    location: "Edinburgh",
    country: "United Kingdom",
    sector: "Wind",
    discipline: "Technical Engineering",
    type: "Permanent",
    workplace: "Hybrid",
    salary: "£70k – £85k",
    posted: "2026-10-06",
    summary: "Maximise the performance and value of a 600 MW operational onshore wind portfolio.",
    responsibilities: ["Commercial and technical asset performance", "Manage O&M contracts", "Budgeting and investor reporting"],
    requirements: ["Operational wind asset management experience", "Commercial acumen", "Engineering degree"],
  },
  {
    slug: "interim-project-finance-manager",
    title: "Project Finance Manager",
    location: "Amsterdam",
    country: "Netherlands",
    sector: "Multi-technology",
    discipline: "Finance & Investment",
    type: "Interim",
    workplace: "Hybrid",
    salary: "€850 – €1,000 / day",
    posted: "2026-10-02",
    summary: "Lead debt financing for a portfolio of solar and storage projects through financial close.",
    responsibilities: ["Run lender processes and term sheets", "Manage the financial model and due diligence", "Coordinate legal and technical advisers"],
    requirements: ["Renewables project finance experience", "Strong modelling", "Available within 4 weeks"],
  },
  {
    slug: "electrical-design-engineer-hv",
    title: "Electrical Design Engineer (HV)",
    location: "Manchester",
    country: "United Kingdom",
    sector: "Solar PV",
    discipline: "Technical Engineering",
    type: "Permanent",
    workplace: "Hybrid",
    salary: "£55k – £70k",
    posted: "2026-09-28",
    summary: "Design HV substations and collector systems for solar and co-located storage projects.",
    responsibilities: ["Single line diagrams and cable sizing", "Earthing and protection design", "Support grid applications"],
    requirements: ["HV design experience (33kV–132kV)", "AutoCAD / ETAP", "Degree in Electrical Engineering"],
  },
];

export type Insight = {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  body: string[];
};

export const insights: Insight[] = [
  {
    slug: "bess-talent-shortage-2026",
    title: "The BESS talent crunch: where the next 5,000 engineers come from",
    category: "Market Insight",
    readTime: "6 min",
    date: "2026-10-14",
    excerpt: "Battery storage pipelines are outpacing the talent pool. Here's how leading developers are building teams anyway.",
    body: [
      "Grid-scale battery storage has moved from niche to mainstream in under five years. Pipelines across the UK, Europe and North America now run into hundreds of gigawatts, but the people needed to develop, connect and operate these assets haven't kept pace.",
      "The tightest areas are grid connections, power systems and commissioning. Candidates with proven BESS experience often hold several offers at once, and counter-offers are common.",
      "The developers winning this talent race share three habits: they hire for transferable skills from adjacent sectors, they move decisively through interviews, and they sell a clear growth story rather than relying on salary alone.",
      "Our advice to hiring managers: compress your process to three stages, benchmark early, and treat your interview as a pitch as much as an assessment.",
    ],
  },
  {
    slug: "salary-benchmarks-renewables",
    title: "Renewables salary benchmarks: what's changed this year",
    category: "Salary Guide",
    readTime: "5 min",
    date: "2026-09-29",
    excerpt: "From grid engineers to PPA originators, we break down movement in base pay, bonuses and benefits.",
    body: [
      "Salary growth across the energy transition has stabilised after a sharp post-2022 spike, but specialist roles still command clear premiums.",
      "Grid connection and power systems specialists saw the strongest base salary growth, followed by origination and trading roles linked to battery optimisation.",
      "Flexible working is now expected rather than a perk for most office-based roles, while site-based roles increasingly come with retention bonuses and enhanced travel packages.",
      "Get in touch for a tailored benchmarking report for your specific roles and regions.",
    ],
  },
  {
    slug: "moving-into-renewables-from-oil-and-gas",
    title: "Switching from oil & gas to renewables: a practical guide",
    category: "Career Advice",
    readTime: "7 min",
    date: "2026-09-12",
    excerpt: "Your skills transfer more than you think. Here's how to position your experience for the energy transition.",
    body: [
      "Project managers, HSE professionals, electrical engineers and commercial specialists from oil & gas are some of the most sought-after candidates in renewables.",
      "The key is translation. Frame your experience in terms of delivery, risk, stakeholder management and safety culture rather than sector-specific jargon.",
      "Short courses in grid fundamentals, PPAs or BESS technology can bridge knowledge gaps quickly and show commitment to the transition.",
      "Talk to a specialist recruiter who can open doors with employers that actively value transferable experience.",
    ],
  },
  {
    slug: "embedded-recruitment-explained",
    title: "Embedded recruitment: when it beats agency fees",
    category: "Hiring Strategy",
    readTime: "4 min",
    date: "2026-08-26",
    excerpt: "If you're planning several hires in a short period, an embedded model can cut costs and improve quality.",
    body: [
      "Traditional contingent recruitment works well for one-off hires. When a business needs to make several key hires at once, often while entering a new market, the fees add up fast.",
      "An embedded model gives you a dedicated recruiter who works as an extension of your team for a fixed monthly fee, on a rolling contract.",
      "Beyond cost, you get consistent employer branding, better candidate experience and a recruiter who really understands your culture.",
      "Use our comparison tool on the Services page to see whether Embedded makes sense for your hiring plan.",
    ],
  },
  {
    slug: "executive-search-what-to-expect",
    title: "What great executive search looks like in clean energy",
    category: "Hiring Strategy",
    readTime: "5 min",
    date: "2026-08-08",
    excerpt: "Market mapping, confidential approaches and calibrated shortlists: the anatomy of a successful senior search.",
    body: [
      "Senior hires in renewables have an outsized impact. A strong Country Director or Development Director can unlock gigawatts of pipeline, and the wrong hire can set a business back years.",
      "A strong search starts with a sharp brief and a full market map, so you see the whole landscape, not just the candidates who happen to be looking.",
      "Confidential approaches, structured assessment and close referencing reduce risk, while regular reporting keeps stakeholders aligned.",
      "We run executive searches on a Retained, Engaged or Exclusive basis, depending on your needs.",
    ],
  },
  {
    slug: "cv-tips-renewable-energy",
    title: "7 CV tips for standing out in renewable energy",
    category: "Career Advice",
    readTime: "3 min",
    date: "2026-07-21",
    excerpt: "Hiring managers scan CVs in seconds. Make yours count with these sector-specific tips.",
    body: [
      "Lead with the numbers: MW or MWh delivered, project values, team sizes and timelines.",
      "List the technologies and tools you know, such as PowerFactory, PVsyst, PLEXOS or Primavera, in a dedicated skills section.",
      "Show where your projects were in the lifecycle (development, construction, operations) so employers see the fit instantly.",
      "Keep it to two pages, tailor it to each role, and add a short profile that says what you want next.",
    ],
  },
];
