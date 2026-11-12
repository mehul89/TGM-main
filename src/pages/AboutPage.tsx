import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

interface TimelineItem {
  year: string;
  title: string;
  desc: string;
  isNow?: boolean;
}

const FOUNDER_TIMELINE: TimelineItem[] = [
  {
    year: '2001',
    title: 'Office boy',
    desc: 'Joins a Chartered Accountant’s practice in Ahmedabad. Studies B.Com in Gujarati medium by day, learns the books by night.',
  },
  {
    year: '2005',
    title: 'CA exams, self-study',
    desc: 'Clears CA PE-II at the first attempt without coaching, while still working in the practice.',
  },
  {
    year: '2008',
    title: 'Chartered Accountant',
    desc: 'Qualifies with ICAI and adds an M.Com.',
  },
  {
    year: '2009',
    title: 'Finance Manager',
    desc: 'Karnavati University, India — then Finance Controller at Acer Petroleum, Tanzania.',
  },
  {
    year: '2012',
    title: 'Finance Controller',
    desc: 'Export Trading Group, Tanzania — VAT, payroll taxes and social security with no adverse findings across Big 4 audits.',
  },
  {
    year: '2016',
    title: 'Finance Manager',
    desc: 'Sharaf Group, Tanzania and Mozambique — 80% input VAT recovered on a capital project; borrowing moved to USD.',
  },
  {
    year: '2021',
    title: 'CFO',
    desc: 'Eaglite General Trading, Dubai — three-country trading group. Fractional CFO for Lake Trans Logistics across five East African countries.',
  },
  {
    year: '2025',
    title: 'Group Finance Manager',
    desc: 'Joga Ram Group, Dubai — building materials, joinery and fit-out; group ERP rollout and receivables cut from 150+ to under 120 days.',
  },
  {
    year: '2026',
    title: 'Founder, TGM',
    desc: 'Opens TGM Accounting & Auditing LLC in Dubai with Anil Chowhan, formally launched on Deepawali.',
    isNow: true,
  },
];

