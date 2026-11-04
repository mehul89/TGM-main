"""Generates the TGM static site into the repo folder given as argv[1]."""
import sys, os, json, html

OUT = sys.argv[1]
DOMAIN = "https://tgmauditing.com"
EMAIL = "info@tgmauditing.com"
PHONE_DISPLAY = "+971 55 331 0567"
PHONE_TEL = "+971553310567"
WA = "https://wa.me/971553310567"
ADDRESS = "Office No 5, 206–207, Second Floor, Atrium Centre, Khalid Al Waleed Street, Al Mankhool, Dubai, UAE"
MAPS = "https://www.google.com/maps/search/?api=1&query=Atrium+Centre+Khalid+Al+Waleed+Street+Al+Mankhool+Dubai"
LICENCE = "[licence number]"

e = html.escape

# ---------------------------------------------------------------- services
SERVICES = [
  dict(slug="accounting", tile="", short="Accounting & bookkeeping",
    title="Accounting & bookkeeping in Dubai",
    eyebrow="Accounting & bookkeeping",
    h1="Books your bank, buyer and the FTA can rely on.",
    lead="Monthly bookkeeping, month-end close and IFRS financial statements for owner-run businesses — closed on a fixed calendar, reconciled every month, ready for your auditor.",
    meta="Accounting and bookkeeping services in Dubai: monthly bookkeeping, backlog clean-up, month-end close, MIS, IFRS statements, group consolidation and payroll.",
    tiles=["Monthly bookkeeping","Month-end close & MIS","IFRS statements","Group consolidation"],
    subs=[
      ("Monthly bookkeeping","Every transaction recorded, bank and card accounts reconciled, supplier and customer ledgers kept current."),
      ("Backlog & clean-up accounting","Months or years of unrecorded or messy books brought up to date, with opening balances you can stand behind."),
      ("Month-end close & MIS","A fixed close calendar and a management pack — P&L, balance sheet, cash and KPIs — on the same working day every month."),
      ("IFRS financial statements","Annual statements prepared to IFRS and handed to your external auditor audit-ready, with supporting schedules."),
      ("Group consolidation","Multi-entity, multi-currency consolidation, including UAE parents with subsidiaries in Africa or India."),
      ("Billing & receivables","Invoicing, e-invoicing readiness, a credit-control routine and monthly ageing reviews that bring cash in sooner."),
      ("Payroll processing","Monthly payroll, WPS files and end-of-service gratuity accruals calculated and posted correctly."),
      ("Accounting system set-up & migration","ERPNext, Tally, Sage or Zoho set up or migrated: chart of accounts, opening balances and controls built in from day one."),
    ],
    who=["Owner-run SMEs that have outgrown a part-time bookkeeper","Groups with entities in more than one country","Businesses preparing for an audit, a bank facility or a sale"],
    note=None),
  dict(slug="uae-tax", tile="gulf", short="UAE tax",
    title="VAT, Corporate Tax & tax reclaim in the UAE",
    eyebrow="UAE tax",
    h1="Compliant before the FTA asks. Every recoverable dirham recovered.",
    lead="VAT, Corporate Tax and Excise compliance, prepared and reviewed by a Chartered Accountant — plus refund claims for the input VAT most businesses leave on the table.",
    meta="UAE VAT and Corporate Tax services in Dubai: registration, returns, pre-filing review, voluntary disclosures, Small Business Relief, Free Zone assessments and VAT refunds.",
    tiles=["VAT registration & returns","Corporate Tax returns","VAT refunds & reclaim","Pre-filing reviews"],
    subs=[
      ("VAT registration, amendment & deregistration","Registration when you cross the threshold, amendments when your business changes, and clean deregistration on closure."),
      ("VAT returns & ledger reconciliation","Returns prepared from your books, with a VAT-to-ledger reconciliation so the return and the accounts always agree."),
      ("Pre-filing review","An independent check of returns your team prepares in-house, before they are submitted."),
      ("Voluntary disclosures","Errors found and corrected through a voluntary disclosure, with the penalty exposure quantified first."),
      ("Corporate Tax registration & returns","Registration, deadline tracking, taxable income computation and return preparation."),
      ("Small Business Relief & Free Zone reviews","Whether you qualify for Small Business Relief or Qualifying Free Zone Person treatment — and what it takes to keep it."),
      ("Transfer pricing readiness","Related-party transactions identified and documented, especially across UAE and African group entities."),
      ("Excise tax","Registration, returns and stock records for excise goods."),
      ("VAT refunds & input VAT recovery","Refund applications prepared and followed up; capital-project input VAT reviewed so nothing recoverable is missed."),
    ],
    who=["Businesses filing their first Corporate Tax return","Companies with large input VAT on fit-out, equipment or projects","Owners who want a second pair of eyes before the FTA's"],
    note="We prepare and review your filings; you submit them through your FTA account. Representation before the FTA as your registered tax agent will be offered once our tax-agent registration is in place."),
  dict(slug="finance-health-check", tile="gold", short="Finance health check",
    title="Finance Health Check — independent review of your books",
    eyebrow="Finance health check · start here",
    h1="Are your numbers true?",
    lead="An independent, read-only review of your books, controls, receivables, stock and tax. Every finding rated and valued in dirhams, with a 90-day action list. Then you decide.",
    meta="Finance Health Check in Dubai: an independent review of books, controls, receivables, stock and tax, with findings valued in dirhams and a 90-day action plan.",
    tiles=["Books & controls review","Findings valued in AED","90-day action list","Cash diagnostic"],
    subs=[
      ("Books & reconciliations","Are balances supported? Bank, receivables, payables, stock and inter-company accounts tested against evidence."),
      ("Controls","Who can raise, approve and pay — and where one person can do all three."),
      ("Receivables & stock","Ageing, recoverability and stock that exists on paper but not on the shelf."),
      ("Tax exposure","VAT and Corporate Tax positions checked against the books, with any exposure quantified."),
      ("Red / amber / green findings","Every finding rated by severity and valued in dirhams, so you fix what matters first."),
      ("Cash diagnostic","A variant for businesses that are profitable on paper but short of cash: where cash is tied up, plus a 13-week cash forecast your team keeps updating."),
    ],
    who=["Owners who rely on numbers they did not prepare","Businesses about to approach a bank, investor or buyer","Anyone who suspects something is wrong but can't see where"],
    note="This is a review, not an audit: we give you findings and an action plan, not an audit opinion or audit report. We work view-only and change nothing in your system."),
  dict(slug="fractional-cfo", tile="", short="Fractional CFO",
    title="Fractional CFO services in Dubai",
    eyebrow="Fractional CFO",
    h1="You have an accountant. You don't have a CFO.",
    lead="Senior finance leadership for owner-run businesses, a few days a month — monthly owner reviews, budgets, bank reporting and a finance team that runs properly, without a full-time CFO salary.",
    meta="Fractional and virtual CFO services in Dubai and the UAE: monthly owner review, budgets and forecasts, pricing and margin models, bank reporting and finance team leadership.",
    tiles=["Monthly owner review","Budgets & forecasts","Bank reporting","Finance team leadership"],
    subs=[
      ("Monthly owner review","One structured 45-minute meeting a month on cash, margin and risk — with decisions, not just reports."),
      ("Budgets & rolling forecasts","An annual budget, a rolling forecast and variance analysis that explains why, not only how much."),
      ("Pricing & margin models","Product, project and customer profitability, so you know which work actually pays."),
      ("Bank reporting & covenants","Facility reports, LC, LATR and LBD utilisation and covenant tracking that keep your bank comfortable."),
      ("Finance team leadership","Hiring, training and process design — including remote oversight of finance teams in other countries."),
      ("Board & investor reporting","Packs owners, partners and investors can read in ten minutes."),
    ],
    who=["Businesses with AED 5–100 million turnover and no CFO","Groups expanding into a second country","Owners preparing for funding or succession"],
    note=None),
  dict(slug="controls-automation", tile="gulf", short="Controls & automation",
    title="Internal controls, risk & finance automation",
    eyebrow="Controls & automation",
    h1="Problems surfaced every month, not at year-end.",
    lead="We connect to the software you already use and build a checking layer around it — scheduled reconciliations, fraud red flags and owner dashboards. Only the exceptions reach a person.",
    meta="Internal control reviews, fraud red-flag checks, automated reconciliations, Power BI dashboards and cost control reviews for UAE businesses.",
    tiles=["Internal control reviews","Fraud red-flag checks","Automated reconciliations","Owner dashboards"],
    subs=[
      ("Internal control review","Purchase-to-pay, order-to-cash, inventory and payroll walked through, with gaps ranked by risk."),
      ("Fraud red-flag checks","Duplicate suppliers, back-dated entries, unusual approvals and round-sum payments flagged automatically."),
      ("Automated reconciliations","Bank, VAT-to-ledger and inter-company tie-outs run on a schedule instead of at year-end."),
      ("Owner dashboards","Power BI dashboards on cash, margin, receivables and stock — built on your live data."),
      ("Cost control reviews","Overheads, procurement and project cost overruns analysed, with savings you can act on."),
      ("Policies & authority matrices","Delegation-of-authority matrices and finance policies that fit how your business actually runs."),
    ],
    who=["Owners who can't be in every approval","Businesses that grew faster than their controls","Groups running ERPNext, Tally, Sage or Zoho"],
    note=None),
  dict(slug="funding-restructuring-advisory", tile="gold", short="Funding & restructuring",
    title="Funding & restructuring advisory in Dubai — working capital, trade finance, refinancing & turnaround",
    eyebrow="Funding & restructuring advisory",
    h1="The right funding to grow — and a plan when cash runs short.",
    lead="We work out how much funding your business needs and in what form, prepare a credit-ready file, and stay with you until the facility is in place. When cash is under pressure, we build the plan and the numbers your banks and creditors need to say yes. Led by a partner with 19 years on the lender's side of the table.",
    meta="Funding and restructuring advisory in Dubai: working capital, trade finance, term and expansion loans, refinancing, investor readiness, 13-week cash plans, creditor negotiation and restructuring support for UAE SMEs.",
    tiles=["Working capital & trade finance","Term, expansion & refinancing","Credit-ready files","Turnaround & cash plans"],
    subs_title="Funding to grow",
    subs=[
      ("Funding needs assessment","How much you need, for how long and in what form — worked out from your operating cycle and cash flow, not from what a lender happens to be selling."),
      ("Working capital","Overdrafts, revolving lines and receivables-based funding such as invoice discounting, sized to your cash cycle."),
      ("Trade finance","LC and LG lines, LATR and supply-chain finance for importers, exporters and contractors."),
      ("Term & expansion funding","Term loans for growth, new branches or acquisitions, with repayments your cash flow can carry."),
      ("Equipment & asset finance","Funding for vehicles, machinery and equipment, matched to the asset's useful life."),
      ("Property-backed finance","Commercial mortgages and funding against land and property, drawing on direct UAE commercial-mortgage experience."),
      ("Investor & equity readiness","Financial model, data room and investor pack for growth-stage businesses raising private equity, venture or angel capital."),
      ("Government & development finance","Whether your business fits SME programmes from federal and emirate-level development lenders, and what they require."),
      ("Credit file preparation","Financials, bank statements, projections and the business story organised the way UAE credit teams assess them."),
      ("Lender meetings & follow-through","We attend lender meetings with you and handle credit, underwriting and compliance questions through to approval and renewal."),
    ],
    subs2_title="Funding under pressure",
    subs2=[
      ("Turnaround diagnostic","Where the money went, what is still viable and what has to stop — in two to three weeks."),
      ("13-week cash survival plan","A week-by-week cash plan that tells you which payments to make, delay or negotiate."),
      ("Refinancing & restructuring debt","Expensive or short-term debt reviewed and refinanced — including moving borrowing between local currency and USD."),
      ("Receivables recovery analysis","Overdue customers ranked by recoverability, with a collection programme that brings cash in."),
      ("Creditor & bank negotiation support","Numbers and proposals your creditors and banks can say yes to."),
      ("Restructuring under UAE bankruptcy law","Financial information for preventive settlement or restructuring, prepared alongside your lawyers and the appointed trustee."),
      ("Closure & liquidation accounting","Final accounts and records support when a business or branch closes."),
    ],
    who=["SMEs with 2–3 years of trading looking for a first or larger facility","Contractors and traders whose cash is tied up in receivables or stock","Profitable businesses with a cash crunch or pressure from banks and suppliers"],
    process=[("01","Assess","Business model, financials, bank statements and cash flow reviewed."),
             ("02","Structure","The right facility type, size and tenor — or the right restructuring path."),
             ("03","Prepare","Credit-ready file, model, projections or cash plan."),
             ("04","Present","Lender, creditor and bank meetings handled with you."),
             ("05","Support","Through approval, disbursement, covenants and renewals.")],
    lenders=["Usually two to three years of trading history","Audited financial statements (lenders prefer three years)","Bank statements that support declared turnover","A clear purpose and repayment source for the funding","Clean UBO, AML and KYC documentation"],
    note="Funding decisions, rates and terms are always the lender's. We advise and prepare; the facility agreement is signed directly between you and the lender. Our fee is agreed with you in writing before work starts and includes a success fee, payable by you, when the facility is approved. We take no commission from lenders. In restructuring we support you, your lawyers and any appointed trustee or liquidator; we do not act as trustee or liquidator ourselves."),
  dict(slug="africa-corridor", tile="earth", short="UAE–Africa corridor",
    title="UAE–Africa finance: Tanzania, Zambia & Mozambique",
    eyebrow="UAE–Africa corridor",
    h1="Finance on both sides of the Indian Ocean.",
    lead="For UAE businesses operating in Tanzania, Zambia or Mozambique — and African businesses setting up in Dubai. Run by a partner who led finance from inside businesses in Dar es Salaam, Lusaka and Maputo.",
    meta="UAE–Africa finance services from Dubai: cross-border group finance, tax environment briefings for Tanzania (TRA), Zambia (ZRA) and Mozambique (AT), and remote finance team oversight.",
    tiles=["Cross-border group finance","TRA · ZRA · AT briefings","Remote team oversight","Market-entry finance"],
    subs=[
      ("Cross-border group finance","One close and one consolidation across your UAE and African entities, in one currency you can read."),
      ("Local tax environment briefings","What to expect from the Tanzania Revenue Authority, Zambia Revenue Authority and Mozambique's Autoridade Tributária before you set up, invest or expand."),
      ("Remote finance team oversight","Supervision of your finance teams in Tanzania, Zambia and Mozambique — in Swahili and Portuguese where needed."),
      ("Statutory audit coordination","Local entities prepared for their statutory audits, with a track record of no adverse findings across Big 4 audits in Tanzania."),
      ("Cross-border cost & logistics finance","Landed cost, agent networks, proof of delivery and the cash cycle across borders."),
      ("Currency & funding structure","Local-currency versus USD borrowing and FX exposure — including moving a capital project's borrowing to USD to cut funding cost."),
      ("Market-entry finance set-up","Budgets, entity structure options and finance set-up for UAE businesses entering these markets, and African businesses opening in Dubai."),
    ],
    who=["UAE trading, logistics and project companies with African operations","African businesses opening a Dubai entity","Investors who need a finance view on the ground"],
    note=None),
  dict(slug="business-setup", tile="gulf", short="Business setup",
    title="Business setup in Dubai — mainland, free zone & branch",
    eyebrow="Business setup consultancy",
    h1="Set up right the first time — with the tax and banking consequences already worked out.",
    lead="Mainland, free zone or branch: we help you choose the structure, licence and activities that fit how you will actually trade, bank and pay tax — then keep the books from day one.",
    meta="Business setup consultancy in Dubai: mainland and free zone company formation, branches of foreign companies, structure advice, licence renewals, bank account readiness and post-setup VAT and Corporate Tax registration.",
    tiles=["Mainland & free zone setup","Structure & tax advice","Bank account readiness","Post-setup compliance"],
    subs=[
      ("Structure & jurisdiction advice","Mainland, free zone or branch compared on ownership, activities, visas, banking and Corporate Tax — including whether you can qualify as a Qualifying Free Zone Person."),
      ("Mainland company formation","Activity selection, trade name, initial approval, memorandum of association, Ejari and licence issuance with Dubai's Department of Economy and Tourism."),
      ("Free zone company formation","The right free zone for your activity, budget and visa needs — DMCC, IFZA, Meydan, RAKEZ and others compared on cost and fit."),
      ("Branches & subsidiaries of foreign companies","Dubai branches or subsidiaries for parent companies in Africa, India and elsewhere, with the parent's documents organised for attestation."),
      ("Licence renewals & amendments","Renewals, new activities, partner changes and trade-name amendments handled before deadlines bite."),
      ("Visa & PRO coordination","Investor, partner and employee visas and Emirates ID coordinated end to end through authorised government service channels."),
      ("Corporate bank account readiness","Your account-opening file prepared the way UAE banks assess it — by a partner with 19 years in UAE banking."),
      ("Post-setup compliance","VAT and Corporate Tax registration, UBO register, accounting system and bookkeeping set up from the first month."),
      ("UAE businesses expanding to Africa","Entity and tax registration in Tanzania, Zambia and Mozambique coordinated with local registered partners, with the finance set-up done by us."),
    ],
    who=["African and Indian entrepreneurs opening a company in Dubai","Foreign groups adding a UAE branch or subsidiary","UAE businesses setting up in Tanzania, Zambia or Mozambique"],
    note="Government submissions (licence applications, visas, Emirates ID, labour) are filed through the relevant authorities' authorised service channels. We advise, prepare and coordinate; legal advice on contracts or disputes is referred to a licensed law firm."),
]
BY = {s["slug"]: s for s in SERVICES}

