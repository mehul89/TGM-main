import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CorridorMapSection } from '../components/CorridorMapSection';
import { SERVICES } from '../data/services';
import { SITE_CONFIG } from '../data/siteConfig';

gsap.registerPlugin(ScrollTrigger);

const PillarIconT: React.FC = () => (
  <svg
    viewBox="0 0 80 80"
    width="52"
    height="52"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="pillar-svg"
    aria-hidden="true"
  >
    {/* TGM Classic Serif T */}
    <path
      d="M16 20h48v7.5h-7.5c-2.4 0-3.6-1.2-4.2-3.4h-10v35.5c0 3 1.2 4.2 4.2 4.5V66H33.5v-2.2c3-0.3 4.2-1.5 4.2-4.5V24.1H27.7c-0.6 2.2-1.8 3.4-4.2 3.4H16V20z"
      fill="#FFF2DF"
    />
  </svg>
);

const PillarIconG: React.FC = () => (
  <svg
    viewBox="0 0 80 80"
    width="52"
    height="52"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="pillar-svg"
    aria-hidden="true"
  >
    {/* Central Globe Counter Motif matching TGM Logo */}
    <g transform="translate(36, 42)">
      <circle cx="0" cy="0" r="15" fill="none" stroke="#C59F5A" strokeWidth="1.6" />
      <line x1="-15" y1="0" x2="15" y2="0" stroke="#C59F5A" strokeWidth="1.2" opacity="0.8" />
      <path d="M-13 -7 Q0 -4.5 13 -7" stroke="#C59F5A" strokeWidth="1" fill="none" opacity="0.65" />
      <path d="M-13 7 Q0 4.5 13 7" stroke="#C59F5A" strokeWidth="1" fill="none" opacity="0.65" />
      <line x1="0" y1="-15" x2="0" y2="15" stroke="#C59F5A" strokeWidth="1.2" opacity="0.8" />
      <ellipse cx="0" cy="0" rx="8" ry="15" stroke="#C59F5A" strokeWidth="1" fill="none" opacity="0.75" />
      <path
        d="M-4 -8 C-2 -6, 2 -5, 3 -2 C4 2, 2 6, 0 8.5 C-3 6, -5 2, -4 -3 Z"
        fill="#DFBA79"
        opacity="0.4"
      />
    </g>

    {/* TGM Serif Capital G outer bowl */}
    <path
      d="M62 25.5c-3.2-6.5-9.2-10.5-19-10.5-15 0-26 11-26 25s11 25 26.5 25c12.5 0 20.8-6.5 22.5-18H44v-6.5h29v1.2c0 8.5-3.5 16-9.5 20.8-6 4.8-14.2 7.5-23.5 7.5C18.5 70 6 56.5 6 40S18.5 10 38 10c11.5 0 20.5 5 26.5 13l-2.5 2.5z"
      fill="#FFF2DF"
    />
  </svg>
);

const PillarIconM: React.FC = () => (
  <svg
    viewBox="0 0 80 80"
    width="52"
    height="52"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="pillar-svg"
    aria-hidden="true"
  >
    {/* Left vertical stem with classic serifs */}
    <path
      d="M13 63h11v-2.2c-2.6-0.3-3.8-1.5-3.8-4V25c0-2.5 1.2-3.7 3.8-4V18.8H10.5V21c2.6 0.3 3.8 1.5 3.8 4v31.8c0 2.5-1.2 3.7-3.8 4V63h2.5z"
      fill="#FFF2DF"
    />
    {/* Left diagonal */}
    <path d="M21 24.5 L36 56 H39.5 L27 21 H22.5 Z" fill="#FFF2DF" />

    {/* 3 Ascending Bar Chart Pillars inside M (Financial Metrics) */}
    <rect x="40.5" y="44" width="3.4" height="13" rx="0.8" fill="#C59F5A" />
    <rect x="46" y="37" width="3.4" height="20" rx="0.8" fill="#C59F5A" />
    <rect x="51.5" y="30" width="3.4" height="27" rx="0.8" fill="#DFBA79" />

    {/* Upward Trend Arc Swooping Up to Arrowhead ↗ from TGM Logo */}
    <path
      d="M31.5 56.5 C40 45, 51 29, 66.5 15.5"
      stroke="#DFBA79"
      strokeWidth="3.6"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M55.5 13.5 L69 13 L67 26.5 L62.5 21 L55.5 13.5 Z"
      fill="#DFBA79"
    />

    {/* Right vertical stem with classic serifs */}
    <path
      d="M63 63h11v-2.2c-2.6-0.3-3.8-1.5-3.8-4V32.5c0-2.5 1.2-3.7 3.8-4V26.3H60.5v2.2c2.6 0.3 3.8 1.5 3.8 4v24.5c0 2.5-1.2 3.7-3.8 4V63h2.5z"
      fill="#FFF2DF"
    />
  </svg>
);

