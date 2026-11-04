export interface ServiceItem {
  slug: string;
  tile: string; // '', 'gulf', 'gold', 'earth'
  short: string;
  title: string;
  eyebrow: string;
  h1: string;
  lead: string;
  meta: string;
  tiles: string[];
  subsTitle?: string;
  subs: [string, string][];
  subs2Title?: string;
  subs2?: [string, string][];
  who: string[];
  note?: string | null;
  process?: [string, string, string][];
  lenders?: string[];
}

export const SERVICES: ServiceItem[] = [
  {
    slug: "accounting",
    tile: "",
    short: "Accounting & bookkeeping",
    title: "Accounting & bookkeeping in Dubai",
    eyebrow: "Accounting & bookkeeping",
    h1: "Books your bank, buyer and the FTA can rely on.",
    lead: "Monthly bookkeeping, month-end close and IFRS financial statements for owner-run businesses — closed on a fixed calendar, reconciled every month, ready for your auditor.",
    meta: "Accounting and bookkeeping services in Dubai: monthly bookkeeping, backlog clean-up, month-end close, MIS, IFRS statements, group consolidation and payroll.",
    tiles: [
      "Monthly bookkeeping",
      "Month-end close & MIS",
      "IFRS statements",
      "Group consolidation",
    ],
    subs: [
      [
        "Monthly bookkeeping",
        "Every transaction recorded, bank and card accounts reconciled, supplier and customer ledgers kept current.",
      ],
      [
        "Backlog & clean-up accounting",
        "Months or years of unrecorded or messy books brought up to date, with opening balances you can stand behind.",
      ],
      [
        "Month-end close & MIS",
        "A fixed close calendar and a management pack — P&L, balance sheet, cash and KPIs — on the same working day every month.",
      ],
      [
        "IFRS financial statements",
        "Annual statements prepared to IFRS and handed to your external auditor audit-ready, with supporting schedules.",
      ],
      [
        "Group consolidation",
        "Multi-entity, multi-currency consolidation, including UAE parents with subsidiaries in Africa or India.",
      ],
      [
        "Billing & receivables",
        "Invoicing, e-invoicing readiness, a credit-control routine and monthly ageing reviews that bring cash in sooner.",
      ],
      [
        "Payroll processing",
        "Monthly payroll, WPS files and end-of-service gratuity accruals calculated and posted correctly.",
      ],
      [
        "Accounting system set-up & migration",
        "ERPNext, Tally, Sage or Zoho set up or migrated: chart of accounts, opening balances and controls built in from day one.",
      ],
    ],
    who: [
      "Owner-run SMEs that have outgrown a part-time bookkeeper",
      "Groups with entities in more than one country",
      "Businesses preparing for an audit, a bank facility or a sale",
    ],
    note: null,
  },
  {
    slug: "uae-tax",
    tile: "gulf",
    short: "UAE tax",
    title: "VAT, Corporate Tax & tax reclaim in the UAE",
    eyebrow: "UAE tax",
    h1: "Compliant before the FTA asks. Every recoverable dirham recovered.",
    lead: "VAT, Corporate Tax and Excise compliance, prepared and reviewed by a Chartered Accountant — plus refund claims for the input VAT most businesses leave on the table.",
    meta: "UAE VAT and Corporate Tax services in Dubai: registration, returns, pre-filing review, voluntary disclosures, Small Business Relief, Free Zone assessments and VAT refunds.",
    tiles: [
      "VAT registration & returns",
      "Corporate Tax returns",
      "VAT refunds & reclaim",
      "Pre-filing reviews",
    ],
    subs: [
      [
        "VAT registration, amendment & deregistration",
        "Registration when you cross the threshold, amendments when your business changes, and clean deregistration on closure.",
      ],
      [
        "VAT returns & ledger reconciliation",
        "Returns prepared from your books, with a VAT-to-ledger reconciliation so the return and the accounts always agree.",
      ],
      [
        "Pre-filing review",
        "An independent check of returns your team prepares in-house, before they are submitted.",
      ],
      [
        "Voluntary disclosures",
        "Errors found and corrected through a voluntary disclosure, with the penalty exposure quantified first.",
      ],
      [
        "Corporate Tax registration & returns",
        "Registration, deadline tracking, taxable income computation and return preparation.",
      ],
      [
        "Small Business Relief & Free Zone reviews",
        "Whether you qualify for Small Business Relief or Qualifying Free Zone Person treatment — and what it takes to keep it.",
      ],
      [
        "Transfer pricing readiness",
        "Related-party transactions identified and documented, especially across UAE and African group entities.",
      ],
      [
        "Excise tax",
        "Registration, returns and stock records for excise goods.",
      ],
      [
        "VAT refunds & input VAT recovery",
        "Refund applications prepared and followed up; capital-project input VAT reviewed so nothing recoverable is missed.",
      ],
    ],
    who: [
      "Businesses filing their first Corporate Tax return",
      "Companies with large input VAT on fit-out, equipment or projects",
      "Owners who want a second pair of eyes before the FTA's",
    ],
    note: "We prepare and review your filings; you submit them through your FTA account. Representation before the FTA as your registered tax agent will be offered once our tax-agent registration is in place.",
  },
  {
    slug: "finance-health-check",
    tile: "gold",
    short: "Finance health check",
    title: "Finance Health Check — independent review of your books",
    eyebrow: "Finance health check · start here",
    h1: "Are your numbers true?",
    lead: "An independent, read-only review of your books, controls, receivables, stock and tax. Every finding rated and valued in dirhams, with a 90-day action list. Then you decide.",
    meta: "Finance Health Check in Dubai: an independent review of books, controls, receivables, stock and tax, with findings valued in dirhams and a 90-day action plan.",
    tiles: [
      "Books & controls review",
      "Findings valued in AED",
      "90-day action list",
      "Cash diagnostic",
    ],
    subs: [
      [
        "Books & reconciliations",
        "Are balances supported? Bank, receivables, payables, stock and inter-company accounts tested against evidence.",
      ],
      [
        "Controls",
        "Who can raise, approve and pay — and where one person can do all three.",
      ],
      [
        "Receivables & stock",
        "Ageing, recoverability and stock that exists on paper but not on the shelf.",
      ],
      [
        "Tax exposure",
        "VAT and Corporate Tax positions checked against the books, with any exposure quantified.",
      ],
      [
        "Red / amber / green findings",
        "Every finding rated by severity and valued in dirhams, so you fix what matters first.",
      ],
      [
        "Cash diagnostic",
        "A variant for businesses that are profitable on paper but short of cash: where cash is tied up, plus a 13-week cash forecast your team keeps updating.",
      ],
    ],
    who: [
      "Owners who rely on numbers they did not prepare",
      "Businesses about to approach a bank, investor or buyer",
      "Anyone who suspects something is wrong but can't see where",
    ],
    note: "This is a review, not an audit: we give you findings and an action plan, not an audit opinion or audit report. We work view-only and change nothing in your system.",
  },
  {
    slug: "fractional-cfo",
    tile: "",
    short: "Fractional CFO",
    title: "Fractional CFO services in Dubai",
    eyebrow: "Fractional CFO",
    h1: "You have an accountant. You don't have a CFO.",
    lead: "Senior finance leadership for owner-run businesses, a few days a month — monthly owner reviews, budgets, bank reporting and a finance team that runs properly, without a full-time CFO salary.",
    meta: "Fractional and virtual CFO services in Dubai and the UAE: monthly owner review, budgets and forecasts, pricing and margin models, bank reporting and finance team leadership.",
    tiles: [
      "Monthly owner review",
      "Budgets & forecasts",
      "Bank reporting",
      "Finance team leadership",
    ],
    subs: [
      [
        "Monthly owner review",
        "One structured 45-minute meeting a month on cash, margin and risk — with decisions, not just reports.",
      ],
      [
        "Budgets & rolling forecasts",
        "An annual budget, a rolling forecast and variance analysis that explains why, not only how much.",
      ],
      [
        "Pricing & margin models",
        "Product, project and customer profitability, so you know which work actually pays.",
      ],
      [
        "Bank reporting & covenants",
        "Facility reports, LC, LATR and LBD utilisation and covenant tracking that keep your bank comfortable.",
      ],
      [
        "Finance team leadership",
        "Hiring, training and process design — including remote oversight of finance teams in other countries.",
      ],
      [
        "Board & investor reporting",
        "Packs owners, partners and investors can read in ten minutes.",
      ],
    ],
    who: [
      "Businesses with AED 5–100 million turnover and no CFO",
      "Groups expanding into a second country",
      "Owners preparing for funding or succession",
    ],
    note: null,
  },
  {
    slug: "controls-automation",
    tile: "gulf",
    short: "Controls & automation",
    title: "Internal controls, risk & finance automation",
    eyebrow: "Controls & automation",
    h1: "Problems surfaced every month, not at year-end.",
    lead: "We connect to the software you already use and build a checking layer around it — scheduled reconciliations, fraud red flags and owner dashboards. Only the exceptions reach a person.",
    meta: "Internal control reviews, fraud red-flag checks, automated reconciliations, Power BI dashboards and cost control reviews for UAE businesses.",
    tiles: [
      "Internal control reviews",
      "Fraud red-flag checks",
      "Automated reconciliations",
      "Owner dashboards",
    ],
    subs: [
      [
        "Internal control review",
        "Purchase-to-pay, order-to-cash, inventory and payroll walked through, with gaps ranked by risk.",
      ],
      [
        "Fraud red-flag checks",
        "Duplicate suppliers, back-dated entries, unusual approvals and round-sum payments flagged automatically.",
      ],
      [
        "Automated reconciliations",
        "Bank, VAT-to-ledger and inter-company tie-outs run on a schedule instead of at year-end.",
      ],
      [
        "Owner dashboards",
        "Power BI dashboards on cash, margin, receivables and stock — built on your live data.",
      ],
      [
        "Cost control reviews",
        "Overheads, procurement and project cost overruns analysed, with savings you can act on.",
      ],
      [
        "Policies & authority matrices",
        "Delegation-of-authority matrices and finance policies that fit how your business actually runs.",
      ],
    ],
    who: [
      "Owners who can't be in every approval",
      "Businesses that grew faster than their controls",
      "Groups running ERPNext, Tally, Sage or Zoho",
    ],
    note: null,
  },
  {
    slug: "funding-restructuring-advisory",
    tile: "gold",
    short: "Funding & restructuring",
    title: "Funding & restructuring advisory in Dubai — working capital, trade finance, refinancing & turnaround",
    eyebrow: "Funding & restructuring advisory",
    h1: "The right funding to grow — and a plan when cash runs short.",
    lead: "We work out how much funding your business needs and in what form, prepare a credit-ready file, and stay with you until the facility is in place. When cash is under pressure, we build the plan and the numbers your banks and creditors need to say yes. Led by a partner with 19 years on the lender's side of the table.",
    meta: "Funding and restructuring advisory in Dubai: working capital, trade finance, term and expansion loans, refinancing, investor readiness, 13-week cash plans, creditor negotiation and restructuring support for UAE SMEs.",
    tiles: [
      "Working capital & trade finance",
      "Term, expansion & refinancing",
      "Credit-ready files",
      "Turnaround & cash plans",
    ],
    subsTitle: "Funding to grow",
    subs: [
      [
        "Funding needs assessment",
        "How much you need, for how long and in what form — worked out from your operating cycle and cash flow, not from what a lender happens to be selling.",
      ],
      [
        "Working capital",
        "Overdrafts, revolving lines and receivables-based funding such as invoice discounting, sized to your cash cycle.",
      ],
      [
        "Trade finance",
        "LC and LG lines, LATR and supply-chain finance for importers, exporters and contractors.",
      ],
      [
        "Term & expansion funding",
        "Term loans for growth, new branches or acquisitions, with repayments your cash flow can carry.",
      ],
      [
        "Equipment & asset finance",
        "Funding for vehicles, machinery and equipment, matched to the asset's useful life.",
      ],
      [
        "Property-backed finance",
        "Commercial mortgages and funding against land and property, drawing on direct UAE commercial-mortgage experience.",
      ],
      [
        "Investor & equity readiness",
        "Financial model, data room and investor pack for growth-stage businesses raising private equity, venture or angel capital.",
      ],
      [
        "Government & development finance",
        "Whether your business fits SME programmes from federal and emirate-level development lenders, and what they require.",
      ],
      [
        "Credit file preparation",
        "Financials, bank statements, projections and the business story organised the way UAE credit teams assess them.",
      ],
      [
        "Lender meetings & follow-through",
        "We attend lender meetings with you and handle credit, underwriting and compliance questions through to approval and renewal.",
      ],
    ],
    subs2Title: "Funding under pressure",
    subs2: [
      [
        "Turnaround diagnostic",
        "Where the money went, what is still viable and what has to stop — in two to three weeks.",
      ],
      [
        "13-week cash survival plan",
        "A week-by-week cash plan that tells you which payments to make, delay or negotiate.",
      ],
      [
        "Refinancing & restructuring debt",
        "Expensive or short-term debt reviewed and refinanced — including moving borrowing between local currency and USD.",
      ],
      [
        "Receivables recovery analysis",
        "Overdue customers ranked by recoverability, with a collection programme that brings cash in.",
      ],
      [
        "Creditor & bank negotiation support",
        "Numbers and proposals your creditors and banks can say yes to.",
      ],
      [
        "Restructuring under UAE bankruptcy law",
        "Financial information for preventive settlement or restructuring, prepared alongside your lawyers and the appointed trustee.",
      ],
      [
        "Closure & liquidation accounting",
        "Final accounts and records support when a business or branch closes.",
      ],
    ],
    who: [
      "SMEs with 2–3 years of trading looking for a first or larger facility",
      "Contractors and traders whose cash is tied up in receivables or stock",
      "Profitable businesses with a cash crunch or pressure from banks and suppliers",
    ],
    process: [
      ["01", "Assess", "Business model, financials, bank statements and cash flow reviewed."],
      ["02", "Structure", "The right facility type, size and tenor — or the right restructuring path."],
      ["03", "Prepare", "Credit-ready file, model, projections or cash plan."],
      ["04", "Present", "Lender, creditor and bank meetings handled with you."],
      ["05", "Support", "Through approval, disbursement, covenants and renewals."],
    ],
    lenders: [
      "Usually two to three years of trading history",
      "Audited financial statements (lenders prefer three years)",
      "Bank statements that support declared turnover",
      "A clear purpose and repayment source for the funding",
      "Clean UBO, AML and KYC documentation",
    ],
    note: "Funding decisions, rates and terms are always the lender's. We advise and prepare; the facility agreement is signed directly between you and the lender. Our fee is agreed with you in writing before work starts and includes a success fee, payable by you, when the facility is approved. We take no commission from lenders. In restructuring we support you, your lawyers and any appointed trustee or liquidator; we do not act as trustee or liquidator ourselves.",
  },
  {
    slug: "africa-corridor",
    tile: "earth",
    short: "UAE–Africa corridor",
    title: "UAE–Africa finance: Tanzania, Zambia & Mozambique",
    eyebrow: "UAE–Africa corridor",
    h1: "Finance on both sides of the Indian Ocean.",
    lead: "For UAE businesses operating in Tanzania, Zambia or Mozambique — and African businesses setting up in Dubai. Run by a partner who led finance from inside businesses in Dar es Salaam, Lusaka and Maputo.",
    meta: "UAE–Africa finance services from Dubai: cross-border group finance, tax environment briefings for Tanzania (TRA), Zambia (ZRA) and Mozambique (AT), and remote finance team oversight.",
    tiles: [
      "Cross-border group finance",
      "TRA · ZRA · AT briefings",
      "Remote team oversight",
      "Market-entry finance",
    ],
    subs: [
      [
        "Cross-border group finance",
        "One close and one consolidation across your UAE and African entities, in one currency you can read.",
      ],
      [
        "Local tax environment briefings",
        "What to expect from the Tanzania Revenue Authority, Zambia Revenue Authority and Mozambique's Autoridade Tributária before you set up, invest or expand.",
      ],
      [
        "Remote finance team oversight",
        "Supervision of your finance teams in Tanzania, Zambia and Mozambique — in Swahili and Portuguese where needed.",
      ],
      [
        "Statutory audit coordination",
        "Local entities prepared for their statutory audits, with a track record of no adverse findings across Big 4 audits in Tanzania.",
      ],
      [
        "Cross-border cost & logistics finance",
        "Landed cost, agent networks, proof of delivery and the cash cycle across borders.",
      ],
      [
        "Currency & funding structure",
        "Local-currency versus USD borrowing and FX exposure — including moving a capital project's borrowing to USD to cut funding cost.",
      ],
      [
        "Market-entry finance set-up",
        "Budgets, entity structure options and finance set-up for UAE businesses entering these markets, and African businesses opening in Dubai.",
      ],
    ],
    who: [
      "UAE trading, logistics and project companies with African operations",
      "African businesses opening a Dubai entity",
      "Investors who need a finance view on the ground",
    ],
    note: null,
  },
  {
    slug: "business-setup",
    tile: "gulf",
    short: "Business setup",
    title: "Business setup in Dubai — mainland, free zone & branch",
    eyebrow: "Business setup consultancy",
    h1: "Set up right the first time — with the tax and banking consequences already worked out.",
    lead: "Mainland, free zone or branch: we help you choose the structure, licence and activities that fit how you will actually trade, bank and pay tax — then keep the books from day one.",
    meta: "Business setup consultancy in Dubai: mainland and free zone company formation, branches of foreign companies, structure advice, licence renewals, bank account readiness and post-setup VAT and Corporate Tax registration.",
    tiles: [
      "Mainland & free zone setup",
      "Structure & tax advice",
      "Bank account readiness",
      "Post-setup compliance",
    ],
    subs: [
      [
        "Structure & jurisdiction advice",
        "Mainland, free zone or branch compared on ownership, activities, visas, banking and Corporate Tax — including whether you can qualify as a Qualifying Free Zone Person.",
      ],
      [
        "Mainland company formation",
        "Activity selection, trade name, initial approval, memorandum of association, Ejari and licence issuance with Dubai's Department of Economy and Tourism.",
      ],
      [
        "Free zone company formation",
        "The right free zone for your activity, budget and visa needs — DMCC, IFZA, Meydan, RAKEZ and others compared on cost and fit.",
      ],
      [
        "Branches & subsidiaries of foreign companies",
        "Dubai branches or subsidiaries for parent companies in Africa, India and elsewhere, with the parent's documents organised for attestation.",
      ],
      [
        "Licence renewals & amendments",
        "Renewals, new activities, partner changes and trade-name amendments handled before deadlines bite.",
      ],
      [
        "Visa & PRO coordination",
        "Investor, partner and employee visas and Emirates ID coordinated end to end through authorised government service channels.",
      ],
      [
        "Corporate bank account readiness",
        "Your account-opening file prepared the way UAE banks assess it — by a partner with 19 years in UAE banking.",
      ],
      [
        "Post-setup compliance",
        "VAT and Corporate Tax registration, UBO register, accounting system and bookkeeping set up from the first month.",
      ],
      [
        "UAE businesses expanding to Africa",
        "Entity and tax registration in Tanzania, Zambia and Mozambique coordinated with local registered partners, with the finance set-up done by us.",
      ],
    ],
    who: [
      "African and Indian entrepreneurs opening a company in Dubai",
      "Foreign groups adding a UAE branch or subsidiary",
      "UAE businesses setting up in Tanzania, Zambia or Mozambique",
    ],
    note: "Government submissions (licence applications, visas, Emirates ID, labour) are filed through the relevant authorities' authorised service channels. We advise, prepare and coordinate; legal advice on contracts or disputes is referred to a licensed law firm.",
  },
];

export const SERVICES_BY_SLUG = SERVICES.reduce<Record<string, ServiceItem>>(
  (acc, s) => {
    acc[s.slug] = s;
    return acc;
  },
  {}
);
