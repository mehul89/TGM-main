import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICES } from '../data/services';
import { SITE_CONFIG } from '../data/siteConfig';

gsap.registerPlugin(ScrollTrigger);

const PHILOSOPHY_PILLARS = [
  {
    num: '01',
    title: 'Transparency',
    desc: 'True numbers hold up under any external scrutiny. We bring radical clarity to financial records, intercompany ledgers, and inventory balances, eliminating hidden liabilities and giving owners unambiguous visibility.',
  },
  {
    num: '02',
    title: 'Governance',
    desc: 'Rigorous institutional controls that safeguard company assets. We institute strict delegation of authority, scheduled automated reconciliations, and fraud detection protocols that operate every single month.',
  },
  {
    num: '03',
    title: 'Materiality',
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
    title: 'Global Commercial Gateway',
    desc: 'Connecting Dubai to established trading hubs across East Africa and South Asia with world-class logistics and legal frameworks.',
  },
  {
    title: 'Evolving Tax & Substance Standards',
    desc: 'Navigating UAE Corporate Tax, Qualifying Free Zone Person (QFZP) rules, and FTA transfer pricing requirements with Chartered Accountant precision.',
  },
  {
    title: 'Lender & Banking Readiness',
    desc: 'Preparing underwriting files and covenants designed specifically to satisfy UAE tier-1 commercial bank credit committees.',
  },
  {
    title: 'Bilateral Corridor Execution',
    desc: 'Providing continuous group finance governance across the UAE and operating subsidiaries in Tanzania, Zambia, and Mozambique.',
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
        // Eyebrow location badge
        .fromTo(
          '.hero-eyebrow',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.65 },
          '-=0.85'
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
          '-=0.45'
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
        )
        // 5. Scroll indicator fades in
        .fromTo(
          '.scroll-indicator',
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: 'power1.out' },
          '-=0.2'
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
              fetchPriority="high"
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
            <p className="eyebrow on-dark hero-eyebrow">
              Dubai · Tanzania · Zambia · Mozambique
            </p>

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

        {/* Animated Scroll Indicator */}
        <div
          className="scroll-indicator"
          onClick={scrollToExpertise}
          role="button"
          tabIndex={0}
          aria-label="Scroll to explore"
        >
          <div className="scroll-indicator-mouse" />
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* ==================== 2. BRAND PHILOSOPHY (WARM IVORY) ==================== */}
      <section className="sec-philosophy">
        <div className="wrap">
          <div className="sec-head reveal-on-scroll" style={{ textAlign: 'center', margin: '0 auto 52px' }}>
            <p className="eyebrow forest">Brand Philosophy</p>
            <h2 className="h2" style={{ color: 'var(--forest-deep)' }}>
              More Than Compliance. A Commitment to Better Governance.
            </h2>
            <p className="lead" style={{ margin: '16px auto 0', color: 'var(--text-muted)' }}>
              We believe that enterprise resilience stems from institutional clarity. Our core ethos is anchored in three non-negotiable principles:
            </p>
          </div>

          <div className="grid g3">
            {PHILOSOPHY_PILLARS.map((pillar) => (
              <div key={pillar.num} className="pillar-card">
                <div className="pillar-num">{pillar.num}</div>
                <h3>{pillar.title}</h3>
                <p>{pillar.desc}</p>
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
              <p className="eyebrow forest">About TGM</p>
              <h2 className="h2" style={{ color: 'var(--forest-deep)', marginBottom: '24px' }}>
                A New Perspective on Corporate Excellence.
              </h2>
              <p style={{ fontSize: '16px', lineHeight: '28px', color: 'var(--text-dark)', marginBottom: '18px' }}>
                Headquartered in Dubai and operating across key commercial corridors in East Africa, TGM Accounting &amp; Auditing bridges the critical divide between standard compliance bookkeeping and senior executive leadership.
              </p>
              <p style={{ fontSize: '16px', lineHeight: '28px', color: 'var(--text-muted)', marginBottom: '28px' }}>
                Founded by seasoned Chartered Accountants and corporate bankers with over 18 years inside multi-jurisdictional trading, contracting, and logistics groups, we don't advise from afar. We have closed books, led in-country finance teams, faced revenue authorities, and structured multi-million dirham corporate credit lines from inside operating entities.
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '20px',
                  padding: '24px 0',
                  borderTop: '1px solid var(--border-light)',
                  borderBottom: '1px solid var(--border-light)',
                  marginBottom: '32px',
                }}
              >
                <div>
                  <span className="mono" style={{ fontSize: '28px', color: 'var(--forest)', fontWeight: 600 }}>18+</span>
                  <span style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>Years Operating Experience</span>
                </div>
                <div>
                  <span className="mono" style={{ fontSize: '28px', color: 'var(--forest)', fontWeight: 600 }}>4</span>
                  <span style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>Core Sovereign Corridors</span>
                </div>
                <div>
                  <span className="mono" style={{ fontSize: '28px', color: 'var(--forest)', fontWeight: 600 }}>100%</span>
                  <span style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>Clean Audit Readiness</span>
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

            {/* Real Dubai Corporate Photography */}
            <div className="reveal-on-scroll">
              <div className="about-image-frame">
                <img
                  src="/assets/img/dubai-sunset.jpg"
                  alt="Modern Dubai corporate architecture and international business skyline"
                  width={2000}
                  height={1333}
                  loading="lazy"
                />
                <div className="about-stat-overlay">
                  <div>
                    <b>DIFC &amp; Mainland</b>
                    <span>Corporate Hub</span>
                  </div>
                  <div>
                    <b>East Africa</b>
                    <span>Operational Footprint</span>
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
            <p className="eyebrow on-dark">Practice Areas</p>
            <h2 className="h2" style={{ color: 'var(--ivory)' }}>
              Comprehensive Corporate &amp; Governance Expertise
            </h2>
            <p className="lead on-dark" style={{ marginTop: '16px' }}>
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

      {/* ==================== 5. DUBAI ADVANTAGE (REAL DIFC ARCHITECTURE) ==================== */}
      <section className="sec-dubai-advantage">
        <div className="dubai-advantage-bg" aria-hidden="true" />
        <div className="wrap">
          <div className="sec-head reveal-on-scroll" style={{ maxWidth: '820px' }}>
            <p className="eyebrow on-dark">Strategic Jurisdiction</p>
            <h2 className="h2" style={{ color: 'var(--ivory)' }}>
              Rooted in Dubai. Connected to Global Opportunities.
            </h2>
            <p className="lead on-dark" style={{ marginTop: '18px' }}>
              Dubai stands as the preeminent international hub linking GCC capital, South Asian commerce, and rapidly expanding African markets. TGM provides the financial infrastructure to navigate this global crossroads with certainty.
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
            <p className="eyebrow forest">Methodology</p>
            <h2 className="h2" style={{ color: 'var(--forest-deep)' }}>
              Our Structured Approach
            </h2>
            <p className="lead" style={{ marginTop: '14px', color: 'var(--text-muted)' }}>
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
          <p className="eyebrow on-dark" style={{ marginBottom: '14px' }}>
            Initiate Governance
          </p>
          <h2 className="h2">
            Let's Build a Stronger Foundation for Your Business.
          </h2>
          <p className="lead on-dark" style={{ maxWidth: '640px', marginTop: '16px' }}>
            Connect directly with an operating partner for an introductory conversation on your internal controls, Corporate Tax positioning, or bank facility readiness.
          </p>
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