# ---------------------------------------------------------------- shared chrome
def head(title, desc, path, extra=""):
    url = DOMAIN + path
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e(title)}</title>
<meta name="description" content="{e(desc)}">
<link rel="canonical" href="{url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="TGM Accounting &amp; Auditing">
<meta property="og:title" content="{e(title)}">
<meta property="og:description" content="{e(desc)}">
<meta property="og:url" content="{url}">
<meta name="theme-color" content="#f6efe3">
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500&amp;family=Manrope:wght@400;600;700&amp;family=IBM+Plex+Mono:wght@500&amp;display=swap">
<link rel="stylesheet" href="/assets/css/site.css">
{extra}</head>
<body>
<a class="skip" href="#main">Skip to content</a>
"""

def header(active):
    def item(href, label, key):
        cur = ' aria-current="page"' if key == active else ""
        return f'<a href="{href}"{cur}>{label}</a>'
    return f"""<header class="site-head">
<div class="wrap">
<a class="brand" href="/" aria-label="TGM Accounting &amp; Auditing — home"><b>TGM</b><span>Accounting &amp; Auditing LLC</span></a>
<nav class="nav" aria-label="Main">
{item('/#services','Services','services')}
{item('/services/africa-corridor','UAE–Africa','africa')}
{item('/partners','Partners','partners')}
{item('/contact','Contact','contact')}
</nav>
<a class="btn btn-gold" href="/contact">Book a 20-min call</a>
</div>
</header>
"""

def footer():
    svc = "\n".join(f'<li><a href="/services/{s["slug"]}">{e(s["short"])}</a></li>' for s in SERVICES)
    return f"""<footer class="site-foot">
