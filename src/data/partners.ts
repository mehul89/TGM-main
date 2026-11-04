export interface PartnerProfile {
  id: string;
  img: string;
  alt: string;
  eyebrow: string;
  eyebrowClass: string;
  name: string;
  role: string;
  introHtml: string;
  partnerIntro: string;
  creds: string;
  langs: string;
  proof: [string, string][];
  timeline: [string, string][];
  bgClass?: string;
  contactUrl?: string;
}

export const PARTNERS: PartnerProfile[] = [
  {
    id: "yogesh",
    img: "/assets/img/yogesh-trivedi.jpg",
    alt: "Portrait of CA Yogesh Trivedi",
    contactUrl: "https://yogesh-pannalal-trivedi.vercel.app",
    eyebrow: "UAE · Tanzania · Zambia · Mozambique",
    eyebrowClass: "eyebrow africa",
    name: "CA Yogesh Pannalal Trivedi",
    role: "Founding Partner · Finance review & Fractional CFO",
    partnerIntro:
      "Chartered Accountant (ICAI, 2008). 18 years running finance from inside trading, fit-out, logistics, petroleum and education groups. He checks your accountant and your software, then builds the controls that keep them honest.",
    introHtml: `
      <p style="font-size:17px;line-height:28px;margin:0 0 14px">Chartered Accountant (ICAI, 2008) and M.Com, with 18 years running finance from inside operating businesses across the UAE, India, Tanzania, Zambia and Mozambique. Group CFO, Finance Controller and twice a fractional CFO for owner-run groups in trading, fit-out, logistics, petroleum and education.</p>
      <p style="font-size:17px;line-height:28px;margin:0">He doesn't replace your accountant or your software. He checks them, and builds automated controls so problems surface every month, not at year-end.</p>
    `,
    creds: "Chartered Accountant, ICAI (2008)<br>M.Com, Gujarat University",
    langs: "English, Hindi, Gujarati, Marwari · working Swahili and Portuguese",
    proof: [
      ["150+ → <120 days", "to collect from customers, UAE fit-out group"],
      ["80% input VAT recovered", "on a capital project, working directly with the Mozambique tax authority"],
      ["5 countries", "finance teams led at once, East Africa"],
      ["Clean compliance", "VAT, payroll taxes and social security — no adverse findings across Big 4 audits, Tanzania"],
      ["Group ERP rollout", "finance, projects and inventory in one system, reconciliations automated across entities, UAE"],
      ["3–4 days saved", "per cross-border delivery through an agent network and digital proof of delivery, East Africa"],
      ["Lower funding cost", "capital project borrowing moved from local currency to USD, Mozambique"],
    ],
    timeline: [
      ["2026 – now", "Founding Partner, TGM Accounting & Auditing LLC, Dubai"],
      ["2025 – 2026", "Group Finance Manager, Joga Ram Group, Dubai — building materials, joinery, fit-out"],
      ["2021 – 2025", "CFO, Eaglite General Trading, Dubai — fractional, then full-time; three-country trading group"],
      ["2022", "Fractional CFO, Lake Trans Logistics — five East African countries"],
      ["2016 – 2020", "Finance Manager, Sharaf Group — Tanzania and Mozambique"],
      ["2012 – 2015", "Finance Controller, Export Trading Group — Tanzania"],
      ["2009 – 2012", "Finance Controller, Acer Petroleum — Tanzania · Finance Manager, Karnavati University — India"],
    ],
  },
  {
    id: "anil",
    img: "/assets/img/anil-chowhan.jpg",
    alt: "Portrait of Anil Chowhan",
    eyebrow: "UAE banking",
    eyebrowClass: "eyebrow uae",
    name: "Anil Chowhan",
    role: "Partner · Banking & capital readiness",
    partnerIntro:
      "19 years in banking at ICICI Bank, RAKBANK and Commercial Bank of Dubai, where he managed 300 SME accounts. He reads your business the way a credit officer will — before the credit officer does.",
    introHtml: `
      <p style="font-size:17px;line-height:28px;margin:0 0 14px">Anil has spent his career on both sides of the lending table — as a relationship and credit officer at ICICI Bank, RAKBANK and Commercial Bank of Dubai, and later leading SME and commercial-mortgage business through broker networks.</p>
      <p style="font-size:17px;line-height:28px;margin:0">He reads a business the way a lender does — financial statements, bank statements, turnover and cash flow — so you go to the bank with a file that is ready for credit.</p>
    `,
    creds: "MBA (Finance & Marketing), Osmania University<br>PG Diploma, Banking Operations, NIIT IFBI<br>B.Com",
    langs: "English, Hindi · Taqdeer Award 2016, Commercial Bank of Dubai",
    proof: [
      ["19 years", "in banking and finance, UAE and India"],
      ["300 SME loan accounts", "managed within credit policy, Commercial Bank of Dubai"],
      ["Taqdeer Award 2016", "Commercial Bank of Dubai, Business Banking"],
      ["Channel builder", "built and led a direct sales agent network for SME and commercial-mortgage lending"],
      ["CBUAE, AML & KYC", "fluent in the requirements every UAE credit file must meet"],
    ],
    timeline: [
      ["2024 – now", "Sales Director, Expertden International, UAE"],
      ["2022 – 2024", "Unit Head, SME & Commercial Mortgage, Finarise Commercial Brokers"],
      ["2020", "Relationship Manager, Reem Finance PJSC"],
      ["2015 – 2019", "Acting Team Leader · Senior Relationship Officer (SME), Commercial Bank of Dubai"],
      ["2013 – 2014", "Relationship Officer (SME), RAKBANK"],
      ["2007 – 2012", "Senior Officer, Retail & HNI Banking, ICICI Bank, India"],
    ],
    bgClass: "sec-raised",
  },
];