const PHILOSOPHY_PILLARS = [
  {
    id: 'transparency',
    letter: 'T',
    restOfTitle: 'ransparency',
    tagline: 'Radical Balance Sheet Clarity',
    desc: 'True numbers hold up under any external scrutiny. We bring radical clarity to financial records, intercompany ledgers, and inventory balances, eliminating hidden liabilities and giving owners unambiguous visibility.',
  },
  {
    id: 'governance',
    letter: 'G',
    restOfTitle: 'overnance',
    tagline: 'Institutional Controls & Asset Protection',
    desc: 'Rigorous institutional controls that safeguard company assets. We institute strict delegation of authority, scheduled automated reconciliations, and fraud detection protocols that operate every single month.',
  },
  {
    id: 'materiality',
    letter: 'M',
    restOfTitle: 'ateriality',
    tagline: 'Dirham-Valued Strategic Remediation',
    desc: 'Directing leadership attention strictly to what moves the commercial needle. Every finding in our reviews is rated by severity and valued in UAE dirhams, ensuring management capitalizes on high-yield remediations first.',
  },
];

const APPROACH_STEPS = [
  {
    num: '01',
    name: 'Understand',
    title: 'Diagnostic Discovery',
    desc: 'A focused 20-minute consultation identifying which numbers management relies on, where controls are vulnerable, and where a tax surprise or audit finding would hurt.',
  },
  {
    num: '02',
    name: 'Strategize',
    title: 'Independent Review',
    desc: 'Strictly view-only inspection of your books, ERP systems, and reconciliations. Findings are valued in dirhams and ranked on an objective red/amber/green scale.',
  },
  {
    num: '03',
    name: 'Implement',
    title: 'Control Deployment',
    desc: 'Installing automated checking layers, closing backlog gaps, configuring clean tax filing schedules, and structuring credit-ready banking dossiers.',
  },
  {
    num: '04',
    name: 'Evolve',
    title: 'Continuous Governance',
    desc: 'Structured monthly owner reviews, 13-week rolling cash forecasts, proactive corporate tax reviews, and ongoing audit readiness across all active jurisdictions.',
  },
];

const DUBAI_ADVANTAGES = [
  {
    title: 'All UAE Freezones & Mainland Hubs',
    desc: 'Full-spectrum corporate tax, Qualifying Free Zone Person (QFZP) substance, and statutory audit readiness across DIFC, ADGM, DMCC, JAFZA, DAFZA, RAKEZ, Shams, IFZA, and Mainland corporate registries.',
  },
  {
    title: 'East & Southern African Continent',
    desc: 'On-the-ground operational finance and tax leadership across Tanzania, Zambia, Mozambique, Kenya, Uganda, and South Africa — managing in-country VAT, cross-border customs, and multi-currency treasury.',
  },
  {
    title: 'Industrial & Trade Supply Chains',
    desc: 'Institutional financial controls engineered for capital-intensive operating sectors: international trade, port cargo logistics, manufacturing plants, contracting, energy distribution, and agro-commodities.',
  },
  {
    title: 'Cross-Border Banking & Facilities',
    desc: 'Structuring lender-grade banking files, letters of credit (LCs), trade finance lines, and collateral covenants that satisfy tier-1 UAE and African commercial bank credit committees.',
  },
];