<div class="wrap">
<div class="foot-grid">
<div>
<p class="disp" style="font-size:28px;line-height:30px;margin:0;color:#fffaf2">TGM</p>
<p style="margin:6px 0 16px;color:var(--night-muted)">Accounting &amp; Auditing LLC</p>
<p style="margin:0">{e(ADDRESS)}</p>
</div>
<div>
<p class="eyebrow">Services</p>
<ul>
{svc}
</ul>
</div>
<div>
<p class="eyebrow">Firm</p>
<ul>
<li><a href="/partners">Partners</a></li>
<li><a href="/services/finance-health-check">Start with a Health Check</a></li>
<li><a href="/contact">Contact</a></li>
</ul>
</div>
<div>
<p class="eyebrow">Talk to us</p>
<ul>
<li><a href="mailto:{EMAIL}">{EMAIL}</a></li>
<li><a href="tel:{PHONE_TEL}">{PHONE_DISPLAY}</a></li>
<li><a href="{WA}">WhatsApp</a></li>
</ul>
</div>
</div>
<div class="foot-base">
<span>© 2026 TGM Accounting &amp; Auditing LLC · Dubai mainland · Licence {LICENCE}</span>
<span>Transparency · Governance · Materiality</span>
</div>
</div>
</footer>
<a class="wa-float" href="{WA}" aria-label="Chat with TGM on WhatsApp">
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.4A8.4 8.4 0 1 1 21 11.5z"/></svg>WhatsApp
</a>
</body>
</html>
"""

def cta_band(title="Let's find out what your numbers aren't telling you.",
             text="Start with a Finance Health Check. We review your data without changing anything, and you get a short findings note — then you decide."):
    return f"""<section class="sec sec-sand">