export const AboutPage: React.FC = () => {
  useEffect(() => {
    document.title = 'About Us | TGM Accounting & Auditing, Dubai';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'TGM Accounting & Auditing LLC is a Dubai mainland firm founded by a Chartered Accountant and a career banker, bringing two decades of finance leadership to owner-run businesses.'
      );
    }
  }, []);

  return (
    <main id="main" className="about-page">
      {/* 1. HERO SECTION */}
      <section className="about-hero">
        <div className="wrap">
          <p className="eyebrow on-dark">About TGM</p>
          <h1 className="h1">
            Built by people who have run the finance,
            <br />
            <span className="gold-i">not just reviewed it.</span>
          </h1>
          <p className="lead about-hero-lead">
            TGM Accounting &amp; Auditing LLC is a Dubai mainland firm founded in 2026 by a Chartered
            Accountant and a career banker. We bring two decades of finance leadership from inside
            operating businesses in the UAE, India, Tanzania, Zambia and Mozambique to owner-run
            companies that need numbers they can trust.
          </p>
          <div className="about-rule" />
        </div>
      </section>

      {/* 2. OUR STORY SECTION */}
      <section className="about-story">
        <div className="wrap about-two">
          <div>
            <p className="eyebrow forest">Our story</p>
            <h2 className="h2 about-story-heading">
              Two careers on opposite sides of the table.
            </h2>
            <blockquote className="about-quote">
              “Your system says you made a profit. Your bank may disagree.”
            </blockquote>
          </div>
          <div>
            <p className="about-body">
              As Group CFO and Finance Manager, Yogesh Trivedi watched owners make big decisions on
              reports nobody had tested. As a relationship and credit officer at UAE banks, Anil
              Chowhan watched good businesses turned down because their numbers could not survive a
              credit review.
            </p>
            <p className="about-body">
              Most owners do not need more reports. They need someone who checks whether the reports
              are true, fixes what is not, and stands beside them when the bank, a buyer or the FTA
              starts asking questions. That is the firm we built.
            </p>
            <p className="about-body" style={{ margin: 0 }}>
              Because so many UAE businesses trade with and operate in Africa, TGM works across all
              UAE freezones (DIFC, ADGM, DMCC, JAFZA, DAFZA, RAKEZ, Shams, IFZA, Meydan) and Mainland
              corporate registries, while managing cross-border financial operations throughout the
              East and Southern African continent (Tanzania, Zambia, Mozambique, Kenya, South Africa)
              — led by people who have closed books, faced local revenue authorities, and supervised
              heavy industrial supply chains from inside operating businesses.
            </p>
          </div>
        </div>

        {/* UAE–Africa Cross-Border Industrial Corridor Visual */}
        <div className="wrap" style={{ marginTop: '48px' }}>
          <div className="about-image-frame" style={{ maxHeight: '440px', borderRadius: '12px', overflow: 'hidden' }}>
            <img
              src="/assets/img/uae-africa-panoramic-skyline.jpg"
              alt="UAE Freezones and Mainland corporate hubs connected with East and Southern African industrial operations and trade leadership"
              width={2000}
              height={1125}
              loading="lazy"
              style={{ objectPosition: 'center 35%' }}
            />
            <div className="about-stat-overlay">
              <div className="stat-cols">
                <div className="stat-col">
                  <b>All UAE Freezones &amp; Mainland</b>
                  <span>DIFC · ADGM · DMCC · JAFZA · Mainland</span>
                </div>
                <div className="stat-col">
                  <b>East &amp; Southern African Continent</b>
                  <span>Tanzania · Zambia · Mozambique · S. Africa</span>
                </div>
              </div>
              <div className="corridor-chips">
                <span>Industrial Logistics</span>
                <span aria-hidden="true">·</span>
                <span>Heavy Manufacturing</span>
                <span aria-hidden="true">·</span>
                <span>Trade Finance Facilities</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE FOUNDER'S JOURNEY SECTION */}
      <section className="about-journey dark">
        <div className="wrap">
          <p className="eyebrow on-dark">The founder's journey</p>
          <h2 className="h2" style={{ color: 'var(--ivory)' }}>
            From office boy to <span className="gold-i">Group CFO.</span>
          </h2>
          <p className="lead about-journey-lead">
            Twenty-five years, every rung of the ladder — and the reason TGM respects the basics.
          </p>

          <ol className="about-tl">
            {FOUNDER_TIMELINE.map((item) => (
              <li
                key={item.year}
                className={`about-tl-item ${item.isNow ? 'about-tl-now' : ''}`}
              >
                <span className="about-tl-year">{item.year}</span>
                <div className="about-tl-body">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className="about-journey-foot">
            That climb shapes how TGM works: respect for the basics, patience with the detail, and
            every number earned.
          </p>
        </div>
      </section>

      {/* 4. MISSION & VISION SECTION */}
      <section className="about-mv">
        <div className="wrap">
          <p className="eyebrow forest">Purpose</p>
          <h2 className="h2 about-mv-heading">Why we exist, and where we are going.</h2>
          <div className="about-mv-grid">
            <div className="about-mv-card">
              <p className="eyebrow forest">Our mission</p>
              <p className="stmt">
                To give every owner-run business numbers it can trust — books that are true,
                controls that work every month, and finance leadership that turns those numbers into
                decisions, funding and growth.
              </p>
            </div>
            <div className="about-mv-card">
              <p className="eyebrow forest">Our vision</p>
              <p className="stmt">
                To be the most trusted finance partner for businesses building between the UAE and
                Africa — the firm owners call first when the numbers matter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. OUR VALUES SECTION */}
      <section className="about-values">
        <div className="wrap">
          <p className="eyebrow forest">Our values</p>
          <h2 className="h2 about-values-heading">Our name is our standard.</h2>
          <p className="lead about-values-lead">
            TGM stands for Transparency, Governance and Materiality — three words every owner,
            banker and auditor understands, and the three tests we apply to all our work.
          </p>

          <div className="about-v-grid">
            <div className="about-v-card">
              <div className="about-v-num">T</div>
              <h3>Transparency</h3>
              <p>
                We tell you what your numbers say, including what you would rather not hear. Every
                finding is in writing and valued in dirhams.
              </p>
            </div>
            <div className="about-v-card">
              <div className="about-v-num">G</div>
              <h3>Governance</h3>
              <p>
                Controls, approvals and monthly checks that protect the owner's money when nobody is
                watching.
              </p>
            </div>
            <div className="about-v-card">
              <div className="about-v-num">M</div>
              <h3>Materiality</h3>
              <p>
                We focus on what moves your money. Small issues are noted; material issues are fixed
                first.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. OUR COMMITMENTS SECTION */}
      <section className="about-commit dark">
        <div className="wrap">
          <p className="eyebrow on-dark">Our commitments</p>
          <h2 className="h2" style={{ color: 'var(--ivory)' }}>What you can hold us to.</h2>
          <div className="about-c-grid">
            <div className="about-c-item">
              <h4>Senior people on your file</h4>
              <p>The partners who sign your engagement do the thinking on it.</p>
            </div>
            <div className="about-c-item">
              <h4>Nothing changed without approval</h4>
              <p>Reviews are view-only. Fixes happen only after you agree them in writing.</p>
            </div>
            <div className="about-c-item">
              <h4>Scope and fees up front</h4>
              <p>You know what you get, by when and for how much before work starts.</p>
            </div>
            <div className="about-c-item">
              <h4>Your data stays confidential</h4>
              <p>Your books, bank statements and plans are used for your work and nothing else.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. LEADERSHIP SECTION */}
      <section className="about-lead">
        <div className="wrap">
          <div className="sec-head" style={{ marginBottom: '40px' }}>
            <h2 className="sec-heading">Leadership</h2>
            <p className="sec-subheading">The Practitioners Behind TGM.</p>
            <p className="sec-body">
              Experienced Chartered Accountants and corporate bankers with direct operating credentials across the UAE, East Africa, and India.
            </p>
          </div>
          <div className="about-p-grid">
            <article className="about-p-card">
              <div className="about-p-photo">
                <img
                  src="/assets/img/yogesh-trivedi.jpg"
                  alt="Portrait of CA Yogesh Trivedi"
                  width="300"
                  height="375"
                  loading="lazy"
                />
              </div>
              <div className="about-p-body">
                <h3>CA Yogesh Trivedi</h3>
                <p className="about-p-role">Founder</p>
                <p>
                  Chartered Accountant (ICAI, 2008). From office boy to Group CFO across the UAE,
                  India, Tanzania and Mozambique. Leads finance review, fractional CFO and the
                  UAE–Africa corridor.
                </p>
                <div style={{ marginTop: '16px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <Link
                    to="/partners#yogesh"
                    style={{
                      color: 'var(--forest)',
                      fontWeight: 700,
                      fontSize: '14px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <span>View partner bio</span>
                    <span>→</span>
                  </Link>
                  <a
                    href="https://yogesh-pannalal-trivedi.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--gold-primary)',
                      fontWeight: 700,
                      fontSize: '14px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <span>Personal website</span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M7 17L17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </a>
                </div>
              </div>
            </article>

            <article className="about-p-card">
              <div className="about-p-photo">
                <img
                  src="/assets/img/anil-chowhan.jpg"
                  alt="Portrait of Anil Chowhan"
                  width="300"
                  height="375"
                  loading="lazy"
                />
              </div>
              <div className="about-p-body">
                <h3>Anil Chowhan</h3>
                <p className="about-p-role">Co-Founder</p>
                <p>
                  19 years in banking at ICICI Bank, RAKBANK and Commercial Bank of Dubai, where he
                  managed 300 SME accounts. Leads banking and funding advisory.
                </p>
                <div style={{ marginTop: '16px' }}>
                  <Link
                    to="/partners#anil"
                    style={{
                      color: 'var(--forest)',
                      fontWeight: 700,
                      fontSize: '14px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <span>View partner bio</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION SECTION */}
      <section className="about-cta dark">
        <div className="wrap">
          <p className="eyebrow on-dark">Start here</p>
          <h2 className="h2" style={{ color: 'var(--ivory)' }}>
            Let's build a stronger foundation for your business.
          </h2>
          <div className="btns" style={{ justifyContent: 'center' }}>
            <Link className="btn btn-gold" to="/contact">
              Schedule a consultation
            </Link>
            <Link className="btn btn-line-ivory" to="/#services">
              Explore our expertise
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