export const HomePage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);
  const [heroImgLoaded, setHeroImgLoaded] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (heroImgRef.current && heroImgRef.current.complete) {
      setHeroImgLoaded(true);
    }
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Hero Content Entrance Sequence (Background fade -> headline words sequence -> description & CTA upward motion)
      const heroTl = gsap.timeline({
        delay: 0.1,
        defaults: { ease: 'power3.out' },
      });

      heroTl
        // 1. Fade in the background
        .fromTo(
          '.hero-fullscreen-bg',
          { opacity: 0, scale: 1.08 },
          { opacity: 1, scale: 1.0, duration: 1.4, ease: 'power2.out' }
        )
        // 2. Sequence the headline words with staggered upward motion
        .fromTo(
          '.hero-word',
          { opacity: 0, y: 32, filter: 'blur(4px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.65,
            stagger: 0.08,
            ease: 'power3.out',
          },
          '-=0.75'
        )
        // 3. Followed by description appearing with a subtle upward motion
        .fromTo(
          '.hero-desc',
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.25'
        )
        // 4. Followed by CTA buttons appearing with a subtle upward motion
        .fromTo(
          '.hero-cta-btn',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out' },
          '-=0.4'
        );

      // 2. Timeline Progress Bar ScrollTrigger
      ScrollTrigger.create({
        trigger: '.sec-approach',
        start: 'top 70%',
        end: 'bottom 85%',
        scrub: 0.4,
        onUpdate: (self) => {
          const progressBar = document.querySelector<HTMLElement>('.timeline-line-progress');
          if (progressBar) {
            progressBar.style.width = `${self.progress * 100}%`;
          }
          const stepIndex = Math.min(Math.floor(self.progress * 4), 3);
          setActiveStep(stepIndex);
        },
      });

      // 3. Staggered Philosophy Pillars
      gsap.fromTo(
        '.pillar-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.18,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.sec-philosophy',
            start: 'top 75%',
          },
        }
      );

      // 4. Staggered Expertise Rows
      gsap.fromTo(
        '.expertise-row',
        { opacity: 0, x: -25 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.expertise-list',
            start: 'top 80%',
          },
        }
      );

      // 5. Approach Step Cards Entrance
      gsap.fromTo(
        '.timeline-step',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.14,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.timeline-steps',
            start: 'top 80%',
          },
        }
      );

      // 6. General Section Headings Reveal
      gsap.utils.toArray<HTMLElement>('.reveal-on-scroll').forEach((elem) => {
        gsap.fromTo(
          elem,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: elem,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToExpertise = () => {
    const target = document.getElementById('expertise');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} id="main">
      {/* ==================== 1. FULL-SCREEN DUBAI SKYLINE HERO ==================== */}
      <section ref={heroRef} className="hero-fullscreen">
        <div className="hero-fullscreen-bg" aria-hidden="true">
          {/* 1. Low-res blurred placeholder (LQIP) - instant 400B paint */}
          <div
            className={`hero-bg-layer hero-bg-placeholder ${heroImgLoaded ? 'faded' : ''}`}
            style={{
              backgroundImage: "url('/assets/img/dubai-skyline-hero-thumb.jpg')",
            }}
          />

          {/* 2. High-res picture with modern WebP and JPG fallback */}
          <picture className={`hero-bg-layer hero-bg-picture ${heroImgLoaded ? 'loaded' : ''}`}>
            <source srcSet="/assets/img/dubai-skyline-hero.webp" type="image/webp" />
            <img
              ref={heroImgRef}
              src="/assets/img/dubai-skyline-hero.jpg"
              alt=""
              {...{ fetchpriority: 'high' }}
              decoding="async"
              className="hero-bg-img"
              onLoad={() => setHeroImgLoaded(true)}
            />
          </picture>

          {/* 3. Atmospheric luxury brand gradient overlay */}
          <div className="hero-bg-overlay" />
        </div>

        <div className="wrap">
          <div className="hero-content-centered">
            <h1
              className="h1 hero-headline"
              style={{ maxWidth: '880px', marginBottom: '24px' }}
            >
              <span className="hero-heading-line" style={{ display: 'block', marginBottom: '6px' }}>
                <span className="hero-word">Clarity</span>
                <span className="hero-word">in</span>
                <span className="hero-word">Every</span>
                <span className="hero-word">Decision.</span>
              </span>
              <span className="hero-heading-line" style={{ display: 'block' }}>
                <span className="hero-word gold">Confidence</span>
                <span className="hero-word gold">in</span>
                <span className="hero-word gold">Every</span>
                <span className="hero-word gold">Direction.</span>
              </span>
            </h1>

            <p
              className="lead on-dark hero-desc"
              style={{ maxWidth: '680px', fontSize: '19px', lineHeight: '34px', margin: '0 auto 36px' }}
            >
              Driving transparency, strengthening governance, and delivering meaningful corporate solutions for businesses navigating an evolving global landscape.
            </p>

            <div className="btns" style={{ justifyContent: 'center', marginTop: 0 }}>
              <button
                type="button"
                className="btn btn-gold hero-cta-btn"
                onClick={scrollToExpertise}
              >
                Explore Our Expertise
              </button>
              <Link className="btn btn-line-ivory hero-cta-btn" to="/contact">
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </div>

      </section>

      {/* ==================== 2. BRAND PHILOSOPHY (WARM IVORY) ==================== */}
      <section className="sec-philosophy">
        <div className="wrap">
          <div className="sec-head reveal-on-scroll">
            <h2 className="sec-heading">Brand Philosophy</h2>
            <p className="sec-subheading">More Than Compliance. A Commitment to Better Governance.</p>
            <p className="sec-body">
              We believe that enterprise resilience stems from institutional clarity. Our core ethos is anchored in three non-negotiable principles:
            </p>
          </div>

          <div className="grid g3">
            {PHILOSOPHY_PILLARS.map((pillar) => (
              <div key={pillar.id} className="pillar-card">
                <div className="pillar-badge" aria-hidden="true">
                  {pillar.id === 'transparency' && <PillarIconT />}
                  {pillar.id === 'governance' && <PillarIconG />}
                  {pillar.id === 'materiality' && <PillarIconM />}
                </div>
                <p className="pillar-tagline">{pillar.tagline}</p>
                <h3 className="pillar-title">
                  <span className={`pillar-initial font-${pillar.letter.toLowerCase()}`}>
                    {pillar.letter}
                  </span>
                  {pillar.restOfTitle}
                </h3>
                <p className="pillar-desc">{pillar.desc}</p>
              </div>
            ))}
          </div>

          {/* Tagline Rule */}
          <div
            style={{
              marginTop: '68px',
              paddingTop: '36px',
              borderTop: '1px solid var(--border-light)',
            }}
          >
            <div className="brand-tagline-bar" style={{ color: 'var(--forest)' }}>
              <span className="rule" />
              <span className="text">TRANSPARENCY | GOVERNANCE | MATERIALITY</span>
              <span className="rule" />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 3. ABOUT TGM (EDITORIAL SPLIT-SCREEN) ==================== */}
      <section className="sec-about">
        <div className="wrap">
          <div className="about-split">
            {/* Editorial Introduction */}
            <div className="reveal-on-scroll">
              <div className="sec-head left-aligned" style={{ marginBottom: '28px' }}>
                <h2 className="sec-heading">About TGM</h2>
                <p className="sec-subheading">A New Perspective on Corporate Excellence.</p>
                <p className="sec-body left-aligned" style={{ color: 'var(--text-dark)', marginBottom: '14px' }}>
                  Headquartered in Dubai and actively advising across key commercial and industrial corridors in the East and Southern African continent, TGM Accounting &amp; Auditing bridges the critical divide between standard compliance bookkeeping and senior executive leadership.
                </p>
                <p className="sec-body left-aligned" style={{ color: 'var(--text-dark)', marginBottom: '14px' }}>
                  We work across all Freezones (including DIFC, ADGM, DMCC, JAFZA, DAFZA, RAKEZ, Shams, IFZA, Meydan) and Mainland corporate hubs in the UAE, while managing extensive cross-border finance, group consolidation, and trade compliance across Tanzania, Zambia, Mozambique, Kenya, and South Africa.
                </p>
                <p className="sec-body left-aligned" style={{ color: 'var(--text-muted)' }}>
                  Founded by seasoned Chartered Accountants and corporate bankers with over 18 years inside multi-jurisdictional trading, manufacturing, contracting, and logistics groups, we don't advise from afar. We have closed books, led in-country finance teams, faced revenue authorities, and structured multi-million dirham corporate credit lines from inside operating entities.
                </p>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '16px',
                  padding: '24px 0',
                  borderTop: '1px solid var(--border-light)',
                  borderBottom: '1px solid var(--border-light)',
                  marginBottom: '32px',
                }}
              >
                <div>
                  <span className="mono" style={{ fontSize: '26px', color: 'var(--forest)', fontWeight: 600 }}>18+</span>
                  <span style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Years Operating Experience</span>
                </div>
                <div>
                  <span className="mono" style={{ fontSize: '18px', color: 'var(--forest)', fontWeight: 700, lineHeight: 1.2, display: 'block', minHeight: '32px', paddingTop: '4px' }}>All Freezones</span>
                  <span style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>&amp; UAE Mainland Hubs</span>
                </div>
                <div>
                  <span className="mono" style={{ fontSize: '18px', color: 'var(--forest)', fontWeight: 700, lineHeight: 1.2, display: 'block', minHeight: '32px', paddingTop: '4px' }}>East &amp; Southern</span>
                  <span style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>African Continent Footprint</span>
                </div>
              </div>

              <Link className="arrow-link" to="/partners" style={{ fontSize: '15px' }}>
                <span>Meet the Operating Partners</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14m-7-7 7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* UAE–Africa Industrial & Corporate Corridor Photography */}
            <div className="reveal-on-scroll">
              <div className="about-image-frame">
                <img
                  src="/assets/img/uae-africa-industrial-corridor.jpg"
                  alt="UAE Freezones and Mainland corporate hubs connected with East and Southern African industrial operations, manufacturing, and leadership"
                  width={2000}
                  height={1500}
                  loading="lazy"
                />
                <div className="about-stat-overlay">
                  <div className="stat-cols">
                    <div className="stat-col">
                      <b>All UAE Freezones &amp; Mainland</b>
                      <span>DIFC · ADGM · DMCC · JAFZA · Mainland</span>
                    </div>
                    <div className="stat-col">
                      <b>East &amp; Southern Africa</b>
                      <span>Tanzania · Zambia · Mozambique · S. Africa</span>
                    </div>
                  </div>
                  <div className="corridor-chips">
                    <span>Industrial Logistics</span>
                    <span aria-hidden="true">·</span>
                    <span>Heavy Manufacturing</span>
                    <span aria-hidden="true">·</span>
                    <span>Trade Finance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 4. OUR EXPERTISE (FULL-WIDTH EDITORIAL ROWS) ==================== */}
      <section id="expertise" className="sec-expertise">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="sec-heading on-dark">Practice Areas</h2>
            <p className="sec-subheading on-dark">Comprehensive Corporate &amp; Governance Expertise.</p>
            <p className="sec-body on-dark">
              Eight core disciplines engineered to protect your balance sheet, ensure bulletproof compliance, and accelerate sustainable commercial growth.
            </p>
          </div>

          <div className="expertise-list">
            {SERVICES.map((s, idx) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="expertise-row"
              >
                <span className="row-num">0{idx + 1}</span>
                <h3 className="row-title">{s.short}</h3>
                <p className="row-desc">{s.lead}</p>
                <span className="row-cta">
                  <span>Explore</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14m-7-7 7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 5. OPERATIONAL CORRIDOR & GLOBAL MAP (UAE · AFRICA · INDIA) ==================== */}
      <CorridorMapSection />

      {/* ==================== 6. STRATEGIC JURISDICTION & TRADE CORRIDORS ==================== */}
      <section className="sec-dubai-advantage">
        <div className="dubai-advantage-bg" aria-hidden="true" />
        <div className="wrap">
          <div className="sec-head reveal-on-scroll">
            <h2 className="sec-heading on-dark">Strategic Jurisdiction &amp; Corridors</h2>
            <p className="sec-subheading on-dark">UAE Freezones &amp; Mainland Linked to East &amp; Southern Africa.</p>
            <p className="sec-body on-dark">
              We work across all UAE freezones and mainland corporate hubs, providing institutional financial governance, cross-border tax optimization, and trade finance infrastructure connecting GCC capital with thriving industrial markets across the East and Southern African continent.
            </p>
          </div>

          <div className="advantage-grid">
            {DUBAI_ADVANTAGES.map((adv, idx) => (
              <div key={idx} className="advantage-card reveal-on-scroll">
                <h3>{adv.title}</h3>
                <p>{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 6. OUR APPROACH (ANIMATED CONNECTING TIMELINE) ==================== */}
      <section className="sec-approach">
        <div className="wrap">
          <div className="sec-head reveal-on-scroll">
            <h2 className="sec-heading">Methodology</h2>
            <p className="sec-subheading">Our Structured Diagnostic Approach.</p>
            <p className="sec-body">
              A disciplined four-phase sequence designed to resolve financial blind spots without interrupting daily operations.
            </p>
          </div>

          <div className="timeline-steps">
            <div className="timeline-line-track" aria-hidden="true" />
            <div className="timeline-line-progress" aria-hidden="true" />

            {APPROACH_STEPS.map((step, idx) => (
              <div
                key={step.num}
                className={`timeline-step ${activeStep === idx ? 'active' : ''}`}
                onMouseEnter={() => setActiveStep(idx)}
              >
                <div className="timeline-node">{step.num}</div>
                <p className="eyebrow forest" style={{ marginBottom: '6px' }}>{step.name}</p>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 7. FINAL CTA (CINEMATIC DUBAI SKYLINE) ==================== */}
      <section className="sec-contact-cta">
        <div className="contact-cta-bg" aria-hidden="true" />
        <div className="wrap reveal-on-scroll">
          <div className="sec-head" style={{ marginBottom: '32px' }}>
            <h2 className="sec-heading on-dark">Initiate Governance</h2>
            <p className="sec-subheading on-dark">Let's Build a Stronger Foundation for Your Business.</p>
            <p className="sec-body on-dark">
              Connect directly with an operating partner for an introductory conversation on your internal controls, Corporate Tax positioning, or bank facility readiness.
            </p>
          </div>
          <div className="btns" style={{ justifyContent: 'center', marginTop: '36px' }}>
            <Link className="btn btn-gold" to="/contact">
              Schedule a Consultation
            </Link>
            <a
              className="btn btn-line-ivory"
              href={SITE_CONFIG.wa}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp Advisory Desk
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