<div class="wrap" style="display:flex;flex-wrap:wrap;gap:32px;align-items:flex-end;justify-content:space-between">
<div style="flex:1 1 520px;min-width:0">
<h2 class="h2">{e(title)}</h2>
<p class="lead" style="margin-top:14px">{e(text)}</p>
</div>
<div class="btns" style="margin-top:0">
<a class="btn btn-gold" href="/contact">Book a 20-min call</a>
<a class="btn btn-line" href="{WA}">WhatsApp us</a>
</div>
</div>
</section>
"""

def partner_cards(link=True):
    more_y = '<a class="more" href="/partners#yogesh">Full profile →</a>' if link else ""
    more_a = '<a class="more" href="/partners#anil">Full profile →</a>' if link else ""
    return f"""<div class="grid g2">
<article class="card partner">
<div class="portrait"><img src="/assets/img/yogesh-trivedi.jpg" alt="Portrait of CA Yogesh Trivedi" width="800" height="1000" loading="lazy"></div>
<div class="body">
<p class="eyebrow africa" style="margin:0">UAE · Tanzania · Zambia · Mozambique</p>
<h3>CA Yogesh Trivedi</h3>
<p class="role">Founding Partner · Finance review &amp; Fractional CFO</p>
<p class="partner-intro" style="margin:0;font-size:15px;line-height:24px">Chartered Accountant (ICAI, 2008). 18 years running finance from inside trading, fit-out, logistics, petroleum and education groups. He checks your accountant and your software, then builds the controls that keep them honest.</p>
<p class="langs">English · Hindi · Gujarati · working Swahili &amp; Portuguese</p>
{more_y}
</div>
</article>
<article class="card partner">
<div class="portrait"><img src="/assets/img/anil-chowhan.jpg" alt="Portrait of Anil Chowhan" width="800" height="1000" loading="lazy"></div>
<div class="body">
<p class="eyebrow uae" style="margin:0">UAE banking</p>
<h3>Anil Chowhan</h3>
<p class="role">Partner · Banking &amp; capital readiness</p>
<p class="partner-intro" style="margin:0;font-size:15px;line-height:24px">19 years in banking at ICICI Bank, RAKBANK and Commercial Bank of Dubai, where he managed 300 SME accounts. He reads your business the way a credit officer will — before the credit officer does.</p>
<p class="langs">English · Hindi · Taqdeer Award 2016, Commercial Bank of Dubai</p>
{more_a}
</div>
</article>
</div>
"""

def write(rel, text):
    path = os.path.join(OUT, rel)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)

# ---------------------------------------------------------------- home
def towers():
    spec = [(".1",4,110,""),(".25",6,170,"gulf"),(".4",3,90,""),(".55",5,220,""),(".7",7,150,"earth crane"),
            (".85",4,260,""),("1",7,330,"burj"),("1.15",5,200,"gold"),("1.3",4,240,""),("1.45",6,130,"gulf"),
            ("1.6",3,180,""),("1.75",5,100,"hide-sm")]
    out = []
    for d,w,h,kind in spec:
        cls = "tower " + kind.replace("crane","").strip()
        inner = ""
        if "crane" in kind:
            inner = '<span class="crane"></span>'
        if kind == "burj":
            inner = ('<i style="width:6%;min-width:3px;height:70px"></i><i style="width:34%;height:60px"></i>'
                     '<i style="width:64%;height:80px"></i><i style="width:100%;height:120px"></i>')
        out.append(f'<div class="{cls.strip()}" style="animation-delay:{d}s;width:{w}%;height:{h}px">{inner}</div>')
    return "\n".join(out)

def home():
    ld = {
      "@context":"https://schema.org","@type":"AccountingService","name":"TGM Accounting & Auditing LLC",
      "url":DOMAIN,"email":EMAIL,"telephone":PHONE_TEL,
      "address":{"@type":"PostalAddress","streetAddress":"Office No 5, 206–207, Second Floor, Atrium Centre, Khalid Al Waleed Street","addressLocality":"Al Mankhool, Dubai","addressCountry":"AE"},
      "areaServed":["United Arab Emirates","Tanzania","Zambia","Mozambique"],
      "knowsLanguage":["en","hi","gu","sw","pt"],
    }
    extra = '<script type="application/ld+json">' + json.dumps(ld, ensure_ascii=False) + '</script>\n'
    svc_tiles = "\n".join(f"""<div class="svc-tile {s['tile']}">
