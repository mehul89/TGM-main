export interface ConciergeQuestion {
  id: string;
  num: string;
  question: string;
  shortDesc: string;
  answer: string;
  category: string;
}

export const CONCIERGE_QUESTIONS: ConciergeQuestion[] = [
  {
    id: "uae-tax",
    num: "01",
    question: "How does UAE Corporate Tax and VAT apply to my business?",
    shortDesc: "FTA registration, 9% corporate tax, QFZP rules, and quarterly VAT returns.",
    category: "Tax & Compliance",
    answer: "TGM provides complete UAE Corporate Tax and VAT governance. We manage your FTA registration, evaluate Qualifying Free Zone Person (QFZP) 0% vs. 9% taxable status, structure arm's-length transfer pricing files, and file accurate quarterly VAT returns with an unbroken audit trail."
  },
  {
    id: "finance-health-check",
    num: "02",
    question: "What is the TGM Finance Health Check?",
    shortDesc: "An independent, view-only inspection of books and internal controls.",
    category: "Advisory",
    answer: "The Finance Health Check is our signature diagnostic. Working strictly view-only without interrupting your day-to-day operations, our partners review your accounting ledgers, ERP postings, VAT filings, and bank reconciliations. Within 5 to 7 days, you receive an independent findings memo rating control vulnerabilities and valuing financial risks in UAE dirhams."
  },
  {
    id: "fractional-cfo",
    num: "03",
    question: "How does Fractional CFO support work for owner-run businesses?",
    shortDesc: "Chartered Accountant leadership on an agile monthly retainer.",
    category: "Executive Governance",
    answer: "Led by CA Yogesh Trivedi (18+ years running group finance across UAE and East Africa), our Fractional CFO service gives you strategic finance leadership without executive payroll overhead. We institute 13-week rolling cash forecasts, attend board meetings, structure banking covenants, and supervise your internal accountants so errors surface monthly rather than at year-end."
  },
  {
    id: "accounting-bookkeeping",
    num: "04",
    question: "What does your monthly accounting and bookkeeping service include?",
    shortDesc: "Fixed close calendar, backlog clean-up, and IFRS financial statements.",
    category: "Accounting",
    answer: "We deliver disciplined monthly bookkeeping closed on a strict monthly calendar. Every transaction is classified, bank and card accounts are reconciled, supplier balances are maintained, and year-end IFRS statements are prepared audit-ready with full supporting schedules for your external auditor."
  },
  {
    id: "africa-corridor",
    num: "05",
    question: "How do you assist businesses across the UAE–Africa corridor?",
    shortDesc: "Cross-border finance between UAE, Tanzania, Zambia & Mozambique.",
    category: "Cross-Border",
    answer: "For UAE groups operating operating subsidiaries in East Africa—or African businesses establishing their regional holding company in Dubai—we manage cross-border treasury, tax residency documentation, and local compliance with the Tanzania Revenue Authority (TRA), Zambia Revenue Authority (ZRA), and Mozambique's Autoridade Tributária (AT)."
  },
  {
    id: "banking-readiness",
    num: "06",
    question: "How do you help companies secure UAE bank facilities and loans?",
    shortDesc: "Credit-ready financial files, underwriting analysis, and lender meetings.",
    category: "Banking Advisory",
    answer: "Led by partner Anil Chowhan (19 years in corporate and SME banking at Commercial Bank of Dubai, RAKBANK, and ICICI), we prepare your balance sheets, debt service coverage ratios, and cash turnover exactly as tier-1 bank credit committees evaluate them, attending lender meetings with you to secure working capital and mortgage facilities."
  },
  {
    id: "internal-controls",
    num: "07",
    question: "How can TGM protect my company from internal fraud and errors?",
    shortDesc: "Automated reconciliation layers, delegation of authority, and ERP controls.",
    category: "Controls & Automation",
    answer: "We implement rigorous internal control frameworks designed for growing owner-operated enterprises: dual-signatory banking thresholds, inventory three-way matching, automated intercompany reconciliations, and strict delegation of authority matrices that safeguard company liquidity."
  },
  {
    id: "business-setup",
    num: "08",
    question: "Can TGM assist with Dubai company formation and corporate banking?",
    shortDesc: "Mainland vs. Free Zone selection, licensing, and corporate bank accounts.",
    category: "Corporate Services",
    answer: "Yes. We advise on strategic jurisdictional selection (Dubai Mainland vs. DMCC, DIFC, IFZA or DAFZA), coordinate commercial licensing, establish economic substance compliance, and facilitate corporate bank account openings with top UAE commercial banks."
  },
  {
    id: "tgm-difference",
    num: "09",
    question: "How is TGM different from traditional bookkeeping or agency firms?",
    shortDesc: "Chartered Accountant precision combined with commercial banking pedigree.",
    category: "Why TGM",
    answer: "Traditional bookkeeping firms merely record historical entries. TGM combines Chartered Accountant controllership with senior commercial banking credit expertise. Our partners operate under three non-negotiable principles: Transparency in records, Governance in controls, and Materiality in directing capital to what truly moves your commercial needle."
  },
  {
    id: "get-started",
    num: "10",
    question: "What is the process to start working with TGM?",
    shortDesc: "A focused 20-minute consultation and transparent fixed-fee proposal.",
    category: "Onboarding",
    answer: "Getting started takes just 20 minutes. Schedule a direct consultation with one of our operating partners to review your company's corporate structure, books, or banking requirements. Following the discussion, we deliver a clear, fixed-fee engagement proposal within 24 hours."
  }
];