<a class="h3" href="/services/{s['slug']}">{e(s['short'])}</a>
<ul>{''.join(f'<li>{e(t)}</li>' for t in s['tiles'])}</ul>
<a class="more" href="/services/{s['slug']}" aria-label="Details: {e(s['short'])}">Details →</a>
</div>""" for s in SERVICES)
    body = f"""{head("TGM Accounting & Auditing | Accounting, UAE tax & Fractional CFO, Dubai",
    "Accounting, UAE VAT and Corporate Tax, finance health checks and fractional CFO support and business setup for owner-run businesses in Dubai — and for businesses building between the UAE and Tanzania, Zambia and Mozambique.",
    "/", extra)}{header('home')}
<main id="main">
<section class="hero">
<div class="wrap">
<p class="eyebrow africa" style="margin-bottom:20px">Dubai · Tanzania · Zambia · Mozambique</p>
<h1 class="h1" style="max-width:820px">Finance that holds up. Built from the ground up.</h1>
<p class="lead">Accounting, UAE tax and fractional CFO support for owner-run businesses in the UAE — and for those building between Dubai and Africa.</p>
<div class="btns">
<a class="btn btn-gold" href="/services/finance-health-check">Start with a Finance Health Check</a>
<a class="btn btn-line" href="{WA}">WhatsApp us</a>
</div>
</div>
<div class="skyline" aria-hidden="true">
<div class="sun"></div>
<div class="towers">
{towers()}
</div>
<div class="dune"></div>
<div class="dune-base"></div>
</div>
</section>

<section class="sec-sand" style="padding:40px 0 56px">
<div class="wrap">
<p class="disp" style="margin:0 0 32px;font-size:22px;line-height:30px;text-align:center">Transparency · Governance · Materiality</p>
<div class="grid g4">
<div class="stat"><p class="mono">150+ → &lt;120</p><p>days to collect from customers, UAE fit-out group</p></div>
<div class="stat"><p class="mono">80%</p><p>input VAT recovered on a capital project, Mozambique</p></div>
<div class="stat"><p class="mono">5</p><p>countries' finance teams led at once, East Africa</p></div>
<div class="stat"><p class="mono">0</p><p>adverse findings across Big 4 audits — VAT, payroll tax and social security, Tanzania</p></div>
</div>
<p style="margin:28px 0 0;font-size:12px;line-height:18px;color:var(--ink-muted)">Results from our partners' roles inside operating businesses.</p>
</div>
</section>

<section class="sec">
<div class="wrap">
<div class="sec-head">
<p class="eyebrow">Where owners call us</p>
<h2 class="h2">Your system says you made a profit. Your bank may disagree.</h2>
</div>
<div class="grid g4">
<a class="card" href="/services/finance-health-check"><p class="eyebrow" style="margin:0 0 14px">Finance health check · start here</p><h3 class="h3">Are your numbers true?</h3><p>An independent review of books, controls, receivables, stock and tax. Every finding rated and valued in dirhams, with a 90-day action list.</p></a>
<a class="card" href="/services/finance-health-check"><p class="eyebrow" style="margin:0 0 14px">Cash diagnostic</p><h3 class="h3">Profitable on paper. Short of cash at month-end.</h3><p>Where cash is tied up — customers, stock or bank facilities — and a 13-week forecast your team keeps updating.</p></a>
<a class="card" href="/services/fractional-cfo"><p class="eyebrow" style="margin:0 0 14px">Fractional CFO</p><h3 class="h3">You have an accountant. You don't have a CFO.</h3><p>Monthly owner review, budgets, bank reporting and audit-ready books — senior leadership without a full-time salary.</p></a>
<a class="card" href="/services/funding-restructuring-advisory"><p class="eyebrow" style="margin:0 0 14px">Funding &amp; restructuring advisory</p><h3 class="h3">The bank will check your numbers. Better we check them first.</h3><p>The right facility, a credit-ready file and a partner who has sat on the lender's side of the table.</p></a>
</div>
</div>
</section>

<section id="services" class="sec sec-raised">
<div class="wrap">
<div class="sec-head">
<p class="eyebrow">Services</p>
<h2 class="h2">Eight service lines. From your first licence to your monthly close.</h2>
</div>
<div class="grid g-svc" style="gap:36px 28px">
{svc_tiles}
</div>
</div>
</section>

<section class="sec sec-night">
<div class="wrap corridor">
<div>
<p class="eyebrow" style="color:var(--gold-lt)">The UAE–Africa corridor</p>
<h2 class="h2" style="margin-bottom:20px">We have run the finance on both sides of the ocean.</h2>
<p style="margin:0 0 16px;font-size:17px;line-height:28px">Not from a desk in Dubai. From inside businesses in Dar es Salaam, Lusaka and Maputo — closing books, facing local tax authorities and leading local finance teams.</p>
<p style="margin:0;font-size:17px;line-height:28px">So when your UAE group opens an African subsidiary, or your African business sets up in Dubai, the numbers on both sides tell the same story.</p>
<div class="facts">
<div><p class="eyebrow">Tax authorities</p><p>FTA · TRA · ZRA · AT</p></div>
<div><p class="eyebrow">Languages</p><p>English · Swahili · Portuguese · Hindi</p></div>
<div><p class="eyebrow">Track record</p><p>Big 4 audits, no adverse findings</p></div>
</div>
<div class="btns"><a class="btn btn-light" href="/services/africa-corridor">How the corridor desk works</a></div>
</div>
<div>
{corridor_map()}
</div>
</div>
</section>

<section class="sec">
<div class="wrap">
<div class="sec-head">
<p class="eyebrow">Partners</p>
<h2 class="h2">One partner who runs the finance. One who knows what the bank will ask.</h2>
</div>
{partner_cards()}
</div>
</section>

<section class="sec sec-raised">
<div class="wrap">
<h2 class="h2" style="margin-bottom:32px">How we work</h2>
{steps()}
</div>
</section>
{cta_band()}
</main>
{footer()}"""
    write("index.html", body)

def corridor_map():
    return """<div class="map" role="img" aria-label="Dubai connected to Dar es Salaam in Tanzania, Lusaka in Zambia and Maputo in Mozambique">
<span class="pt hub" style="left:70%;top:15%"></span><p class="lbl" style="left:calc(70% + 22px);top:calc(15% - 4px)"><b>Dubai</b><br><span>UAE · FTA</span></p>
<span class="pt" style="left:44%;top:42%"></span><p class="lbl" style="left:calc(44% + 20px);top:calc(42% - 4px)"><b>Tanzania</b><br><span>Dar es Salaam · TRA</span></p>
<span class="pt" style="left:22%;top:55%"></span><p class="lbl" style="left:calc(22% - 6px);top:calc(55% + 18px)"><b>Zambia</b><br><span>Lusaka · ZRA</span></p>
<span class="pt" style="left:48%;top:66%"></span><p class="lbl" style="left:calc(48% + 20px);top:calc(66% - 4px)"><b>Mozambique</b><br><span>Maputo · AT</span></p>
<div class="chev" aria-hidden="true"><i></i><i></i><i></i></div>
</div>
<p class="small" style="margin:12px 0 0;color:var(--night-muted)">Schematic, not to scale.</p>"""

def steps():
    s = [("01","Conversation","20 minutes. Which numbers you rely on, and where an error would hurt."),
         ("02","Review","View-only access to your system. Nothing changed. Findings in a short, prioritised note."),
         ("03","You decide","Every exposure valued in dirhams. We fix the ones worth fixing."),
         ("04","Ongoing","Automated checks every month. One owner review a month.")]
    return '<div class="grid g4">' + "".join(
        f'<div class="step"><p class="mono">{n}</p><h3 class="h3">{t}</h3><p>{d}</p></div>' for n,t,d in s) + "</div>"

# ---------------------------------------------------------------- service pages
def service(s):
    subs = "\n".join(f'<div class="card sub"><h3>{e(t)}</h3><p>{e(d)}</p></div>' for t,d in s["subs"])
    subs2 = ""
    if s.get("subs2"):
        subs2 = (f'<h2 class="h2" style="font-size:clamp(26px,3vw,34px);margin:56px 0 24px">{e(s["subs2_title"])}</h2><div class="grid g3">'
                 + "\n".join(f'<div class="card sub"><h3>{e(t)}</h3><p>{e(d)}</p></div>' for t,d in s["subs2"]) + '</div>')
    who = "\n".join(f"<li>{e(w)}</li>" for w in s["who"])
    note = f'<div class="note" style="margin-top:32px"><b>Scope.</b> {e(s["note"])}</div>' if s["note"] else ""
    others = "\n".join(f'<li><a href="/services/{o["slug"]}">{e(o["short"])}</a></li>' for o in SERVICES if o["slug"] != s["slug"])
    eb_cls = "eyebrow africa" if s["slug"] == "africa-corridor" else "eyebrow"
    extra_sec = ""
    if s.get("process"):
        steps_html = "".join(f'<div class="step"><p class="mono">{n}</p><h3 class="h3">{e(t)}</h3><p>{e(d)}</p></div>' for n,t,d in s["process"])
        lenders_html = "".join(f"<li>{e(x)}</li>" for x in s["lenders"])
        extra_sec = f"""<section class="sec sec-sand">
<div class="wrap">
<div class="sec-head"><p class="eyebrow">How it works</p><h2 class="h2">From first conversation to facility in place</h2></div>
<div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(min(100%,190px),1fr))">{steps_html}</div>
<div style="margin-top:56px;max-width:720px">
<p class="eyebrow">What UAE lenders usually look for</p>
<ul class="checks" style="font-size:17px;line-height:26px">{lenders_html}</ul>
<p class="small muted" style="margin:16px 0 0">Every lender sets its own criteria. Not ready yet? A Finance Health Check shows what to fix first.</p>
</div>
</div>
</section>
"""
    if s["slug"] == "africa-corridor":
        extra_sec = f"""<section class="sec sec-night">
<div class="wrap corridor">
<div>
<h2 class="h2" style="margin-bottom:20px">Three countries, named because we worked there.</h2>
<p style="margin:0 0 16px;font-size:17px;line-height:28px">Finance Controller and Finance Manager roles in Tanzania and Mozambique; finance work in Zambia; fractional CFO for a logistics group across five East African countries. We name only the countries where a partner has done the work in-country.</p>
<div class="facts">
<div><p class="eyebrow">Tanzania</p><p>TRA · Swahili</p></div>
<div><p class="eyebrow">Zambia</p><p>ZRA · English</p></div>
<div><p class="eyebrow">Mozambique</p><p>AT · Portuguese</p></div>
</div>
</div>
<div>{corridor_map()}</div>
</div>
</section>
"""
    body = f"""{head(s['title'] + ' | TGM', s['meta'], '/services/' + s['slug'])}{header('africa' if s['slug']=='africa-corridor' else 'services')}
<main id="main">
<section class="page-hero">
<div class="wrap">
<p class="crumbs"><a href="/">Home</a> / <a href="/#services">Services</a> / {e(s['short'])}</p>
<p class="{eb_cls}">{e(s['eyebrow'])}</p>
<h1 class="h1" style="font-size:clamp(36px,5.5vw,64px);max-width:860px">{e(s['h1'])}</h1>
<p class="lead">{e(s['lead'])}</p>
<div class="btns">
<a class="btn btn-gold" href="/contact">Book a 20-min call</a>
<a class="btn btn-line" href="{WA}">WhatsApp us</a>
</div>
</div>
</section>

<section class="sec">
<div class="wrap">
<div class="sec-head"><p class="eyebrow">What's included</p><h2 class="h2">{e(s.get("subs_title","What we do"))}</h2></div>
<div class="grid g3">
{subs}
</div>
{subs2}
{note}
</div>
</section>
{extra_sec}
<section class="sec sec-raised">
<div class="wrap" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:48px">
<div>
<p class="eyebrow">Who it's for</p>
<ul class="checks" style="font-size:17px;line-height:26px">
{who}
</ul>
</div>
<div>
<p class="eyebrow">Other services</p>
<ul class="small" style="margin:0;padding-left:18px;display:grid;gap:6px">
{others}
</ul>
</div>
</div>
</section>
{cta_band()}
</main>
{footer()}"""
    write(f"services/{s['slug']}.html", body)

# ---------------------------------------------------------------- partners
def partners():
    yogesh_proof = [("150+ → <120 days","to collect from customers, UAE fit-out group"),
        ("80% input VAT recovered","on a capital project, working directly with the Mozambique tax authority"),
        ("5 countries","finance teams led at once, East Africa"),
        ("Clean compliance","VAT, payroll taxes and social security — no adverse findings across Big 4 audits, Tanzania"),
        ("Group ERP rollout","finance, projects and inventory in one system, reconciliations automated across entities, UAE"),
        ("3–4 days saved","per cross-border delivery through an agent network and digital proof of delivery, East Africa"),
        ("Lower funding cost","capital project borrowing moved from local currency to USD, Mozambique")]
    yogesh_tl = [("2026 – now","Founding Partner, TGM Accounting & Auditing LLC, Dubai"),
        ("2025 – 2026","Group Finance Manager, Joga Ram Group, Dubai — building materials, joinery, fit-out"),
        ("2021 – 2025","CFO, Eaglite General Trading, Dubai — fractional, then full-time; three-country trading group"),
        ("2022","Fractional CFO, Lake Trans Logistics — five East African countries"),
        ("2016 – 2020","Finance Manager, Sharaf Group — Tanzania and Mozambique"),
        ("2012 – 2015","Finance Controller, Export Trading Group — Tanzania"),
        ("2009 – 2012","Finance Controller, Acer Petroleum — Tanzania · Finance Manager, Karnavati University — India")]
    anil_proof = [("19 years","in banking and finance, UAE and India"),
        ("300 SME loan accounts","managed within credit policy, Commercial Bank of Dubai"),
        ("Taqdeer Award 2016","Commercial Bank of Dubai, Business Banking"),
        ("Channel builder","built and led a direct sales agent network for SME and commercial-mortgage lending"),
        ("CBUAE, AML & KYC","fluent in the requirements every UAE credit file must meet")]
    anil_tl = [("2024 – now","Sales Director, Expertden International, UAE"),
        ("2022 – 2024","Unit Head, SME & Commercial Mortgage, Finarise Commercial Brokers"),
        ("2020","Relationship Manager, Reem Finance PJSC"),
        ("2015 – 2019","Acting Team Leader · Senior Relationship Officer (SME), Commercial Bank of Dubai"),
        ("2013 – 2014","Relationship Officer (SME), RAKBANK"),
        ("2007 – 2012","Senior Officer, Retail & HNI Banking, ICICI Bank, India")]
    def proof(p): return '<ul class="proof">' + "".join(f"<li><b>{e(a)}</b>{e(b)}</li>" for a,b in p) + "</ul>"
    def tl(t): return '<ul class="timeline">' + "".join(f'<li><span class="mono">{e(a)}</span><span>{e(b)}</span></li>' for a,b in t) + "</ul>"
    def person(pid, img, alt, eyebrow, eb_cls, name, role, intro, creds, langs, pr, t, bg=""):
        return f"""<section id="{pid}" class="sec {bg}">
<div class="wrap profile">
<div>
<div class="portrait"><img src="/assets/img/{img}" alt="{e(alt)}" width="800" height="1000"></div>
<p class="langs" style="max-width:260px"><b style="color:var(--ink)">Languages</b><br>{e(langs)}</p>
<p class="langs" style="max-width:260px;border-top:0;margin-top:0"><b style="color:var(--ink)">Credentials</b><br>{creds}</p>
</div>
<div>
<p class="{eb_cls}">{e(eyebrow)}</p>
<h2 class="h2">{e(name)}</h2>
<p class="role" style="font-size:16px">{e(role)}</p>
{intro}
<div class="grid g2" style="margin-top:36px;gap:40px">
<div><p class="eyebrow">Results</p>{proof(pr)}</div>
<div><p class="eyebrow">Career</p>{tl(t)}</div>
</div>
</div>
</div>
</section>"""
    y_intro = """<p style="font-size:17px;line-height:28px;margin:0 0 14px">Chartered Accountant (ICAI, 2008) and M.Com, with 18 years running finance from inside operating businesses across the UAE, India, Tanzania, Zambia and Mozambique. Group CFO, Finance Controller and twice a fractional CFO for owner-run groups in trading, fit-out, logistics, petroleum and education.</p>
<p style="font-size:17px;line-height:28px;margin:0">He doesn't replace your accountant or your software. He checks them, and builds automated controls so problems surface every month, not at year-end.</p>"""
    a_intro = """<p style="font-size:17px;line-height:28px;margin:0 0 14px">Anil has spent his career on both sides of the lending table — as a relationship and credit officer at ICICI Bank, RAKBANK and Commercial Bank of Dubai, and later leading SME and commercial-mortgage business through broker networks.</p>
<p style="font-size:17px;line-height:28px;margin:0">He reads a business the way a lender does — financial statements, bank statements, turnover and cash flow — so you go to the bank with a file that is ready for credit.</p>"""
    body = f"""{head("Partners | TGM Accounting & Auditing, Dubai",
      "Meet the partners of TGM Accounting & Auditing: CA Yogesh Trivedi, Chartered Accountant and fractional CFO with 18 years across the UAE and Africa, and Anil Chowhan, 19 years in UAE banking.",
      "/partners")}{header('partners')}
<main id="main">
<section class="page-hero">
<div class="wrap">
<p class="crumbs"><a href="/">Home</a> / Partners</p>
<p class="eyebrow">Partners</p>
<h1 class="h1" style="font-size:clamp(36px,5.5vw,64px);max-width:860px">One partner who runs the finance. One who knows what the bank will ask.</h1>
<p class="lead">That combination is why owners call TGM instead of a bookkeeping shop or a loan broker.</p>
</div>
</section>
{person("yogesh","yogesh-trivedi.jpg","Portrait of CA Yogesh Trivedi","UAE · Tanzania · Zambia · Mozambique","eyebrow africa","CA Yogesh Pannalal Trivedi","Founding Partner · Finance review & Fractional CFO", y_intro,
   "Chartered Accountant, ICAI (2008)<br>M.Com, Gujarat University", "English, Hindi, Gujarati, Marwari · working Swahili and Portuguese", yogesh_proof, yogesh_tl)}
{person("anil","anil-chowhan.jpg","Portrait of Anil Chowhan","UAE banking","eyebrow uae","Anil Chowhan","Partner · Banking & capital readiness", a_intro,
   "MBA (Finance &amp; Marketing), Osmania University<br>PG Diploma, Banking Operations, NIIT IFBI<br>B.Com", "English, Hindi", anil_proof, anil_tl, "sec-raised")}
{cta_band()}
</main>
{footer()}"""
    write("partners.html", body)

# ---------------------------------------------------------------- contact
def contact():
    body = f"""{head("Contact | TGM Accounting & Auditing, Al Mankhool, Dubai",
      "Contact TGM Accounting & Auditing LLC: info@tgmauditing.com, +971 55 331 0567, WhatsApp. Office at Atrium Centre, Khalid Al Waleed Street, Al Mankhool, Dubai.",
      "/contact")}{header('contact')}
<main id="main">
<section class="page-hero">
<div class="wrap">
<p class="crumbs"><a href="/">Home</a> / Contact</p>
<p class="eyebrow">Contact</p>
<h1 class="h1" style="font-size:clamp(36px,5.5vw,64px);max-width:860px">Start with a 20-minute conversation.</h1>
<p class="lead">Tell us which numbers you rely on and where an error would hurt. If a Finance Health Check makes sense, we'll say so — and if it doesn't, we'll say that too.</p>
</div>
</section>
<section class="sec">
<div class="wrap" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr));gap:48px">
<div>
<ul class="contact-list">
<li><p class="eyebrow">Email</p><p><a href="mailto:{EMAIL}">{EMAIL}</a></p></li>
<li><p class="eyebrow">Phone</p><p><a href="tel:{PHONE_TEL}">{PHONE_DISPLAY}</a></p></li>
<li><p class="eyebrow">WhatsApp</p><p><a href="{WA}">Message us on WhatsApp</a></p></li>
<li><p class="eyebrow">Office</p><p>{e(ADDRESS)}</p><p class="small" style="margin-top:6px"><a href="{MAPS}">Open in Google Maps</a></p></li>
<li><p class="eyebrow">Hours</p><p>Monday – Friday, 9:00 – 18:00 (Gulf Standard Time)</p></li>
</ul>
<div class="btns">
<a class="btn btn-gold" href="mailto:{EMAIL}?subject=Finance%20Health%20Check%20enquiry">Email us</a>
<a class="btn btn-line" href="{WA}">WhatsApp us</a>
</div>
</div>
<div class="card" style="padding:32px">
<p class="eyebrow">What to include</p>
<h2 class="h3" style="font-size:22px;line-height:30px;margin-bottom:16px">Help us prepare for the call</h2>
<ul class="checks">
<li>What your business does, and in which countries</li>
<li>Approximate annual turnover and number of entities</li>
<li>The accounting software you use</li>
<li>What prompted you to get in touch — a bank, a tax deadline, a cash squeeze, a gut feeling</li>
</ul>
<p class="small muted" style="margin:20px 0 0">We treat everything you share as confidential. Nothing in your system is changed without your written approval.</p>
</div>
</div>
</section>
</main>
{footer()}"""
    write("contact.html", body)

def sitemap():
    urls = ["/", "/partners", "/contact"] + [f"/services/{s['slug']}" for s in SERVICES]
    x = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + \
        "".join(f"  <url><loc>{DOMAIN}{u}</loc></url>\n" for u in urls) + "</urlset>\n"
    write("sitemap.xml", x)
    write("robots.txt", f"User-agent: *\nAllow: /\n\nSitemap: {DOMAIN}/sitemap.xml\n")

def notfound():
    body = f"""{head("Page not found | TGM", "This page doesn't exist.", "/404")}{header('')}
<main id="main"><section class="sec"><div class="wrap">
<p class="eyebrow">404</p><h1 class="h2">This tower hasn't been built yet.</h1>
<p class="lead">The page you're looking for doesn't exist. Head back to the <a href="/">home page</a> or <a href="/contact">contact us</a>.</p>
</div></section></main>
{footer()}"""
    write("404.html", body)

home()
for s in SERVICES:
    service(s)
partners(); contact(); sitemap(); notfound()
print("built", len(SERVICES) + 3, "pages + 404")
